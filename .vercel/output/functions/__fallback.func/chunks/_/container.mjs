import { u as useRuntimeConfig, b as getHeader, e as getCookie, f as setCookie } from '../nitro/nitro.mjs';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

class MockSearch {
  async search(event, params) {
    const directory = getCfpDirectory(event);
    const result = await directory.list(params);
    return {
      hits: result.items,
      total: result.total
    };
  }
}

class MockAuth {
  async getCurrentUser(event) {
    const config = useRuntimeConfig();
    const authHeader = getHeader(event, "authorization");
    const token = (authHeader == null ? void 0 : authHeader.replace("Bearer ", "")) || getCookie(event, "auth-token");
    if (token === config.adminAccessToken) {
      return { id: "admin-user", role: "admin" };
    }
    return { id: "demo-user", role: "user" };
  }
}

class MockSitemap {
  async routes() {
    const directory = getCfpDirectory();
    const cfps = await directory.list({ pageSize: 1e3 });
    const routes = [
      "/",
      "/search",
      "/submit",
      "/account/saved-searches"
    ];
    cfps.items.forEach((cfp) => {
      routes.push(`/cfp/${cfp.slug}`);
    });
    return routes;
  }
}

async function fetchWithRetry(req, init) {
  const retries = 3;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fetch(req, init);
    } catch (error) {
      if (init?.signal?.aborted) {
        throw error;
      }
      if (attempt === retries) {
        console.error(`Error fetching request ${req}`, error, init);
        throw error;
      }
      console.warn(`Retrying fetch attempt ${attempt + 1} for request: ${req}`);
    }
  }
  throw new Error("Unreachable code");
}

function setCookies(event, cookies) {
  const response = event.node.res;
  const headersWritable = () => !response.headersSent && !response.writableEnded;
  if (!headersWritable()) {
    return;
  }
  for (const { name, value, options } of cookies) {
    if (!headersWritable()) {
      break;
    }
    setCookie(event, name, value, options);
  }
}

const serverSupabaseClient = async (event) => {
  if (!event.context._supabaseClient) {
    const { url, key, cookiePrefix, cookieOptions, clientOptions: { auth = {}, global = {} } } = useRuntimeConfig(event).public.supabase;
    event.context._supabaseClient = createServerClient(url, key, {
      auth,
      cookies: {
        getAll: () => parseCookieHeader(getHeader(event, "Cookie") ?? ""),
        setAll: (cookies) => setCookies(event, cookies)
      },
      cookieOptions: {
        ...cookieOptions,
        name: cookiePrefix
      },
      global: {
        fetch: fetchWithRetry,
        ...global
      }
    });
  }
  return event.context._supabaseClient;
};

const serverSupabaseServiceRole = (event) => {
  const config = useRuntimeConfig(event);
  const secretKey = config.supabase.secretKey;
  const serviceKey = config.supabase.serviceKey;
  const url = config.public.supabase.url;
  const serverKey = secretKey || serviceKey;
  if (!serverKey) {
    throw new Error("Missing server key. Set either `SUPABASE_SECRET_KEY` (recommended) or `SUPABASE_SERVICE_KEY` (deprecated) in your environment variables.");
  }
  if (!event.context._supabaseServiceRole) {
    event.context._supabaseServiceRole = createClient(url, serverKey, {
      auth: {
        detectSessionInUrl: false,
        persistSession: false,
        autoRefreshToken: false
      }
    });
  }
  return event.context._supabaseServiceRole;
};

async function getSupabaseClient(event) {
  return serverSupabaseClient(event);
}
async function getSupabaseAdminClient(event) {
  return serverSupabaseServiceRole(event);
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}
function dbCfpToDTO(dbCfp) {
  var _a, _b, _c;
  return {
    id: dbCfp.id,
    slug: dbCfp.slug,
    title: dbCfp.title,
    city: dbCfp.city,
    country: dbCfp.country,
    topics: dbCfp.topics,
    closesAt: dbCfp.closes_at,
    format: dbCfp.format,
    perks: {
      travel: dbCfp.perks_travel,
      hotel: dbCfp.perks_hotel,
      honorarium: dbCfp.perks_honorarium
    },
    lastUpdatedAt: dbCfp.last_updated_at,
    websiteUrl: dbCfp.website_url,
    cfpUrl: dbCfp.cfp_url,
    timeline: {
      opensAt: (_a = dbCfp.timeline_opens_at) != null ? _a : void 0,
      closesAt: dbCfp.timeline_closes_at
    },
    platform: (_b = dbCfp.platform) != null ? _b : void 0,
    notes: (_c = dbCfp.notes) != null ? _c : void 0
  };
}
function dbModerationToDTO(dbModeration) {
  var _a, _b, _c;
  return {
    id: dbModeration.id,
    submittedAt: dbModeration.submitted_at,
    payload: {
      conference: {
        name: dbModeration.conference_name,
        websiteUrl: dbModeration.conference_website_url,
        city: dbModeration.conference_city,
        country: dbModeration.conference_country,
        platform: (_a = dbModeration.conference_platform) != null ? _a : void 0
      },
      cfp: {
        title: dbModeration.cfp_title,
        cfpUrl: dbModeration.cfp_url,
        topics: dbModeration.cfp_topics,
        format: dbModeration.cfp_format,
        opensAt: (_b = dbModeration.cfp_opens_at) != null ? _b : void 0,
        closesAt: dbModeration.cfp_closes_at,
        perks: {
          travel: dbModeration.cfp_perks_travel,
          hotel: dbModeration.cfp_perks_hotel,
          honorarium: dbModeration.cfp_perks_honorarium
        },
        notes: (_c = dbModeration.cfp_notes) != null ? _c : void 0
      }
    }
  };
}
class SupabaseCfpDirectory {
  constructor(event) {
    this.event = event;
  }
  async list(params) {
    const supabase = await getSupabaseClient(this.event);
    let query = supabase.from("cfps").select("*", { count: "exact" });
    if (params.q) {
      const searchTerm = params.q.toLowerCase();
      query = query.or(`title.ilike.%${searchTerm}%,city.ilike.%${searchTerm}%,country.ilike.%${searchTerm}%,topics.cs.{${searchTerm}}`);
    }
    if (params.country) {
      query = query.eq("country", params.country);
    }
    if (params.topic) {
      query = query.contains("topics", [params.topic]);
    }
    if (params.format) {
      query = query.eq("format", params.format);
    }
    if (params.closesBefore) {
      query = query.lte("closes_at", params.closesBefore);
    }
    query = query.order("closes_at", { ascending: true });
    const page = params.page || 1;
    const pageSize = params.pageSize || 12;
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    query = query.range(start, end);
    const { data, error, count } = await query;
    if (error) {
      throw new Error(`Failed to fetch CFPs: ${error.message}`);
    }
    const items = (data || []).map(dbCfpToDTO);
    return { items, total: count || 0 };
  }
  async getBySlug(slug) {
    const supabase = await getSupabaseClient(this.event);
    const { data, error } = await supabase.from("cfps").select("*").eq("slug", slug).single();
    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Failed to fetch CFP: ${error.message}`);
    }
    return dbCfpToDTO(data);
  }
  async approveModeration(id) {
    const supabaseAdmin = await getSupabaseAdminClient(this.event);
    const { data: moderationItem, error: fetchError } = await supabaseAdmin.from("moderation_queue").select("*").eq("id", id).eq("status", "pending").single();
    if (fetchError) {
      throw new Error(`Failed to fetch moderation item: ${fetchError.message}`);
    }
    if (!moderationItem) {
      throw new Error("Moderation item not found or already processed");
    }
    const newCfp = {
      slug: generateSlug(moderationItem.cfp_title),
      title: moderationItem.cfp_title,
      city: moderationItem.conference_city,
      country: moderationItem.conference_country,
      topics: moderationItem.cfp_topics,
      closes_at: moderationItem.cfp_closes_at,
      format: moderationItem.cfp_format,
      perks_travel: moderationItem.cfp_perks_travel,
      perks_hotel: moderationItem.cfp_perks_hotel,
      perks_honorarium: moderationItem.cfp_perks_honorarium,
      website_url: moderationItem.conference_website_url,
      cfp_url: moderationItem.cfp_url,
      timeline_opens_at: moderationItem.cfp_opens_at,
      timeline_closes_at: moderationItem.cfp_closes_at,
      platform: moderationItem.conference_platform,
      notes: moderationItem.cfp_notes
    };
    const { error: insertError } = await supabaseAdmin.from("cfps").insert(newCfp);
    if (insertError) {
      throw new Error(`Failed to create CFP: ${insertError.message}`);
    }
    const { error: updateError } = await supabaseAdmin.from("moderation_queue").update({ status: "approved" }).eq("id", id);
    if (updateError) {
      throw new Error(`Failed to update moderation status: ${updateError.message}`);
    }
  }
  async rejectModeration(id) {
    const supabaseAdmin = await getSupabaseAdminClient(this.event);
    const { error: updateError } = await supabaseAdmin.from("moderation_queue").update({ status: "rejected" }).eq("id", id).eq("status", "pending");
    if (updateError) {
      throw new Error(`Failed to reject moderation item: ${updateError.message}`);
    }
  }
  async createModeration(payload) {
    const supabaseAdmin = await getSupabaseAdminClient(this.event);
    const moderationInsert = {
      conference_name: payload.conference.name,
      conference_website_url: payload.conference.websiteUrl,
      conference_city: payload.conference.city,
      conference_country: payload.conference.country,
      conference_platform: payload.conference.platform || null,
      cfp_title: payload.conference.name,
      // Use conference name as CFP title
      cfp_url: payload.cfp.cfpUrl,
      cfp_topics: payload.cfp.topics,
      cfp_format: payload.cfp.format,
      cfp_opens_at: payload.cfp.opensAt || null,
      cfp_closes_at: payload.cfp.closesAt,
      cfp_perks_travel: payload.cfp.perks.travel,
      cfp_perks_hotel: payload.cfp.perks.hotel,
      cfp_perks_honorarium: payload.cfp.perks.honorarium,
      cfp_notes: payload.cfp.notes || null
    };
    const { data, error } = await supabaseAdmin.from("moderation_queue").insert(moderationInsert).select("id").single();
    if (error) {
      throw new Error(`Failed to create moderation item: ${error.message}`);
    }
    return { id: data.id };
  }
  async listModeration() {
    const supabaseAdmin = await getSupabaseAdminClient(this.event);
    const { data, error } = await supabaseAdmin.from("moderation_queue").select("*").eq("status", "pending").order("submitted_at", { ascending: false });
    if (error) {
      throw new Error(`Failed to fetch moderation queue: ${error.message}`);
    }
    return (data || []).map(dbModerationToDTO);
  }
  async deleteCfp(id) {
    const supabaseAdmin = await getSupabaseAdminClient(this.event);
    const { error } = await supabaseAdmin.from("cfps").delete().eq("id", id);
    if (error) {
      throw new Error(`Failed to delete CFP: ${error.message}`);
    }
  }
  async updateCfp(id, data) {
    var _a, _b, _c, _d, _e;
    const supabaseAdmin = await getSupabaseAdminClient(this.event);
    const updateData = {};
    if (data.title !== void 0) updateData.title = data.title;
    if (data.city !== void 0) updateData.city = data.city;
    if (data.country !== void 0) updateData.country = data.country;
    if (data.topics !== void 0) updateData.topics = data.topics;
    if (data.closesAt !== void 0) updateData.closes_at = data.closesAt;
    if (data.format !== void 0) updateData.format = data.format;
    if (((_a = data.perks) == null ? void 0 : _a.travel) !== void 0) updateData.perks_travel = data.perks.travel;
    if (((_b = data.perks) == null ? void 0 : _b.hotel) !== void 0) updateData.perks_hotel = data.perks.hotel;
    if (((_c = data.perks) == null ? void 0 : _c.honorarium) !== void 0) updateData.perks_honorarium = data.perks.honorarium;
    if (data.websiteUrl !== void 0) updateData.website_url = data.websiteUrl;
    if (data.cfpUrl !== void 0) updateData.cfp_url = data.cfpUrl;
    if (((_d = data.timeline) == null ? void 0 : _d.opensAt) !== void 0) updateData.timeline_opens_at = data.timeline.opensAt;
    if (((_e = data.timeline) == null ? void 0 : _e.closesAt) !== void 0) updateData.timeline_closes_at = data.timeline.closesAt;
    if (data.platform !== void 0) updateData.platform = data.platform;
    if (data.notes !== void 0) updateData.notes = data.notes;
    if (data.title) {
      updateData.slug = generateSlug(data.title);
    }
    const { error } = await supabaseAdmin.from("cfps").update(updateData).eq("id", id);
    if (error) {
      throw new Error(`Failed to update CFP: ${error.message}`);
    }
  }
  async refresh() {
  }
}

function dbSavedSearchToDTO(dbSavedSearch) {
  var _a, _b, _c, _d, _e;
  const filters = {
    q: (_a = dbSavedSearch.filter_query) != null ? _a : void 0,
    country: (_b = dbSavedSearch.filter_country) != null ? _b : void 0,
    topic: (_c = dbSavedSearch.filter_topic) != null ? _c : void 0,
    format: (_d = dbSavedSearch.filter_format) != null ? _d : void 0,
    closesBefore: (_e = dbSavedSearch.filter_closes_before) != null ? _e : void 0
  };
  return {
    id: dbSavedSearch.id,
    name: dbSavedSearch.name,
    filters
  };
}
class SupabaseSavedSearches {
  constructor(event) {
    this.event = event;
  }
  async list(userId) {
    const supabase = await getSupabaseClient(this.event);
    const { data, error } = await supabase.from("saved_searches").select("*").eq("user_id", userId).order("created_at", { ascending: false });
    if (error) {
      throw new Error(`Failed to fetch saved searches: ${error.message}`);
    }
    return (data || []).map(dbSavedSearchToDTO);
  }
  async create(userId, name, filters) {
    var _a, _b, _c, _d, _e;
    const supabase = await getSupabaseClient(this.event);
    const insert = {
      user_id: userId,
      name,
      filter_query: (_a = filters.q) != null ? _a : null,
      filter_country: (_b = filters.country) != null ? _b : null,
      filter_topic: (_c = filters.topic) != null ? _c : null,
      filter_format: (_d = filters.format) != null ? _d : null,
      filter_closes_before: (_e = filters.closesBefore) != null ? _e : null
    };
    const { data, error } = await supabase.from("saved_searches").insert(insert).select().single();
    if (error) {
      throw new Error(`Failed to create saved search: ${error.message}`);
    }
    return dbSavedSearchToDTO(data);
  }
  async delete(id, userId) {
    const supabase = await getSupabaseClient(this.event);
    const { error } = await supabase.from("saved_searches").delete().eq("id", id).eq("user_id", userId);
    if (error) {
      throw new Error(`Failed to delete saved search: ${error.message}`);
    }
  }
}

function getCfpDirectory(event) {
  return new SupabaseCfpDirectory(event);
}
function getSavedSearches(event) {
  return new SupabaseSavedSearches(event);
}
let search;
let auth;
let sitemap;
function getSearch() {
  if (!search) {
    search = new MockSearch();
  }
  return search;
}
function getAuth() {
  if (!auth) {
    auth = new MockAuth();
  }
  return auth;
}
function getSitemap() {
  if (!sitemap) {
    sitemap = new MockSitemap();
  }
  return sitemap;
}

export { getSavedSearches as a, getCfpDirectory as b, getSitemap as c, getSearch as d, getAuth as g };
//# sourceMappingURL=container.mjs.map

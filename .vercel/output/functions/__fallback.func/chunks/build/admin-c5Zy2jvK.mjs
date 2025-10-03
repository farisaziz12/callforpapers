import { F as executeAsync } from '../nitro/nitro.mjs';
import { e as defineNuxtRouteMiddleware, h as useSupabaseUser, n as navigateTo } from './server.mjs';
import { u as useSupabaseClient } from './useSupabaseClient-4v4x5xwK.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@iconify/utils';
import 'consola';
import 'vue';
import 'vue-router';
import '@supabase/ssr';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import 'vue/server-renderer';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const admin = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  if (!user.value) {
    return navigateTo("/admin/login");
  }
  const { data: adminData, error } = ([__temp, __restore] = executeAsync(() => supabase.from("admin_users").select("id").eq("id", user.value.sub).single()), __temp = await __temp, __restore(), __temp);
  if (error || !adminData) {
    [__temp, __restore] = executeAsync(() => supabase.auth.signOut()), await __temp, __restore();
    return navigateTo("/admin/login");
  }
});

export { admin as default };
//# sourceMappingURL=admin-c5Zy2jvK.mjs.map

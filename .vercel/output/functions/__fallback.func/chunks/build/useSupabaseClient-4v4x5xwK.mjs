import { i as useNuxtApp } from './server.mjs';

const useSupabaseClient = () => {
  return useNuxtApp().$supabase.client;
};

export { useSupabaseClient as u };
//# sourceMappingURL=useSupabaseClient-4v4x5xwK.mjs.map

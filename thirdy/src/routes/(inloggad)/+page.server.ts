import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    logout: async ({cookies})=>{
        cookies.delete("token_id",{path: "/"})
        throw redirect(303, "/login")
    }
}satisfies Actions;
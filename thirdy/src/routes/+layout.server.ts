import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/index';


export const load = (async ({cookies, url}) => {

    if(url.pathname.includes('login')||url.pathname.includes("register")||url.pathname.includes("help")){
        return
    }
    //kollar om user har token, annars goto login
    let token_id = cookies.get("token_id")
    if (!token_id) {
        throw redirect(307, "/login");
      }
    //kollar om user finns, om inte, ta bort kaka och goto login

    let result = await prisma.token.findUnique({
      where: { id: token_id },
      include: { user: { select: { email: true, id: true } } },
    });
    
    if (!result) {
        cookies.delete("token_id", { path: "/" });
        throw redirect(307, "/login");
      }
      const expiration_time_in_days = 14;

      if( //om tiden har gått ut, ta bort kaka och token
        Date.now() - result.createdAt.getTime() > 1000 * 24 * 60 * 60 *expiration_time_in_days
      ){
        cookies.delete("token_id", {path: "/"});
        await prisma.token.delete({ where: { id: token_id } });
        throw redirect(303, "/login");
      }
      return { user: result.user };
}) satisfies LayoutServerLoad;
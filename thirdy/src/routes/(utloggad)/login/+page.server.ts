import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/index';
import * as crypto from "node:crypto";

function validatePassword(inputPassword : any,storedSalt: any, storedHash: any){
    const hash = crypto.pbkdf2Sync(inputPassword, storedSalt, 1000, 64, 'sha512').toString('hex');
    return storedHash === hash;
  }

export const load = (async () => {
    let allusers = await prisma.user.findMany()
    return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
    sign_in: async ({cookies, request})=>{
        let data = await request.formData()
        let email = data.get("email")?.toString()??"lol"
        let password = data.get("password")?.toString()??"lol"
        let show_error = Boolean(data.get("show_error"))

        if(!email || !password){
            show_error== true; 
            return fail(400,{login_fail:"please enter password and username"})

        }
        let user = await prisma.user.findUnique({
            where: {
                email: email
                }
            })

        //register
            if(user == null){
                return fail(400,{login_fail:"ERROR: no such user exist"})    
            }else if (validatePassword(password,user.salt,user.hash)) {
                    const token = await prisma.token.create({
                        data: {
                            userId: user.id
                        },
                    })
                    cookies.set("token_id", token.id, { secure: false, path:"/" });
                    throw redirect(303, "/"); // login}
            }

    }
    
}satisfies Actions;
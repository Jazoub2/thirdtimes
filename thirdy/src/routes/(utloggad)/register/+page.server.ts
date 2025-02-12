import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { prisma } from '$lib/index';
import * as crypto from "node:crypto";

function hashPassword(password : any){
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password,salt,1000,64,'sha512').toString('hex');
    return{salt, hash};
}
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;
export const actions: Actions = {
    register: async({request, cookies})=>{
        let data = await request.formData()
        let email = data.get("email")?.toString()??"lol"
        let password = data.get("password")?.toString()??"lol"
        let petname = data.get("pet")?.toString()??"lul"

        if(!email || !password || !petname){
            return fail(400, {input_error:"please input all fields"})
        }else if (!email.includes("@")){ // maybe not required as input is type email
            return fail(400, {input_error: "please use a valid email adress"})
        }
        let user = await prisma.user.findUnique({
            where:{email}
        })
        if(user){
            return fail(400, {input_error: "a user with this email adress already exists"})
        }else{
            const { salt, hash } = hashPassword(password);
            const newuser = await prisma.user.create({
                data: {
                    email,
                    petname,
                    hash,
                    salt,
                }
            })
            const token = await prisma.token.create({
            data: { userId: newuser.id },
            });
            let token_id = cookies.get("token_id")
            if(token_id){
                cookies.delete("token_id", {path: "/" })
            }
            cookies.set("token_id",token.id,{ path:"/" })
            console.log("new user created")
            throw redirect(303, "/")

        }
    }
}satisfies Actions;
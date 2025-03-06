import {z} from "zod";
export const userbody = z.object({
    userName: z.string().min(3).max(30),
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
    password: z.string().min(6).max(30)
})
export const signinBody=z.object({
    userName:z.string().min(3).max(30),
    password:z.string().min(3).max(30)

})

export const roomBody=z.object({
    name:z.string().min(3).max(30)
})
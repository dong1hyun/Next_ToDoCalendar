"use server"

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/app/lib/const";
import db from "@/app/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import getSession from "@/app/lib/session";

const checkPassword = ({ password, confirm_password }: { password: string, confirm_password: string }) => password === confirm_password
const checkUsername = async (username: string) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    });

    return !user;
}
const checkEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    });

    return !user;
}
const userFormSchema = z.object({
    username: z
        .string()
        .trim()
        .min(3)
        .max(10)
        .refine(checkUsername, "This username is already taken"),
    email: z
        .string()
        .email()
        .refine(checkEmail, "There is an account already registerd with that email"),
    password: z
        .string()
        .min(PASSWORD_MIN_LENGTH)
        .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
        .string()
        .min(PASSWORD_MIN_LENGTH),
})
    .refine(
        checkPassword,
        {
            message: "Both  passwords should be the same",
            path: ["confirm_password"]
        },
    );

export const create_account = async (prev: any, formData: FormData) => {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password")
    };
    const result = await userFormSchema.safeParseAsync(data);
    if (!result.success) return result.error.flatten();
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
        data: {
            username: result.data.username,
            email: result.data.email,
            password: hashedPassword
        },
        select: {
            id:true,
            email:true
        }
    });

    const session = await getSession();
    session.email = user.email;
    await session.save();

    const curDate = new Date();
    console.log("create account");
    redirect(`/home/${curDate.getFullYear()}/${curDate.getMonth() + 1}`);
}
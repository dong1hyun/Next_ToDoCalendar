"use server"

import db from "@/app/lib/db";
import bcrypt from "bcrypt"
import { redirect } from "next/navigation";
import getSession from "@/app/lib/session";
import { DIFFENT_PASSWORD_ERROR, EXIST_EMAIL_ERROR } from "@/app/lib/const";
import { UseDataForm } from "./page";

export const checkPassword = ({ password, confirm_password }: { password: string, confirm_password: string }) => {
    return password === confirm_password ? true : DIFFENT_PASSWORD_ERROR;
}

export const checkEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    });
    return user ? EXIST_EMAIL_ERROR : true;
}

export const create_account = async (userData: UseDataForm) => {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await db.user.create({
        data: {
            username: userData.username,
            email: userData.email,
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
    redirect(`/home/${curDate.getFullYear()}/${curDate.getMonth() + 1}`);
}
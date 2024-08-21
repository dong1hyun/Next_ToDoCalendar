"use server"

import db from "@/app/lib/db"
import getSession from "@/app/lib/session"
import { redirect } from "next/navigation";
import { find_userId } from "../toDos/[...date]/action";
import { signOut } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export const getUserInfo = async () => {
    const id = await find_userId();
    const user = await db.user.findUnique({
        where: {
            id
        },
        select: {
            username: true,
            email: true
        }
    });

    return user;
}

export const logOut = async () => {
    const session = await getSession();
    await session.destroy();
    redirect("/");
}
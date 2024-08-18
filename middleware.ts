import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";

interface Routes {
    [key:string]: boolean;
}

const publicURLs: Routes = {
    "/":true,
    "/login":true,
    "/create-account":true,
}

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    const exist = publicURLs[pathname];
    const session = await getSession();
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // console.log("Token:", token);
    if(!session.id && !token) { //로그아웃 상태
        if(!exist) { //private에 접근
            return NextResponse.redirect(new URL("/", req.url));
        }
    } else { //로그인 상태
        if(exist) { //public에 접근
            console.log(new Date().getDay())
            return NextResponse.redirect(new URL(`/home/${new Date().getFullYear()}/${new Date().getMonth() + 1}`, req.url));
        }
    }
}

export const config = {
    matcher: ["/", "/login", "/create-account", "/home/:path*", "/myPage"]
}
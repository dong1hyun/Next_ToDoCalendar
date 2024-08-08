import { NextRequest, NextResponse } from "next/server";
import getSession from "./app/lib/session";

interface Routes {
    [key:string]: boolean;
}

const publicURLs: Routes = {
    "/":true,
    "/login":true,
    "/create-account":true,
}

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const exist = publicURLs[pathname];
    const session = await getSession();
    console.log(new Date().getFullYear())
    if(!session.id) { //로그아웃 상태
        if(!exist) { //private에 접근
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else { //로그인 상태
        if(exist) { //public에 접근
            console.log(new Date().getDay())
            return NextResponse.redirect(new URL(`/home/${new Date().getFullYear()}/${new Date().getMonth() + 1}`, request.url));
        }
    }
}

export const config = {
    matcher: ["/", "/login", "/create-account", "/home", "/myPage"]
}
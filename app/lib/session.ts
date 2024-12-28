import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    email?:string
}

export default async function getSession() {
    return getIronSession<SessionContent>(cookies(), {
        cookieName: "toDoCalendar",
        password: process.env.COOKIE_PASSWORD!
    });
}
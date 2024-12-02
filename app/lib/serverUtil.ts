"use server"

import { getServerSession } from "next-auth";
import getSession from "./session";
export const findUser = async () => {
    const session = await getSession();
    const data = await getServerSession();
    const google_email = data?.user?.email;
    const exist_info: {id?: number; email?: string} = {};
    if(session.id) exist_info.id = session.id;
    if(google_email) exist_info.email = google_email;
    return exist_info;
}
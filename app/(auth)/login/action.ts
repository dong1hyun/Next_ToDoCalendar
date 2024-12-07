"use server"

import db from '@/app/lib/db';
import getSession from '@/app/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { z } from "zod";

const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
      where: {
        email
      },
      select: {
        id: true
      }
    })
  
    return Boolean(user);
  }

const loginFormSchema = z.object({
    email: z
    .string()
    .email()
    .refine(checkEmailExists, "An account with this email does not exist."),
    password: z
    .string()
})

export const userLogIn = async (prev: any, formData: FormData) => {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };
    const result = await loginFormSchema.safeParseAsync(data);
    if (!result.success) return result.error.flatten();
    const user = await db.user.findUnique({
        where: {
            email: result.data.email
        },
        select: {
            id: true,
            password: true,
            email: true
        }
    });
    
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "")
    if(ok) {
        const session = await getSession(); // 암호화된 세션 데이터를 복호화 해서 가져옴
        session.id = user!.id;
        await session.save(); //암호화 해서 다시 저장
        const curDate = new Date();
        redirect(`/home/${curDate.getFullYear()}/${curDate.getMonth() + 1}`);
    } else {
        return {
          fieldErrors: {
            password: ["Wrong password"],
            email: []
          }
        }
      }
}
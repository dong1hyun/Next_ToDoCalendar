"use server"

import { WRONG_INPUT_ERROR } from '@/app/lib/const';
import db from '@/app/lib/db';
import getSession from '@/app/lib/session';
import bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import { UserDataForm } from './page';

export const userLogIn = async (userData: UserDataForm) => {
  const user = await db.user.findUnique({
    where: {
      email: userData.email
    },
    select: {
      id: true,
      password: true,
      email: true
    }
  });
  if(!user) return WRONG_INPUT_ERROR;
  const ok = await bcrypt.compare(userData.password, user.password ?? "")
  if (ok) {
    const session = await getSession(); // 암호화된 세션 데이터를 복호화 해서 가져옴
    session.email = user.email;
    await session.save(); //암호화 해서 다시 저장
    const curDate = new Date();
    redirect(`/home/${curDate.getFullYear()}/${curDate.getMonth() + 1}`);
  } else {
    return WRONG_INPUT_ERROR;
  }
}

export const guestLogin = async () => {
  function generateGuestEmail() {
    const randomString = Math.random().toString(36).substr(2, 8); // 랜덤 문자열 생성
    return `${randomString}@guest.example.com`;
  }

  const guestEmail = generateGuestEmail();

  const user = await db.user.create({
    data: {
      username: "게스트",
      email: guestEmail,
      password: "example_password"
    },
    select: {
      id: true,
      email: true
    }
  });

  const session = await getSession(); // 암호화된 세션 데이터를 복호화 해서 가져옴
  session.email = user.email;
  await session.save(); //암호화 해서 다시 저장
  const curDate = new Date();
  redirect(`/home/${curDate.getFullYear()}/${curDate.getMonth() + 1}`);
}
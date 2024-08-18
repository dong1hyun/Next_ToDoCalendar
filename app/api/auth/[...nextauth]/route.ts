import db from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
 
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user: {id, name, email, image} }) {
      try {
        const exist = await db.user.findUnique({
          where: {
            email: email ?? ""
          }
        });
        if(!exist) {
          const user = await db.user.create({
            data: {
              username: name!,
              email: email!,
            }
          })
        }
      } catch(err) {
        console.error(err);
        return false;
      }
      return true;
    }
  }
});
 
export { handler as GET, handler as POST };
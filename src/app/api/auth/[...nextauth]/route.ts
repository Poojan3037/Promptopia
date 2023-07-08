import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "../../../../utils/connectDb";
import User from "../../../../models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user?.email });
      let newuserWithId = {
        id: sessionUser._id.toString(),
        ...session.user,
      };

      sessionUser.user = newuserWithId;
      return session;
    },
    async signIn({ account, profile, user, credentials }: any) {
      try {
        await connectDb();

        const userExist = await User.findOne({ email: profile?.email });

        if (!userExist) {
          await User.create({
            email: profile?.email,
            username: profile?.name,
            image: profile?.picture,
          });
        }

        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

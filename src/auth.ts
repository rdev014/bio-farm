import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import connectDb from "./lib/db";
import { User } from "./models/UserSchema";


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { name, email, image, id } = user;
          await connectDb();
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({ name, email, image, authProviderId: id });
          }
          else {
            return true;
          }
        } catch (error) {
          throw new Error("Something went wrong try again later");
        }
      }
      return false;
    },
  },
});

import NextAuth, { CredentialsSignin, DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import connectDb from "./lib/db";
import { User } from "./models/UserSchema";
import { compare } from "bcryptjs";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
  interface User {
    role: string;
  }
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: " Credentials",

      credentials: {
        email: {
          type: "email",
          label: "Email",
        },
        password: {
          type: "password",
          label: "Password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please Provide Both Email & Password");
        }
        await connectDb();
        const user = await User.findOne({ email }).select("+password +role");
        if (!user) {
          throw new Error("Invalid Email or Password");
        }
        if (!user.password) {
          throw new Error("Invalid Email or Password");
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid Password");
        }
        const userData = {
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
          role: user.role,
          id: user._id,
        };
        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && typeof token.role === "string") {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { name, email, image, id } = user;
          await connectDb();
          const existingUser = await User.findOne({ email });
          if (!existingUser) {
            await User.create({ name, email, image, authProviderId: id });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error(`${error}`);
        }
      }
      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});

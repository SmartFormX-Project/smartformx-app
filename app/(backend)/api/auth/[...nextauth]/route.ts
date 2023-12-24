import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/config/prisma";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token, trigger }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session.subscribeStatus) {
        token.subscribeStatus = session.subscribeStatus;
        token.plan = session.plan;
        return token;
      }
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
        token.businessId = user.businessId;
        token.subscribeStatus = user.subscribeStatus;
        token.verifiedEmail = user.verifiedEmail;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error("Nome de usuário ou senha ausente");
        }
        let user: any = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            password: true,
            email: true,
            name: true,
            subscribeStatus: true,
            businessId: true,
            metadata: true,
          },
        });

        if (!user) {
          throw new Error("Conta não cadastrada");
        }
        const match = await compare(password, user?.password);

        if (!match) throw new Error("Senha incorreta");

        delete user.password;
        var planName = "";
        if (user.metadata) {
          const { name } = user.metadata;
          planName = name;
        }

        user.plan = planName;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, //one day
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

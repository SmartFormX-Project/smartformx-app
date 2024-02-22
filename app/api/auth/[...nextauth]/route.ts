import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { compare } from "bcryptjs";
import AuthenticationService from "../../repository/AuthenticationService";

const authOptions: NextAuthOptions = {

  
  
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET as string,
    // }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        const { email, password } = credentials ?? {};

        if (!email || !password) {
          throw new Error(JSON.stringify ({error:"Nome de usuário ou senha ausente"}));
        }
        let response = await AuthenticationService.SignIn(email, password);
        
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(JSON.stringify ({error: message}));
        }

        const {token, user} = await response.json();

        const jwt = token;
      
        return {
          ...user,
          jwt,
        };
      },
    }),
  ],

  callbacks: {
    //   async session({ session, token, trigger }) {
    //     session.user = token;
    //     return session;
    //   },
    //   async jwt({ token, user, trigger, session }) {
    //     if (trigger === "update" && session.subscribeStatus) {
    //       token.subscribeStatus = session.subscribeStatus;
    //       token.plan = session.plan;
    //       return token;
    //     }
    //     if (user) {
    //       token.id = user.id;
    //       token.plan = user.plan;
    //       token.businessId = user.businessId;
    //       token.subscribeStatus = user.subscribeStatus;
    //       token.verifiedEmail = user.verifiedEmail;
    //     }
    //     return token;
    //   },
    jwt: async ({ token, user }) => {

      // const shouldRefreshTime = Math.round((token.jwt - 60 * 60 * 1000) - Date.now());

      
        // If the token is still valid, just return it.
        // if (shouldRefreshTime > 0) {
        //     return Promise.resolve(token);
        // }
      // user is only available the first time a user signs in authorized
       if (user) {
         return {
           ...token,
           jwt: user.jwt,
           subscribeStatus: user.subscribeStatus,
           plan: user.plan
         };
       }
       return token;
     },
     session: async ({ session, token }) => {
       if (token) {
         session.jwt = token.jwt;

         session.user= token;
       }
     
       return session;
     },
   },
  pages: {
    signIn: "/signin",
    error: "/signin",
    signOut: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import environment from "@/config/environment";
import authServices from "@/services/auth.service";
import type { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    // choose credential providers
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: {label: "identifier", type: "text"},
        password: {label:"password", type:"password"}
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const {identifier, password} = credentials as {
          identifier: string,
          password: string
        }
        // hit login services to get token
        const result = await authServices.login({
          identifier,
          password
        })

        // token from login services
        const accessToken = result.data.data

        // hit me services to validate token and get user data
        const me = await authServices.getProfileWithToken(accessToken)
        const user = me.data.data

        // check accessToken, login status, user id and validate status. If true, return user data. Otherwise, return null.
        if(
          accessToken && 
          result.status === 200 &&
          user._id &&
          me.status === 200
        ) {
          user.accessToken = accessToken
          return user
        } else {
          return null
        }
      }
    })
  ],
  // callbacks to generate jwt and session
  callbacks: {
    async jwt({
      token, 
      user
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if(user) {
        token.user = user
      }

      return token
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended,
      token: JWTExtended
    }) {
      session.user = token.user,
      session.accessToken = token.user?.accessToken

      return session
    }
  }
})
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      console.log("EMAIL =>> ", email);
      
      // FQL cheat sheet => e a forma de inserir no banco
      await fauna.query(
        q.Create(
          q.Collection('user'),
          {data: {email}}
        )
      )

      return true
    },
  }
});

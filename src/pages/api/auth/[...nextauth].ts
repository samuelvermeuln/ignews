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
    async signIn({ user, account, profile, credentials }) {

      const { email } = user

      try {

        // FQL cheat sheet => e a forma de inserir no banco

        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: { email }}
            ),
            q.Get( //select dentro do sql
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )
          )
        )

        return true
        
      } catch (erro) {
        console.log("error no signIn");
        return false
     }
    },
  },
  
});

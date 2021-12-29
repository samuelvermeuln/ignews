import { Client } from "faunadb";

export const faunadb = new Client({
  secret: process.env.FaunaDB_KEY,
//   domain: "db.fauna.com",
//   // NOTE: Use the correct domain for your database's Region Group.
//   port: 443,
//   scheme: "https",
});
import { Client } from "faunadb";

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
  // domain: "db.eu.fauna.com",
  // // NOTE: Use the correct domain for your database's Region Group.
  // port: 443,
  // scheme: "https",
});
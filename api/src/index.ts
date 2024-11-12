// import express from "express";
// import router from "./router";
// import * as dotenv from "dotenv";
// import cors from "cors";

// import { dataSource } from "./db/client";
// import "reflect-metadata";
// dotenv.config();
// const {} = process.env;

// const app = express();

// app.use(
//   cors({
//     origin: process.env.VITE_FRONTEND_URL as string
//   })
// );

// app.use(express.json());

// app.use('/api', router);

// app.listen(PORT, async () => {
//   await dataSource.initialize();
//   console.log(`Serveur is listenning on http://localhost:${PORT}`);
// });

import { ApolloServer } from "@apollo/server"; // preserve-line
import { startStandaloneServer } from "@apollo/server/standalone";
import setCookie from "set-cookie-parser";
import * as jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

dotenv.config();
const { AUTH_SECRET_KEY, PORT } = process.env;

import { buildSchema } from "type-graphql";
import { dataSource } from "./db/client";
import "reflect-metadata";

// import repos from "../data/repos.json";
import RepoResolver from "./repos/repo.resolvers";
import UserResolver from "./user/user.resolvers";

// const typeDefs = `#graphql
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Repo {
//     id: String
//     name: String
//     url: String
//     isFavorite: Boolean
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     repos: [Repo]
//   }
// `;

// const resolvers = {
//   Query: {
//     repos: () => repos,
//   },
// };

/// 1 créer npotre schéma à partir des imports de resolvers

(async () => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [RepoResolver, UserResolver],
    authChecker: ({ context }, roles): boolean => {
      console.log(context.cookie);
      console.log("roles", roles);

      // Si utilisateur admin et Authorized("admin")
      if (roles.length > 0)
        return roles.some((role) => context.cookie.role === role);

      // Si utilisateur connect et Authorized()
      if (context.cookie) return true;

      // Default
      return false;
    },
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      console.info(req.headers.cookie);

      if (!req.headers.cookie) return { res };

      const { cdatokenexample } = setCookie.parse(
        req.headers.cookie as string,
        {
          map: true,
        }
      );

      if (!cdatokenexample) return { res };

      const payload = jwt.verify(
        cdatokenexample.value,
        AUTH_SECRET_KEY as string
      );

      if (!payload) return { res };
      return { res, cookie: payload };
    },
  });

  console.info("Docker compose is watching");
  console.log(`🚀  Server ready at: ${url}`);
})();

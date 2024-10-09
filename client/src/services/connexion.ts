// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// export default instance;

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

export default client;

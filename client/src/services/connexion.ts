// import axios from "axios";

// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL
// });

// export default instance;

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache: new InMemoryCache(),
});

export default client;

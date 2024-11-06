import "./App.css";
// import { useEffect, useState } from "react";
// import connexion from "./services/connexion";
import type { Repo } from "./types/RepoType";
// import data from "./assets/data.json";
import RepoDard from "./components/RepoDard";
import {
  useFullreposQuery,
  useLoginLazyQuery,
} from "./generated/graphql-types";

function App() {
  const { loading, error, data, refetch } = useFullreposQuery();
  const [login] = useLoginLazyQuery();
  // const [repos, setRepos] = useState<Repo[]>([]);

  // useEffect(() => {
  //   console.log("I'm the useEffect");
  //   const fetchRepos = async () => {
  //     try {
  //       const repos = await connexion.get<Repo[]>("/api/repos");
  //       setRepos(repos.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchRepos();
  // }, []);

  const handleLogin = async () => {
    // useQuery...
    await login({
      variables: {
        email: "test@test.com",
        password: "argon2hash",
      },
    });
  };

  if (loading) return <h1>Loading ...</h1>;
  if (error) return <p>Error</p>;

  return (
    <main>
      <h1>MON TITRE</h1>
      <button type="button" onClick={handleLogin}>
        LOGIN
      </button>
      {data.fullrepos.map((repo: Repo) => (
        <RepoDard
          name={repo.name}
          url={repo.url}
          id={repo.id}
          isFavorite={repo.isFavorite}
        />
      ))}
      <button onClick={refetch}>Rafraichir</button>
    </main>
  );
}

export default App;

// const pers = {
//   id: 1,
//   name: "Bob",
//   firstname: "Smith",
//   like: false
// }

// // bouton pour passer à like

// const handleLike = () => {
//   const updatePers = {...pers};
//   updatePers.like = !pers.like
//   setPers(updatePers)
// }
// onClick={() => setPers((prev) => ({...prev, like: !prev.like}))}

import "./App.css";
// import { useEffect, useState } from "react";
// import connexion from "./services/connexion";
import type { Repo } from "./types/RepoType";
// import data from "./assets/data.json";
import RepoDard from "./components/RepoDard";
import {
  useFullreposQuery,
  useLoginLazyQuery,
  FullreposQuery,
} from "./generated/graphql-types";

function App() {
  const { loading, error, data } = useFullreposQuery();
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

  if (data) {
    return (
      <main className="container">
        <header className="m-5">
          <h1 className="text-center">MON TITRE</h1>
          <button className="btn btn-dark" type="button" onClick={handleLogin}>
            LOGIN
          </button>
        </header>
        <section className="row">
          {data.fullrepos.map((repo: Repo) => (
            <RepoDard
              name={repo.name}
              url={repo.url}
              id={repo.id}
              isFavorite={repo.isFavorite}
              key={repo.id}
            />
          ))}
        </section>
      </main>
    );
  }
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

import "./App.css";
import { useEffect, useState } from "react";
import connexion from "./services/connexion";
import type { Repo } from "./types/RepoType";
// import data from "./assets/data.json";
import RepoDard from "./components/RepoDard";

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);

  useEffect(() => {
    console.log("I'm the useEffect");
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get<Repo[]>("/api/repos");
        setRepos(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <main>
      {repos.map((repo: Repo) => (
        <RepoDard name={repo.name} url={repo.url} />
      ))}
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

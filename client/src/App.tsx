import "./App.css";
import type { Repo } from "./types/RepoType";
import data from "./assets/data.json";
import RepoDard from "./components/RepoDard";

function App() {
  return (
    <main>
      {data.map((repo: Repo) => (
        <RepoDard name={repo.name} url={repo.url} />
      ))}
    </main>
  );
}

export default App;

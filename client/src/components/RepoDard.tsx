import type { Repo } from "../types/RepoType";
import { Link } from "react-router-dom";

function RepoDard({ name, url, id }: Repo) {
  return (
    <>
      <h2>{name}</h2>
      <h3 className="card">{url}</h3>
      <Link to={`/detail/${id}`}>Plus d'info</Link>
    </>
  );
}

export default RepoDard;

// <a href="/detail" target="_blank">Plus d'infos</a>

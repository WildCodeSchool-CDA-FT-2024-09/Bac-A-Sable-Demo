import type { Repo } from "../types/RepoType";
import { Link } from "react-router-dom";

function RepoDard({ name, url, id, isFavorite }: Repo) {
  return (
    <article className="col-4">
      <div className="m-2 card">
        <h2>{name}</h2>
        <h3>
          Accéder au repo <a href={url}>Ici</a>
        </h3>
        <p>{isFavorite ? "Favory" : "Non Favory"}</p>
        <Link className="btn btn-dark" to={`/detail/${id}`}>
          Plus d'info
        </Link>
      </div>
    </article>
  );
}

export default RepoDard;

// <a href="/detail" target="_blank">Plus d'infos</a>

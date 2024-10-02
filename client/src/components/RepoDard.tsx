import type { Repo } from "../types/RepoType";

function RepoDard({ name, url }: Repo) {
  return (
    <>
      <h2>{name}</h2>
      <h3 className="card">{url}</h3>
    </>
  );
}

export default RepoDard;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import type { Repo } from "../types/RepoType";

export default function Detail() {
  console.log("Initialisation du Detail");
  const { id } = useParams();
  const [data, setData] = useState<Repo>();

  const handleLike = async () => {
    try {
      await connexion.patch(`/api/repos/${id}`, {
        isFavorite: !data?.isFavorite,
      });
      const newRepos = { ...data } as Repo;
      newRepos.isFavorite = !data?.isFavorite;
      setData(newRepos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("I'm the useEffect");
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get(`/api/repos/${id}`);
        setData(repos.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

  return (
    <>
      {data && (
        <div>
          <h1>{data.name}</h1>
          <button type="button" onClick={handleLike}>
            {data.isFavorite ? "DisLike" : "Like"}
          </button>
        </div>
      )}
    </>
  );
}

/**
 * Initialisation
 * data = {} ou undefined
 *
 * Après le useEffect
 * data = {
 *    pers: {
 *      firstname: "Bob"
 *    }
 * }
 */

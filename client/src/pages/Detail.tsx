import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import connexion from "../services/connexion";
import type { Repo } from "../types/RepoType";

export default function Detail() {
  console.log("Initialisation du Detail");
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    console.log("I'm the useEffect");
    const fetchRepos = async () => {
      try {
        const repos = await connexion.get<Repo[]>(`/api/repos/${id}`);
        console.log(" useEffect repos", repos);
        setData(repos.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRepos();
  }, []);

  return <div>Detail {id}</div>;
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

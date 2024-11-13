import { Repo, LightRepo } from "./repo.entities";
import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

import { Status } from "../status/status.entities";

/**
 * type Repo {
 *  id: string
 *  ...
 * }
 */
@InputType()
class RepoInput implements Partial<Repo> {
  @Field()
  id: string;

  @Field()
  url: string;

  @Field()
  name: string;

  @Field()
  isPrivate: number;
}

@Resolver(Repo)
export default class RepoResolver {
  // Methode GET pour tous les repos

  @Query(() => [Repo])
  async fullrepos() {
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    return repos;
  }

  @Authorized()
  @Query(() => [LightRepo])
  async lightrepos() {
    const repos = await Repo.find();
    console.info(repos);
    return repos;
  }

  @Authorized("admin")
  @Mutation(() => Repo)
  async createNewRepo(@Arg("toto") newRepo: RepoInput) {
    //const newRepo: RepoInput = req.body.data
    // fonction de validation
    console.info(newRepo);

    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Status.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    repo.status = status;

    await repo.save();
    console.log("repo", repo);
    const myRepo = await Repo.findOneOrFail({
      where: { id: newRepo.id },
      relations: {
        langs: true,
        status: true,
      },
    });
    console.log("myRepo", myRepo);
    return myRepo;
  }
}

import getSchema from "../schema";
import { graphql, GraphQLSchema, print } from "graphql";
import gql from "graphql-tag";

const GET_REPOS = gql`
  query Fullrepos {
    fullrepos {
      id
      name
      url
      isFavorite
    }
  }
`;

describe("Repo resolvers", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it("get all repos", async () => {
    const result = (await graphql({
      schema: schema,
      source: print(GET_REPOS),
    })) as { data: { fullrepos: Array<unknown> } };
    console.log(result);

    // Vérification que la réponse est au format tableau
    expect(result.data.fullrepos).toEqual(expect.any(Array));

    // Vérification que chaque object du tableau est bien l'ensemble des keys
  });
});

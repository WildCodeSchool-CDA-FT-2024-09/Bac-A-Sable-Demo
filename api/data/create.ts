import * as fs from "fs";

type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
}

type Lang = {
  id: number;
  label: string;
}

(async() => {
  const raw = await JSON.parse(
    fs.readFileSync("./data/raw.json", { encoding: "utf-8"})
  )


  const repo: Repo[] = raw.map((rep: { id: string; isPrivate: boolean; name: string; url: string}) => ({
    id: rep.id,
    isPrivate: rep.isPrivate ? 1 : 2,
    name: rep.name,
    url: rep.url
  }))

  const langs: Lang[] = [];
  let langId: number = 1;
  raw.forEach((rep: any) => {
    rep.languages.forEach((lang: { node: { name: string}}) => {
      if (!langs.some((lg: Lang) => lg.label === lang.node.name)) {

        langs.push({id: langId, label: lang.node.name });
        langId++;
      }
    })
  })

  await fs.writeFile(
    './data/repos.json',
    JSON.stringify(repo),
    (err) =>
      err ? console.error(err) : console.log("File repo is ready")
  )

  await fs.writeFile(
    './data/langs.json',
    JSON.stringify(langs),
    (err) =>
      err ? console.error(err) : console.log("File langs is ready")
  )

  await fs.writeFile(
    './data/status.json',
    JSON.stringify([{
      id: 1, label: "Privé"
    }, { id: 2, label: "Public"}]),
    (err) =>
      err ? console.error(err) : console.log("File status is ready")
  )
})()


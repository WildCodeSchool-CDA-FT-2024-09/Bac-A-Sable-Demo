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

type LangBy = { repo_id: string; lang_id: number}

type LangRaw = { node: { name: string}}

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
  const lang_by_repo: LangBy[] = [];
  let langId: number = 1;
  raw.forEach((rep: any) => {
    rep.languages.forEach((lang: LangRaw) => {
      if (!langs.some((lg: Lang) => lg.label === lang.node.name)) {
        langs.push({id: langId, label: lang.node.name });
        langId++;
      }
      const myLang = langs.find((lg: Lang) => lg.label === lang.node.name) as Lang
      lang_by_repo.push({ repo_id: rep.id, lang_id: myLang.id})
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
    './data/lang_by_repo.json',
    JSON.stringify(lang_by_repo),
    (err) =>
      err ? console.error(err) : console.log("File langs by repo is ready")
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


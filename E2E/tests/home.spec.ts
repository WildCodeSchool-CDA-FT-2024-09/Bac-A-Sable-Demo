import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://staging.bootcamp-cda-js.wilders.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TITRE/);
});

test("Have a list of repo", async ({ page }) => {
  await page.goto("https://staging.bootcamp-cda-js.wilders.dev/");

  // Click the get started link.
  const articles = page.locator("article");
  console.log("Hello", await articles.count());

  for (let i = 0; i < (await articles.count()); i++) {
    console.log("In the loop again");
    const h3 = articles.nth(i).locator("h3");

    expect(h3).toBeVisible();

    const link = articles.nth(i).locator("a");
    expect(link).toHaveText("Voir le repo");
    const href = (await link.getAttribute("href")) as string;
    await link.click();

    await expect(page).toHaveURL(href);
  }
});

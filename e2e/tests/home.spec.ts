import { test, expect } from "@playwright/test";

test("has title in the tab", async ({ page }) => {
  await page.goto("https://staging.bootcamp-cda-js.wilders.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Repo/);
});

test("Have a list of repo", async ({ page }) => {
  await page.goto("https://staging.bootcamp-cda-js.wilders.dev/", {
    waitUntil: "networkidle",
  });

  // Click the get started link.
  const articles = page.locator("article");
  console.log("Hello", await articles.count());

  for (let i = 0; i < (await articles.count()); i++) {
    console.log("In the loop again");
    const h3 = articles.nth(i).locator("h3");

    expect(h3).toBeVisible();

    const links = articles.nth(i).locator("a");
    const navLink = links.nth(1);
    expect(navLink).toHaveText("Plus d'info");
    const href = (await navLink.getAttribute("href")) as string;
    await navLink.click();

    await expect(page).toHaveURL(
      `https://staging.bootcamp-cda-js.wilders.dev${href}`
    );
  }
});

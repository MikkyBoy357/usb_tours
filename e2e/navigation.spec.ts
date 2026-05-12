import { expect, test } from "@playwright/test";

test("home loads with hero copy", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /africa/i,
  );
  await expect(
    page.getByRole("link", { name: /explore tours/i }),
  ).toBeVisible();
});

test("desktop nav reaches every primary route", async ({ page }) => {
  await page.goto("/");
  const targets = [
    { label: "Tours", path: "/tours" },
    { label: "Destinations", path: "/destinations" },
    { label: "Journal", path: "/journal" },
    { label: "Gallery", path: "/gallery" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  for (const t of targets) {
    await page.goto("/");
    await page
      .getByRole("link", { name: t.label, exact: true })
      .first()
      .click();
    await expect(page).toHaveURL(new RegExp(`${t.path}$`));
  }
});

test("hitting an unknown URL shows the custom 404", async ({ page }) => {
  const response = await page.goto("/this-clearly-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /scenic route/i,
  );
});

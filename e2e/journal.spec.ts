import { expect, test } from "@playwright/test";

test("journal index lists posts and links into an article", async ({
  page,
}) => {
  await page.goto("/journal");
  await expect(
    page.getByRole("heading", { name: /stories from the road/i }),
  ).toBeVisible();

  // Click a known article
  await page
    .getByRole("link", { name: /best time to visit benin/i })
    .first()
    .click();
  await expect(page).toHaveURL(/\/journal\/best-time-to-visit-benin$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /best time to visit benin/i,
  );
});

test("article page exposes heading anchors usable by TOC", async ({ page }) => {
  await page.goto("/journal/best-time-to-visit-benin");
  // rehype-slug should give every ## a stable id.
  const anchors = await page.locator("h2[id]").count();
  expect(anchors).toBeGreaterThan(2);
});

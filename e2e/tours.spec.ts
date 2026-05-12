import { expect, test } from "@playwright/test";

test("tours listing shows all tours and filters narrow the grid", async ({
  page,
}) => {
  await page.goto("/tours");
  await expect(
    page.getByRole("heading", { name: /journeys, hand-built/i }),
  ).toBeVisible();

  // Initial count from the live indicator
  const counter = page.getByText(/showing\s+\d+\s+of\s+\d+\s+tours/i);
  await expect(counter).toBeVisible();
  const initial = await counter.textContent();

  // Apply a Difficulty filter to "Moderate"
  await page.getByRole("button", { name: /^Moderate$/ }).click();
  const filtered = await counter.textContent();
  expect(filtered).not.toEqual(initial);
});

test("tour detail page renders itinerary, gallery, and inquiry form", async ({
  page,
}) => {
  await page.goto("/tours/pendjari-safari");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /pendjari/i,
  );
  // Itinerary day markers
  await expect(page.getByText(/D1/)).toBeVisible();
  // Inquiry section
  await expect(
    page.getByRole("heading", { name: /tell us about your journey/i }),
  ).toBeVisible();
});

test("inquiry form on tour page submits successfully", async ({ page }) => {
  await page.goto("/tours/pendjari-safari");
  // Scope to the inquiry form (anchor #inquiry) to avoid the newsletter form in the footer.
  const form = page.locator("#inquiry");
  await form.locator("#iq-name").fill("Jane E2E");
  await form.locator("#iq-email").fill("jane@e2e.test");
  await form
    .locator("#iq-msg")
    .fill("I'd love to travel in March 2027 with a small group.");
  await form.getByRole("button", { name: /send inquiry/i }).click();
  await expect(page.getByText(/got it\. thank you/i)).toBeVisible();
});

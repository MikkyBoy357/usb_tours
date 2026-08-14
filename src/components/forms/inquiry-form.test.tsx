import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as actions from "@/app/actions/inquiries";
import { InquiryForm } from "./inquiry-form";

vi.mock("@/app/actions/inquiries", async () => {
  const real = await vi.importActual<typeof actions>("@/app/actions/inquiries");
  return {
    ...real,
    submitInquiry: vi.fn(async () => ({ ok: true as const })),
  };
});

describe("<InquiryForm />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // jsdom has no mail client; capture the protocol handoff instead.
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "" },
    });
  });

  it("renders all required fields", () => {
    render(<InquiryForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tell us about/i)).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(
      await screen.findByText(/please share your name/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/email doesn't look right/i)).toBeInTheDocument();
    expect(
      screen.getByText(/few sentences help us shape the trip/i),
    ).toBeInTheDocument();
    expect(actions.submitInquiry).not.toHaveBeenCalled();
  });

  async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
    await user.type(screen.getByLabelText(/your name/i), "Jane Traveler");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(
      screen.getByLabelText(/tell us about/i),
      "I'd love to do Pendjari in March 2027 with a group of four.",
    );
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));
  }

  it("hands off to the mail client with the inquiry pre-filled", async () => {
    const user = userEvent.setup();
    render(<InquiryForm defaultTourSlug="pendjari-safari" />);
    await fillAndSubmit(user);

    await waitFor(() => {
      expect(window.location.href).toMatch(/^mailto:/);
    });
    const url = window.location.href;
    const decoded = decodeURIComponent(url);
    expect(decoded).toContain("Jane Traveler");
    expect(decoded).toContain("jane@example.com");
    expect(decoded).toContain("The Road North");
  });

  it("tells the traveler the message still needs sending", async () => {
    const user = userEvent.setup();
    render(<InquiryForm />);
    await fillAndSubmit(user);

    expect(await screen.findByText(/one last step/i)).toBeInTheDocument();
    expect(screen.getByText(/press send there/i)).toBeInTheDocument();
    // A fallback must exist for devices with no mail client configured.
    expect(
      screen.getByRole("link", { name: /open my mail app again/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /whatsapp/i })).toBeInTheDocument();
  });

  it("still records the inquiry server-side when configured", async () => {
    const user = userEvent.setup();
    render(<InquiryForm defaultTourSlug="pendjari-safari" />);
    await fillAndSubmit(user);

    await waitFor(() => {
      expect(actions.submitInquiry).toHaveBeenCalledTimes(1);
    });
    const arg = vi.mocked(actions.submitInquiry).mock.calls[0][0];
    expect(arg.name).toBe("Jane Traveler");
    expect(arg.tourSlug).toBe("pendjari-safari");
  });

  it("completes the handoff even if the server record fails", async () => {
    vi.mocked(actions.submitInquiry).mockRejectedValueOnce(
      new Error("network down"),
    );
    const user = userEvent.setup();
    render(<InquiryForm />);
    await fillAndSubmit(user);

    expect(await screen.findByText(/one last step/i)).toBeInTheDocument();
    expect(window.location.href).toMatch(/^mailto:/);
  });
});

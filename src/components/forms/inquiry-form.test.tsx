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

  it("submits a valid payload and shows the success state", async () => {
    const user = userEvent.setup();
    render(<InquiryForm defaultTourSlug="pendjari-safari" />);

    await user.type(screen.getByLabelText(/your name/i), "Jane Traveler");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(
      screen.getByLabelText(/tell us about/i),
      "I'd love to do Pendjari in March 2027 with a group of four.",
    );
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    await waitFor(() => {
      expect(actions.submitInquiry).toHaveBeenCalledTimes(1);
    });
    const arg = vi.mocked(actions.submitInquiry).mock.calls[0][0];
    expect(arg.name).toBe("Jane Traveler");
    expect(arg.email).toBe("jane@example.com");
    expect(arg.tourSlug).toBe("pendjari-safari");

    expect(await screen.findByText(/got it\. thank you/i)).toBeInTheDocument();
  });

  it("surfaces server-side field errors", async () => {
    vi.mocked(actions.submitInquiry).mockResolvedValueOnce({
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: { email: "That email is blocked." },
    });
    const user = userEvent.setup();
    render(<InquiryForm />);

    await user.type(screen.getByLabelText(/your name/i), "Jane Traveler");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(
      screen.getByLabelText(/tell us about/i),
      "Trip inquiry message here.",
    );
    await user.click(screen.getByRole("button", { name: /send inquiry/i }));

    expect(
      await screen.findByText(/that email is blocked/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/please fix the highlighted fields/i),
    ).toBeInTheDocument();
  });
});

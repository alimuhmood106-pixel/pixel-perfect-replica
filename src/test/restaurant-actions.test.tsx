import { cleanup, render } from "@testing-library/react";
import type { ComponentType } from "react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

beforeAll(() => {
  vi.stubGlobal("IntersectionObserver", class { observe() {} disconnect() {} });
});
afterEach(cleanup);

describe("Restaurant contact actions", () => {
  const Page = Route.options.component as ComponentType;
  it("does not offer WhatsApp destinations anywhere on the page", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').length).toBe(0);
  });
  it("keeps the requested order phone number", () => {
    const { container } = render(<Page />);
    expect(container.querySelectorAll('a[href="tel:+9647728004848"]').length).toBeGreaterThan(0);
  });
  it("keeps Instagram and Facebook destinations", () => {
    const { container } = render(<Page />);
    expect(container.querySelector('a[href="https://instagram.com/malik_al_sham"]')).not.toBeNull();
    expect(container.querySelector('a[href="https://www.facebook.com/malikalshamSuly"]')).not.toBeNull();
  });
});
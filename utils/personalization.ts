import type { GuestPersonalization } from "@/types";

export function parseGuestFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): GuestPersonalization {
  const guestName =
    typeof searchParams.guest === "string" ? searchParams.guest : undefined;
  const guestId =
    typeof searchParams.id === "string" ? searchParams.id : undefined;

  return { guestName, guestId };
}

export function buildShareableLink(guestName?: string, guestId?: string): string {
  if (typeof window === "undefined") return "";
  const url = new URL(window.location.href);
  if (guestName) url.searchParams.set("guest", guestName);
  if (guestId) url.searchParams.set("id", guestId);
  return url.toString();
}

export function buildQRCodeUrl(link: string): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(link)}`;
}

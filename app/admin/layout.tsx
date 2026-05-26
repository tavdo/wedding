import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ადმინ პანელი",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#0d0c0b]">{children}</div>;
}

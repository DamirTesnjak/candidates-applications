import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "@/app/StoreProvider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <StoreProvider>
          <Header />
          {children}
        </StoreProvider>
        <div id="modal" />
      </body>
    </html>
  );
}

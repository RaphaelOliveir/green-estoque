import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";

export const metadata: Metadata = {
  title: "Green Estoque",
  description: "Sistema de gerenciamento de estoque de energia solar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

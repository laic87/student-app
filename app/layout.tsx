import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderMenu from "@/components/header";
import Footer from "@/components/footer";
import { dbConnect } from "@/utils/db";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const connectToDatabase = async () => {
    try {
      await dbConnect();
      console.log("Connected to the database");
    } catch (error) {
      console.error("Error connecting to the database: " + error);
    }
  };

  connectToDatabase();

  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderMenu />
        {children}
        <Footer />
      </body>
    </html>
  );
}

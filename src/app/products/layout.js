import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Products",
  description: "All available products",
};

export default function RootLayout({ children }) {
  return (
        children
  );
}

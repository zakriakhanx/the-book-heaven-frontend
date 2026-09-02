import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { StoreInitializer } from "./components/StoreInitializer";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";

// Font configuration
const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "600", "700", "800"],
});

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
});

export const viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#fbf9f5",
};

export const metadata = {
    title: "The Book Heaven | Modern Bibliophile Sanctuary",
    description: "A scholarly yet accessible sanctuary to find, discuss, and recommend your next great read.",
    keywords: "books, reading, library, ebooks, literature, bibliophile, book reviews, book recommendations",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${playfair.variable} ${inter.variable} font-sans bg-background text-on-surface antialiased min-h-screen selection:bg-primary-container selection:text-on-primary-container`}>
                <ClerkProvider>
                    <StoreInitializer />
                    <header className="sticky top-0 z-40">
                        <Navbar />
                    </header>
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
}

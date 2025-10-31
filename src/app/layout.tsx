import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Stage3Layout } from "@/components/layout/Stage3Layout";
import "./globals.css";

// Mexican Professional Typography System
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interDisplay = Inter({
  variable: "--font-inter-display", 
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fernandorodriguez.dev"),
  title: "Fernando Rodriguez - Ingeniero de Software Full-Stack",
  description: "Transformo ideas complejas en soluciones elegantes. Especializado en arquitecturas escalables, con experiencia liderando equipos y optimizando sistemas de alto rendimiento.",
  keywords: ["Full-Stack Developer", "React", "Node.js", "TypeScript", "Software Engineer", "AWS", "DevOps", "Microservices", "Portfolio"],
  authors: [{ name: "Fernando Rodriguez" }],
  openGraph: {
    title: "Fernando Rodriguez - Ingeniero de Software Full-Stack",
    description: "Transformo ideas complejas en soluciones elegantes. Especializado en arquitecturas escalables.",
    url: "https://fernandorodriguez.dev",
    siteName: "Fernando Rodriguez Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Alex Rodriguez - Portfolio"
      }
    ],
    locale: "es_ES",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Fernando Rodriguez - Ingeniero de Software Full-Stack",
    description: "Transformo ideas complejas en soluciones elegantes.",
    images: ["/og-image.jpg"],
    creator: "@fernandorodriguez"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${interDisplay.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <Stage3Layout>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Navbar />
              <main className="relative">
                {children}
              </main>
              <Footer />
            </div>
          </Stage3Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}

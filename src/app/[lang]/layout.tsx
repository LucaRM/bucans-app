import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Luca App",
    description: "Your awesome RPG companion app",
};

export default function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={params.locale}>
            <body className={inter.className}>{children}</body>
        </html>
    );
}

export async function generateStaticParams() {
    return [{ lang: 'pt' }, { lang: 'en' }]
}
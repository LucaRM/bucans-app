"use client";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/components/TranslationsProvider";
import styles from "./page.module.scss";

const i18nNamespaces = [""];

interface HomeProps {
    params: {
        locale: string;
    };
}

export default async function Home({params: {locale}}: HomeProps) {
    const {t, resources} = await initTranslations(locale, i18nNamespaces);

    return (
        <TranslationsProvider
            resources={resources}
            locale={locale}
            namespaces={i18nNamespaces}
        >
            <main className={styles.main}></main>
        </TranslationsProvider>
    );
}

"use client";
import initTranslations from "@/app/i18n";
import Header from "@/components/header/header";
import LinkProvider from "@/components/language-provider/LinkProvider";
import TranslationsProvider from "@/components/language-provider/TranslationsProvider";

const i18nNamespaces = ["home"];

type Params = {
    locale: string;
};

export default async function Home({ params }: { params: Params }) {
    const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

    return (
        <TranslationsProvider
            resources={resources}
            locale={params.locale}
            namespaces={i18nNamespaces}
        >
            <main className="flex min-h-screen flex-col">
                <Header params={params} />
            </main>
        </TranslationsProvider>
    );
}

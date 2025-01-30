import initTranslations from "@/app/i18n";
import Header from "@/components/header/header";
import TranslationsProvider from "@/components/language-provider/TranslationsProvider";
import { getDictionary } from './dictionaries'

const i18nNamespaces = ["home"];

export default async function Home({
    params
}: {
    params: { lang: string }
}) {
    const { t, resources } = await initTranslations(params.lang, i18nNamespaces);
    const dict = await getDictionary(params.lang)

    return (
        <TranslationsProvider
            resources={resources}
            locale={params.lang}
            namespaces={i18nNamespaces}
        >
            <main className="flex min-h-screen flex-col">
                <Header params={params} />
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold">{t("welcome")}</h1>
                </div>
            </main>
        </TranslationsProvider>
    );
}

// Generate static params for supported locales
export function generateStaticParams() {
    return [
        { locale: 'pt' },
        { locale: 'en' },
        { locale: 'fr' }
    ];
}
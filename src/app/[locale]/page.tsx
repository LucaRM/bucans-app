"use client";
import initTranslations from "@/app/i18n";
import LanguageChanger from "@/components/LanguageChanger";
import LinkProvider from "@/components/LinkProvider";
import TranslationsProvider from "@/components/TranslationsProvider";

const i18nNamespaces = ["home"];

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
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                        {t("intro")}
                    </p>
                    <LanguageChanger />
                </div>
                <div>
                    <LinkProvider
                        pathname="dnd5e/character/list"
                        text={t("characterList")}
                    />
                </div>
            </main>
        </TranslationsProvider>
    );
}

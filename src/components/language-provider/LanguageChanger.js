"use client";

import i18nConfig from "@/i18nConfig";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import styles from "./LanguageChanger.module.scss";

export default function LanguageChanger() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChange = (e) => {
        const newLocale = e.target.value;
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        if (
            currentLocale === i18nConfig.defaultLocale &&
            !i18nConfig.prefixDefault
        ) {
            router.push("/" + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };

    return (
        <select onChange={handleChange} value={currentLocale} className={styles.selector}>
            <option value="pt">Português</option>
            <option value="en">English</option>
        </select>
    );
}

"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./header.module.scss";
import LanguageChanger from "../language-provider/LanguageChanger";
import Link from "next/link";
import initTranslations from "@/app/i18n";
import LinkProvider from "../language-provider/LinkProvider";

type Params = {
    locale: string;
};

export default function Header({ params }: { params: Params }) {
    const i18nNamespaces = ["home"];
    const [t, setT] = useState<(key: string) => string>(
        () => (key: string) => key
    );

    useEffect(() => {
        const initializeTranslations = async () => {
            const { t, resources } = await initTranslations(
                params.locale,
                i18nNamespaces
            );
            setT(() => t);
        };
        initializeTranslations();
    }, [params.locale]);
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>LOGO</span>
                <div className={styles.dropdown}>
                    <button className={styles.dropdownButton}>Coleção</button>
                    <div className={styles.dropdownContent}>
                        <span className={styles.dropdownItem}>
                            <LinkProvider
                                className={styles.dropdownItem}
                                pathname="dnd5e/character/list"
                                text={t("characterList")}
                            />
                        </span>
                        <a href="#" className={styles.dropdownItem}>Lorem ipsum 2</a>
                        <a href="#" className={styles.dropdownItem}>Lorem ipsum 3</a>
                    </div>
                </div>

                <div className={styles.dropdown}>
                    <button className={styles.dropdownButton}>Dolor</button>
                    <div className={styles.dropdownContent}>
                        <a href="#" className={styles.dropdownItem}>Dolor sit 1</a>
                        <a href="#" className={styles.dropdownItem}>Dolor sit 2</a>
                        <a href="#" className={styles.dropdownItem}>Dolor sit 3</a>
                    </div>
                </div>

                <div className={styles.dropdown}>
                    <button className={styles.dropdownButton}>Amet</button>
                    <div className={styles.dropdownContent}>
                        <a href="#" className={styles.dropdownItem}>Amet consectetur 1</a>
                        <a href="#" className={styles.dropdownItem}>Amet consectetur 2</a>
                        <a href="#" className={styles.dropdownItem}>Amet consectetur 3</a>
                    </div>
                </div>

                <div className={styles.dropdown}>
                    <button className={styles.dropdownButton}>Elit</button>
                    <div className={styles.dropdownContent}>
                        <a href="#" className={styles.dropdownItem}>Elit sed do 1</a>
                        <a href="#" className={styles.dropdownItem}>Elit sed do 2</a>
                        <a href="#" className={styles.dropdownItem}>Elit sed do 3</a>
                    </div>
                </div>
            </nav>
            <LanguageChanger />
        </header>
    );
}
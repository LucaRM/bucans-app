"use client";
import Link from "next/link";
import {useTranslation} from "react-i18next";

export default function LinkProvider(props) {
    const {i18n} = useTranslation();
    const currentLocale = i18n.language;

    return (
        <Link
            href={`${currentLocale ? currentLocale : "pt"}/${props.pathname}`}
        >
            {props.text}
        </Link>
    );
}

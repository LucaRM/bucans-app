import 'server-only'

export const getDictionary = async (locale) => {
    try {
        const res = await fetch(`/locales/${locale}.json`);
        if (!res.ok) throw new Error(`Failed to load dictionary for locale: ${locale}`);
        return await res.json();
    } catch (error) {
        console.error(error);
        return {};
    }
};

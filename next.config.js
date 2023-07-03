/**
 * @type {import('next').NextConfig}
 */
const path = require("path");

module.exports = {
    i18n: {
        locales: ["en", "fr", "pt"],
        defaultLocale: "pt",
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

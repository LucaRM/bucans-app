/** @type {import('next').NextConfig} */
const nextConfig = {};
const path = require("path");

module.exports = {
    nextConfig,
    // async rewrites() {
    //     return [
    //         {
    //             source: "/characters/:id",
    //             destination: "/character/[id]",
    //         },
    //     ];
    // },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
};

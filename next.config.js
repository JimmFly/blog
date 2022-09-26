/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en-US", "zh-hans", "zh-hant"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-US",
    fallback: "en-US",
  },
};

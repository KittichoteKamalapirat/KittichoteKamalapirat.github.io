/** @type {import('next').NextConfig} */
const nextConfig = {
  // static HTML export for GitHub Pages
  output: "export",
  images: { unoptimized: true },
  webpack(config) {
    // for import Logo from "../../../assets/logo.svg";
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;

import { createMDX } from "fumadocs-mdx/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
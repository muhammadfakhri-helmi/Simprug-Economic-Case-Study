import type { NextConfig } from "next";

// Static export for GitHub Pages. BASE_PATH is "/<repository>" in CI and
// empty locally, so the same code runs at a domain root or a project subpath.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

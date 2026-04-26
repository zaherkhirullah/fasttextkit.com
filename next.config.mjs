/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/tools/word-counter', destination: '/tools/word-counter-online', permanent: true },
      { source: '/tools/remove-spaces', destination: '/tools/remove-extra-spaces', permanent: true },
      { source: '/tools/case-converter', destination: '/tools/case-convert', permanent: true },
      { source: '/tools/text-sorter', destination: '/tools/sort-text-alphabetically', permanent: true },
      { source: '/tools/image-compressor', destination: '/tools/image-compressor-online', permanent: true },
    ]
  },
};

export default nextConfig;

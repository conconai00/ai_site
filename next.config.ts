import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Notionがファイルを保存するAWS S3バケット
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
      },
      {
        // Notionの外部画像（external）
        protocol: 'https',
        hostname: '*.amazonaws.com',
      },
      {
        // Notionのメディアプロキシ（Notion経由でのキャッシュ）
        protocol: 'https',
        hostname: 'www.notion.so',
      },
    ],
  },
};

export default nextConfig;

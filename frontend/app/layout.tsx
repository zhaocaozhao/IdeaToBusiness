import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bilibili 视频生成器',
  description: '一键生成并上传 B 站的视频'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gradient-to-r from-blue-50 to-white text-gray-800">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import ReactQueryProvider from "../QueryClientProvider";
import './globals.css';



export const metadata: Metadata = {
  title: 'ARK',
  description: 'All lives matter',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
      </head>
      <body>
        <ReactQueryProvider>
          {children} {/* Here the pages will be injected */}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
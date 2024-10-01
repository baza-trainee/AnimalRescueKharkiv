import type { Metadata } from 'next';
import Header from "../components/common/Header";
import Footer from '../components/common/Footer';
import Main from '../components/common/MainPage'

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
        <Header />
        <Main/>
        <Footer />
      </body>
    </html>
  )
}
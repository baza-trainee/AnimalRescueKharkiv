import type { Metadata } from 'next';
import ReactQueryProvider from "../QueryClientProvider";
import { AuthProvider } from '../context/AuthContext';
import { TimezoneProvider } from '../context/TimezoneContext';
import './globals.css';
import { Toaster } from "react-hot-toast";



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
          <AuthProvider>
            <TimezoneProvider>          
              {children} {/* Here the pages will be injected */}
  <Toaster
  position="bottom-center"
  containerStyle={{
    bottom: "67px", 
    left: 0,
    width: "100%",
  }}
  toastOptions={{
    duration: 8000,
    style: {
      width: "100%",
      borderRadius: "0px", 
      padding: "8px 24px",
      margin: 0,
      backdropFilter: "blur(50px)",
      fontSize: "18px",
      fontWeight: 500,
      textAlign: "center",
      boxShadow:"0 0px 0 0 rgba(0,0,0,0.3)",
      color: "#fff",
    },
    success: {
      style: {
       
        color: "#8fd8b5",
      },
      icon: "✅",
    },
    error: {
      style: {
        
        color: "#b00000",
      },
      icon: "❌",
    },
  }}
/>
            </TimezoneProvider>
          </AuthProvider>          
        </ReactQueryProvider>
      </body>
    </html>
  )
}
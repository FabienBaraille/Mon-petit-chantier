import { TailwindIndicator } from '@/components/TailwindIndicator';
import { SiteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Providers } from './Providers';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="fr-FR" className="h-full" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'h-full bg-background antialiased',
          )}
        >
          <Providers>
            <CssBaseline />
            <div className="relative flex min-h-screen flex-col items-center">
              <Header />
              <Toaster 
                position="top-center"
                toastOptions={{
                  duration: 2500,
                  style: {
                    border: 'solid 1px',
                    borderRadius: "1rem",
                    padding: '0.5rem',
                  },
                  success: {
                    style: {
                      backgroundColor: "#d2e5cd",
                      borderColor: "#0b2816"
                    }
                  },
                  error: {
                    style: {
                      backgroundColor: "#f2dbd9",
                      borderColor: "#3f1215"
                    }
                  }
                }}
              />
              <main className='flex-1'>{children}</main>
              <Footer />
            </div>
            <TailwindIndicator />
          </Providers>
        </body>
      </html>
    </>
  );
}
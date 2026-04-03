import type { Metadata } from 'next'

import React from 'react'
import './global.css'
import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import { getGlobals } from '@/lib/getGlobals'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { NavigationLoader, PageTransition } from '@/components/animations'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Toaster } from 'react-hot-toast'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const avenirLtStd = localFont({
  src: [
    {
      path: '../../../public/fonts/avenirLtStd/AvenirLTStd-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/avenirLtStd/AvenirLTStd-Roman.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/avenirLtStd/AvenirLTStd-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/avenirLtStd/AvenirLTStd-Heavy.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-avenirLtStd',
  display: 'swap',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const { header, footer } = await getGlobals()

  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${avenirLtStd.variable} antialiased`}
        suppressHydrationWarning
      >
        <NavigationLoader />
        <PageTransition className="flex flex-col min-h-dvh">
          <Header data={header} />
          <main className="flex-1 bg-[url('/images/bg-fixed.png')] bg-fixed bg-no-repeat bg-cover bg-center">
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </main>
          <Footer data={footer} />
        </PageTransition>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '32x32' }],
  },
}

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Coming Soon | Ampere Labs',
  description: 'We are working on something exciting. Stay tuned.',

  openGraph: mergeOpenGraph({
    title: 'Coming Soon | Ampere Labs',
    description: 'We are working on something exciting. Stay tuned.',
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/coming-soon`,
  }),

  twitter: {
    card: 'summary_large_image',
    title: 'Coming Soon | Ampere Labs',
    description: 'We are working on something exciting. Stay tuned.',
  },

  robots: {
    index: false,
    follow: false,
  },
}

export default function ComingSoon() {
  return (
    <section className="min-h-[64vh] flex items-center justify-center bg-black text-white">
      <div className="text-center px-6">
        <h1 className="mb-4 text-3xl md:text-5xl font-semibold">Coming Soon</h1>

        <p className="text-neutral-400 text-sm md:text-base">
          We’re working on something. Stay tuned.
        </p>
      </div>
    </section>
  )
}

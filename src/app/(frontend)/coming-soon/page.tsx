'use client'

export default function ComingSoon() {
  return (
    <section className="min-h-[64vh] flex items-center justify-center bg-black text-white">
      <div className="text-center px-6">
        {/* Title */}
        <h1 className="mb-4">Coming Soon</h1>

        {/* Subtitle */}
        <p className="text-neutral-400 text-sm md:text-base">
          We’re working on something. Stay tuned.
        </p>
      </div>
    </section>
  )
}

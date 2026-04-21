/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
// import CalendlyButton from './CalendlyButton'
import AppButton from '../ui/AppButton'

const Header = ({ data }: any) => {
  const [open, setOpen] = useState(false)

  const menu = data?.menu || []
  const pathname = usePathname()

  const ctaLabel = data?.cta?.label || 'Book an Appointment'
  const calendlyHref = data?.cta?.href || '#'

  return (
    <>
      <header className="w-full bg-neutral/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container h-17.5 flex items-center">
          {/* LOGO */}
          <div className="flex-1">
            <h1>
              <Link href="/">
                {data?.logo?.url && (
                  <Image src={data.logo.url} alt="logo" width={70} height={70} unoptimized />
                )}
              </Link>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="flex-1">
            <ul className="flex gap-3 max-md:hidden max-lg:gap-1">
              {menu.map((item: any, index: number) => {
                const isActive = pathname === item.path

                return (
                  <li
                    key={index}
                    className={`rounded-sm cursor-pointer ${
                      isActive ? 'bg-neutral-200 text-white' : 'hover:bg-neutral-200'
                    }`}
                  >
                    <Link href={item.path || '#'} className="font-avenirLtStd px-4 py-2 block">
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex-1 text-end">
            <AppButton
              label={ctaLabel}
              href={calendlyHref}
              variant="primary"
              size="lg"
              className="max-md:hidden"
            />
            {/* <CalendlyButton label={ctaLabel} calendlyUrl={calendlyUrl} className="max-md:hidden" /> */}
          </div>

          {/* MOBILE MENU BTN */}
          <button className="md:hidden" onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-neutral z-50 transform transition-transform duration-300 md:hidden max-[20rem]:w-full ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-2 absolute right-1 top-1" onClick={() => setOpen(false)}>
          <X size={26} />
        </div>

        <ul className="flex flex-col pt-10 px-6 pb-6 gap-3 max-sm:px-0 max-sm:pb-4 max-sm:gap-1">
          {menu.map((item: any, index: number) => {
            const isActive = pathname === item.path

            return (
              <li
                key={index}
                className={`rounded-sm ${isActive ? 'bg-neutral-200 text-white font-semibold' : 'hover:bg-neutral-200'}`}
              >
                <Link
                  href={item.path || '#'}
                  onClick={() => setOpen(false)}
                  className="block text-lg max-md:text-sm px-4 py-2"
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="px-6 py-3 max-sm:py-0 max-sm:px-4">
          <AppButton
            label={ctaLabel}
            href={calendlyHref}
            variant="primary"
            size="lg"
            className="w-full max-sm:btn-xs"
            onClick={() => setOpen(true)}
          />
          {/* <CalendlyButton label={ctaLabel} calendlyUrl={calendlyUrl} className="w-full max-sm:btn-xs" /> */}
        </div>
      </div>
    </>
  )
}

export default Header

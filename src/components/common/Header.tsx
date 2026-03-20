/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import AppButton from '../ui/AppButton'

const Header = ({ data }: any) => {
  const [open, setOpen] = useState(false)

  const menu = data?.menu || []

  return (
    <>
      <header className="w-full bg-neutral/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container h-17.5 flex items-center">
          {/* LOGO */}
          <div className="flex-1">
            <h1>
              <Link href="/">
                {data?.logo?.url && <Image src={data.logo.url} alt="logo" width={70} height={70} />}
              </Link>
            </h1>
          </div>

          {/* DESKTOP MENU */}
          <div className="flex-1">
            <ul className="flex gap-3 max-md:hidden max-lg:gap-1">
              {menu.map((item: any, index: number) => (
                <li
                  key={index}
                  className="font-avenirLtStd rounded-sm hover:bg-neutral-200 px-4 py-1 cursor-pointer"
                >
                  <Link href={item.path || '#'}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex-1 text-end">
            <AppButton
              label={data?.ctaLabel || 'Book an Appointment'}
              variant="primary"
              size="lg"
              className="max-md:hidden"
            />
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
        className={`fixed top-0 right-0 h-screen w-72 bg-neutral z-50 transform transition-transform duration-300 md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-2 absolute right-1 top-1" onClick={() => setOpen(false)}>
          <X size={26} />
        </div>

        <ul className="flex flex-col pt-10 px-6 pb-6 gap-6">
          {menu.map((item: any, index: number) => (
            <li key={index}>
              <Link
                href={item.path || '#'}
                onClick={() => setOpen(false)}
                className="block text-lg max-md:text-sm"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="p-6">
          <AppButton
            label={data?.ctaLabel || 'Book an Appointment'}
            variant="primary"
            size="lg"
            className="w-full"
          />
        </div>
      </div>
    </>
  )
}

export default Header

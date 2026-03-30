/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image'
import Link from 'next/link'

const Footer = ({ data }: any) => {
  const menu = data?.menu || []
  const socialLinks = data?.socialLinks || []

  return (
    <footer className="pt-14">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* LOGO */}
        <div className="lg:flex-1">
          <Link href="/">
            {data?.logo?.url && (
              <Image src={data.logo.url} alt="Amphere-labs" width={70} height={70} />
            )}
          </Link>
        </div>

        {/* MENU */}
        <ul className="w-full md:flex-1 flex justify-center gap-6 max-sm:flex-wrap max-sm:justify-center">
          {menu.map((item: any, index: number) => (
            <li key={index}>
              <Link
                href={item.path || '#'}
                className="font-avenirLtStd text-white hover:text-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* SOCIAL */}
        <div className="w-full md:flex-1">
          <div className="flex justify-between w-full ms-auto items-center gap-4 border border-neutral-200 px-4 py-3 rounded-lg">
            <span className="text-sm text-gray">Stay Connected</span>

            <div className="flex gap-1">
              {socialLinks.map((item: any, index: number) => (
                <Link key={index} href={item.url || '#'} target="_blank">
                  <div className="relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800">
                    {item?.icon?.url && (
                      <Image src={item.icon.url} alt={item.name} width={30} height={30} />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="bg-gray-100 text-gray py-4 mt-3">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-6 flex-wrap justify-center">
            {data?.email && (
              <Link
                href={`mailto:${data.email}`}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <Image src="/images/icons/mail.png" alt="mail" width={30} height={30} />
                {data.email}
              </Link>
            )}

            {data?.phone && (
              <Link href={`tel:${data.phone}`} className="flex items-center gap-1 hover:underline">
                <Image src="/images/icons/phone.png" alt="phone" width={30} height={30} />
                {data.phone}
              </Link>
            )}

            {data?.address && (
              <div className="flex items-center gap-1">
                <Image src="/images/icons/location.png" alt="location" width={30} height={30} />
                {data.address}
              </div>
            )}
          </div>

          <div>
            © {new Date().getFullYear()} {data?.copyright}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

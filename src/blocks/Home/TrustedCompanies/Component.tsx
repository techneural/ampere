import Image from 'next/image'
import Marquee from 'react-fast-marquee'

type Props = {
  title: string
  logos: {
    logo: {
      url: string
      alt?: string
    }
  }[]
}

export const TrustedCompaniesBlock: React.FC<Props> = ({ title, logos }) => {
  const loopCompanies = [...logos, ...logos]

  return (
    <section className="bg-neutral-200 py-10 relative overflow-hidden">
      <div className="text-center">
        <h4 className="heading_b_border text-center">{title}</h4>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-neutral-200 via-neutral-200/80 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-neutral-200 via-neutral-200/80 to-transparent z-10"></div>

        <Marquee speed={50} loop={0} autoFill>
          {loopCompanies.map((item, index) => (
            <div
              key={index}
              className="w-75 h-22.5 flex items-center justify-center bg-black rounded-sm mx-2"
            >
              {item.logo?.url && (
                <Image
                  src={item.logo.url}
                  alt="company logo"
                  width={200}
                  height={50}
                  className="h-12 object-contain"
                />
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  )
}

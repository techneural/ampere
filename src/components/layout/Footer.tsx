import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import facebook from "@/assets/images/facebook.png";
import linkedin from "@/assets/images/linkedin.png";
import x from "@/assets/images/x.png";
import mail from "@/assets/images/mail.png";
import phone from "@/assets/images/phone.png";
import location from "@/assets/images/location.png";

const menu = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Research", path: "/" },
  { name: "Blockchain", path: "/" },
  { name: "Contact", path: "/contact" },
];

const socialLinks = [
  {
    name: "facebook",
    icon: facebook,
    url: "https://facebook.com",
  },
  {
    name: "linkedin",
    icon: linkedin,
    url: "https://linkedin.com",
  },
  {
    name: "twitter",
    icon: x,
    url: "https://twitter.com",
  },
];

const Footer = () => {
  return (
    <footer className="pt-14">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h1>
            <Link href="/">
              <Image src={logo} alt="Ampere Labs" width={70} height={70} />
            </Link>
          </h1>
        </div>
        {/* Menu */}
        <ul className="flex-1 flex gap-6 max-sm:flex-wrap max-sm:justify-center">
          {menu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className="font-avenirLtStd text-white hover:text-primary"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex-1">
          <div className="flex justify-between w-78.5 ms-auto items-center gap-4 border border-neutral-200 px-4 py-3 rounded-lg">
            <span className="font-avenirLtStd text-sm text-gray">
              Stay Connected
            </span>

            <div className="flex gap-1">
              {socialLinks.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-pointer"
                  >
                    <div
                      className={`relative flex items-center justify-center size-9 rounded-lg bg-neutral-300 border border-neutral-800 `}
                    >
                      <div className="w-9 h-9 rounded-lg absolute right-0 -left-[0.5px] top-0 bg-linear-to-t from-[#000000] via-neutral-200 to-transparent z-10 pointer-events-none"></div>

                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={30}
                        height={30}
                        className="z-10"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 text-gray font-avenirLtStd py-4 mt-3">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-1">
              <Image src={mail} alt="mail" width={30} height={30} />
              hello@amperelaps.com
            </div>

            <div className="flex items-center gap-1">
              <Image src={phone} alt="mail" width={30} height={30} />
              +91 11111 22222
            </div>

            <div className="flex items-center gap-1">
              <Image src={location} alt="mail" width={30} height={30} />
              +1 E 2nd St, New York, NY 10003
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} amperelabs. All rights reserved
          </div>{" "}
        </div>
      </div>
    </footer>
  );
};
export default Footer;

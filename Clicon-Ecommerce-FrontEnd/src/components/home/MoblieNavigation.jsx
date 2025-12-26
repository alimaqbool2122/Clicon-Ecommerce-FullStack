import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "../../../constants/assets";
import {
  Facebook,
  Twitter,
  Pineterest,
  Redidt,
  Youtube,
  Instragram,
} from "../svg/Icons";

const MoblieNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const socialLinks = [
    { name: "Twitter", url: "#", icon: <Twitter fill="#FA8232" /> },
    { name: "Facebook", url: "#", icon: <Facebook fill="#ffffff" /> },
    { name: "Pinterest", url: "#", icon: <Pineterest fill="#FA8232" /> },
    { name: "Reddit", url: "#", icon: <Redidt fill="#ffffff" /> },
    { name: "Youtube", url: "#", icon: <Youtube fill="#FA8232" /> },
    { name: "Instagram", url: "#", icon: <Instragram fill="#FA8232" /> },
  ];

  const navItems = ["Home", "Pages", "Blogs", "Contact"];
  return (
    <>
      <div className="bg-[#1B6392] lg:hidden">
        {/* Container */}
        <div className="container flex items-center justify-between py-2">
          <div className="logo">
            <Link href="#">
              <Image
                src={assets.logo_white}
                alt="logo-pic"
                width={177}
                height={48}
              />
            </Link>
          </div>

          {/* Mobile Overlay */}
          {menuOpen && (
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 transform transition-all duration-500 ease-in-out z-20 xl:hidden"
            ></div>
          )}

          {/* Navbar */}
          <nav
            className={`fixed top-0 left-0 w-80 bg-white h-screen overflow-hidden transform transition-all duration-500 ease-in-out z-50
                        ${
                          menuOpen
                            ? "translate-x-0 opacity-100 visible"
                            : "-translate-x-full opacity-0 invisible"
                        }
                    `}
          >
            {/* Close button */}
            <div
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-end border-b border-black/10"
            >
              <p className="size-12.5 border-l border-black/10 cursor-pointer leading-12.5 text-center text-black text-[25px]">
                ×
              </p>
            </div>

            {/* Navbar items */}
            <ul className="">
              {navItems.map((link, index) => (
                <li
                  key={index}
                  className="py-3.75 px-2.5 border-b border-black/10"
                >
                  <Link
                    href="/"
                    onClick={() => setMenuOpen(false)}
                    className="text-base font-bold relative transition-all duration-300 ease-in-out text-black"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social icons */}
            <div className="absolute bottom-13.75 left-0 right-0">
              <ul className="flex items-center justify-around">
                <li className="text-sm font-semibold text-[#212529] -mt-1 ">
                  Follow us:
                </li>
                {socialLinks.map((social) => (
                  <li key={social.name}>
                    <Link href={social.url}>{social.icon}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Open menu button */}
          <div
            className="flex w-7.5 h-7.5 cursor-pointer items-center justify-center"
            onClick={() => setMenuOpen(true)}
          >
            <span className='block w-7 h-0.5 relative bg-white before:content-[""] before:absolute before:-top-2 before:left-0 before:w-full before:h-full before:bg-white after:content-[""] after:absolute after:top-2 after:left-0 after:w-full after:h-full after:bg-white'></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoblieNavigation;

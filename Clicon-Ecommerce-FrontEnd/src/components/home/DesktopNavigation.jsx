import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TopBar from "./TopBar";
import { homepageContent } from "../../../data/home/home";
import {
  Facebook,
  Twitter,
  Pineterest,
  Redidt,
  Youtube,
  Instragram,
  Search,
  PhoneCall,
  CaretDown,
  CaretRight,
} from "../svg/Icons";
import { assets } from "../../../constants/assets";
import ROUTES from "../../../constants/routes";
import Cart from "./Cart";
import UserForm from "./UserForm";

const DesktopNavigation = () => {
  const [active, setActive] = useState(false);
  const [language, setLanguage] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const btnRef = useRef(null);
  const languageRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setActive(false);
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setLanguage(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // To show topbar only on homepage..
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { welcomeText } = homepageContent.header;
  const topbarLinks = homepageContent.header.bottomnavLinks;
  const headercta = homepageContent.header.categories;
  const innerBrand = homepageContent.header.brands;
  const features = homepageContent.header.featuredPhones;
  const discount = homepageContent.header.discountBanner;
  const socialLinks = [
    { name: "Twitter", url: "#", icon: <Twitter fill="#ffffff" /> },
    {
      name: "Facebook",
      url: "#",
      icon: <Facebook fill="#1B6392" background="#ffffff" />,
    },
    { name: "Pinterest", url: "#", icon: <Pineterest fill="#ffffff" /> },
    {
      name: "Reddit",
      url: "#",
      icon: <Redidt fill="#1B6392" background="#ffffff" />,
    },
    { name: "Youtube", url: "#", icon: <Youtube fill="#ffffff" /> },
    { name: "Instagram", url: "#", icon: <Instragram fill="#ffffff" /> },
  ];

  const languages = [
    { id: 1, language: "English", image: assets.usa, tick: assets.Check },
    { id: 2, language: "Mandarin", image: assets.man, tick: assets.Check },
    { id: 3, language: "Russian", image: assets.rus, tick: assets.Check },
  ];

  return (
    <>
      {/* TopBar */}
      {isHome && <TopBar />}

      {/* Desktop Navigation */}

      {/* Top Nav */}
      <div className="bg-[#1B6392] border-b border-[#FFFFFF29] hidden lg:block">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-between py-3.5">
            <div>
              <p className="text-sm leading-5 font-normal text-white">
                {welcomeText}
              </p>
            </div>

            <div className="flex items-center">
              {/* social wrapper */}
              <div className="border-r border-[#FFFFFF29]">
                <ul className="flex items-center">
                  <li className="text-sm text-white mr-3">Follow us:</li>
                  {socialLinks.map((social) => (
                    <li key={social.name} className="mr-3">
                      <Link href={social.url}>{social.icon}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Currency Wrapper */}
              <div className="flex items-center">
                {/* language wrapper */}
                <div className="relative" ref={languageRef}>
                  <span
                    className="text-sm text-white flex items-center gap-2 pl-6 pr-7.5 cursor-pointer"
                    onClick={() => setLanguage(!language)}
                  >
                    {selectedLanguage}
                    <Image
                      src={assets.CaretDown}
                      alt="caret-down"
                      width={14}
                      height={14}
                      className={`transition-transform duration-300 ${
                        language ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                  {/* language dropdown */}
                  <div
                    className={`w-45 absolute top-7.5 right-8 py-2 bg-white border border-[#E4E7E9] rounded-sm z-10 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]
                    transition-all duration-400 ease-out origin-top
                    ${
                      language
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                  `}
                  >
                    <div>
                      {languages.map((language) => (
                        <div
                          key={language.id}
                          className={`py-2 px-4 flex items-center justify-between cursor-pointer ${
                            selectedLanguage !== language.language
                              ? "hover:bg-[#f2f4f5]"
                              : ""
                          }`}
                          onClick={() => {
                            setSelectedLanguage(language.language);
                            setLanguage(false);
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Image
                              src={language.image}
                              alt={language.language}
                              width={24}
                              height={24}
                              className="border border-[#E4E7E9] rounded-full shrink-0"
                            />
                            <span
                              className={`text-sm font-medium ${
                                selectedLanguage === language.language
                                  ? "text-[#191C1F]"
                                  : "text-[#5F6C72]"
                              }`}
                            >
                              {language.language}
                            </span>
                          </div>
                          <div>
                            {selectedLanguage === language.language && (
                              <Image
                                src={language.tick}
                                alt="check"
                                width={16}
                                height={16}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-white flex items-center gap-2 pr-1">
                    USD
                    <Image
                      src={assets.CaretDown}
                      alt="caret-down"
                      width={14}
                      height={14}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Nav */}
      <div className="bg-[#1B6392] hidden lg:block">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-between py-5">
            {/* Header Logo */}
            <div className="logo">
              <Link href={ROUTES.HOME}>
                <Image
                  src={assets.logo_white}
                  width={177}
                  height={48}
                  alt="logo-pic"
                />
              </Link>
            </div>

            {/* Header Search Form */}
            <div className="">
              <form
                action="#"
                className="w-125 2xl:w-161.5 relative h-12 bg-white shadow-[0px_8px_32px_0px_#00000014] px-5 py-3.5 rounded-xs"
              >
                <input
                  type="text"
                  placeholder="Search for anything..."
                  className="outline-0 font-normal text-[14px] leading-5 text-[#212529] pr-7.5 placeholder-text"
                />

                <div className="absolute top-[50%] right-5 translate-y-[-50%] cursor-pointer">
                  <Search />
                </div>
              </form>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 text-white">
              {/* Add to cart */}
              <Cart />
              {/* Wishlist */}
              <div>
                <button>
                  <Image
                    src={assets.Heart_White}
                    alt="cart-white"
                    width={32}
                    height={32}
                    className=""
                  />
                </button>
              </div>
              {/* user */}
              <UserForm />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="lg:bg-white border-b-2 border-[#f2f4f5] hidden lg:block">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <button
                  ref={btnRef}
                  onClick={() => setActive(!active)}
                  className={`flex items-center gap-1.5 py-3.5 px-6 rounded-sm text-sm! font-medium leading-5 
                                    ${
                                      active
                                        ? "bg-[#FA8232]! text-white!"
                                        : "bg-[#F2F4F5]! text-[#191C1F]!"
                                    }
                                    transition-colors duration-300`}
                >
                  All Category
                  <span
                    className={`inline-block transition-transform duration-300 
                                        ${active ? "rotate-180" : "rotate-0"}`}
                  >
                    <CaretDown />
                  </span>
                </button>

                {/* Animated Dropdown */}
                <div
                  className={`
                                            absolute top-16 min-w-60 z-10
                                            bg-white border border-[#E4E7E9] rounded-[3px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                                            transition-all duration-400 ease-out origin-top

                                            ${
                                              active
                                                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                                                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                            }
                                            `}
                >
                  <ul className="py-3">
                    {headercta.map((headernav, index) => (
                      <li key={index} className="relative group">
                        <Link
                          href={headernav.href}
                          className="text-[14px] font-medium leading-5 text-[#6c757d] py-2 px-4 flex items-center justify-between group duration-400 hover:bg-[#F2F4F5] hover:text-[#212529]"
                        >
                          {headernav.label}

                          {/* Show right arrow ONLY for SmartPhone */}
                          {headernav.label === "SmartPhone" && (
                            <span className="invisible duration-150 group-hover:visible">
                              <CaretRight />
                            </span>
                          )}
                        </Link>

                        {/* Show Submenu for SmartPhone */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Top Services */}
              <div className="">
                <ul className="flex items-center gap-6">
                  {topbarLinks.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-1.25 text-sm leading-6 
                                                font-normal text-[#5F6C72] duration-300 ease-linear 
                                                hover:text-[#FA8232]"
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="tel flex items-center gap-2">
              <span>
                <PhoneCall />
              </span>
              <span className="text-[18px] leading-6 font-normal text-[#191C1F]">
                +1-202-555-0104
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopNavigation;

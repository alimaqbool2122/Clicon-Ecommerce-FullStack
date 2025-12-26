import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TopBar from "./TopBar";
import { homepageContent } from "../../../data/home/home";
import { useForm, Controller } from "react-hook-form";
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
  ArrowRight,
} from "../svg/Icons";
import { assets } from "../../../constants/assets";
import ROUTES from "../../../constants/routes";

const DesktopNavigation = () => {
  const [active, setActive] = useState(false);
  const btnRef = useRef(null);
  const [userActive, setUserActive] = useState(false);
  const userBtnRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (btnRef.current && !btnRef.current.contains(e.target)) {
        setActive(false);
      }
      if (userBtnRef.current && !userBtnRef.current.contains(e.target)) {
        setUserActive(false);
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
  const [showPassword, setShowPassword] = useState(false);
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

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

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
                <div>
                  <span className="text-sm text-white flex items-center gap-2 pl-6 pr-7.5">
                    Eng
                    <Image
                      src={assets.CaretDown}
                      alt="caret-down"
                      width={14}
                      height={14}
                    />
                  </span>
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
              <button className="relative">
                <Image
                  src={assets.Cart_White}
                  alt="cart-white"
                  width={32}
                  height={32}
                  className=""
                />
                <div className="size-5 bg-white py-0.5 flex items-center justify-center rounded-full absolute -top-1 left-4">
                  <span className="text-[#1B6392] text-[12px] font-semibold">
                    2
                  </span>
                </div>
              </button>
              {/* Wishlist */}
              <button>
                <Image
                  src={assets.Heart_White}
                  alt="cart-white"
                  width={32}
                  height={32}
                  className=""
                />
              </button>
              {/* user */}
              <div className="relative" ref={userBtnRef}>
                <button onClick={() => setUserActive(!userActive)}>
                  <Image
                    src={assets.user_svg}
                    alt="cart-white"
                    width={32}
                    height={32}
                    className=""
                  />
                </button>
                {/* Signin form */}
                <div
                  className={`w-106 absolute top-12 right-0 bg-white border border-[#E4E7E9] rounded-sm p-8 shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]
  transition-all duration-400 ease-out origin-top
  ${
    userActive
      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
  }
`}
                >
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-12 space-y-5"
                  >
                    <div className="col-span-12">
                      <h2 className="text-xl font-semibold text-[#191C1F] text-center">
                        Sign in to your account
                      </h2>
                    </div>

                    {/* Email */}
                    <div className="col-span-12">
                      <label
                        htmlFor="email"
                        className="text-[14px] font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                      >
                        Email Address
                      </label>
                      <input
                        type="text"
                        className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address including @",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    {/* Password */}
                    <div className="relative col-span-12">
                      <label
                        htmlFor="password"
                        className="text-[14px] font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                      >
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 pr-10"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                            message:
                              "Must contain uppercase, lowercase, number & special character",
                          },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-11.25 flex items-center justify-center"
                      >
                        <Image
                          src={
                            showPassword ? assets.EyeSlash : assets.Eye_Black
                          }
                          alt="eye-icon"
                          width={20}
                          height={20}
                          className="cursor-pointer"
                        />
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    {/* submit button */}
                    <button
                      type="submit"
                      className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] mb-4.5 duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F]"
                    >
                      login
                      <ArrowRight />
                    </button>
                  </form>
                  {/* Create account  */}
                  <div>
                    <div className="mb-3 after:border-[#e4e7e9] relative text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                      <p className="text-[#77878F] text-sm! bg-white inline-block px-2.5 font-normal leading-5 relative z-10">
                        Don’t have account
                      </p>
                    </div>

                    <Link
                      href="#"
                      className="flex items-center justify-center border-2 border-[#FFE7D6] bg-white! text-[#FA8232] py-[12.6px] px-[22.4px] text-[14px] leading-px uppercase font-bold rounded-[3px] h-12 duration-500 ease-linear hover:bg-[#FA8232]! hover:text-white hover:border-[#FA8232]"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              </div>
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

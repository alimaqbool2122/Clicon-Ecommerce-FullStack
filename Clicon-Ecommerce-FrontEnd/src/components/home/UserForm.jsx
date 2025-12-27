import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { assets } from "../../../constants/assets";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "../svg/Icons";

const UserForm = () => {
  const [userActive, setUserActive] = useState(false);
  const userBtnRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    function handleClickOutside(e) {
      if (userBtnRef.current && !userBtnRef.current.contains(e.target)) {
        setUserActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
                  src={showPassword ? assets.EyeSlash : assets.Eye_Black}
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
    </>
  );
};

export default UserForm;

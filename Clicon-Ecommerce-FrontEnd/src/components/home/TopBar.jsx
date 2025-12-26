import React from "react";
import Link from "next/link";
import { Cross, ArrowRight } from "../svg/Icons";
import { homepageContent } from "../../../data/home/home";
import ROUTES from "../../../constants/routes";

const TopBar = () => {
  const { promotion, discount, button } = homepageContent.topbar;
  return (
    <>
      <div className="bg-[#191C1F] relative hidden lg:block ">
        {/* Container */}
        <div className="container">
          <div className="flex items-center justify-around py-3.75 xl:justify-between">
            <div className="flex items-center text-white">
              <span className="bg-[#F3DE6D] py-1.5 px-2.5 -rotate-2 text-[20px] text-[#191C1F] leading-7 font-semibold black mr-3">
                {promotion.black}
              </span>
              <span className="text-[24px] leading-8 font-semibold text-[#FFFFFF]">
                {promotion.day}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-[14px] leading-5 font-medium text-white">
                {discount.first}
              </span>
              <span className="text-[40px] leading-12 font-semibold text-[#EBC80C] mx-2">
                {discount.count}
              </span>
              <span className="text-[20px] leading-7 font-semibold text-[#FFFFFF] uppercase">
                {discount.off}
              </span>
            </div>

            <div>
              <Link
                href={ROUTES.SHOP}
                className="flex items-center gap-2.5 border-2 border-[#EBC80C] bg-[#EBC80C] text-[#191C1F] py-3.5 px-6 text-sm leading-px uppercase font-bold rounded-xs duration-500 ease-linear hover:bg-transparent hover:text-white"
              >
                {button}
                <ArrowRight />
              </Link>
            </div>

            <div className="absolute top-[50%] right-6 translate-y-[-50%] size-8 rounded-xs p-2 bg-[#343a40] flex items-center justify-center text-white cursor-pointer">
              <Link href="#">
                <Cross />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;

import React, { useState, useRef, useEffect } from "react";
import { assets } from "../../../constants/assets";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cross } from "../svg/Icons";

const Cart = () => {
  const [cartActive, setCartActive] = useState(false);
  const cartBtnRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartBtnRef.current && !cartBtnRef.current.contains(e.target)) {
        setCartActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // card dummy data
  const cartData = [
    {
      id: 1,
      image: "/image/product/product-43.webp",
      title: "Canon EOS 1500D DSLR Camera Body+ 18-55 mm",
      price: "$1,500",
      quantity: "1 x",
    },
    {
      id: 2,
      image: assets.product_44,
      title: "Simple Mobile 5G LTE Galexy 12 Mini 512GB Gaming Phone",
      price: "$269",
      quantity: "2 x",
    },
  ];
  return (
    <>
      <div className="relative" ref={cartBtnRef}>
        <button className="relative" onClick={() => setCartActive(!cartActive)}>
          <Image
            src={assets.Cart_White}
            alt="cart-white"
            width={32}
            height={32}
            className=""
          />
          <div className="size-5 bg-white py-0.5 flex items-center justify-center rounded-full absolute -top-1 left-4">
            <span className="text-[#1B6392] text-[12px] font-semibold">2</span>
          </div>
        </button>
        {/* cart */}
        <div
          className={`w-94 absolute top-12 right-0 bg-white border border-[#E4E7E9] rounded-sm shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)]
                    transition-all duration-400 ease-out origin-top
                    ${
                      cartActive
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }
                  `}
        >
          <div>
            {/* card Title */}
            <div className="border-b border-[#e4e7e9] py-4 px-6">
              <h6 className="text-base text-[#191C1F] leading-6 font-medium">
                Shopping Cart <span className="text-[#6c757d]">(02)</span>
              </h6>
            </div>
            {/* cart item */}
            <div className="border-b border-[#e4e7e9] py-6 px-5">
              <div
                className={
                  cartData.length > 2 ? "max-h-48 overflow-y-auto" : ""
                }
              >
                <div className="grid grid-cols-12 gap-4">
                  {cartData.map((cart) => (
                    <div
                      key={cart.id}
                      className="col-span-12 flex items-center"
                    >
                      <div className="mr-4 shrink-0">
                        <Image
                          src={cart.image}
                          width={80}
                          height={80}
                          alt={cart.title}
                          className="shrink-0"
                        />
                      </div>

                      <div className="flex items-center justify-between w-full">
                        <div>
                          <p className="text-sm leading-5 text-[#212529] font-normal pr-4">
                            {cart.title}
                          </p>
                          <span>
                            <span className="text-[#5F6C72] text-sm leading-5 font-normal">
                              {cart.quantity}
                            </span>
                            <span className="text-sm leading-5 font-semibold text-[#2DA5F3] ml-1">
                              {cart.price}
                            </span>
                          </span>
                        </div>
                        <Link href="#">
                          <Cross fill="#929FA5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* cart total */}
            <div className="py-6 px-5 flex items-center justify-between">
              <span className="text-[#475156] text-sm leading-5 font-normal">
                Sub-Total:
              </span>
              <span className="text-[#191C1F] text-sm leading-5 font-medium">
                $2038.00 USD
              </span>
            </div>
            {/* cart buttons */}
            <div className="p-6 pt-0 flex flex-col gap-3">
              <Link
                href="#"
                className="flex items-center justify-center gap-2 border-2 border-[#FA8232] bg-[#FA8232] text-white h-12 text-[14px] leading-px uppercase font-bold rounded-[3px] duration-500 ease-linear hover:bg-transparent hover:text-[#191C1F] hover:border-[#FA8232]"
              >
                Checkout now
                <ArrowRight />
              </Link>

              <Link
                href="#"
                className="flex items-center justify-center border-2 border-[#FFE7D6] bg-white text-[#FA8232] text-[14px] leading-px uppercase font-bold rounded-[3px] h-12 duration-300 ease-linear hover:bg-[#FA8232] hover:text-white hover:border-[#FA8232]"
              >
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

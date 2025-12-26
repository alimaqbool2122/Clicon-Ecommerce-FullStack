"use client";
import React from "react";
import MoblieNavigation from "./MoblieNavigation";
import DesktopNavigation from "./DesktopNavigation";

const Header = () => {
  return (
    <>
      {/* MObile Navigation */}
      <MoblieNavigation />

      {/* Desktop Navigation */}
      <DesktopNavigation />
    </>
  );
};

export default Header;

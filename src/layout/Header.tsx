import { DropdownMenuDemo } from "./DropDown";
import { Typography } from "@/components/Typography";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Typography text="Shope.CO" variant="subheading" weight="bold" />
      <DropdownMenuDemo />
    </header>
  );
};

export default Header;

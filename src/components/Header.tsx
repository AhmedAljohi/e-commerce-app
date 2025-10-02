import { Typography } from "@/components/Typography";
import React from "react";
import { Dropdown } from "./custom_ui/DropDown";
import { ChevronDownIcon, MenuIcon, ShoppingCart } from "lucide-react";
import SearchInput from "./custom_ui/SearchInput";
import Image from "next/image";
import Salla2Icon from "@/assets/logo.svg";
import { Button } from "./ui/button";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const categories = [
  { id: "electronics", label: "Electronics" },
  { id: "jewelery", label: "Jewelry" },
  { id: "men's clothing", label: "Men's Clothing" },
  { id: "women's clothing", label: "Women's Clothing" },
  { id: "toys", label: "Toys" },
  { id: "books", label: "Books" },
  { id: "health & beauty", label: "Health & Beauty" },
  { id: "automotive", label: "Automotive" },
  { id: "trending", label: "Trending" },
  { id: "latest", label: "Latest arrivals" },
];

const Header = () => {
  return (
    <header className="flex justify-between px-3 py-5 gap-4">
      <div className="flex flex-grow items-center  md:flex-row md:gap-2.5">
        <div className="flex items-center  justify-center gap-2">
          <Typography text="Salla" variant="subheading" weight="bold" />
          <Dropdown
            TriggerItem={
              <>
                <DropdownMenuTrigger className="sm:hidden" asChild>
                  <Button className="sm:hidden" variant="ghost" size="sm">
                    <MenuIcon className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuTrigger className="hidden md:block" asChild>
                  <div className="hidden sm:flex group items-center gap-2 cursor-pointer">
                    <Typography
                      textColor="light"
                      variant="caption"
                      text="Categories"
                      weight="light"
                    />
                    <ChevronDownIcon className="w-4 h-4 transform transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </div>
                </DropdownMenuTrigger>
              </>
            }
            menuLabel="Select a category"
            menuItemList={categories}
            position="end"
            className="w-full md:w-48"
          />
          <Typography
            textColor="light"
            variant="caption"
            text="Trending"
            weight="light"
            className="shrink-0 cursor-pointer hidden md:flex"
          />
          <Typography
            textColor="light"
            variant="caption"
            text="Latest arrivals"
            weight="light"
            className="shrink-0 hidden md:flex cursor-pointer"
          />
        </div>
        <SearchInput className="hidden sm:flex" />
      </div>
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <Image
          src={Salla2Icon}
          alt="Salla2 logo"
          width={127}
          height={55}
          style={{ width: 127, height: 55, objectFit: "contain" }}
          className="mx-auto"
        />
      </div>
    </header>
  );
};

export default Header;

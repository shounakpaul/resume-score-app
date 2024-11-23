import React from "react";
import Logo from "../assets/logo.png";
import DarkMode from "./DarkMode";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";

function Navbar() {
  return (
    <div className="bg-light text-dark py-3 flex flex-row items-center justify-between px-10 dark:bg-dark dark:text-light">
      <div className="flex flex-row items-center justify-center px-2 py-1 gap-2">
        <img src={Logo} alt="Logo" className="w-10 h-10" />
        <p className="logo text-xl text-peach">resumescore</p>
      </div>

      <SignedIn>
        <div></div>
      </SignedIn>

      <div className="flex flex-row items-center justify-center gap-x-2">
        <SignedOut>
          <SignInButton className="border-2 rounded-3xl px-4 py-2" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <DarkMode />
      </div>
    </div>
  );
}

export default Navbar;

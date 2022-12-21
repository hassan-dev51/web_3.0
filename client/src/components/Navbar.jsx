import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../src/assets/images/logo.png";

const NavItems = ({ title, clasProps }) => {
  return <li className={`mx-4 cursor-pointer ${clasProps}`}>{title}</li>;
};
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <nav className="w-full flex md:justify-center justify-between items-center p-4">
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img src={logo} alt="krypto" className="w-32 cursor-pointer" />
        </div>
        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {["Market", "Exchange", "Tutorial", "Wallet"].map((items, ind) => (
            <NavItems key={ind} title={items} />
          ))}
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
            Login
          </li>
        </ul>
        <div className="flex relative">
          {toggle ? (
            <AiOutlineClose
              fontSize={28}
              className="text-white cursor-pointer md:hidden"
              onClick={() => setToggle(false)}
            />
          ) : (
            <HiMenuAlt4
              fontSize={28}
              className="text-white cursor-pointer md:hidden"
              onClick={() => setToggle(true)}
            />
          )}

          {toggle && (
            <ul
              className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
            >
              <li className="text-xl w-full my-2">
                <AiOutlineClose onClick={() => setToggle(false)} />
              </li>
              {["Market", "Exchange", "Tutorial", "Wallet"].map(
                (items, ind) => (
                  <NavItems key={ind} title={items} clasProps="my-2 text-lg" />
                )
              )}
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

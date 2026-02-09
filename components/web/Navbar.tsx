"use client"

import Link from "next/link";
import Image from "next/image";
import { useAuthModal } from "../auth/AuthModalProvider";


export default function Navbar() {
  const { openLogin } = useAuthModal()
 

  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image className="nav__img" src="/logo.png" alt="logo" width={495} height={114} />
        </figure>

        <ul className="nav__list--wrapper">
          <li onClick={ openLogin } className="nav__list nav__list--login">Login</li>
          <li className="nav__list nav__list--mobile">
            <Link href="/about">About</Link>
          </li>
          <li className="nav__list nav__list--mobile">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="nav__list nav__list--mobile">
            <Link href="/help">Help</Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
}

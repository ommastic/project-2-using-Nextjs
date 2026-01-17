import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image
            className="nav__img"
            src="/logo.png"
            alt="logo"
            width={495}
            height={114}
        
          />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login">
            <Link href="/login">Login</Link>
          </li>
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

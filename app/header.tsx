import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-white p-8 font-semibold">
        <ul className="flex justify-center items-center gap-12 ">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li className="font-parisienne text-4xl font-bold text-red-700">
            Graph Clay End
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

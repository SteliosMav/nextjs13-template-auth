import Link from "next/link";
import Button from "@/components/ui/Button";
import Avatar from "./Avatar";

export default function Header() {
  return (
    <header>
      <nav className="bg-white p-8 font-semibold flex items-center justify-between">
        <Button href="/components" color="secondary">
          Components
        </Button>
        <ul className="flex justify-center items-center gap-12 ">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li className="font-parisienne text-4xl font-bold text-red-700">
            Let End
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
        <Avatar />
      </nav>
    </header>
  );
}

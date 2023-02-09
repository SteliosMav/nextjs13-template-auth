import Link from "next/link";

export const metadata = {
  title: "Sign up",
};

export default function Register() {
  return (
    <main className="h-full bg-red-200 ">
      <h1>Register Page</h1>
      <Link href="/login">Log in</Link>
    </main>
  );
}

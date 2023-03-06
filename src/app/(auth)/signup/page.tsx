import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign up",
};

export default async function Register() {
  return (
    <main className="h-full flex justify-center items-center">
      <SignUpForm />
    </main>
  );
}

import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign up",
};

export default async function Register() {
  return (
    <main className="h-full bg-red-100 flex justify-center items-center">
      <div className="flex flex-col w-full max-w-lg gap-4">
        <h1 className="text-4xl mb-4 font-semibold flex justify-center">
          Create your account
        </h1>
        <SignUpForm />
        <p className="flex justify-center">
          Already have an account? &nbsp;
          <Link href="/login" className="text-[var(--primary)]">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

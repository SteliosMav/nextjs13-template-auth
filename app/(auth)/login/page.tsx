import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <main className="h-full bg-red-100 flex justify-center items-center">
      <div className="flex flex-col w-full max-w-md gap-4">
        <h1 className="text-4xl mb-4 font-semibold flex justify-center">
          Welcome back
        </h1>
        <LoginForm />
        <p className="flex justify-center">
          don't have an account? &nbsp;
          <Link href="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

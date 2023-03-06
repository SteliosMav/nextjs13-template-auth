import SignUpForm from "./SignUpForm";

export const metadata = {
  title: "Sign up",
};

export default async function SignUp() {
  return (
    <main className="h-full flex justify-center items-center">
      <SignUpForm />
    </main>
  );
}

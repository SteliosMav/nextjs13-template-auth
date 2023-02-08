import LoginForm from "./LoginForm";

export default function Login(props: any) {
  console.log(props);
  return (
    <main className="h-full bg-red-200 flex justify-center items-center">
      <div>
        <h1 className="text-4xl my-4 p-4 font-semibold">Welcome back</h1>
        <LoginForm></LoginForm>
      </div>
    </main>
  );
}

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

export default function Login() {
  return (
    <main className="h-full bg-red-200 flex justify-center items-center">
      <div>
        <h1 className="text-4xl my-4 p-4 font-semibold">Welcome back</h1>
        <form
          action="/api/hello"
          method="post"
          className="flex flex-col gap-6 items-center"
        >
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
          />
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
          />
          <Button
            type="submit"
            color="primary"
            className="w-full px-4 py-4 text-xl font-bold"
          >
            Log in
          </Button>
        </form>
      </div>
    </main>
  );
}

"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "@/components/ui/Button";
import Image from "next/image";

const GoogleLoginButton = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";

  return (
    <Button
      className="w-full gap-8 min-h-[3rem]"
      outline
      onClick={() => signIn("google", { callbackUrl })}
    >
      <Image src="google-icon.svg" alt="Google Icon" width={20} height={20} />
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButton;

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const Navbar = async () => {
  const { userId } = auth();

  return (
    <div className="p-5 border-b max-w-full container flex justify-end fixed z-50 bg-white">
      {userId && <UserButton />}
      {!userId && (
        <Link href="/sign-in" className="text-center">
          Employer Login
        </Link>
      )}
    </div>
  );
};

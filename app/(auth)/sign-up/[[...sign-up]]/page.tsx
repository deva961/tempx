import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-slate-100">
      <SignUp />
    </div>
  );
}

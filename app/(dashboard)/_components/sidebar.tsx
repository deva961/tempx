import React from "react";
import { SidebarRoutes } from "./sidebar-routes";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="h-full fixed border-r lg:flex flex-col overflow-y-auto shadow-sm bg-white !w-64 hidden">
      <div className="p-6">
        <div className="flex items-center justify-center font-semibold">
          Tempx
        </div>
      </div>

      <div className="flex flex-col w-full mt-10">
        <SidebarRoutes />

        <div className="absolute bottom-0 w-full cursor-pointer">
          <div
            className={
              "flex items-center justify-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20"
            }
          >
            <div className="flex w-full items-center gap-x-2 py-4">
              <LogOut />
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

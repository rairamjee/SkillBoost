"use client";

import React, { useEffect, useState } from "react";
import menulist from "./(menu)/menulist";
import { Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Overview from "./dashboard/page";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import withAuth from "../../../utils/withAuth";
import UserDashboard from "./userDashboard/page";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user.role;

  // State to hold the currently selected component
  const [currentComponent, setCurrentComponent] = useState<JSX.Element | null>(
    null
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    // console.log("Logging out...");
    window.location.href = "/login"; // Replace with your login route
  };

  const handleMenuClick = (component: JSX.Element) => {
    setCurrentComponent(component);
  };

  useEffect(() => {
    // console.log(role);
    if (role === "Employee") {
      setCurrentComponent(<UserDashboard />);
    } else {
      setCurrentComponent(<Overview />);
    }
  }, [role]);
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            SkillBoost!
          </h2>
        </div>
        <nav className="mt-4">
          {menulist
            .filter((item) => item.listFor === role) // Filter menu items by role
            .map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.component)}
                className="flex items-center w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-slate-800 dark:hover:bg-gray-700 hover:text-white"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </button>
            ))}
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h1 className="font-bold text-xl">
              Welcome Back, {user.name || "User"}!
            </h1>
          </div>
          <div className="flex items-center">
            <Input className="w-96 mr-4" placeholder="Search..." />
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img
                  src="/profile.jpg?height=32&width=32"
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{user.name || "User"}</DropdownMenuItem>
                <DropdownMenuItem>
                  {user.designation || "Designation"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {user.email || "example@gmail.com"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="mt-2 font-bold"
                >
                  <LogOut className="mr-4" /> Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4">
          {currentComponent} {/* Default component */}
        </main>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);

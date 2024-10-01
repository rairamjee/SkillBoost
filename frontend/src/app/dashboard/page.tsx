import menulist from "./(menu)/menulist";
import Link from "next/link"
import {  Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

const dashboard =()=>{
return(
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">SkillBoost!</h2>
        </div>
        <nav className="mt-4">
          {menulist.map((item) => (
            <Link
              key={item.name}
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-slate-800 dark:hover:bg-gray-700 hover:text-white"
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        </aside>
        <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Input className="w-64 mr-4" placeholder="Search..." />
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </Button>
          </div>
        </header>

        </div>
    </div>
    
)
}
export default dashboard;
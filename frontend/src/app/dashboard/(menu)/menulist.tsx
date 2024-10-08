import {
  BarChart,
  Settings,
  LayoutDashboard,
  CirclePlus,
} from "lucide-react";

import Setting from "../settings/page";
import Overview from "../dashboard/page";
import AddNew from "../addNew/page";
import Performance from "../trainingsUser/page";
import Analytics from "../analytics/page";
import UserDashboard from "../userDashboard/page";

const menulist = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    listFor: "Admin",
    component: <Overview />,
  },
  {
    name: "Add New",
    icon: CirclePlus,
    listFor: "Admin",
    component: <AddNew />,
  },
  {
    name: "Analytics",
    icon: BarChart,
    listFor: "Admin",
    component: <Analytics />,
  },
  {
    name: "Settings",
    icon: Settings,
    listFor: "Admin",
    component: <Setting />,
  },
  {
    name: "DashBoard",
    icon: LayoutDashboard,
    listFor: "Employee",
    component: <UserDashboard />,
  },
  {
    name: "Trainings",
    icon: BarChart,
    listFor: "Employee",
    component: <Performance />,
  },
  {
    name: "Settings",
    icon: Settings,
    listFor: "Employee",
    component: <Setting />,
  },
];

export default menulist;

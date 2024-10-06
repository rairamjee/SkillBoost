import React, { useEffect, useState } from "react";
import cardlist from "../(menu)/cardlist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import UserReport from "./userReport";

function UserDashboard() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cardlist.map((item, index) => (
          <Card key={index} className="h-36">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-medium">
                {item.title}
              </CardTitle>
              <item.icon className={`w-4 h-4 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mt-8">+ {item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex gap-3">
        <h1 className="text-2xl"> Recent Activities</h1>
        <TrendingUp className="mt-1" />
      </div>
      <UserReport />
    </div>
  );
}

export default UserDashboard;

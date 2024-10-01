"use client";

import { useEffect, useState } from "react";
import cardlist from "../(menu)/cardlist";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Button } from "@/components/ui/button"

const Overview = () => {
    interface User {
        name: string; // User's name
        email: string; // User's email
        role: string; // User's role
        designation: string; // User's designation
        gender:String;
    }

    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/user');
                setAllUsers(response.data); // Updating the Users list
            } catch (err) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cardlist.map((item, index) => (
                <Card key={index} className="h-36">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-medium">{item.title}</CardTitle>
                        <item.icon className={`w-4 h-4 ${item.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold mt-8">+ {item.value}</div>
                    </CardContent>
                </Card>
            ))}

            <Card style={{
                width:'600px'
            }}>
                <CardHeader>
                    <CardTitle>Employees</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {allUsers.map((user, index) => (
                            <div key={index} className="flex items-center">
                                <img
                                    src={`/profile.jpg?height=32&width=32}`}
                                    alt={user.name}
                                    className="w-9 h-9 rounded-full mr-2"
                                />
                                <div className="flex flex-col">
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-bold">{user.email}</div>
                                    {/* <div className="text-sm text-gray-500">{user.role}</div> */}
                                    <div className="text-sm text-gray-500">{user.designation}</div>
                                </div>
                                <div className="ml-60">
                                    <Button className="w-32">View Report</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Overview;

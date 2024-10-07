"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const user =localStorage.getItem("user");
    useEffect(() => {
        if(!user){
        router.push('/login');
        }
        else{
            router.push('/dashboard');
        } 
    }, [router]);

    return <div>Redirecting...</div>; // Optional: Show a message or spinner while redirecting
}

export default Page;

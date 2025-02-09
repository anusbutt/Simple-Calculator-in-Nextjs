"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Clock() {
    const [time, setTime] = useState<Date>(new Date());

    const [is24Hours, setIs24Hours] = useState<boolean>(true);

    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true); 
        const interval = setInterval(() => {
            setTime(new Date()); 
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formattedTime = useMemo<string>(() => {
        if (!mounted) return ""; 

        let hours = time.getHours();
        const minutes = time.getMinutes().toString().padStart(2, "0");
        const seconds = time.getSeconds().toString().padStart(2, "0");

        if (!is24Hours) {
            const amPm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; 
            return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${amPm}`;
        } else {
            return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
        }
    }, [time, is24Hours, mounted]);

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="p-8 shadow-lg rounded-2xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold tracking-tight">Digital Clock</div>

                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Display current time in hours, minutes, and seconds
                    </div>

                    <div className="text-6xl font-bold tracking-tight">
                        {formattedTime}
                    </div>

                    <div className="mt-4 flex items-center">
                        <Button
                            className="mr-2 font-bold"
                            variant={is24Hours ? "default" : "outline"}
                            onClick={() => setIs24Hours(true)}
                        >
                            24 Hours Format
                        </Button>
                        <Button
                            className="mr-2 font-bold"
                            variant={!is24Hours ? "default" : "outline"}
                            onClick={() => setIs24Hours(false)}
                        >
                            12 Hours Format
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
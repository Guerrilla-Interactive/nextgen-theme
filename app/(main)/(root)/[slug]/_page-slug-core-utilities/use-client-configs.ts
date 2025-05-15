"use client"

import { useGlobalContext } from "@/features/context/global-context";
import { useEffect } from "react";

export function UseClientConfigs({navigationTextColor}: {navigationTextColor: string}) {
    const { sessionStatus } = useGlobalContext();
    const { setIsTopDark } = sessionStatus;

    
    useEffect(() => {
        setIsTopDark(navigationTextColor === "white");
    }, [setIsTopDark, navigationTextColor]);

    return null;
}

"use client"

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {verifyEmail} from "@/app/_actions/veritifyEmail";
import { useSearchParams } from 'next/navigation'

export default function VerifyEmail() {
    const search = useSearchParams();
    const urlToken = search.get("token")!;
    console.log(urlToken);

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string|undefined>();

    const verifyUserEmail = useCallback(async () => {
        const result = await verifyEmail(token);
        if (result && result.error) return setError(result.error);
        setVerified(true);
    }, [error, token])

    useEffect(() => {
        const decodedUrlToken = decodeURIComponent(urlToken);
        console.log('urlToken', decodedUrlToken);
        setToken(decodedUrlToken || "");
    }, [urlToken]);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);

    return (
        <div>
            <h3>Verifying Email</h3>
            {verified && (
                <div>
                    <h4>Email verified</h4>
                    <Link href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h4>{ error }</h4>
                </div>
            )}
        </div>
    )
}
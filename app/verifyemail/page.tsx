"use client"

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import {verifyEmail} from "@/app/_actions/veritifyEmail";
import { useSearchParams } from 'next/navigation'

export default function VerifyEmailPage() {
    const search = useSearchParams();
    const urlToken = search.get("token") || "";
    const decodedUrlToken = decodeURIComponent(urlToken);

    const [verified, setVerified] = useState(false);
    const [error, setError] = useState<string|undefined>();

    const verifyUserEmail = useCallback(async () => {
            const result = await verifyEmail(decodedUrlToken);
            if (error) return setError(result.error);
            setVerified(true);
    }, [decodedUrlToken, error])

    useEffect(() => {
        if(decodedUrlToken.length > 0) {
            verifyUserEmail();
        }
    }, [decodedUrlToken, verifyUserEmail]);

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
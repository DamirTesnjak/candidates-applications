'use client'

import {useCallback, useEffect} from 'react'
import {useAppDispatch} from "@/lib/hooks";
import {loadUpdateCandidate} from "@/lib/features/candidate/candidateSlice";
import {loadUpdateHrUser} from  "@/lib/features/hrUser/hrUserSlice";
import {DATABASES} from "@/constants/constants";

export default function SetDataToStore({data, databaseName}) {
    const dispatch = useAppDispatch();

    const actionState = useCallback(() => {
        if (databaseName === DATABASES.hrUsers) {
            dispatch(loadUpdateHrUser(data));
        }

        if (databaseName === DATABASES.candidates) {
            dispatch(loadUpdateCandidate(data));
        }
    }, [databaseName]);

    useEffect(() => {
        if (data) {
            actionState();
        }
    }, [actionState, data])

    return <div/>
}
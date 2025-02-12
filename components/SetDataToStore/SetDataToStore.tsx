'use client';

import { useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { loadUpdateCandidate } from '@/lib/features/candidate/candidateSlice';
import { loadUpdateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { ISetDataToStoreProps } from '@/types/SetDataToStoreProps';
import { DATABASES } from '@/constants/constants';

export default function SetDataToStore({
  data,
  databaseName,
}: ISetDataToStoreProps) {
  const dispatch = useAppDispatch();

  const actionState = useCallback(() => {
    if (databaseName === DATABASES.hrUsers) {
      dispatch(loadUpdateHrUser(data));
    }

    if (databaseName === DATABASES.candidates) {
      dispatch(loadUpdateCandidate(data));
    }
  }, [data, databaseName, dispatch]);

  useEffect(() => {
    if (data) {
      actionState();
    }
  }, [actionState, data]);

  return <div />;
}

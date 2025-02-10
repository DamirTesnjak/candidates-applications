/* eslint-disable @typescript-eslint/no-explicit-any */
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';

export type IInitialStateCandidate = typeof initialStateCandidate
export type IInitialStateHrUser = typeof initialStateHrUser;
export type IInitialStateCompanyEmailConfigs = typeof initialStateCompanyEmailConfigs;


export type IAppState = IInitialStateCandidate | IInitialStateHrUser | IInitialStateCompanyEmailConfigs;
export interface IObjectToFlatExtended {
  [x: string]: any;
}

export type IObjectToFlat = IAppState & IObjectToFlatExtended;

export type IFlattenedObject = {
  [x: string]: any;
}

export default function flattenObject(objectToFlat: IObjectToFlat) {
    const finalObject: IFlattenedObject = {};

    const flatObjectFn = (obj: IObjectToFlat) => {
        for(const key in obj){
            if(typeof obj[key] === 'object'){
                flatObjectFn(obj[key]);
            }else{
                finalObject[key] = obj[key]
            }
        }
    };

    flatObjectFn(objectToFlat);

    return finalObject;
}
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';

export type IInitialStateCandidate = typeof initialStateCandidate
export type IInitialStateHrUser = typeof initialStateHrUser;
export type IInitialStateCompanyEmailConfigs = typeof initialStateCompanyEmailConfigs;


export type IObjectToFlat = IInitialStateCandidate | IInitialStateHrUser | IInitialStateCompanyEmailConfigs;

export type IFlattenObject = {
  [x: string]: string | number;
}

export default function flattenObject(objectToFlat: IObjectToFlat) {
    const finalObject: IFlattenObject = {};

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
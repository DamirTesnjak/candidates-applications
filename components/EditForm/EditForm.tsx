'use client'

import {useAppSelector} from "@/lib/hooks";
import {initialStateCandidate} from "@/lib/features/candidate/candidateSlice";
import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import flattenObject from "@/utils/flattenObject";

export interface IFormProps {
    serverAction?: (formData: FormData) =>  Promise<{errors: {[p: string]: string[] | undefined, [p: number]: string[] | undefined}, message?: undefined, error?: undefined} | {message: string, errors?: undefined, error?: undefined} | {}>
    stateModel: typeof initialStateCandidate | typeof initialStateHrUser;
    storeReducerName: string;
    editable?: boolean;
    newProfile?: boolean;
}

export default function EditForm(props: IFormProps) {
    const { serverAction, stateModel, storeReducerName, editable, newProfile } = props;
    const stateModelKeys = Object.keys(flattenObject(stateModel));
    const stateModelKeyAndValues = useAppSelector(state => state[storeReducerName]);

    const flattenedObjects = (stateModelKey) => {
        return newProfile ? flattenObject(initialStateCandidate)[stateModelKey] : flattenObject(stateModelKeyAndValues)[stateModelKey];
    }

    return (
        <form action={serverAction}>
            {stateModelKeys.map((stateModelKey) => {
                if (stateModelKey === 'archived' || stateModelKey === 'employed' || stateModelKey === 'rejected') {
                    return (
                        <div key={stateModelKey}>
                            <label htmlFor={`${stateModelKey}`}>{stateModelKey}</label>
                            <input
                                name={stateModelKey}
                                type="checkbox"
                                defaultValue={flattenedObjects(stateModelKey) ? "on" : "off"}
                                defaultChecked={flattenedObjects(stateModelKey)}
                                readOnly={!editable}
                            />
                        </div>
                    )
                } else {
                    return (
                        <div key={stateModelKey}>
                            <label htmlFor={`${stateModelKey}`}>{stateModelKey}</label>
                            <input
                                name={stateModelKey}
                                type="text"
                                defaultValue={flattenedObjects(stateModelKey)}
                                readOnly={!editable}/>
                        </div>
                    )
                }
            })}
            { editable && (<div>
                <label htmlFor="profilePicture">Profile picture</label>
                <input name="profilePicture" type="file"/>
                <label htmlFor="file">CV PDF file</label>
                <input name="file" type="file"/>
                <button type="submit">Save changes</button>
            </div>)}
        </form>
    )
}
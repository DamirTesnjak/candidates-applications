'use client'

import {useAppSelector} from "@/lib/hooks";
import {initialStateCandidate} from "@/lib/features/candidate/candidateSlice";
import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import flattenObject from "@/utils/flattenObject";
import Input from "@/UI/Input/Input";
import Button from "@/UI/Button/Button";

import styles from "./editForm.module.scss";

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
    const filedsToDisplayKeys = stateModelKeys.filter((stateModelKey) => stateModelKey !== 'data' && stateModelKey !== 'contentType' && stateModelKey !== 'id');

    const stateModelKeyAndValues = useAppSelector(state => state[storeReducerName]);

    const flattenedObjects = (stateModelKey) => {
        return newProfile ? flattenObject(initialStateCandidate)[stateModelKey] : flattenObject(stateModelKeyAndValues)[stateModelKey];
    }

    return (
        <form action={serverAction}>
            {filedsToDisplayKeys.map((stateModelKey) => {
                console.log('stateModelKey', stateModelKey);
                if (stateModelKey === 'archived' || stateModelKey === 'employed' || stateModelKey === 'rejected') {
                    return (
                        <div key={stateModelKey}>
                            <Input
                                className="checkbox"
                                flow="flowRow"
                                label={stateModelKey}
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
                            <Input
                                className="standard"
                                flow="flowRow"
                                label={stateModelKey}
                                name={stateModelKey}
                                type="text"
                                defaultValue={flattenedObjects(stateModelKey)}
                                readOnly={!editable}
                            />
                        </div>
                    )
                }
            })}
            { editable && (<div className={styles.buttonsContainer}>
                <Input
                    className="uploadButton"
                    flow="flowRow"
                    label="Profile picture"
                    name="profilePicture"
                    type="file"
                />
                <Input
                    className="uploadButton"
                    flow="flowRow"
                    label="CV PDF file"
                    name="file"
                    type="file"
                />
                <Button
                    className="submitButton"
                    type="submit"
                    text="Save Changes"
                />
            </div>)}
        </form>
    )
}
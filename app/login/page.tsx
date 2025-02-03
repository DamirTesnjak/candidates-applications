import {loginHrUser} from "@/app/_actions/loginHrUser";
import Input from "@/UI/Input/Input";
import styles from "@/components/EditForm/editForm.module.scss";
import Button from "@/UI/Button/Button";

export default function LogingPage() {
    const inputFields = [
        { name: "username", type: "text", label: "Username" },
        { name: "password", type: "password", label: "Password" },
    ];

    const formContent = inputFields.map((inputField) => {
        console.log("inputField", inputField);
        return (
            <Input
                className="standard"
                name={inputField.name}
                label={inputField.label}
                type={inputField.type}
                flow="flowRow"
            />
        )
    })

    return (
        <form action={loginHrUser}>
            { formContent }
            <div className={styles.buttonsContainer}>
                <Button
                    className="submitButton"
                    type="submit"
                    text="Login"
                />
            </div>
        </form>
    )
}
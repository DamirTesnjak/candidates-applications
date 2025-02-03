import { createHrUser } from "@/app/_actions/createHrUser";
import Input from "@/UI/Input/Input";
import styles from "@/components/EditForm/editForm.module.scss";
import Button from "@/UI/Button/Button";

export default function RegisterPage() {
    const inputFields = [
        { name: "name", type: "text", label: "Name" },
        { name: "surname", type: "text", label: "Surname" },
        { name: "companyName", type: "text", label: "Company" },
        { name: "phoneNumber", type: "text", label: "Phone Number" },
        { name: "email", type: "email", label: "Email" },
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
        <form action={createHrUser}>
            { formContent }
            <div className={styles.buttonsContainer}>
                <Input
                    className="uploadButton"
                    flow="flowRow"
                    label="Profile picture"
                    name="profilePicture"
                    type="file"
                />
                <Button
                    className="submitButton"
                    type="submit"
                    text="Save Changes"
                />
            </div>
        </form>
    )
}
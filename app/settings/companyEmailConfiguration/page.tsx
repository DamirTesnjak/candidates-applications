import Input from "../../../UI/Input/Input"
import styles from "../../../styles/global/globals.module.scss"
import Button from "@/UI/Button/Button";
import { createCompanyEmailConfiguration } from "@/app/_actions/createCompanyEmailConfiguration";

export default function companyEmailConfigurationPage() {
    return (
        <div className={styles.container}>
            <h3>Company email configuration</h3>
            <form action={createCompanyEmailConfiguration}>
                <Input
                    className="standard"
                    label="Email host"
                    name="emailHost"
                    type="text"
                    flow="flowRow"
                />
                <Input
                    className="standard"
                    label="Email host port"
                    name="port"
                    type="number"
                    flow="flowRow"
                />
                <Input
                    className="standard"
                    label="Company full name"
                    name="companyName"
                    type="text"
                    flow="flowRow"
                />
                <Input
                    className="standard"
                    label="Email address"
                    name="email"
                    type="email"
                    flow="flowRow"
                />
                <Input
                    className="standard"
                    label="Username"
                    name="username"
                    type="text"
                    flow="flowRow"
                />
                <Input
                    className="standard"
                    label="Password"
                    name="password"
                    type="password"
                    flow="flowRow"
                />
                <Button
                    className="submitButton"
                    type="submit"
                    text="Save Changes"
                />
            </form>
        </div>
    )
}
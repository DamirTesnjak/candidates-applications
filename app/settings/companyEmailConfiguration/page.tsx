import styles from "../../../styles/global/globals.module.scss"

export default function companyEmailConfigurationPage() {
    return (
        <div className={styles.container}>
            <h3>Company email configuration</h3>
            <form>
                <div>
                    <label htmlFor="emailHost">EmailHost</label>
                    <input name="emailHost" type="text" />
                </div>
                <div>
                    <label htmlFor="emailHostPort">Email host port</label>
                    <input name="emailHostPort" type="number" />
                </div>
                <div>
                    <label htmlFor="companyFullName">Company full name</label>
                    <input name="companyFullName" type="text" />
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" type="text" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" />
                </div>
                <button className={styles.MuiButton} type="submit">Save Changes</button>
            </form>
        </div>
    )
}
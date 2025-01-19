import { createHrUser } from "@/app/_actions/createHrUser";

export default function RegisterPage() {
    // TODO create submit function
    return (
        <form action={createHrUser}>
            <div>
                <label htmlFor="name">Name</label>
                <input name="name" type="text"/>
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input name="surname" type="text"/>
            </div>
            <div>
                <label htmlFor="companyName">Company name</label>
                <input name="companyName" type="text"/>
            </div>
            <div>
                <label htmlFor="phoneNumber">Telephone</label>
                <input name="phoneNumber" type="text"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input name="email" type="email"/>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input name="username" type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type="password"/>
            </div>
            <input name="file" type="file"/>
            <button type="submit">Create account</button>
        </form>
    )
}
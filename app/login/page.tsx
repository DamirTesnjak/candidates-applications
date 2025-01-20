import {loginHrUser} from "@/app/_actions/loginHrUser";

export default function LogingPage() {
    return (
        <form action={loginHrUser}>
            <div>
                <label htmlFor="username">Username</label>
                <input name="username" type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input name="password" type="password"/>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
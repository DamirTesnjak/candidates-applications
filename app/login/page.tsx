export default function LogingPage() {
    // TODO create submit function
    return (
        <form>
            <div>
                <label htmlFor="userName">Username</label>
                <input id="username" type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"/>
            </div>
            <button type="submit">Login</button>
        </form>
    )
}
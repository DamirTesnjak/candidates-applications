export default function RegisterPage() {
    // TODO create submit function
    return (
        <form>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text"/>
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input id="surname" type="text"/>
            </div>
            <div>
                <label htmlFor="companyName">Company name</label>
                <input id="companyName" type="text"/>
            </div>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"/>
            </div>
            <button type="button">Upload profile picture</button>
            <button type="submit">Create account</button>
        </form>
    )
}
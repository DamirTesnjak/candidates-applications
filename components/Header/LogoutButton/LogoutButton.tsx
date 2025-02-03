import {logoutHrUser} from "@/app/_actions/logoutHrUser";

export default function logoutButton() {
    return (
        <form action={logoutHrUser}>
            <button type='submit' >Logout</button>
        </form>
    )
}
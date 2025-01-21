import { createCandidate } from "@/app/_actions/createCandidate";

export default function RegisterPage() {
    return (
        <form action={createCandidate}>
            <div>
                <label htmlFor="name">Name</label>
                <input name="name" type="text"/>
            </div>
            <div>
                <label htmlFor="surname">Surname</label>
                <input name="surname" type="text"/>
            </div>
            <div>
                <label htmlFor="address">Address</label>
                <input name="address" type="text"/>
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input name="city" type="text"/>
            </div>
            <div>
                <label htmlFor="zipCode">Zip code</label>
                <input name="zipCode" type="email"/>
            </div>
            <div>
                <label htmlFor="country">Country</label>
                <input name="country" type="text"/>
            </div>
            <div>
                <label htmlFor="phoneNumber">Phone number</label>
                <input name="phoneNumber" type="text"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input name="email" type="email"/>
            </div>
            <div>
                <label htmlFor="linkedIn">LinkedIn</label>
                <input name="linkedIn" type="text"/>
            </div>
            <label htmlFor="profilePicture">Profile picture</label>
            <input name="profilePicture" type="file"/>
            <label htmlFor="file">CV PDF file</label>
            <input name="file" type="file"/>
            <button type="submit">Apply for a job</button>
        </form>
    )
}
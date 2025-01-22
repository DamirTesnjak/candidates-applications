import StoreProvider from '../app/StoreProvider';
import LoginButton from "@/components/LoginButton";

export default function LoginComponent() {
    return (
        <div>
            <StoreProvider>
                <LoginButton />
            </StoreProvider>
        </div>
    )
}
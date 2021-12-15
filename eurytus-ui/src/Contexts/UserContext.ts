import { createContext, Dispatch, SetStateAction } from "react";

interface UserContextArgs {
    user: {
        id: string, 
        email: string, 
        role: string, 
        iat: number
    }|null,
    setUser:  Dispatch<SetStateAction<null>>
}

export const UserContext = createContext<UserContextArgs>({} as UserContextArgs);
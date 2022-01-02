import { createContext, Dispatch, SetStateAction } from "react";

interface RequestContextArgs {
    requests: {
        _id: string,
        id: string,
        created_at: string,
        name: string,
        kind: string,
        ownerId: string
    }[]|null,
    setRequests:  Dispatch<SetStateAction<null>>
}

export const RequestsContext = createContext<RequestContextArgs>({} as RequestContextArgs);
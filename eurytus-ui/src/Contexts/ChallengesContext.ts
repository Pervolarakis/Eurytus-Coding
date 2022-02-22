import { createContext, Dispatch, SetStateAction } from "react";

interface ChallengesContextArgs {
    challenges: {
        id: string,
        name: string,
        description: string,
        isPublic: boolean,
        language: string,
        participants: number
    }[]|null,
    setChallenges:  Dispatch<SetStateAction<null>>
}

export const ChallengesContext = createContext<ChallengesContextArgs>({} as ChallengesContextArgs);
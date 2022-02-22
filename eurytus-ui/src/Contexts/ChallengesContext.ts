import { createContext, Dispatch, SetStateAction } from "react";
import { fetchedDataType } from "../Components/AdminPage/ModerateChallenges/ReviewRequestInterfaces";

interface ChallengesContextArgs {
    challenges: fetchedDataType[]|null,
    setChallenges:  Dispatch<SetStateAction<fetchedDataType[]>>
}

export const ChallengesContext = createContext<ChallengesContextArgs>({} as ChallengesContextArgs);
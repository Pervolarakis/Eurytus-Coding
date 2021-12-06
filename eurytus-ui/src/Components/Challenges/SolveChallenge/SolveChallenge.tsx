import Ide from "../../Ide/Ide";
import ChallengeDescription from "./ChallengeDescription";
import SubmitChallenge from "./SubmitChallenge";

const SolveChallenge = () => {
    return(
        <div className="flex w-full h-full">
            <ChallengeDescription name={"Find the Sum"} description={"Write a function called 'Solution' that takes 3 numbers as arguments and prints their sum."} difficulty={1} creator={"User"} example={"Input: 5,10,15 Output: 30"}/>
            <div className="w-4/6">
                <Ide language={"javascript"} template={"const sum = () => {}"}/>
                <SubmitChallenge/>
            </div>
        </div>
    )
}

export default SolveChallenge;
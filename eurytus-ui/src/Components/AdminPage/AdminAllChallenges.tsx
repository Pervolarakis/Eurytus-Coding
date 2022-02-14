import { useContext } from "react";
import { ChallengesContext } from "../../Contexts/ChallengesContext";
import ChallengesTable from "./Tables/ChallengesTable";

const AdminAllChallenges = () => {

    const {challenges} = useContext(ChallengesContext)
    
    return(
        <div className="h-full">
            <h1 className="text-left font-semibold text-xl mb-4">All Challenges</h1>
            {challenges?<ChallengesTable challenges={challenges}/>:'No Challenges yet'}
        </div>
    )
}

export default AdminAllChallenges;
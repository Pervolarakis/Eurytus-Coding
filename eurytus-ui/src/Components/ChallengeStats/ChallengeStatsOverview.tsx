import { BiError } from "react-icons/bi";
import { IoIosMan } from "react-icons/io";
import Gauge from "react-svg-gauge";
import { fetchedDataType } from "../AdminPage/ModerateChallenges/ReviewRequestInterfaces";
import { userHistoryProps } from "../UserProfile/UserHistory/UserHistoryListItem";

const ChallengeStatsOverview = ({challengeHistory, notRunning, challenge}: {challengeHistory: userHistoryProps[], notRunning: number, challenge: fetchedDataType}) => {
    return(
        <div className="w-full">
            <h1 className="mt-8 mb-4 w-full text-left text-md font-medium">Overview</h1>
            <div className="w-full h-24 bg-white rounded shadow p-5 flex justify-around md:px-20">
                <div>
                    <div className="text-3xl font-bold text-gray-900 flex justify-center items-center"><IoIosMan size={30}/> {challengeHistory.length}</div>
                    <h1 className="text-xl font-bold text-gray-900">Participants</h1>
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-basicColor1">{(challengeHistory.reduce((total, next) => total + (next.outputTestsPassedScore!?next.outputTestsPassedScore!:0), 0)/(challengeHistory.length-notRunning)).toFixed(2)}%</h1>
                    <h1 className="text-xl font-bold text-basicColor1">Avg. Tests</h1>
                </div>
                {challenge.expectedStructure?<div>
                    <h1 className="text-3xl font-bold text-basicColor2">{(challengeHistory.reduce((total, next) => total + (next.requiredStructureFound?1:0) , 0)/(challengeHistory.length-notRunning)*100).toFixed(2)}%</h1>
                    <h1 className="text-xl font-bold text-basicColor2">Structure</h1>
                </div>:null}
                {challenge.expectedDesignPatterns.length?<div>
                    <h1 className="text-3xl font-bold text-basicColor3">{((challengeHistory.reduce((total, next) => total + (next.designPatternsFound!?Object.values(next.designPatternsFound!).reduce((a, item) => a + (item?1:0), 0):0) , 0))/(challengeHistory.length-notRunning)).toFixed(2)}</h1>
                    <h1 className="text-xl font-bold text-basicColor3">Avg. Patterns</h1>
                </div>:null}
                <div>
                    <div className="text-3xl font-bold text-red-500 flex justify-center items-center"><BiError size={30}/> {notRunning}</div>
                    <h1 className="text-xl font-bold text-red-500">Not Running</h1>
                </div>
            </div>
            <div className="w-full mt-8 h-48 bg-white rounded shadow p-5 hidden md:flex justify-around">
                <div>
                    <Gauge value={(Number.parseFloat((challengeHistory.reduce((total, next) => total + (next.outputTestsPassedScore!?next.outputTestsPassedScore!:0), 0)/(challengeHistory.length-notRunning)).toFixed(2)))} valueLabelStyle={{fontSize: '30px'}}  color={"#6B58E4"} minMaxLabelStyle={{display: 'none'}} width={300} height={150} label="" />
                    <h1 className="text-xl font-bold text-basicColor1 -top-5 relative">Avg. Tests</h1>
                </div>
                {challenge.expectedStructure?
                    <div>
                        <Gauge value={(Number.parseFloat((challengeHistory.reduce((total, next) => total + (next.requiredStructureFound?1:0) , 0)/(challengeHistory.length-notRunning)*100).toFixed(2)))} valueLabelStyle={{fontSize: '30px'}} minMaxLabelStyle={{display: 'none'}}  color={"#E4587E"} width={300} height={150} label="" />
                        <h1 className="text-xl font-bold text-basicColor2 -top-5 relative">Structure</h1>
                    </div>:null}
                {challenge.expectedDesignPatterns.length?
                    <div>
                        <Gauge value={(Number.parseFloat(((challengeHistory.reduce((total, next) => total + (next.designPatternsFound!?Object.values(next.designPatternsFound!).reduce((a, item) => a + (item?1:0), 0):0) , 0))/(challengeHistory.length-notRunning)).toFixed(2))*100)} minMaxLabelStyle={{display: 'none'}} valueLabelStyle={{fontSize: '30px'}}  color={"#E4D358"} width={300} height={150} label="" />
                        <h1 className="text-xl font-bold text-basicColor3 -top-5 relative">Avg. Patterns</h1>
                    </div>:null}
            </div>
        </div>
    )
}

export default ChallengeStatsOverview;
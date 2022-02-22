export interface executionMessage {
    success: boolean,
    compileError?: string,
    data?: {
        structure?: boolean,
        designPatterns?: {
            singleton?: boolean,
            factory?: boolean,
            observer?: boolean
        },
        totalTestsDone: number,
        successfulTests: number
    }
}


interface SubmitChallengeProps {
    onCodeRun: ()=>void,
    executionMessage: executionMessage|undefined
}

const SubmitChallenge = ({onCodeRun, executionMessage}:SubmitChallengeProps) => {
    return(
        <div className="h-1/6 p-6">
            {(executionMessage)?
            <>
                {(executionMessage.success)?
                <>
                <p className="text-green-600 font-bold text-left text-2xl">{`${executionMessage.data?.successfulTests}/${executionMessage.data?.totalTestsDone} Tests were Successful!`}</p>
                </>:
                <p className="text-red-600 font-bold text-left text-2xl">{executionMessage.compileError}</p>}
            </>:null}
            <div className="flex flex-row justify-end">
                <button className="border border-secondary border-solid font-bold text-lg text-secondary py-4 px-6" onClick={()=>onCodeRun()}>RUN</button>
                <button className="bg-primary font-bold text-lg text-white p-4 px-6 ml-4">SUBMIT</button>
            </div>
        </div>
    )
}

export default SubmitChallenge;
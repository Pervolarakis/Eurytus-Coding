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
                <p className="text-green-600 font-bold text-left text-lg">{`${executionMessage.data?.successfulTests}/${executionMessage.data?.totalTestsDone} Tests were Successful!`}</p>
                {(executionMessage.data?.structure!==undefined)?<p className="text-green-600 font-bold text-left text-lg">{`Structure ${executionMessage.data?.structure? 'found': 'not found!'}`}</p>:null}
                {
                    (executionMessage.data?.designPatterns!==undefined)?Object.keys(executionMessage.data.designPatterns).map((el,index)=>{
                        //@ts-ignore
                        return <p className="text-green-600 font-bold text-left text-lg">{`${el} ${executionMessage.data?.designPatterns[el] ? 'found': 'not found!'}`}</p>
                    }) :null
                }
                </>:
                <p className="text-red-600 font-bold text-left text-lg">{executionMessage.compileError}</p>}
            </>:null}
            <div className="flex flex-row justify-end">
                <button className="border border-secondary border-solid font-bold text-lg text-secondary py-4 px-6" onClick={()=>onCodeRun()}>RUN</button>
                <button className="bg-primary font-bold text-lg text-white p-4 px-6 ml-4">SUBMIT</button>
            </div>
        </div>
    )
}

export default SubmitChallenge;
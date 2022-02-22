const SubmitChallenge = () => {
    return(
        <div className="h-1/6 bg-white p-6">
            <p className="text-green-600 font-bold text-left text-2xl">5/7 Tests were Successful!</p>
            <div className="flex flex-row justify-end">
                <button className="border border-secondary border-solid font-bold text-lg text-secondary py-4 px-6">RUN</button>
                <button className="bg-primary font-bold text-lg text-white p-4 px-6 ml-4">SUBMIT</button>
            </div>
        </div>
    )
}

export default SubmitChallenge;
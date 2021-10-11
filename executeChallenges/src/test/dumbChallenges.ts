import mongoose from 'mongoose'

export const dumbChallenges = [
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`10,40,5`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java"
    },
    {
        _id: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,2`),
                    output: JSON.stringify(`100`)
                },
                {
                    input: JSON.stringify(`10,5,3`),
                    output: JSON.stringify(`150`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "js"
    },
    {
        _id: new mongoose.Types.ObjectId(),    
        expiresAt: "2014-02-01T00:00:00",
        status: 'pending',
        startsAt: Date.now(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,2`),
                    output: JSON.stringify(`100`)
                },
                {
                    input: JSON.stringify(`10,5,3`),
                    output: JSON.stringify(`150`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java"
    },
]
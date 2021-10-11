import mongoose from 'mongoose'
export const dumbChallenges = [
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,15`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`40,10,5`),
                    output: JSON.stringify(`55`)
                }
            ]
        }),
        template: 'solution(a,b,c){}',
        language: 'c',
        expectedStructure: '',
        expectedDesignPatterns: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Multiply Challenge",
        description: "Write a challenge that multiplies 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,2`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`4,5,2`),
                    output: JSON.stringify(`40`)
                }
            ]
        }),
        template: 'solution(a,b,c){}',
        language: 'js',
        expectedStructure: '',
        expectedDesignPatterns: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Multiply Challenge",
        description: "Write a challenge that multiplies 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,2`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`4,5,2`),
                    output: JSON.stringify(`40`)
                }
            ]
        }),
        language: 'c',
        template: 'solution(a,b,c){}',
        expectedStructure: '',
        expectedDesignPatterns: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Multiply Challenge",
        description: "Write a challenge that multiplies 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'approved',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,2`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`4,5,2`),
                    output: JSON.stringify(`40`)
                }
            ]
        }),
        language: 'java',
        template: 'solution(a,b,c){}',
        expectedStructure: '',
        expectedDesignPatterns: []
    },
    {
        _id: new mongoose.Types.ObjectId(),
        name: "Multiply Challenge2",
        description: "Write a challenge that multiplies 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'pending',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`5,10,2`),
                    output: JSON.stringify(`30`)
                },
                {
                    input: JSON.stringify(`4,5,2`),
                    output: JSON.stringify(`40`)
                }
            ]
        }),
        template: 'solution(a,b,c){}',
        language: 'java',
        expectedStructure: '',
        expectedDesignPatterns: []
    },
]
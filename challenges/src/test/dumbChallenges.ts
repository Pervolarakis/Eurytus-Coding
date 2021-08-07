import mongoose from 'mongoose'
export const dumbChallenges = [
    {
        name: "Sum Challenge",
        description: "Write a function that sums 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'pending',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: [5,10,15],
                    output: [30]
                },
                {
                    input: [10,40,5],
                    output: [55]
                }
            ]
        })
    },
    {
        name: "Multiply Challenge",
        description: "Write a challenge that multiplies 3 numbers",
        difficulty: 1,
        isPublic: true,
        expiresAt: "2014-02-01T00:00:00",
        status: 'pending',
        startsAt: Date.now(),
        creatorId: new mongoose.Types.ObjectId(),
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: [5,10,2],
                    output: [100]
                },
                {
                    input: [10,5,3],
                    output: [150]
                }
            ]
        })
    },
]
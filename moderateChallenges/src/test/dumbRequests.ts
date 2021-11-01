import mongoose from 'mongoose'
export const dumbRequests = [
    {
        _id: new mongoose.Types.ObjectId(),
        kind: 'create',
        challengeId: new mongoose.Types.ObjectId(),
        ownerId: new mongoose.Types.ObjectId(),
        data: JSON.stringify({
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
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
            }),
            template: 'solution(a,b,c){}',
            language: 'java',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        created_at: new Date().toISOString(),
        message: 'this is going to be a perfect new challenge'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        kind: 'delete',
        ownerId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        message: 'please delete this challenge',
        created_at: new Date().toISOString(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        kind: 'create',
        ownerId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        data: JSON.stringify({
            name: "Multiply Challenge2",
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
            }),
            language: 'c',
            template: 'solution(a,b,c){}',
            expectedStructure: '',
            expectedDesignPatterns: []
        }),
        message: 'please create this new challenge',
        created_at: new Date().toISOString(),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        kind: 'update',
        ownerId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        data: JSON.stringify({
            name: "Multiply Challenge2",
            description: "Write a challenge that multiplies 3 numbers"
        }),
        message: 'update my challenge',
        created_at: new Date().toISOString()
    },
]
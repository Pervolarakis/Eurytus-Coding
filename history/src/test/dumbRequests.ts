import mongoose from 'mongoose'
export const dumbRequests = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 1',
        completionDate: new Date().toISOString(),
        saveFileId: '11112222333444',
        outputTestsPassedScore: null,
        requiredStructureFound: true,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: false,
            observer: true
        }),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 2',
        completionDate: new Date().toISOString(),
        saveFileId: '11115552333444',
        outputTestsPassedScore: 66.34,
        requiredStructureFound: null,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: false,
            observer: false
        }),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 3',
        completionDate: new Date().toISOString(),
        saveFileId: '9995552333444',
        outputTestsPassedScore: 33.33,
        requiredStructureFound: null,
        designPatternsFound: null,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 1',
        completionDate: new Date().toISOString(),
        saveFileId: '66665552333444',
        outputTestsPassedScore: null,
        requiredStructureFound: null,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: true,
            observer: true
        }),
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId(),
        challengeName: 'Dumb challenge 1',
        completionDate: new Date().toISOString(),
        saveFileId: '11115552333444',
        outputTestsPassedScore: 66.34,
        requiredStructureFound: true,
        designPatternsFound: JSON.stringify({
            singleton: true,
            factory: true,
            observer: true
        }),
    },
    
]
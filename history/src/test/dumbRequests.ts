import mongoose from 'mongoose'
export const dumbRequests = [
    {
        _id: new mongoose.Types.ObjectId(),
        playerId: new mongoose.Types.ObjectId(),
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 1',
        score: '5/10'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        playerId: new mongoose.Types.ObjectId(),
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 2',
        score: '10/10'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        playerId: new mongoose.Types.ObjectId(),
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 3',
        score: '5/7'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        playerId: new mongoose.Types.ObjectId(),
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 4',
        score: '1/10'
    },
    {
        _id: new mongoose.Types.ObjectId(),
        playerId: new mongoose.Types.ObjectId(),
        testId: new mongoose.Types.ObjectId(),
        testName: 'test name 5',
        score: '4/6'
    },
    
]
import mongoose from 'mongoose';

interface historyDoc extends mongoose.Document{
    playerId: string,
    testId: string,
    testName: string,
    score: string
}

const historySchema = new mongoose.Schema({
    playerId: {
        type: String,
        required: true
    },
    testId: {
        type: String,
        required: true
    },
    testName: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    }
})

const History = mongoose.model<historyDoc>('History', historySchema);

export {History};
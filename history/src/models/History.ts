import mongoose from 'mongoose';

interface historyDoc extends mongoose.Document{
    userId: string,
    challengeId: string,
    challengeName: string,
    score: string
}

const historySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    challengeId: {
        type: String,
        required: true
    },
    challengeName: {
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
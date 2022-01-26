import mongoose from 'mongoose';

interface historyDoc extends mongoose.Document{
    userId: string,
    challengeId: string,
    challengeName: string,
    completionDate: string,
    saveFileId: string,
    language: string,
    outputTestsPassedScore: number | null,
    requiredStructureFound: boolean | null,
    designPatternsFound: string | null,
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
    completionDate: {
        type: String,
        required: true
    },
    saveFileId:{
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    outputTestsPassedScore: {
        type: Number
    },
    requiredStructureFound: {
        type: Boolean
    },
    designPatternsFound: {
        type: String
    },
})

const History = mongoose.model<historyDoc>('History', historySchema);

export {History};
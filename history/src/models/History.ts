import mongoose from 'mongoose';

interface historyDoc extends mongoose.Document{
    userId: string,
    userEmail: string,
    challengeId: string,
    completionDate: string,
    saveFileId: string,
    language: string,
    outputTestsPassedScore: number | null,
    requiredStructureFound: boolean | null,
    designPatternsFound: {
        singleton?: boolean,
        factory?: boolean,
        observer?: boolean
    } | null,
}

const historySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    challengeId: {
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
        type: {
            singleton: Boolean,
            factory: Boolean,
            observer: Boolean
        }
    },
})

const History = mongoose.model<historyDoc>('History', historySchema);

export {History};
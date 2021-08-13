import mongoose from 'mongoose';

interface PendingRequestDoc extends mongoose.Document{
    kind: string;
    challengeId?: string;
    data?: string;
    message: string;
    ownerId: string;
}

const pendingRequestSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: false
    },
    challengeId: {
        type: String,
        required: false
    },
    message: {
        type: String,
        required: true
    }
})

const PendingRequest = mongoose.model<PendingRequestDoc>('PendingRequest', pendingRequestSchema); 

export {PendingRequest};
import mongoose from 'mongoose';

interface PendingRequestDoc extends mongoose.Document{
    kind: string;
    challengeId?: string;
    data?: string;
    message: string;
    ownerId: string;
    created_at: string;
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
    created_at: {
        type: String,
        required: true
    },
    challengeId: {
        type: String,
        required: false
    },
    ownerEmail: {
        type: String,
        required: true
    },
    challengeName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const PendingRequest = mongoose.model<PendingRequestDoc>('PendingRequest', pendingRequestSchema); 

export {PendingRequest};
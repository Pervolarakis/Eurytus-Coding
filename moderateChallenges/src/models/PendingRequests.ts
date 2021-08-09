import mongoose from 'mongoose';

interface PendingRequestDoc extends mongoose.Document{
    kind: string;
    data: string;
}

const pendingRequestSchema = new mongoose.Schema({
    kind: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
})

const PendingRequest = mongoose.model<PendingRequestDoc>('PendingRequest', pendingRequestSchema); 

export {PendingRequest};
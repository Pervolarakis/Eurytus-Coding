import mongoose from 'mongoose';

interface ChallengeDoc extends mongoose.Document{
    name: string;
    description: string;
    creatorId: string;
    difficulty: number;
    isPublic: boolean;
    status: string;
    startsAt: Date;
    expiresAt: Date;
    tests: String;
}

const challengeSchma  = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creatorId: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    startsAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    tests: {
        type: String,
        required: true
    }
},{
    toJSON: {
        transform(doc,ret){
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})

const Challenge = mongoose.model<ChallengeDoc>('Challenge', challengeSchma);

export {Challenge}
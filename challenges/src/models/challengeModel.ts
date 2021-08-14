import mongoose from 'mongoose';
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'

interface ChallengeDoc extends mongoose.Document{
    name: string;
    description: string;
    creatorId: string;
    difficulty: number;
    isPublic: boolean;
    status: string;
    startsAt: Date;
    expiresAt: Date;
    tests: string;
    version: number;
    language: string
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
    },
    language: {
        type: String,
        enum: ["js", "c", "java"],
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

challengeSchma.set('versionKey', 'version');
challengeSchma.plugin(updateIfCurrentPlugin)

const Challenge = mongoose.model<ChallengeDoc>('Challenge', challengeSchma);

export {Challenge}
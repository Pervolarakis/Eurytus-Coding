import mongoose from 'mongoose'
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'

const supportedDesignPatterns = ["singleton", "factory", "observer"];

interface ChallengeDoc extends mongoose.Document{
    expectedOutputTests: string;
    expectedStructure: string;
    expectedDesignPatterns: string[];
    status: string;
    startsAt: Date;
    expiresAt: Date;
    version: number;
    language: string;
    ownerId: string;
}

const challengeSchema = new mongoose.Schema({
    expectedOutputTests: {
        type: String
    },
    expectedStructure: {
        type: String
    },
    expectedDesignPatterns: {
        type: [String],
        enum: supportedDesignPatterns
    },
    ownerId: {
        type: String,
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
    language: {
        type: String,
        enum: ["js", "c", "java"],
        required: true    
    }
},{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
}
})

challengeSchema.set('versionKey', 'version');
challengeSchema.plugin(updateIfCurrentPlugin);

const Challenge = mongoose.model<ChallengeDoc>('Challenge', challengeSchema);

export {Challenge}
import mongoose from 'mongoose'
import {updateIfCurrentPlugin} from 'mongoose-update-if-current'

interface ChallengeDoc extends mongoose.Document{
    tests: string;
    status: string;
    startsAt: Date;
    expiresAt: Date;
    version: number;
}

const challengeSchema = new mongoose.Schema({
    tests: {
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
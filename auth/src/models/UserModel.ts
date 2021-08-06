import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    matchPasswords(enteredPassword: string): Promise<boolean>;
    getSignedJwtToken(): string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'User'
    }
},{
    toJSON: {
        transform(doc,ret){
            delete ret.password
            delete ret.__v
            ret.id = ret._id
            delete ret._id
        }
    }
})

userSchema.pre('save', async function (done) {
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(this.get('password'), salt);
        this.set('password', hashed);
    }
})

userSchema.methods.matchPasswords = async function(enteredPassword: string){
  return await bcrypt.compare(enteredPassword, this.get('password'));
}

userSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this.get('_id'), email: this.get('email')}, process.env.JWT_KEY!);
}

const User = mongoose.model<UserDoc>('User', userSchema);

export {User}
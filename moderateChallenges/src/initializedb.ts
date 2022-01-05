import mongoose from 'mongoose';
import { PendingRequest } from './models/PendingRequests';

export const initializeDb = async () => {
    console.log('TO DELETE --- Initializing Pending requests Service!')
    const pendingRequests = [
        {
            _id: new mongoose.Types.ObjectId('61d597c6ae966569e7c1a0a9'),
            kind: 'create',
            data: JSON.stringify({
                name: "Multiply Challenge2",
                description: "Write a function that multiplies 3 numbers",
                difficulty: 1,
                isPublic: true,
                expiresAt: "2014-02-01T00:00:00",
                status: 'pending',
                startsAt: Date.now(),
                creatorId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
                expectedOutputTests: JSON.stringify({
                    "challenge" : [
                        {
                            input: JSON.stringify(`solution(5,10,15)`),
                            output: JSON.stringify(`750`)
                        },
                        {
                            input: JSON.stringify(`solution(10,40,5)`),
                            output: JSON.stringify(`2000`)
                        }
                    ]
                }),
                template: 'solution(a,b,c){}',
                language: 'js',
                expectedStructure: '',
                expectedDesignPatterns: []
            }),
            ownerId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
            created_at: new Date().toISOString(),
            message: 'please create this new challenge'
        },
        {
            _id: new mongoose.Types.ObjectId('61d597ed9f8e1a6b026c0b04'),
            kind: 'create',
            data: JSON.stringify({
                name: "Sum Challenge2",
                description: "Write a function that takes 2 numbers as arguments and divides the first one by the second one",
                difficulty: 1,
                isPublic: true,
                expiresAt: "2014-02-01T00:00:00",
                status: 'pending',
                startsAt: Date.now(),
                creatorId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
                expectedOutputTests: JSON.stringify({
                    "challenge" : [
                        {
                            input: JSON.stringify(`solution(10,2)`),
                            output: JSON.stringify(`5`)
                        },
                        {
                            input: JSON.stringify(`solution(40,10)`),
                            output: JSON.stringify(`4`)
                        }
                    ]
                }),
                template: 'solution(){}',
                language: 'js',
                expectedStructure: '',
                expectedDesignPatterns: []
            }),
            ownerId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
            created_at: new Date().toISOString(),
            message: 'please create this new challenge'
        },
        {
            _id: new mongoose.Types.ObjectId('61d597f6828c62e215558beb'),
            kind: 'update',
            challengeId: new mongoose.Types.ObjectId('61b07f8a611ccb9622c258b4').toString(),
            data: JSON.stringify({
                difficulty: 2,
            }),
            ownerId: new mongoose.Types.ObjectId('61b07a4e8ac34e37f17e97b5'),
            created_at: new Date().toISOString(),
            message: 'please create this new challenge'
        },
        {
            _id: new mongoose.Types.ObjectId('61d598002fb4af4bd3c50171'),
            kind: 'delete',
            challengeId: new mongoose.Types.ObjectId('61b07f82c2d7ad3a19087d2f').toString(),
            ownerId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
            created_at: new Date().toISOString(),
            message: 'please create this new challenge'
        }
    ]
    const request = await PendingRequest.findById('61d597f6828c62e215558beb');
    if(!request){
        pendingRequests.map(async (el,index)=>{
            const request = new PendingRequest(el)
            await request.save();
        })
    }
}
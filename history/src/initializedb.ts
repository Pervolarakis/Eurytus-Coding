import mongoose from 'mongoose';
import { History } from './models/History';

export const initializeDb = () => {
    console.log('TO DELETE --- Initializing History Service!')
    const historyData = [
        //challenge 1
        {
            userId: new mongoose.Types.ObjectId('61b0a74bd429ce3a35373d5d'),
            challengeId: new mongoose.Types.ObjectId('61b07f82c2d7ad3a19087d2f'),
            // challengeName: 'Sum Challenge',
            completionDate: new Date().toISOString(),
            saveFileId: '11115552333441',
            language: 'js',
            userEmail: 'demomail1@gmail.com',
            outputTestsPassedScore: 66.34,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a750e2f7b22deacb807c'),
            challengeId: new mongoose.Types.ObjectId('61b07f82c2d7ad3a19087d2f'),
            // challengeName: 'Sum Challenge',
            completionDate: new Date().toISOString(),
            saveFileId: '11115552333442',
            userEmail: 'demomail2@gmail.com',
            language: 'js',
            outputTestsPassedScore: 80,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        //challenge 2
        {
            userId: new mongoose.Types.ObjectId('61b0a74bd429ce3a35373d5d'),
            challengeId: new mongoose.Types.ObjectId('61b0a841dcfdddbcd35caba3'),
            // challengeName: 'Private Sum Challenge',
            completionDate: new Date().toISOString(),
            saveFileId: '11115552333443',
            language: 'js',
            userEmail: 'demomail1@gmail.com',
            outputTestsPassedScore: 43,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a770a4bdcd0c2b4f538a'),
            challengeId: new mongoose.Types.ObjectId('61b0a841dcfdddbcd35caba3'),
            // challengeName: 'Private Sum Challenge',
            completionDate: new Date().toISOString(),
            userEmail: 'demomail4@gmail.com',
            saveFileId: '11115552333448',
            language: 'js',
            outputTestsPassedScore: 100,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        //challenge 3
        {
            userId: new mongoose.Types.ObjectId('61b0a750e2f7b22deacb807c'),
            challengeId: new mongoose.Types.ObjectId('61b07f8a611ccb9622c258b4'),
            // challengeName: 'Sum Challenge 2',
            userEmail: 'demomail2@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '14115552333444',
            language: "java",
            outputTestsPassedScore: 90,
            requiredStructureFound: false,
            designPatternsFound: null,
        },
        {
            userId: new mongoose.Types.ObjectId(),
            challengeId: new mongoose.Types.ObjectId('61b07f8a611ccb9622c258b4'),
            // challengeName: 'Sum Challenge 2',
            userEmail: 'aaa@aaa.com',
            completionDate: new Date().toISOString(),
            saveFileId: '14115552333444',
            language: "java",
            outputTestsPassedScore: 95,
            requiredStructureFound: true,
            designPatternsFound: null,
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a770a4bdcd0c2b4f538a'),
            challengeId: new mongoose.Types.ObjectId('61b07f8a611ccb9622c258b4'),
            // challengeName: 'Sum Challenge 2',
            userEmail: 'demomail4@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '11114552333444',
            language: "java",
            outputTestsPassedScore: 66.34,
            requiredStructureFound: false,
            designPatternsFound: null,
        },
        //challenge 4
        {
            userId: new mongoose.Types.ObjectId('61b0a750e2f7b22deacb807c'),
            challengeId: new mongoose.Types.ObjectId('61b07f9453ac6a09dffd9705'),
            // challengeName: 'Multiply Challenge',
            completionDate: new Date().toISOString(),
            userEmail: 'demomail2@gmail.com',
            saveFileId: '11119952333444',
            outputTestsPassedScore: 100,
            language: "java",
            requiredStructureFound: null,
            designPatternsFound: {
                factory: false
            },
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a75931ac8d42cd35c846'),
            challengeId: new mongoose.Types.ObjectId('61b07f9453ac6a09dffd9705'),
            // challengeName: 'Multiply Challenge',
            userEmail: 'demomail3@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '11225552333444',
            language: "java",
            outputTestsPassedScore: 90,
            requiredStructureFound: null,
            designPatternsFound: {
                factory: true
            },
        },
        //challenge 5
        {
            userId: new mongoose.Types.ObjectId('61b0a774e21abd04b27098e8'),
            challengeId: new mongoose.Types.ObjectId('61b07f9911b8e709381ca4ee'),
            // challengeName: 'Array Data test',
            userEmail: 'demomail5@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '11115552333334',
            language: "java",
            outputTestsPassedScore: 75,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a75931ac8d42cd35c846'),
            challengeId: new mongoose.Types.ObjectId('61b07f9911b8e709381ca4ee'),
            // challengeName: 'Array Data test',
            userEmail: 'demomail3@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '11115552333884',
            language: "java",
            outputTestsPassedScore: 50,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        //challenge 6
        {
            userId: new mongoose.Types.ObjectId('61b0a77853ced44fbddc8506'),
            challengeId: new mongoose.Types.ObjectId('61b07f9f2d57ab33c622345b'),
            // challengeName: 'Array Data Test',
            userEmail: 'demomail6@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '13335552333444',
            language: "js",
            outputTestsPassedScore: 99,
            requiredStructureFound: null,
            designPatternsFound: null,
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a774e21abd04b27098e8'),
            challengeId: new mongoose.Types.ObjectId('61b07f9f2d57ab33c622345b'),
            // challengeName: 'Array Data Test',
            userEmail: 'demomail5@gmail.com',
            completionDate: new Date().toISOString(),
            saveFileId: '22115552333444',
            language: "js",
            outputTestsPassedScore: 20,
            requiredStructureFound: null,
            designPatternsFound:  null,
        },
        {
            userId: new mongoose.Types.ObjectId('61b0a75931ac8d42cd35c846'),
            challengeId: new mongoose.Types.ObjectId('61b07f9f2d57ab33c622345b'),
            // challengeName: 'Array Data Test',
            userEmail: 'demomail3@gmail.com',
            language: "js",
            completionDate: new Date().toISOString(),
            saveFileId: '99115552333444',
            outputTestsPassedScore: 55,
            requiredStructureFound: null,
            designPatternsFound:  null,
        },
    ]
    historyData.map(async(el, index)=>{
        const history = new History(el);
        await history.save()
    })
}




import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { History } from '../../models/History';

it('successfully returns all challenges participants', async()=>{

    const history1 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId('61b07d810d86f0c5529ba8dc'),
        // challengeName: 'Dumb challenge 1',
        language: 'java',
        userEmail: 'demomail5@gmail.com',
        challengeOwnerId: new mongoose.Types.ObjectId(),
        completionDate: new Date().toISOString(),
        saveFileId: '11112222333444',
        running: true,
        outputTestsPassedScore: null,
        requiredStructureFound: true,
        designPatternsFound: {
            singleton: true,
            factory: false,
            observer: true
        },
    });
    const history2 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId('61b07f9453ac6a09dffd9705'),
        // challengeName: 'Dumb challenge 2',
        language: 'js',
        userEmail: 'demomail1@gmail.com',
        challengeOwnerId: new mongoose.Types.ObjectId(),
        completionDate: new Date().toISOString(),
        running: true,
        saveFileId: '11115552333444',
        outputTestsPassedScore: 66.34,
        requiredStructureFound: null,
        designPatternsFound: {
            singleton: true,
            factory: false,
            observer: false
        },
    });
    const history3 = new History({
        userId: new mongoose.Types.ObjectId(),
        challengeId: new mongoose.Types.ObjectId('61b07f9453ac6a09dffd9705'),
        // challengeName: 'Dumb challenge 3',
        language: 'java',
        userEmail: 'demomail2@gmail.com',
        running: true,
        completionDate: new Date().toISOString(),
        saveFileId: '9995552333444',
        challengeOwnerId: new mongoose.Types.ObjectId(),
        outputTestsPassedScore: 33.33,
        requiredStructureFound: null,
        designPatternsFound: null,
    });

    await history1.save();
    await history2.save();
    await history3.save();

    const result = await request(app)
        .get('/api/v1/history/getallparticipants')
        .set('Cookie', global.signin(new mongoose.Types.ObjectId(), 'admin'))
        .expect(200)
    expect(result.body.data).toContainEqual({ _id: '61b07f9453ac6a09dffd9705', count: 2 })
    expect(result.body.data).toContainEqual({ _id: '61b07d810d86f0c5529ba8dc', count: 1 })
})
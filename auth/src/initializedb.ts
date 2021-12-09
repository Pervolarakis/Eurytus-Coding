import mongoose from 'mongoose';
import { User } from './models/UserModel';

export const initializeDb = async () => {
    console.log('TO DELETE --- Initializing Auth Service!')
    const users = [{
        _id: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
        email: 'test123@gmail.com',
        password: '123456',
        firstName: 'john',
        lastName: 'doe',
        role: 'user'
    },
    {
        _id: new mongoose.Types.ObjectId('61b07a4e8ac34e37f17e97b5'),
        email: 'test124@gmail.com',
        password: 'abcdefg',
        firstName: 'mike',
        lastName: 'pervolarakis',
        role: 'user'

    },{
        _id: new mongoose.Types.ObjectId('61b07d810d86f0c5529ba8dc'),
        email: 'admin@gmail.com',
        password: 'password',
        firstName: 'mike',
        lastName: 'pervolarakis',
        role: 'admin'
    },
    {
        _id: new mongoose.Types.ObjectId('61b0a74bd429ce3a35373d5d'),
        email: 'demomail1@gmail.com',
        password: '123456',
        firstName: 'john',
        lastName: 'doe',
        role: 'user'
    },
    {
        _id: new mongoose.Types.ObjectId('61b0a750e2f7b22deacb807c'),
        email: 'demomail2@gmail.com',
        password: 'abcdefg',
        firstName: 'mike',
        lastName: 'pervolarakis',
        role: 'user'

    },{
        _id: new mongoose.Types.ObjectId('61b0a75931ac8d42cd35c846'),
        email: 'demomail3@gmail.com',
        password: 'password',
        firstName: 'mike',
        lastName: 'pervolarakis',
        role: 'user'
    },
    {
        _id: new mongoose.Types.ObjectId('61b0a770a4bdcd0c2b4f538a'),
        email: 'demomail4@gmail.com',
        password: '123456',
        firstName: 'john',
        lastName: 'doe',
        role: 'user'
    },
    {
        _id: new mongoose.Types.ObjectId('61b0a774e21abd04b27098e8'),
        email: 'demomail5@gmail.com',
        password: 'abcdefg',
        firstName: 'mike',
        lastName: 'pervolarakis',
        role: 'user'

    },{
        _id: new mongoose.Types.ObjectId('61b0a77853ced44fbddc8506'),
        email: 'demomail6@gmail.com',
        password: 'password',
        firstName: 'mike',
        lastName: 'pervolarakis',
        role: 'user'
    },
    ]
    const user = await User.findById('56cb91bdc3464f14678934ca');
    if(!user){
        users.map(async (el,index)=>{
            const user = new User({_id: el._id, email: el.email, password: el.password, firstName: el.firstName, lastName: el.lastName, role: el.role});
            await user.save()
        })
    }
}
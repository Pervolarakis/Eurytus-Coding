import mongoose from 'mongoose';
import { Challenge } from './models/challengeModel';

export const initializeDb = async () => {
    console.log('TO DELETE --- Initializing Challenge Service!')
    const challenges = [
        {
            _id: new mongoose.Types.ObjectId('61b07f82c2d7ad3a19087d2f'),
            name: "Sum Challenge",
            description: "Write a function that sums 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`solution(5,10,15)`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`solution(10,40,5)`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            template: 'solution(){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        },
        {
            _id: new mongoose.Types.ObjectId('61b0a841dcfdddbcd35caba3'),
            name: "Private Sum Challenge",
            description: "Write a function that sums 3 numbers",
            difficulty: 3,
            isPublic: false,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`solution(5,10,15)`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`solution(10,40,5)`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            template: 'solution(){}',
            language: 'js',
            expectedStructure: '',
            expectedDesignPatterns: []
        },
        {
            _id: new mongoose.Types.ObjectId('61b07f8a611ccb9622c258b4'),
            name: "Sum Challenge 2",
            description: "Write a function that sums 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId('61b07a4e8ac34e37f17e97b5'),
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`new Solution().solution(5,10,15)`),
                        output: JSON.stringify(`30`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(10,40,5)`),
                        output: JSON.stringify(`55`)
                    }
                ]
            }),
            language: "java",
            template: `class Solution {}`,
            expectedStructure: '[{"blockType":"Base","expanded":true,"children":[{"title":"Interface","className":"furnitureFactory","blockType":"interface","superClass":"","modifiers":[\"abstract interface\"],"expanded":true,"children":[{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]},{"title":"Class","blockType":"class","modifiers":[],"className":"factorySubClass","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"furnitureFactory","expanded":true},{"title":"Method","blockType":"method","modifiers":[\"public\"],"parameters":"","returnType":"Furniture","name":"getFurniture"}]},{"title":"Interface","className":"Furniture","blockType":"interface","superClass":"","modifiers":[\"abstract interface\"]},{"title":"Class","blockType":"class","modifiers":[],"className":"Chair","superClass":"","name":"","interfaces":"","expanded":true,"children":[{"title":"Implements","blockType":"implements","className":"Furniture"}]}]}]',
            expectedDesignPatterns: []
        },
        {
            _id: new mongoose.Types.ObjectId('61b07f9453ac6a09dffd9705'),
            name: "Multiply Challenge",
            description: "Write a function that multiplies 3 numbers",
            difficulty: 1,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId('56cb91bdc3464f14678934ca'),
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`new Solution().solution(5,10,15)`),
                        output: JSON.stringify(`750`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(10,40,5)`),
                        output: JSON.stringify(`2000`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(10,40,12)`),
                        output: JSON.stringify(`4800`)
                    }
                ]
            }),
            language: "java",
            expectedStructure: '',
            template: `class Solution {}`,
            expectedDesignPatterns: ['factory']
        },
        {
            _id: new mongoose.Types.ObjectId('61b07f9911b8e709381ca4ee'),
            name: "Array Data test",
            description: "Write a function that takes an array (any type) as argument and returns it",
            difficulty: 3,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId('61b07a4e8ac34e37f17e97b5'),
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`new Solution().solution(new Integer[]{0,1,0,2,1,0,1,3,2,1,2,1})`),
                        output: JSON.stringify(`new Integer[]{0,1,0,2,1,0,1,3,2,1,2,1}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new Integer[]{4,2,0,3,2,5})`),
                        output: JSON.stringify(`new Integer[]{4,2,0,3,2,5}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new Character[]{'a','b','c','d','e','f'})`),
                        output: JSON.stringify(`new Character[]{'a','b','c','d','e','f'}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new String[]{"i","hate","my life","right now"})`),
                        output: JSON.stringify(`new String[]{"i","hate","my life","right now"}`)
                    }
                    ,
                    {
                        input: JSON.stringify(`new Solution().solution(new Byte[]{1,0,1,1})`),
                        output: JSON.stringify(`new Byte[]{1,0,1,1}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new Float[]{1.34f,0.56f,1.99f,16.99f,17.43f})`),
                        output: JSON.stringify(`new Float[]{1.34f,0.56f,1.99f,16.99f,17.43f}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new Double[]{1.34534443,0.4355345334,1.12321321312312,1.43553343435})`),
                        output: JSON.stringify(`new Double[]{1.34534443,0.4355345334,1.12321321312312,1.43553343435}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new Long[]{13234243l,2342443l,124234243l,1243234243l})`),
                        output: JSON.stringify(`new Long[]{13234243l,2342443l,124234243l,1243234243l}`)
                    },
                    {
                        input: JSON.stringify(`new Solution().solution(new Short[]{1000,2000,5000,10000})`),
                        output: JSON.stringify(`new Short[]{1000,2000,5000,10000}`)
                    }
                ]
            }),
            expectedStructure: '',
            template: `class Solution {}`,
            expectedDesignPatterns: [],
            language: "java"
        },
        {
            _id: new mongoose.Types.ObjectId('61b07f9f2d57ab33c622345b'),
            name: "Array Data Test",
            description: "Write a function that takes an array (any type) as argument and returns it",
            difficulty: 3,
            isPublic: true,
            expiresAt: "2014-02-01T00:00:00",
            status: 'approved',
            startsAt: Date.now(),
            creatorId: new mongoose.Types.ObjectId('61b07d810d86f0c5529ba8dc'),
            expectedOutputTests: JSON.stringify({
                "challenge" : [
                    {
                        input: JSON.stringify(`solution([1,0,1,1])`),
                        output: JSON.stringify(`[1,0,1,1]`)
                    },
                    {
                        input: JSON.stringify(`solution(['a',"b","c",'d'])`),
                        output: JSON.stringify(`["a","b","c",'d']`)
                    },
                    {
                        input: JSON.stringify(`solution({"key": "val", "key2": "val2"})`),
                        output: JSON.stringify(`{'key': 'val', 'key2': 'val2'}`)
                    }
                ]
            }),
            
            expectedStructure: '',
            expectedDesignPatterns: [],
            language: "js",
            template: ''
        }
    ]
    const challenge = await Challenge.findById('61b07f82c2d7ad3a19087d2f');
    if(!challenge){
        challenges.map(async (el,index)=>{
            const challenge = new Challenge({
                _id: el._id, 
                name: el.name, 
                description: el.description, 
                difficulty: el.difficulty, 
                isPublic: el.isPublic, 
                expiresAt: el.expiresAt, 
                status: el.status, 
                startsAt: el.startsAt,
                creatorId: el.creatorId,
                expectedOutputTests: el.expectedOutputTests,
                expectedStructure: el.expectedStructure,
                expectedDesignPatterns: el.expectedDesignPatterns,
                language: el.language,
                template: el.template
            })
            await challenge.save();
        })
    }
}
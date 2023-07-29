import mongoose from 'mongoose';

export const jsDataTypesTest = [
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
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
        isPublic: true
    }
];

export const jsDataTypesTestSolutions = [
    JSON.stringify(`
        const solution = (el) => {
            return el;
        }
    `),
]
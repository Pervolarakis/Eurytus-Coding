import mongoose from 'mongoose'

export const javaDataTypesTest = [
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
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
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    },
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})`),
                    output: JSON.stringify(`new Solution().solution([0,1,0,2,1,0,1,3,2,1,2,1])`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(new int[]{4,2,0,3,2,5})`),
                    output: JSON.stringify(`new Solution().solution([4,2,0,3,2,5])`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    },
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(new ArrayList() {{add("mike");add("nick");add("15");}})`),
                    output: JSON.stringify(`Arrays.asList("mike", "nick", "15")`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(Arrays.asList("foo", "bar"))`),
                    output: JSON.stringify(`Arrays.asList("foo", "bar")`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    },
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(new HashMap<String, Integer>() {{put("key1", 5);put("key2", 5);}})`),
                    output: JSON.stringify(`new HashMap<String, Integer>() {{put("key1", 5);put("key2", 5);}}`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(Map.ofEntries(
                        new AbstractMap.SimpleEntry<String, String>("name", "John"),
                        new AbstractMap.SimpleEntry<String, String>("city", "budapest"),
                        new AbstractMap.SimpleEntry<String, String>("zip", "000000"),
                        new AbstractMap.SimpleEntry<String, String>("home", "1231231231")
                      ))`),
                    output: JSON.stringify(`Map.of("name", "John", "city", "budapest","zip", "000000", "home", "1231231231")`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(Map.of("key1", "value"))`),
                    output: JSON.stringify(`Map.of("key1", "value")`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    },
    {
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        ownerId: new mongoose.Types.ObjectId(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(Set.of("foo", "bar", "baz"))`),
                    output: JSON.stringify(`Set.of("foo", "bar", "baz")`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    },
]

export const javaDataTypesTestSolutions = [
    JSON.stringify(`
    class Solution {
        public <T> T[] solution(T[] arr){
            return arr;
        }
    }
    `),
    JSON.stringify(`
    class Solution {
        public int[] solution(int[] arr){
            return arr;
        }
    }
    `),
    JSON.stringify(`
    class Solution {
        public <T> List<T> solution(List<T> arr){
            return arr;
        }
    }
    `),
    JSON.stringify(`
    class Solution {
        public <T,J> Map<T,J> solution(Map<T,J> arr){
            return arr;
        }
    }
    `),
    JSON.stringify(`
    class Solution {
        static <T> Set<T> solution(Set<T> arr){
            return arr;
        }
    }
    `),

]
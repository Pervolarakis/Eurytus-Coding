import mongoose from 'mongoose'
export const advancedJavaChallenges = [
    {   
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        ownerId: new mongoose.Types.ObjectId(),
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution("ab", ".*")`),
                    output: JSON.stringify(`true`)
                },
                {
                    input: JSON.stringify(`new Solution().solution("aa", "a*")`),
                    output: JSON.stringify(`true`)
                },
                {
                    input: JSON.stringify(`new Solution().solution("aa", "a")`),
                    output: JSON.stringify(`false`)
                },
                {
                    input: JSON.stringify(`new Solution().solution("mississippi", "mis*is*p*.")`),
                    output: JSON.stringify(`false`)
                },
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
        ownerId: new mongoose.Types.ObjectId(),
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        expectedOutputTests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`new Solution().solution(new int[]{0,1,0,2,1,0,1,3,2,1,2,1})`),
                    output: JSON.stringify(`6`)
                },
                {
                    input: JSON.stringify(`new Solution().solution(new int[]{4,2,0,3,2,5})`),
                    output: JSON.stringify(`9`)
                }
            ]
        }),
        expectedStructure: '',
        expectedDesignPatterns: [],
        language: "java",
        isPublic: true
    }
]

export const advancedJavaChallengesSolutions = [
    JSON.stringify(
        `
        class Solution {
            public boolean solution(String text, String pattern) {
                if (pattern.isEmpty()) return(text.isEmpty());
                boolean first_match = (!text.isEmpty() &&
                                    (pattern.charAt(0) == text.charAt(0) || pattern.charAt(0) == '.'));
            
                if (pattern.length() >= 2 && pattern.charAt(1) == '*'){
                    return ((solution(text, pattern.substring(2)) ||
                            (first_match && solution(text.substring(1), pattern))));
                } else {
                    return (first_match && solution(text.substring(1), pattern.substring(1)));
                }
            }
        }`
    ),
    JSON.stringify( 
        `
        class Solution {
            public int solution(int[] height) {
                int result = 0;
                int start = 0;
                int end = height.length - 1;
                while (start < end) {
                    if (height[start] <= height[end]) {
                        int current = height[start];
                        while (height[++start] < current) {
                            result += current - height[start];
                        }
                    } else {
                        int current = height[end];
                        while(height[--end] < current) {
                            result += current - height[end];
                        }
                    }
                }
                return result;
            }
        }`
    )
]
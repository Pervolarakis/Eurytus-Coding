import mongoose from 'mongoose'
export const advancedJavaChallenges = [
    {   
        id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: `"ab", ".*"`,
                    output: `true`
                },
                {
                    input: `"aa", "a*"`,
                    output: `true`
                },
                {
                    input: `"aa", "a"`,
                    output: `false`
                },
                {
                    input: `"mississippi", "mis*is*p*."`,
                    output: `false`
                },
            ]
        }),
        language: "java"
    }
]

export const advancedJavaChallengesSolutions = [
    JSON.parse(JSON.stringify({
        algo: 
        `public boolean solution(String text, String pattern) {
            if (pattern.isEmpty()) return(text.isEmpty());
            boolean first_match = (!text.isEmpty() &&
                                   (pattern.charAt(0) == text.charAt(0) || pattern.charAt(0) == '.'));
        
            if (pattern.length() >= 2 && pattern.charAt(1) == '*'){
                return ((solution(text, pattern.substring(2)) ||
                        (first_match && solution(text.substring(1), pattern))));
            } else {
                return (first_match && solution(text.substring(1), pattern.substring(1)));
            }
        }`
    }))
]
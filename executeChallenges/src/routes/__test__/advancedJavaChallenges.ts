import mongoose from 'mongoose'
export const advancedJavaChallenges = [
    {   
        _id: new mongoose.Types.ObjectId(),
        status: 'approved',
        startsAt: Date.now(),
        expiresAt: "2014-02-01T00:00:00",
        tests: JSON.stringify({
            "challenge" : [
                {
                    input: JSON.stringify(`"ab", ".*"`),
                    output: JSON.stringify(`true`)
                },
                {
                    input: JSON.stringify(`"aa", "a*"`),
                    output: JSON.stringify(`true`)
                },
                {
                    input: JSON.stringify(`"aa", "a"`),
                    output: JSON.stringify(`false`)
                },
                {
                    input: JSON.stringify(`"mississippi", "mis*is*p*."`),
                    output: JSON.stringify(`false`)
                },
            ]
        }),
        language: "java"
    }
]

export const advancedJavaChallengesSolutions = [
    JSON.stringify({
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
    })
]
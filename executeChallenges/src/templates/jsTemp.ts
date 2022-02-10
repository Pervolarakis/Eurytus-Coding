export const jsTemp = (args: string, func: string, challengeOwner: string, challengeSolver: string) => `
    /**Challenge owner: ${challengeOwner}*/
    /**Challenge solver: ${challengeSolver}*/
/**user code starts here*/
${func}
/**user code ends here*/
    let testsPassed=0;
    ${args}
    console.log(testsPassed);
`
export const jsTemp = (args: string, func: string) => `
    /**user code starts here*/
    ${func}
    /**user code ends here*/
    let testsPassed=0;
    ${args}
    console.log(testsPassed);
`
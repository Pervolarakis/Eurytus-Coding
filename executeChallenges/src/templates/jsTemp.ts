export const jsTemp = (args: string, func: string) => `
    ${func}
    let testsPassed=0;
    ${args}
    console.log(testsPassed);
`
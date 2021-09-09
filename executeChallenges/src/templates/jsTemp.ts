export const jsTemp = (args: string, func: string) => `
    ${func}
    console.log(solution(${args}));
`
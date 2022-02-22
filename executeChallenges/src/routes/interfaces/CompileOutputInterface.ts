export interface classDiagram{
    className: string,
    modifiers: string[],
    superClass: string,
    interfaces: string[],
    constructors: {
        modifiers: string[],
        parameters: string[]
    }[],
    methods: {
        name: string,
        modifiers: string[],
        returnType: string,
        parameters: string[],
        overrides: string|boolean
    }[],
    fields: {
        modifiers: string[],
        name: string,
        type: string
    }[]
};

export interface compileOutput {
    classDiagram: classDiagram[],
    testsPassed: number
}
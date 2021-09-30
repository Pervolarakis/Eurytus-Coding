interface classesInfo{
    className: string,
    modifiers: string[],
    superClass: string,
    interfaces: string[],
    constructors: classesInfoConstructor[],
    methods: classesInfoMethod[],
    fields: classesInfoField[]
};

interface classesInfoConstructor{
    modifiers: string[],
    parameters: string[]
}

interface classesInfoMethod{
    name: string,
    modifiers: string[],
    returnType: string,
    parameters: string[],
    overrides: string|boolean
}

interface classesInfoField{
    modifiers: string[],
    name: string,
    type: string
}

const sampleStructTest:classesInfo = {
    
    className: "TestEntity2",
    modifiers: [],
    superClass: "TestEntitySuper",
    interfaces: ["TestInt"],
    constructors: [
    {
    modifiers: ["public"],
    parameters: ["java.lang.String", "[I", "java.util.Map"]
    }],
    methods: [
        {
        name: "getNumber",
        modifiers: ["public"],
        returnType: "int",
        parameters: [],
        overrides: "TestEntitySuper"
    }],
    fields: [
    {
        modifiers: ["private"],
        name: "m",
        type: "java.util.Map"
    }
    ]

        
    
}

export const checkStructure = (classes: classesInfo[]) => {
    let found = false;
    classes.map((currentClass,index)=>{
        if(currentClass.className===sampleStructTest.className){
            if(JSON.stringify(currentClass.modifiers)===JSON.stringify(sampleStructTest.modifiers)){
                if(currentClass.superClass===sampleStructTest.superClass){
                    if(sampleStructTest.methods.every(el=>currentClass.methods.some(method=>method.name===el.name && JSON.stringify(method.modifiers)===JSON.stringify(el.modifiers) && method.returnType===el.returnType && JSON.stringify(method.parameters)===JSON.stringify(el.parameters) && method.overrides===el.overrides))){
                        if(sampleStructTest.constructors.every(el=>currentClass.constructors.some(constructor=> JSON.stringify(el.modifiers)===JSON.stringify(constructor.modifiers)&&JSON.stringify(el.parameters)===JSON.stringify(constructor.parameters)))){
                            if(sampleStructTest.fields.every(el=>currentClass.fields.some(field=>JSON.stringify(el.modifiers)===JSON.stringify(field.modifiers)&&el.name===field.name&&el.type===field.type))){
                                found = true;
                            }
                        }
                    }
                }
            }
        }
    })
    return found;
}
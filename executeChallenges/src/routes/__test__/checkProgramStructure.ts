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
    parameters: ["java.lang.String", "java.util.Map", "[I"]
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

const sampleFromJSON = JSON.parse(`[{"className":"TestEntity2","modifiers":[],"superClass":"TestEntitySuper","interfaces":["TestInt"],"constructors":[{"modifiers":[\"public\"],"parameters":[\"java.lang.String\",\"[I\",\"java.util.Map\"]}],"methods":[{"modifiers":[\"public\"],"name":"getStr","returnType":"java.lang.String","parameters":[]},{"modifiers":[\"public\",\"static\"],"name":"testMethod","returnType":"void","parameters":[\"int\",\"java.lang.Integer\",\"java.lang.String\"]}],"fields":[{"modifiers":[\"private\"],"type":"java.util.Map","name":"m"},{"modifiers":[\"private\"],"type":"java.lang.String","name":"str"}]}]`)

const compareArrays = (arr1:string[], arr2:string[])=>{
    if(arr1.sort().join(',')=== arr2.sort().join(',')){
        return true;
    }
    return false;
}

export const checkStructure = (classes: classesInfo[], targetClass: classesInfo) => {
    // targetClass=sampleStructTest;
    let found = false;
    classes.map((currentClass,index)=>{
        
        if(currentClass.className===targetClass.className){
            // console.log('idio name')
            // console.log(JSON.stringify(currentClass));
            // console.log(JSON.stringify(targetClass));
            if(compareArrays(currentClass.modifiers,targetClass.modifiers)){
                // console.log('idio modifiers')
                if(currentClass.superClass===targetClass.superClass){
                    // console.log('idio superclass')
                    // console.log(targetClass.methods);
                    // console.log(currentClass.methods);
                    if(targetClass.methods.every(el=>currentClass.methods.some(method=>method.name===el.name && compareArrays(method.modifiers,el.modifiers) && method.returnType===el.returnType && compareArrays(method.parameters,el.parameters)))){
                        console.log('idio methods')
                        console.log(targetClass.constructors)
                        console.log(currentClass.constructors)
                        if(targetClass.constructors.every(el=>currentClass.constructors.some(constructor=> compareArrays(el.modifiers,constructor.modifiers)&& compareArrays(el.parameters,constructor.parameters)))){
                            console.log('idio constructors')
                            if(targetClass.fields.every(el=>currentClass.fields.some(field=>compareArrays(el.modifiers,field.modifiers)&&el.name===field.name&&el.type===field.type))){
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
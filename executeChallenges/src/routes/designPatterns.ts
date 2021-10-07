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



export const detectSingleton = (classes: classesInfo[]) => {
    let found = false;
    //for each class
    classes.map((currentClass,index)=>{
        //for each field
        for(let i=0; i<currentClass.fields.length; i++){
            //find a private static field with type same as class name
            if(currentClass.fields[i].modifiers.indexOf("private static")>-1 && currentClass.fields[i].type===currentClass.className){
                //for each class construcotr
                for(let i=0; i<currentClass.constructors.length; i++){
                    //find a private one
                    if(currentClass.constructors[i].modifiers.indexOf("private")>-1){
                        //for each method
                        for(let i=0; i<currentClass.methods.length; i++){
                            //find a public static method with return type equal to the class name
                            if(currentClass.methods[i].modifiers.indexOf("public")>-1 && currentClass.methods[i].modifiers.indexOf("static")>-1 && currentClass.methods[i].returnType===currentClass.className){
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

export const detectFactory = (classes: classesInfo[]) => {
    let found = false;
    //for each class
    classes.map((currentClass,index)=>{
        //find an interface or abstract class
        if(currentClass.modifiers.indexOf("abstract interface")>-1 || currentClass.modifiers.indexOf("abstract")>-1){
            //for each class
            for(let i=0; i<classes.length; i++){
                //find one that implements or extends the above class
                if(classes[i].superClass===currentClass.className||classes[i].interfaces.indexOf(currentClass.className)>-1){
                    //for each class
                    for(let j=0; j<classes.length; j++){
                        //find an interface different than the first one
                        if(classes[j].modifiers.indexOf("abstract interface")>-1 &&classes[j].className!==currentClass.className){
                            //for each interface method
                            for(let k=0; k<classes[j].methods.length; k++){
                                //find a method that has the original (abstract/interface) as return type
                                if(classes[j].methods[k].returnType===currentClass.className){
                                    //for each class
                                    for(let l=0; l<classes.length; l++){
                                        //find a class that implements the above class
                                        if(classes[l].superClass===classes[j].className||classes[l].interfaces.indexOf(classes[j].className)>-1){
                                            found=true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    return found;
}

export const detectObserver = (classes: classesInfo[]) => {
    let found = false;
    //for each class
    classes.map((currentClass,index)=>{
        //find an interface or abstract class
        if(currentClass.modifiers.indexOf("abstract interface")>-1 || currentClass.modifiers.indexOf("abstract")>-1){
            //for each of its fields
            for(let l=0; l<classes.length; l++){
                if(classes[l].superClass===currentClass.className||classes[l].interfaces.indexOf(currentClass.className)>-1){
                    for(let i=0; i<classes[l].fields.length; i++){
                        //for each class
                        for(let j=0; j<classes.length; j++){
                            //if interface has a field with type equal to class
                            if(classes[l].fields[i].type===classes[j].className && classes[j].className!==classes[l].className){
                                //for each of the classes fields
                                for(let k=0; k<classes[j].fields.length; k++){
                                    //check if this class has a field with type equal to <Observer>
                                    if(classes[j].fields[k].type===`List<${currentClass.className}>`){
                                        found=true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
            
    })
    return found;
}

export const detectDesignPattern = {
    'singleton': detectSingleton,
    'factory': detectFactory,
    'observer': detectObserver
}
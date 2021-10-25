import {classDiagram} from '../interfaces/CompileOutputInterface';

const compareArrays = (arr1:string[], arr2:string[])=>{
    const array1 = arr1.map(el=>el.replace(" ",""))
    const array2 = arr2.map(el=>el.replace(" ",""))
    if(array1.sort().join(',')=== array2.sort().join(',')){
        return true;
    }
    return false;
}

export const checkStructure = (classes: classDiagram[], expectedClasses: classDiagram[]) => {
    // console.log(targetClass);
    // targetClass=sampleStructTest;
    let found = 0;
    expectedClasses.map(targetClass => {
        classes.map((currentClass,index)=>{
            // console.log(currentClass);
            if(currentClass.className===targetClass.className){
                // console.log('idio name')
                // console.log(JSON.stringify(currentClass));
                // console.log(JSON.stringify(targetClass));
                if(compareArrays(currentClass.interfaces,targetClass.interfaces)){
                    // console.log('idio interfaces')
                    // console.log(targetClass.modifiers);
                    // console.log(currentClass.modifiers);
                    if(compareArrays(currentClass.modifiers,targetClass.modifiers)){
                        // console.log('idio modifiers')
                        if(currentClass.superClass===targetClass.superClass){
                            // console.log('idio superclass')
                            console.log(targetClass.methods);
                            console.log(currentClass.methods);
                            if(targetClass.methods.every(el=>currentClass.methods.some(method=>method.name===el.name && compareArrays(method.modifiers,el.modifiers) && method.returnType===el.returnType && compareArrays(method.parameters,el.parameters)))){
                                console.log('idio methods')
                                // console.log(targetClass.constructors)
                                // console.log(currentClass.constructors)
                                if(targetClass.constructors.every(el=>currentClass.constructors.some(constructor=> compareArrays(el.modifiers,constructor.modifiers)&& compareArrays(el.parameters,constructor.parameters)))){
                                    // console.log('idio constructors')
                                    // console.log(targetClass.fields)
                                    // console.log(currentClass.fields)
                                    if(targetClass.fields.every(el=>currentClass.fields.some(field=>compareArrays(el.modifiers,field.modifiers)&&el.name===field.name&&el.type===field.type))){
                                        // console.log('idio FIELDS')
                                        found++;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        
        })
    })
    if(found===expectedClasses.length){
        return true;
    }else{
        return false;
    }
}
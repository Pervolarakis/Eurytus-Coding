export const convertStructureFormat = (treeDataArg: any) => {
    const treeData = JSON.parse(treeDataArg);
    // console.log(treeData.replaceAll("\"[\"","[\"").replaceAll("\"]\"","\"]").replaceAll("\" ","\"").replaceAll(" \"","\""));
    let tempClass = [];
    for(let el in treeData[0].children){
        //@ts-ignore
        tempClass.push(...printClass(treeData[0].children[el]));
    }
    return tempClass;
}

const printClass = (el:any):any=>{
    let tempArr = [];
    const tempObj = {
        className: el.className,
        modifiers: el.modifiers,
        superClass: el.superClass,
        interfaces: [],
        constructors: [],
        methods: [],
        fields: []
    }
    //console.log(el.children)
    for(let child in el.children){
        //console.log(el.children[child])
        if(el.children[child].blockType==='field'){
            // console.log(el.children[child])
            //@ts-ignore
            tempObj.fields.push({modifiers: el.children[child].modifiers, name: el.children[child].name, type: el.children[child].type})
        }
        if(el.children[child].blockType==='constructor'){
            //@ts-ignore
            tempObj.constructors.push({modifiers: el.children[child].modifiers, parameters: (el.children[child].children && el.children[child].children.length)?el.children[child].children.map(a=>a.name).join(',').split(','):[]})
        }
        if(el.children[child].blockType==='method'){
            let modifiers = el.children[child].modifiers;
            console.log(el.children[child].modifiers==='["public"]')
            if(el.blockType === 'interface' && el.children[child].modifiers==='["public"]'){
                modifiers = '["public", "abstract"]'
            }
            //@ts-ignore
            tempObj.methods.push({modifiers: modifiers, name: el.children[child].name, returnType: el.children[child].returnType, parameters: (el.children[child].children && el.children[child].children.length)?el.children[child].children.map(a=>a.name).join(',').split(','):[]})
        }
        if(el.children[child].blockType==='implements'){
            //@ts-ignore
            tempObj.interfaces.push(el.children[child].className)
        }
        if(el.children[child].blockType==='class'||el.children[child].blockType==='interface'){
            //@ts-ignore
            tempArr.push(...printClass({...el.children[child],className: el.className+'$'+el.children[child].className}))
        }
        
    }
    
    if(tempObj.constructors.length===0 && tempObj.modifiers!=='["abstract interface"]'){
        //@ts-ignore
        tempObj.constructors.push({ modifiers: [], parameters: [] })
    }
    tempArr.push(tempObj);
    return tempArr;
    

}
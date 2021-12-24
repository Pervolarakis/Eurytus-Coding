// import "./ClassBuilder.css";
import SortableTree, { changeNodeAtPath, removeNodeAtPath, TreeItem } from "react-sortable-tree";
import { Children, useEffect, useState } from "react";
import 'react-sortable-tree/style.css';
import { DndProvider , DragSource } from "react-dnd";
import PropTypes from 'prop-types';
import {HTML5Backend} from 'react-dnd-html5-backend';
import ConstructorBlock from "./Blocks/ConstructorBlock";
import FieldBlock from "./Blocks/FieldBlock";
import ImplementBlock from "./Blocks/ImplementBlock";
import ClassBlock from "./Blocks/ClassBlock";
import MethodBlock from "./Blocks/MethodBlock";
import { RiDeleteBin6Line } from 'react-icons/ri';
import InterfaceBlock from "./Blocks/InterfaceBlock";
import ArgumentBlock from "./Blocks/argumentBlock";


const ClassBuilder = () => {

    const [treeData, setTreeData] = useState<TreeItem[]>([
        {
            blockType: "Base",
            expanded: true,
            children: [{
                modifiers: '[]',
                className: "",
                blockType: "class",
                superClass: "",
                interfaces: [],
                expanded: true,
                children: [
                {
                    className: "",
                    blockType: "implements"
                },
                {
                    name: "",
                    blockType: "field",
                    modifiers: '["public"]',
                    type: ""
                },
                {
                    name: "",
                    blockType: "field",
                    modifiers: '["public"]',
                    type: ""
                },
                {
                    parameters: "",
                    blockType: "constructor",
                    modifiers: '["public"]',
                    expanded: true,
                    children: [{
                        name: "",
                        blockType: "argument"}
                    ]
                },
                {
                    modifiers: '["public"]',
                    name: "",
                    returnType: "",
                    blockType: "method",
                    parameters: "",
                    expanded: true,
                    children: [{
                    name: "",
                    blockType: "argument"}
                    ]
                },
                { name: "", blockType: "method", modifiers: '["public", "static"]',returnType: "", parameters: "", expanded: true, children: [{
                    name: "",
                    blockType: "argument"}
                    ]}]
        
            },{
                className: "",
                blockType: "interface",
                superClass: "",
                modifiers: '["abstract interface"]'
            }]}])
    const externalNodeType = "yourNodeType";

    const externalNodeSpec = {
        // This needs to return an object with a property `node` in it.
        // Object rest spread is recommended to avoid side effects of
        // referencing the same object in different trees.
        beginDrag: (componentProps: any) => {try{return({ node: { ...componentProps.node } })}catch(err){}}
    };

    const externalNodeCollect = (connect: any /* , monitor */) => ({
        connectDragSource: connect.dragSource()
        // Add props via react-dnd APIs to enable more visual
        // customization of your component
        // isDragging: monitor.isDragging(),
        // didDrop: monitor.didDrop(),
    });
    const getNodeKey = ({ treeIndex }:any) => treeIndex;
    const externalNodeBaseComponent = ({ connectDragSource, node }:any) => {
        
        return connectDragSource(
        <div
            className={`${node.blockType!=='constructor'?node.blockType:'constr'} draggableBlock flex-1 m-1`}
        >
            <div className="h-12 flex justify-center items-center">
            {node.title}
            </div>
            
        </div>,
        { dropEffect: "copy" }
        );
        
        }
        externalNodeBaseComponent.propTypes = {
        node: PropTypes.shape({ title: PropTypes.string }).isRequired,
        connectDragSource: PropTypes.func.isRequired
        };
    
    const YourExternalNodeComponent = DragSource(
        externalNodeType,
        externalNodeSpec,
        externalNodeCollect
        )(externalNodeBaseComponent);

    const getBlock = (node: TreeItem, path: (string | number)[], blockType: string)=>{
        if(blockType==='Base'){
            return <div>Java Program</div>
        }
        if(blockType==='field'){
            return <FieldBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
        }
        if(blockType==='implements'){
            return <ImplementBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
        }
        if(blockType==='class'){
            return <ClassBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
        }
        if(blockType==='method'){
            return <MethodBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
        }
        if(blockType==='interface'){
            return <InterfaceBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
        }
        if(blockType==='argument'){
            return <ArgumentBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
        }
        return <ConstructorBlock node={node} path={path} setTreeData={(data: TreeItem[])=>setTreeData(data)} treeData={treeData}/>
    }


    const transformData = () => {
        console.log(JSON.stringify(treeData).replaceAll("\"[\\\"","[\\\"").replaceAll("\\\"]\"","\\\"]").replaceAll("\" ","\"").replaceAll(" \"","\"").replaceAll("\"[]\"","[]"));
    }

    useEffect(()=>{transformData()},[treeData])


    return(
        <>
            <div>
            <DndProvider backend={HTML5Backend}>
                <div className="flex flex-col">
                    <div className="h-full w-full flex">
                        <YourExternalNodeComponent node={{ title: "Class", blockType: "class", modifiers: "[]", className: "", superClass: "",name: "", interfaces: ""}}/>
                        <YourExternalNodeComponent node={{ title: "Constructor", blockType: "constructor",parameters: "",modifiers:'["public"]' }} />
                        <YourExternalNodeComponent node={{ title: "Method", blockType: "method",modifiers: '["private", "static"]', parameters: "", returnType: "", name: "" }} />
                        <YourExternalNodeComponent node={{ title: "Field", blockType: "field",modifiers: '["private"]', type: "",name: "", }} />
                        <YourExternalNodeComponent node={{ title: "Implements", blockType: "implements", className: "" }} />     
                        <YourExternalNodeComponent node={{ title: "Interface", className: "", blockType: "interface", superClass: "", modifiers: '["abstract interface"]'}} /> 
                        <YourExternalNodeComponent node={{ title: "Argument", name: "", blockType: "argument"}} />                 
                    </div>
                    <div className="h-80">
                    <SortableTree
                        treeData={treeData}
                        dndType={externalNodeType}
                        onChange={(treeData) => setTreeData(treeData)}
                        isVirtualized={false}
                        canDrop={({ node, nextParent }) => {
                            if (nextParent && node.blockType!=='Base') {
                                if ((nextParent.blockType === "class"&&node.blockType!=='argument'&&node.blockType!=='class')||(nextParent.blockType === "Base"&&(node.blockType==="class"||node.blockType==='interface')||(nextParent.blockType === "interface"&&node.blockType==='method')||((nextParent.blockType==='method'||nextParent.blockType==='constructor')&&node.blockType==='argument'))) {
                                    return true;
                                }
                            }
                            return false;
                        }}
                        generateNodeProps={({ node, path }) => ({
                        className: `${node.blockType!=='constructor'?node.blockType:'constr'} draggableBlock`,
                        
                        title: getBlock(node, path, node.blockType),
                        buttons: (node.blockType!=='Base')?[
                            <RiDeleteBin6Line
                                type='icon'
                                name='circle-checked'
                                color='black'
                                size='30'
                                onClick={()=> {setTreeData(removeNodeAtPath({
                                    treeData: treeData,
                                    path,
                                    getNodeKey,
                                    // ignoreCollapsed: false
                                }))}}
                        />
                        ]:[]
                        })}
                    />
                    </div>
                </div>
            </DndProvider>
            </div>
            {/* <button style={{display: 'block'}} onClick={()=>transformData()}>Submit</button> */}

        </>
    )
}

export default (ClassBuilder)
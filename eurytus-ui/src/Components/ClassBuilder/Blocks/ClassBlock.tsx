import {TreeItem, changeNodeAtPath} from "react-sortable-tree";

const ClassBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
    const getNodeKey = ({ treeIndex }:any) => treeIndex;

    return(
        <div>
            <form style={{display: 'flex'}}>
                <select
                    value={(typeof(node.modifiers)=='string')?node.modifiers:JSON.stringify(node.modifiers)}
                    onChange={(event)=>{
                        const modifiers = event.target.value;
                        setTreeData(changeNodeAtPath({
                            treeData: treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, modifiers }
                        }))
                    }}
                >
                    <option value='[]'></option>
                    <option value='["static"]'>static</option>
                    <option value='["final"]'>final</option>
                    <option value='["abstract"]'>abstract</option>
                    <option value='["static final"]'>static final</option>
                </select>
                <h4 style={{margin: 'auto'}}>Class</h4>
                <input
                    style={{ fontSize: "1.1rem", width: "100px" }}
                    value={node.className}
                    placeholder="Class Name"
                    onChange={(event) => {
                        const className = event.target.value;
                        
                        setTreeData(changeNodeAtPath({
                            treeData: treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, className }
                        }))
                    }}
                />
                <h4 style={{margin: 'auto'}}>Extends</h4>
                <input
                    style={{ fontSize: "1.1rem" }}
                    value={node.superClass}
                    placeholder="Super Class"
                    onChange={(event) => {
                        const superClass = event.target.value;

                        setTreeData(changeNodeAtPath({
                            treeData: treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, superClass }
                        }))
                        }}
                />
            </form>
        </div>
    )
}

export default ClassBlock;
import {TreeItem, changeNodeAtPath} from "react-sortable-tree";

const InterfaceBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
    const getNodeKey = ({ treeIndex }:any) => treeIndex;

    return(
        <div style={{display: 'flex'}}>
            <h4 style={{margin: 'auto'}}>Interface</h4>
            <form style={{display: 'flex'}}>
                <input
                    style={{ fontSize: "1.1rem" }}
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

export default InterfaceBlock;
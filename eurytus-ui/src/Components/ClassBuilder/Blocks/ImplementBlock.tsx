import {TreeItem, changeNodeAtPath} from "react-sortable-tree";

const ImplementBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
    const getNodeKey = ({ treeIndex }:any) => treeIndex;

    return(
        <div style={{display: 'flex'}}>
            <h4 style={{margin: 'auto'}}>Implements</h4>
            <form>
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
            </form>
        </div>
    )
}

export default ImplementBlock;
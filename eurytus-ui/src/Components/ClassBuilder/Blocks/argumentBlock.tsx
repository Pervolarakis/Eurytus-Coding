import {TreeItem, changeNodeAtPath} from "react-sortable-tree";

const ArgumentBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
    const getNodeKey = ({ treeIndex }:any) => treeIndex;

    return(
        <div style={{display: 'flex'}}>
            <h4 style={{margin: 'auto'}}>Argument</h4>
            <form style={{display: 'flex'}}>
                <input
                    style={{ fontSize: "1.1rem" }}
                    value={node.name}
                    placeholder="Arg type"
                    onChange={(event) => {
                        const name = event.target.value;
                        setTreeData(changeNodeAtPath({
                            treeData: treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, name }
                        }))
                        }}
                />
            </form>
        </div>
    )
}

export default ArgumentBlock;
import {TreeItem, changeNodeAtPath} from "react-sortable-tree";

const FieldBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
    const getNodeKey = ({ treeIndex }:any) => treeIndex;

    return(
        <div>
            <form>
                <select
                    value={node.modifiers}
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
                    <option value='["public static"]'>public static</option>
                    <option value='["private static"]'>private static</option>
                    <option value='["protected static"]'>protected static</option>
                    <option value='["public final"]'>public final</option>
                    <option value='["private final"]'>private final</option>
                    <option value='["protected final"]'>protected final</option>
                    <option value='["public"]'>public</option>
                    <option value='["private"]'>private</option>
                </select>
                <input
                    style={{ fontSize: "1.1rem", width: "100px" }}
                    value={node.type}
                    placeholder="Field Type"
                    onChange={(event) => {
                        const type = event.target.value;
                        
                        setTreeData(changeNodeAtPath({
                            treeData: treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, type }
                        }))
                    }}
                />
                <input
                    style={{ fontSize: "1.1rem" }}
                    value={node.name}
                    placeholder="Field Name"
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

export default FieldBlock;
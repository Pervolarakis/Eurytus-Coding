import {TreeItem, changeNodeAtPath} from "ndanvers-react-sortable-tree";

const MethodBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
    const getNodeKey = ({ treeIndex }:any) => treeIndex;

    return(
        <div>
            <form>
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
                    <option value='["public", "static"]'>public static</option>
                    <option value='["private", "static"]'>private static</option>
                    <option value='["protected", "static"]'>protected static</option>
                    <option value='["public", "final"]'>public final</option>
                    <option value='["private", "final"]'>private final</option>
                    <option value='["protected", "final"]'>protected final</option>
                    <option value='["public", "static", "final"]'>public static final</option>
                    <option value='["private", "static", "final"]'>private static final</option>
                    <option value='["protected", "static", "final"]'>protected static final</option>
                    <option value='["public", "abstract"]'>public abstract</option>
                    <option value='["private", "abstract"]'>private abstract</option>
                    <option value='["protected", "abstract"]'>protected abstract</option>
                    <option value='["public"]'>public</option>
                    <option value='["private"]'>private</option>
                </select>
                <input
                    style={{ fontSize: "1.1rem", width: '100px' }}
                    value={node.returnType}
                    placeholder="Return Type"
                    onChange={(event) => {
                        const returnType = event.target.value;

                        setTreeData(changeNodeAtPath({
                            treeData: treeData,
                            path,
                            getNodeKey,
                            newNode: { ...node, returnType }
                        }))
                        }}
                />
                <input
                    style={{ fontSize: "1.1rem", width: '150px' }}
                    value={node.name}
                    placeholder="Name"
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

export default MethodBlock;
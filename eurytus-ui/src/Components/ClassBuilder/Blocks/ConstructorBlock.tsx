import {TreeItem, changeNodeAtPath} from "ndanvers-react-sortable-tree";

const FieldBlock = ({ node, path, setTreeData, treeData }: {node: TreeItem, path: (string | number)[], setTreeData(str: TreeItem[]):void, treeData: TreeItem[]}) => {
    
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
                    <option value='["public"]'>public</option>
                    <option value='["private"]'>private</option>
                    <option value='["protected"]'>protected</option>
                </select>
                <h4 style={{margin: 'auto'}}>Constructor</h4>
            </form>
        </div>
    )
}

export default FieldBlock;
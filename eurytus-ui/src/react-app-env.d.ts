/// <reference types="react-scripts" />
declare module 'ndanvers-react-sortable-tree' {
    
export function removeNodeAtPath(
    data: FullTree & TreePath & {
        getNodeKey: GetNodeKeyFunction,
        ignoreCollapsed?: boolean | undefined,
    },
): TreeItem[];

export function changeNodeAtPath(
    data: FullTree & TreePath & {
        newNode: Function | any,
        getNodeKey: GetNodeKeyFunction,
        ignoreCollapsed?: boolean | undefined,
    },
): TreeItem[];

export interface GetTreeItemChildren {
    done: (children: TreeItem[]) => void;
    node: TreeItem;
    path: NumberOrStringArray;
    lowerSiblingCounts: number[];
    treeIndex: number;
}

export type GetTreeItemChildrenFn = (data: GetTreeItemChildren) => void;

export interface TreeItem {
    title?: React.ReactNode | undefined;
    subtitle?: React.ReactNode | undefined;
    expanded?: boolean | undefined;
    children?: TreeItem[] | GetTreeItemChildrenFn | undefined;
    [x: string]: any;
}



interface ThemeTreeProps {
    style?: React.CSSProperties | undefined;
    innerStyle?: React.CSSProperties | undefined;
    reactVirtualizedListProps?: Partial<ListProps> | undefined;
    scaffoldBlockPxWidth?: number | undefined;
    slideRegionSize?: number | undefined;
    rowHeight?: ((info: NodeData & Index) => number) | number | undefined;
    nodeContentRenderer?: NodeRenderer | undefined;
    placeholderRenderer?: PlaceholderRenderer | undefined;
}

export interface ThemeProps extends ThemeTreeProps {
    treeNodeRenderer?: TreeRenderer | undefined;
}

export interface ReactSortableTreeProps extends ThemeTreeProps {
    treeData: TreeItem[];
    onChange(treeData: TreeItem[]): void;
    getNodeKey?(data: TreeNode & TreeIndex): string | number;
    generateNodeProps?(data: ExtendedNodeData): { [index: string]: any };
    onMoveNode?(data: NodeData & FullTree & OnMovePreviousAndNextLocation): void;
    onVisibilityToggle?(data: OnVisibilityToggleData): void;
    onDragStateChanged?(data: OnDragStateChangedData): void;
    maxDepth?: number | undefined;
    rowDirection?: 'ltr' | 'rtl' | undefined;
    canDrag?: ((data: ExtendedNodeData) => boolean) | boolean | undefined;
    canDrop?(data: OnDragPreviousAndNextLocation & NodeData): boolean;
    canNodeHaveChildren?(node: TreeItem): boolean;
    theme?: ThemeProps | undefined;
    searchMethod?(data: SearchData): boolean;
    searchQuery?: string | any | undefined;
    searchFocusOffset?: number | undefined;
    onlyExpandSearchedNodes?: boolean | undefined;
    searchFinishCallback?(matches: NodeData[]): void;
    dndType?: string | undefined;
    shouldCopyOnOutsideDrop?: boolean | ((data: ShouldCopyData) => boolean) | undefined;
    className?: string | undefined;
    isVirtualized?: boolean | undefined;
}

declare const SortableTree: React.ComponentType<ReactSortableTreeProps>;

export const SortableTreeWithoutDndContext: React.ComponentType<ReactSortableTreeProps>;

export default SortableTree;

};

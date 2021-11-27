import * as React from "react";
import { BinTreeNode } from "./TreeNode";

import "./TreeOutput.scss"

export interface TreeTextProps {
    treeNode: BinTreeNode | null
    onChange: (newTreeNode: BinTreeNode) => void
}

export const TreeText: React.FunctionComponent<TreeTextProps> = (props) => {
    return (
        <div className="">
            <textarea rows={20} cols={120} value={JSON.stringify(props.treeNode,null, 2)}></textarea>
        </div>
    );
}
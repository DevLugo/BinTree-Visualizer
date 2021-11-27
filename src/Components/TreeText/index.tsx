import * as React from "react";
import { BinTreeNode } from "../../Types/BinTreeNode";
import { Input } from 'antd';
import "./../TreeOutput/TreeOutput.scss"
const { TextArea } = Input;

export interface TreeTextProps {
    treeNode: BinTreeNode | null
    onChange: (newTreeNode: BinTreeNode) => void
}

export const TreeText: React.FunctionComponent<TreeTextProps> = (props) => {
    return (
        <div className="">
            <TextArea rows={20} value={JSON.stringify(props.treeNode,null, 2)}></TextArea>
        </div>
    );
}
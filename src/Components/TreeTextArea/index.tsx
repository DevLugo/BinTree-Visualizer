import * as React from "react";
import { BinTreeNode } from "../../Types/BinTreeNode";
import { Input } from 'antd';
import "./../TreeOutput/TreeOutput.scss"
import { useDispatch, useSelector } from "react-redux";
import { selectTree, setHasParsingError, setTreeNode, setTreeText, setDeepLevel } from "../../store/TreeSlice";
const { TextArea } = Input;

export const TreeTextArea: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {hasParsingError,treeText} = useSelector(selectTree);

    const convertObjToClass = (obj:any, deepLevel:number, parent?: string) => {
        let leftChild: BinTreeNode;
        let rightChild: BinTreeNode;
        if (!Object.keys(obj).includes("left"))
            throw new TypeError("Left attribute is required")
        if (!Object.keys(obj).includes("right"))
            throw new TypeError("right attribute is required")

        if (obj.left)
            leftChild = convertObjToClass(obj.left, deepLevel+1, obj.id)!
        
        if (obj.right)
            rightChild = convertObjToClass(obj.right,deepLevel+1, obj.id)!

        const tree = new BinTreeNode(
            obj.id, 
            leftChild! || null,
            rightChild! || null,
        );
        dispatch(setDeepLevel({
            deepLevel:deepLevel,
            parent:parent
        }))
        return tree;
    }

    return (
            <TextArea 
                rows={20} 
                style={{backgroundColor: hasParsingError?"#ffccc7":"#f6ffed"}}
                value={treeText}
                onChange={(newVal) => {
                    let parsedObj;
                    try {
                        parsedObj = JSON.parse(newVal.target.value);
                    } catch (error) {
                        parsedObj = {};
                    }
                    dispatch(setTreeText(newVal.target.value))
                    try {
                        const parsedTree = convertObjToClass(parsedObj,0);
                        if(!parsedTree)
                            dispatch(setHasParsingError(true))
                    
                        /*dispatch(setDeepLevel({
                            deepLevel:0,
                            parent:parsedTree.id
                        }))*/
                        dispatch(setTreeNode(parsedTree))
                        dispatch(setHasParsingError(false))
                    } catch (error:any) {
                        dispatch(setHasParsingError(true))
                    }
                }}
            ></TextArea>
    );
}
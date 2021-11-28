import * as React from "react";
import { BinTreeNode } from "../../Types/BinTreeNode";
import { Input, message } from 'antd';
import "./index.scss"
import { useDispatch, useSelector } from "react-redux";
import { selectTree, setHasParsingError, setTreeNode, setTreeText, setDeepLevel } from "../../store/TreeSlice";
const { TextArea } = Input;

export const TreeTextArea: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const {hasParsingError,treeText} = useSelector(selectTree);

    /**
     * Recursive function to parse/transform an objeto into a BinTreeNode
     * @param obj objet that wil try to transform into a BinTreeNode.
     * @param deepLevel deepLevel is necesary to identify what is the deeper level on this full binTreeNode
     * @param parent node parent id
     * @returns BinTreeNode
     */
    const convertObjToBinTreeNode = (obj:any, deepLevel:number, parent?: string): BinTreeNode  => {
        let leftChild: BinTreeNode;
        let rightChild: BinTreeNode;

        // Validate required attributes
        if (!Object.keys(obj).includes("left"))
            throw new TypeError("Left attribute is required")
        if (!Object.keys(obj).includes("right"))
            throw new TypeError("right attribute is required")

        //If left or right has some value, then try to iterate recursively
        if (obj.left)
            leftChild = convertObjToBinTreeNode(obj.left, deepLevel+1, obj.id)!
        
        if (obj.right)
            rightChild = convertObjToBinTreeNode(obj.right,deepLevel+1, obj.id)!

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
                        const parsedTree = convertObjToBinTreeNode(parsedObj,0);
                        if(!parsedTree)
                            dispatch(setHasParsingError(true))

                        dispatch(setTreeNode(parsedTree))
                        dispatch(setHasParsingError(false))
                    } catch (error:any) {
                        message.error(error.message);
                        dispatch(setHasParsingError(true))
                    }
                }}
            ></TextArea>
    );
}
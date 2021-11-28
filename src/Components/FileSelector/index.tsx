import React, {useEffect, useState} from "react";
import { BinTreeNode } from "../../Types/BinTreeNode";
import { Upload, message, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import {
    setDeepLevel,
    setHasParsingError, setTreeNode, setTreeText,
  } from "../../store/TreeSlice";

const { TextArea } = Input;

interface TreeInputState {
    treeText: string
}
            
export default function FileSelector(){
    const dispatch = useDispatch();
    const [fileText, setFileText] = useState<string>('');
    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    const parseArrayToTree = (arrayFormat: any[], deepLevel:number, parent?: string): BinTreeNode => {
        try {
        const [id, left, right] = arrayFormat;
        
        let leftChild = null;
        let rightChild = null;

        if (Array.isArray(left)) {
            leftChild = parseArrayToTree(left, deepLevel+1, id)
        }
        if (Array.isArray(right)) {
            rightChild = parseArrayToTree(right,deepLevel+1, id)
        }

        dispatch(setHasParsingError(false))
        console.log("deepLevel",deepLevel)
        dispatch(setDeepLevel({
            deepLevel:deepLevel,
            parent:parent
        }))
        return new BinTreeNode(
            id,
            leftChild!,
            rightChild!
        );
        
        } catch (error) {
            dispatch(setHasParsingError(true))
            return new BinTreeNode(
                "false",
                null,
                null,
            );
        }
    }

    useEffect(() => {
        if(!!fileText){
            console.log(fileText)
            console.log(typeof fileText)
            let treeArrayFormat: any[] = JSON.parse(fileText);
            const arrayTree = parseArrayToTree(treeArrayFormat,0);
            dispatch(setTreeText(JSON.stringify(arrayTree, null, 2)))
            dispatch(setTreeNode(arrayTree))
        }
    }, [fileText])

    const inputProps = {
        name: 'file',
        beforeUpload: (file:any) => {
            const reader = new FileReader();
            reader.onload = (e:any) => {
                setFileText(reader.result as string);
                //dispatch(setTreeText(reader.result as string));
                //convert();
            };
            reader.readAsText(file);

            // Prevent upload
            return false;
        },
    }

    return (
        <>
            <Upload {...inputProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </>
    )
}
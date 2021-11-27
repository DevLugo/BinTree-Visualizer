import * as React from "react";
import { BinTreeNode } from "../../Types/BinTreeNode";
import { Upload, message, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export interface TreeInputProps {
    onChange: (newTreeNode: BinTreeNode) => void
}
interface TreeInputState {
    treeText: string
}
            
export default class TreeInput extends React.Component<TreeInputProps, TreeInputState>{
    constructor(props: TreeInputProps) {
        super(props);
        this.state = {
            treeText: "",
        }
    }

    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    parseArrayToTree(arrayFormat: any[]): BinTreeNode {
        const [id, left, right] = arrayFormat;
        let leftChild = null;
        let rightChild = null;

        if (Array.isArray(left)) {
            leftChild = this.parseArrayToTree(left)
        }
        if (Array.isArray(right)) {
            rightChild = this.parseArrayToTree(right)
        }

        return new BinTreeNode(
            id,
            leftChild,
            rightChild
        );
    }

    convert = () => {
        // After you implement parseArrayToTree above, uncomment the below code
        let treeArrayFormat: any[] = JSON.parse(this.state.treeText);
        this.props.onChange(this.parseArrayToTree(treeArrayFormat));

        // After you implement parseArrayToTree above, comment the below code
        /*let treeNodeFormat: BinTreeNode = JSON.parse(this.state.treeText);
        console.log(treeNodeFormat)
        this.props.onChange(treeNodeFormat);
        console.log("ELEFANTE")*/
    }

    render() {
        const props = {
            name: 'file',
            beforeUpload: (file:any) => {
                const reader = new FileReader();
                reader.onload = (e:any) => {
                    this.setState({treeText:reader.result as string});
                    this.convert();
                };
                reader.readAsText(file);

                // Prevent upload
                return false;
            },
        }
        return (
            <>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
            </>
        )
    }
}

import * as React from "react";
import { BinTreeNode } from "./TreeNode";

export interface InputFileSelectorProps {
    onChange: (newTreeNode: BinTreeNode) => void
}
interface InputFileSelectorState {
    treeText: string
}

export class InputFileSelector extends React.Component<InputFileSelectorProps, InputFileSelectorState>{
    constructor(props: InputFileSelectorProps) {
        super(props);
        this.state = {
            treeText: ""
        }
    }

    /**
     * Converts array format binary tree notation to BinTreeNode data structure
     * @param arrayFormat [id, leftChild, rightChild] for example [1, [2], [3, null, [5]]]
     * @returns TreeNode format
     * */
    validateTree(arrayFormat: any): Boolean {
        
    }

    convert = () => {
        // After you implement parseArrayToTree above, uncomment the below code
        let treeArrayFormat: any[] = JSON.parse(this.state.treeText);
        this.props.onChange(this.parseArrayToTree(treeArrayFormat));

        // After you implement parseArrayToTree above, comment the below code
        /*let treeNodeFormat: BinTreeNode = JSON.parse(this.state.treeText);
        this.props.onChange(treeNodeFormat);*/
    }

    render() {
        return (
            <div>
                <button onClick={this.convert}>Process</button><br />
                <textarea rows={5} cols={120} onChange={(ev) => {
                    this.setState({
                        treeText: ev.target.value
                    })
                }}></textarea>
            </div>
        )
    }
}
import { Col, Row } from "antd";
import * as React from "react";
import { useSelector } from "react-redux";
import { selectTree } from "../../store/TreeSlice";
import { BinTreeNode } from "../../Types/BinTreeNode";

import "./TreeOutput.scss"

export interface TreeOutputProps {
    treeNode?: BinTreeNode | null
    colorToAvoid?: string
}

export const TreeOutput: React.FunctionComponent<TreeOutputProps> = (props) => {
    const {treeNode, colorToAvoid} = props;
    const {deepNodeParent} = useSelector(selectTree);
    
    const getRandomColor = (colorToAvoid?: string) => {
        const classColors = ['001f3f', '0074D9', '7FDBFF', '39CCCC','B10DC9', 'F012BE', '85144b', 'FF4136', 'FF851B', 'FFDC00'];
        const classColorsFiltered = classColors.filter(c => c !== colorToAvoid);
        const selectedClass = classColorsFiltered[Math.floor(Math.random() * classColorsFiltered.length)];
        return selectedClass;
    }
    const mainColor = getRandomColor(colorToAvoid);

    if (!treeNode || !treeNode.id) {
        return (
        <Row className={"ant-alert-content treeNode "}  style={{ 
            borderRadius: "5px",
            border: "1px solid #blue",
            textAlign: "center",
            backgroundColor: "#"+mainColor,
            color: "white"
            }}>
                Null
        </Row>
        )
    }
    const isDeeperNode = String(deepNodeParent)===String(treeNode.id);

    return (
        <Row className={`ant-alert-content treeNode ${isDeeperNode?"deeperNode": ""}`}  style={{
            backgroundColor: "#"+mainColor
            }}>
                    <Col span={20} offset={2} className="nodeId">{treeNode.id}</Col>
                    <Col span={2}/>
                    {treeNode.left || treeNode.right ?
                    <Row  style={{width: "100%", margin:"5px"}} className="nodeChildren">
                        <Col span={12}>
                            <TreeOutput treeNode={treeNode.left} colorToAvoid={mainColor} />
                            </Col>
                        <Col span={12}>
                            <TreeOutput treeNode={treeNode.right} colorToAvoid={mainColor}  />
                        </Col>
                    </Row>:
                    null}
        </Row>
        
    );
}
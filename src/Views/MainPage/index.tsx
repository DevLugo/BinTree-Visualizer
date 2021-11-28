import * as React from 'react';
import FileSelector from '../../Components/FileSelector';
import { TreeOutput } from '../../Components/TreeOutput';
import "./Body.scss"
import { TreeTextArea } from '../../Components/TreeTextArea';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectTree } from '../../store/TreeSlice';

const Body: React.FunctionComponent = () => {
    const {treeNode} = useSelector(selectTree);
    return (
        <Row gutter={15} style={{margin: "10px",}}>
            <Col span={6} >
                    <FileSelector />
                    <TreeTextArea/>
            </Col>
            
            <Col span={18}>
                <TreeOutput treeNode={treeNode} />
            </Col>
      </Row>
    )
}

export default Body;
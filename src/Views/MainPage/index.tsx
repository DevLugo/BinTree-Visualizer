import * as React from 'react';
import { IAppState } from "../../IAppState";
import { observer } from "mobx-react";
import TreeInput from '../../Components/TreeInput';
import { TreeOutput } from '../../Components/TreeOutput';
import "./Body.scss"
import { useAppStateContext } from '../../AppState';
import { TreeText } from '../../Components/TreeText';
import { Col, Row } from 'antd';
interface BodyProps {
    appState: IAppState
}

const BodyRenderer: React.FunctionComponent<BodyProps> = observer((props) => {
    return (
        <Row gutter={15} style={{marginTop: "10px"}}>
            <Col span={6} >
                    <TreeInput 
                        onChange={(newVal) => {
                            props.appState.setState({
                                ...props.appState,
                                treeNode: newVal
                            })
                        }}
                    />
                    <TreeText 
                        treeNode={props.appState.treeNode} 
                        onChange={(newVal) => {
                            props.appState.setState({
                                ...props.appState,
                                treeNode: newVal
                            })
                        }}
                    />
            </Col>
            
            <Col span={18}>
                <TreeOutput treeNode={props.appState.treeNode} />
            </Col>
      </Row>
        
    );
})

export const Body: React.FunctionComponent<{}> = (props) => {
    const appState = useAppStateContext();
    return <BodyRenderer appState={appState} />
}

export default Body;
import { IObservable, IObservableValue } from "mobx";


interface IAppState {
    title: string;
    bodyMessage: string;
    treeNode: BinTreeNode;
    treeText: string;
    parsingError: boolean;
    parsingErrorMessage: string;

    
    setState(newState: IAppState)
}
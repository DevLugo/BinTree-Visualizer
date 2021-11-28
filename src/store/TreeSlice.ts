import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '.';
import { BinTreeNode } from '../Types'

interface IState {
    hasParsingError: boolean
    treeText: string
    treeNode?: BinTreeNode
    deepLevel: number
    deepNodeParent: string
}

const initialState: IState = {
    hasParsingError: false,
    treeText: '',
    deepLevel: 0,
    deepNodeParent: ""
}

const treeSlice = createSlice({
  name: 'Tree',
  initialState,
  reducers: {
    setTreeText: (state, action) => {
      state.treeText = action.payload;
    },
    setTreeNode: (state,  action:PayloadAction<BinTreeNode>) => {
      state.treeNode = action.payload;
    },
    setHasParsingError: (state, action) => {
        state.hasParsingError = action.payload;
    },
    setDeepLevel: (state, action: PayloadAction<{deepLevel:number, parent?:string}>) => {
      const { deepLevel, parent } = action.payload;
      if (state.deepLevel < deepLevel){
        state.deepNodeParent = parent!;
        state.deepLevel = deepLevel;
      }
  },
  },
});

export const { setTreeText, setTreeNode, setHasParsingError,setDeepLevel } = treeSlice.actions;

export const selectTree = (state: RootState) => state.tree;

export default treeSlice.reducer;



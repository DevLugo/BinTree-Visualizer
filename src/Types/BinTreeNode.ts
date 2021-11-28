export class BinTreeNode {
    id: string;
    left: BinTreeNode | null;
    right: BinTreeNode | null
    constructor(id: string, left: BinTreeNode | null, right: BinTreeNode | null) {
        if(!id){
            throw new TypeError("Id is required")
        }

        if(!!left &&  !(left instanceof BinTreeNode)){
            throw new TypeError("left invalide type")
        }

        if(!!right &&  !(right instanceof BinTreeNode)){
            throw new TypeError("right invalide type")
        }
        this.id = id;
        this.left = left;
        this.right = right
    }
}
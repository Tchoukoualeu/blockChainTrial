const { SHA256 } = require('crypto-js')

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // Generate the first block in the blockchain
    createGenesisBlock() {
        return new Block(0, "01/12/2020", "Genesis block", "0");
    }


    getLatestBlock() {
        return this.chain[this.chain.length - 1]
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let arisCoin = new Blockchain();
arisCoin.addBlock(new Block(1, "12/12/2020", { gift: 'flying' }));
arisCoin.addBlock(new Block(2, "25/12/2020", { gift: 'Cycling' }));

console.log(arisCoin.isChainValid())

arisCoin.chain[1].data = {gift: "Engineering"}

console.log(arisCoin.isChainValid())
console.log(JSON.stringify(arisCoin))
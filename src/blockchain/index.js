const Block = require('./block');

/**
 * Class that links all of the different blocks together to become
 * the blockchain.
 */
class Index {
    constructor() {
        this.chain = [Block.genesis()];
    }

    /**
     * Adds a block to the blockchain.
     * @param data
     * @returns {Block}
     */
    addBlock(data) {
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }

    /**
     * Checks to ensure that the chain passed to it is indeed a valid
     * and legal blockchain. Start by ensuring the genesis block hash matches
     * a fresh hash of its information. Next, iterate through the chain to make sure
     * that each blocks last hash matches the recorded hash, and that the current hash
     * matches a freshly hashed set.
     * @param chain
     * @returns {boolean}
     */
    isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i=1; i<chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i-1];
            if (
                block.lastHash !== lastBlock.hash ||
                block.hash !== Block.blockHash(block)
            ) {
                return false;
            }
        }
        return true;
}

    /**
     * Replaces the currently stored chain with the newest and longest version
     * so long as all of the information is verified correct.
     * @param newChain - The new chain that is to be tested.
     */
    replaceChain(newChain) {
        if(newChain.length <= this.chain.length) {
            console.log('Received chain is not longer than the current chain.');
            return;
        } else if (!this.isValidChain(newChain)) {
            console.log('The received chain is not valid.');
            return;
        }

        console.log('Replacing blockchain with the new chain');
        this.chain = newChain;
    }
}

module.exports = Index;

/**
 * The block class is the class that will represent individual blocks
 * in the blockchain.
 */

/**
 * Individual blocks for the block chain.
 * @param timestamp         The time the block was created.
 * @param lastHash          The hash of the previous block.
 * @param hash              The hash that will be bound to this block.
 * @param data              The data to be recorded into the block.
 */
class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }

    /**
     * Returns the key information in each individual block.
     * @returns {string} Data in the block.
     */
    toString() {
        return `Block -
            Timestamp: ${this.timestamp}
            Last Hash: ${this.lastHash.substring(0, 10)}
            Hash:    : ${this.hash}
            Data     : ${this.data}`;
    }

    /**
     * The very first block in the blockchain.
     */
    static genesis() {
        return new this('Genesis time', '-------', 'First Hash', [])
    }

    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = 'todo-Hash';

        return new this(timestamp, lastHash, hash, data)
    }
}

module.exports = Block;
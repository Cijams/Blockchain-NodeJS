/**
 * The block class is the class that will represent individual blocks
 * in the blockchain.
 */

const SHA256 = require('crypto-js/sha256');

/**
 * Individual blocks for the block chain.
 * @param timestamp         The time the block was created.
 * @param lastHash          The hash of the previous block.
 * @param hash              The hash that will be bound to this block. Hash is generated
 *                          from the timestamp, lastHash and stored data.
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
            Hash:    : ${this.hash.substring(0, 10)}
            Data     : ${this.data}`;
    }

    /**
     * The very first block in the blockchain.
     */
    static genesis() {
        return new this('Genesis time', '-------', 'First Hash', [])
    }

    /**
     * Function that is in charge of creating new blocks from
     * the mine operation.
     * @param lastBlock - The most recently mined block.
     * @param data - The information we wish to store in the block.
     * @returns {Block} - The block that was just mined.
     */
    static mineBlock(lastBlock, data) {
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);

        return new this(timestamp, lastHash, hash, data)
    }

    /**
     *
     * @param timestamp - The time the block was created.
     * @param lastHash - The hash of the previous block.
     * @param data - The information contained in the block.
     * @returns {*} - A hash of the information aggregated.
     */
    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;
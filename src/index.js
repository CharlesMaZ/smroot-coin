const crypto = require('crypto')

class Block {
  newBlock (prevHash, transactions, proof) {
    let ver = 1
    return {
      'ver': ver + 1,
      'prevHash': prevHash,
      'transactions': transactions,
      'proof': proof,
      'timestamp': Date.now()
    }
  }
}

class Hash {
  newHash (block) {
    const secret = 'smroot'
    const hash = crypto.createHmac('sha256', secret)
      .update(JSON.stringify(block))
      .digest('hex')

    return hash
  }
}
const hash = new Hash()
const block = new Block()

// first primary block
let bloc = block.newBlock('1', null, 12)

let bloc2 = block.newBlock(hash.newHash(bloc), [1, 2, 3], 15)

console.log(block.newBlock(hash.newHash(bloc2), [1, 4, 3], 85))

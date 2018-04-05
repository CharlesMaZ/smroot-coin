const crypto = require('crypto')

let lastIndex = 1

class Block {
  index: number
  prevHash: string | null
  transactions: any[] | null
  proof: number
  timestamp: number

  constructor (prevHash: string | null, transactions: any[] | null, proof: number) {
    this.index = lastIndex++
    this.prevHash = prevHash
    this.transactions = transactions
    this.proof = proof
    this.timestamp = Date.now()
  }

  json () {
    return JSON.stringify(this)
  }

  hash () {
    const secret = 'smroot'
    return crypto.createHmac('sha256', secret)
      .update(this.json())
      .digest('hex')
  }
}

// first primary block
let bloc = new Block(null, null, 12)
let bloc2 = new Block(bloc.hash(), [1, 2, 3], 15)
let bloc3 = new Block(bloc2.hash(), [1, 4, 3], 85)

class Blockchain {
  blocks: Block[]
  chain: Block[]
  transactions: any[]

  constructor (blocks: Block[]) {
    this.chain = blocks
    this.transactions = []
  }

  newTransaction (sender: string, recipient: string, amount: number) {
    this.transactions.push({
      sender: sender,
      recipient: recipient,
      amount: amount
    })
    return this.chain[this.chain.length + 1]
  }

  lastBlock () {
    return this.chain[this.chain.length - 1]
  }

  fullChain () {
    return {
      chain:  this.chain,
      length: this.chain.length
    }
  }
}

const blocks = [bloc, bloc2, bloc3]
const bck = new Blockchain(blocks)
console.log(bck.fullChain())

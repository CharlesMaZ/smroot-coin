const crypto = require('crypto')

let lastIndex = 1

class Block {
  ver: number
  index: number
  prevHash: string | null
  transactions: any[] | null
  proof: number
  timestamp: number

  constructor (prevHash: string | null, transactions: any[] | null, proof: number) {
    this.ver = 1
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
  block: Block
  chain: Block[]
  transactions: any[]

  constructor (block: Block) {
    this.block = block
    this.chain = []
    this.chain.push(this.block)
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

const bck = new Blockchain(bloc3)
console.log(bck.fullChain())

const crypto = require('crypto')

declare interface IBlock {
  ver: number
  index: number
  prevHash: string | null
  transactions: any[] | null
  proof: number
  timestamp: number
}

let lastIndex = 1

class Block implements IBlock {
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

console.log(bloc.hash() + ': \n\t' + bloc.json())

let bloc2 = new Block(bloc.hash(), [1, 2, 3], 15)

console.log(bloc2.hash() + ': \n\t' + bloc2.json())

let bloc3 = new Block(bloc2.hash(), [1, 4, 3], 85)

console.log(bloc3.hash() + ': \n\t' + bloc3.json())

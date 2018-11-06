const Result = { win: 1, loss: 2, tie: 3 }

function PokerHand (hand) {
  this.cards = hand.toLowerCase().split(' ')

  this.nums = this.cards.map(v => {
    const num = v[0]
    if (num === 't') return 10
    if (num === 'j') return 11
    if (num === 'q') return 12
    if (num === 'k') return 13
    if (num === 'a') return 14
    else return Number(num)
  }).sort((a, b) => a - b)

  this.sets = this.nums.reduce((acc, v) => {
    if (!acc[v]) acc[v] = 1
    else acc[v]++
    return acc
  }, {})
}

PokerHand.prototype.flush = function () {
  // check all of same suit; if so, return highest card of the flush
  const suit = this.cards[0][1]
  for (let card of this.cards) {
    if (card[1] !== suit) return false
  }
  return this.nums[4]
}

PokerHand.prototype.straight = function () {
  // check 5 different numbers, where they're in a row
  const aceHigh = ((this.nums[4] - this.nums[0] === 4) && ([...new Set(this.nums)].length === 5)) ? this.nums[4] : false

  if (aceHigh) return aceHigh

  // try again with ace being 1 instead of 14
  const nums = this.nums.map(v => v === 14 ? 1 : v)
  const aceLow = ((nums[4] - nums[0] === 4) && ([...new Set(nums)].length === 5)) ? nums[4] : false

  return aceLow
}

PokerHand.prototype.straightFlush = function () {
  // check 5 different numbers, where they're in a row
  return this.flush() ? this.straight() : false
}

PokerHand.prototype.kind4 = function () {
  return Object.keys(this.sets).find(v => this.sets[v] === 4) || false
}

PokerHand.prototype.kind3 = function () {
  return Object.keys(this.sets).find(v => this.sets[v] === 3) || false
}

PokerHand.prototype.kind2 = function () {
  return Object.keys(this.sets).find(v => this.sets[v] === 2) || false
}

PokerHand.prototype.pairs = function () {
  return Object.keys(this.sets).filter(v => this.sets[v] === 2).map(v => Number(v))
}

PokerHand.prototype.fullHouse = function () {
  return this.kind2() ? this.kind3() : false
}

PokerHand.prototype.compareHighCard = function (hand) {
  for (let i = 4; i >= 0; i--) {
    if (this.nums[i] > hand.nums[i]) return Result.win
    if (hand.nums[i] > this.nums[i]) return Result.loss
  }
  return Result.tie
}

PokerHand.prototype.compareWith = function (hand) {
  // go through possibilities in order
  const checks = ['straightFlush', 'kind4', 'fullHouse', 'flush', 'straight', 'kind3']
  for (let check of checks) {
    const opponent = hand[check]()
    const player = this[check]()
    if (opponent > player) return Result.loss
    if (player > opponent) return Result.win
    if (player && opponent) return this.compareHighCard(hand)
  }

  // check if 2 pairs, and if both, check highest then lowest pair
  const playerPairs = this.pairs()
  const opponentPairs = hand.pairs()
  if (playerPairs.length > opponentPairs.length) return Result.win
  if (opponentPairs.length > playerPairs.length) return Result.loss
  if (playerPairs.length === 2 && opponentPairs.length === 2) {
    playerPairs.sort((a, b) => a - b)
    opponentPairs.sort((a, b) => a - b)
    if (playerPairs[1] > opponentPairs[1]) return Result.win
    if (opponentPairs[1] > playerPairs[1]) return Result.loss
    if (playerPairs[0] > opponentPairs[0]) return Result.win
    if (opponentPairs[0] > playerPairs[0]) return Result.loss
  }

  // and check a single pair
  if (playerPairs.length === 1 && opponentPairs.length === 1) {
    if (playerPairs[0] > opponentPairs[0]) return Result.win
    if (opponentPairs[0] > playerPairs[0]) return Result.loss
  }

  return this.compareHighCard(hand)
}

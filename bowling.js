// get bowling score, originally as a codementor.io challenge

// usage - bowlingScore('34 5/ 6/ x x 05 30 x 7/ x4/')
function bowlingScore (frames) {
  // Figure out the score!

  // spare += next roll; stirke += next 2 rolls
  // plus special in last frame

  frames = frames.toLowerCase().split(' ')

  if (frames.length !== 10) throw new Error('A bowling game is 10 frames')

  // get scores without spare/strike additions, roll by roll
  // we do this so we can easily add the next 1 or 2 rolls for a strike/spare
  const frameScores = []
  for (let i = 0; i < frames.length; i++) {
    let frameScore = 0
    const rollScores = []
    for (let j = 0; j < frames[i].length; j++) {
      const roll = frames[i][j]
      let rollScore = 0
      if (roll === 'x') rollScore = 10
      else if (roll === '/') rollScore = 10 - frameScore
      else rollScore = Number(roll)
      frameScore += roll === 'x' ? 0 : rollScore
      rollScores.push(rollScore)
    }
    frameScores.push(rollScores)
  }

  const scores = []
  for (let i = 0; i < frames.length; i++) {
    let frameScore = 0
    for (let j = 0; j < frames[i].length; j++) {
      if (i < 9) {
        // all but 10th frame
        frameScore += frameScores[i][j]
        if (frames[i][j] === 'x') {
          // strike - add next 2 rolls
          frameScore += frameScores[i + 1][0]
          if (frameScores[i + 1].length > 1) {
            frameScore += frameScores[i + 1][1]
          } else {
            frameScore += frameScores[i + 2][0]
          }
        } else if (frames[i][j] === '/') {
          // spare - add next roll
          frameScore += frameScores[i + 1][0]
        }
      } else {
        // 10th frame
        frameScore = frameScores[i].reduce((acc, v) => acc + v, 0)
      }
    }
    scores.push(frameScore)
  }

  return scores.reduce((acc, v) => acc + v, 0)
}

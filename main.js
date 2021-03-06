let turnNumber = 0;
let rollNumber = 0;

function rollAll() {
  if (rollNumber < 3) {
    let dice = document.getElementsByClassName('die');
    for (let die of dice) {
      if (die.className !== 'die active') {
        let roll = (Math.floor((Math.random() * 6) + 1));
        updateDice(die.id, roll)
      }
    }
    let rollSpan = document.getElementById('rollSpan')
    rollNumber++
    rollSpan.textContent = rollNumber
  }
}
function updateDice(id, roll) {
  let dieDiv = document.getElementById(id);
  let content =  `<img style="width: 34px; z-index: 2;" id="${roll}" src="images/diefaces (${roll}).png"/>`
  dieDiv.innerHTML = content;
}
function lockDie(id) {
  let die = document.getElementById(id);
  if (die.innerHTML !== '') {
    if (die.className === 'die active') {
      die.style = 'border: 1px solid black;'
      die.className = 'die'
    } else {
      die.style = 'border: 2px solid rgb(255, 0, 0);'
      die.className += ' active'
    }
  }
}
function resetRollNumber() {
  rollNumber = 0;
  turnNumber++

  let rollSpan = document.getElementById('rollSpan')
  rollSpan.textContent = rollNumber
  let dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.innerHTML = ''
    die.style = 'border: 2px solid black;'
    die.className = 'die'
  }
  let upperSectionScore = document.getElementsByClassName('upper-scores')
  let totalTopSection = document.getElementById('upper-section')
  let upperArray = []
  for (let scores of upperSectionScore) {
    if (scores.textContent !== '') {
      upperArray.push(scores.textContent)
    }
  }
  if (upperArray.length === 6 && totalTopSection.textContent === '') {
    let upperSum = upperArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    totalTopSection.textContent = upperSum
    if (upperSum >= 63) {
      totalTopSection.textContent += ' + 35 = ' + (upperSum + 35)
    }
  }
  if (turnNumber === 13) {
    endGame()
  }
}

function endGame() {
  let scoreSpans = document.getElementsByClassName('score-span');
  let totalScoresArray = []
  for (let span of scoreSpans) {
    if (span.textContent === '') {
      span.textContent = '0'
    }
    totalScoresArray.push(span.textContent)
  }
  let totalSum = totalScoresArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

  let topSection = document.getElementsByClassName('upper-scores')
  let topSectionArray = []
  for (let score of topSection) {
    topSectionArray.push(score.textContent)
  }
  let topSum = topSectionArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);

  if (topSum >= 63) {
    totalSum = totalSum + 35
  }

  let rollBtn = document.getElementById('roll-btn')
  rollBtn.disabled = true
  let totalDiv = document.getElementById('total')
  totalDiv.textContent = totalSum
}

function sortDiceArray(number) {
  if (number === 'none') {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      let child = (die.firstElementChild || die.firstChild)
      diceArray.push(child.id)
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b))
    return sortedArray;
  } else {
    let dice = document.getElementsByClassName('die');
    let diceArray = [];
    for (let die of dice) {
      let child = (die.firstElementChild || die.firstChild)
      if (child.id == number) {
        diceArray.push(child.id)
      }
    }
    let sortedArray = diceArray.sort((a, b) => parseInt(a) - parseInt(b))
    return sortedArray;
  }
}

function scoreTop(divID, number) {
  let div = document.getElementById(divID);
  if (div.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray(number)
    let sum = sortedDiceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    div.textContent = sum
    resetRollNumber()
  }
}

function scoreThreeKind() {
  let threeKind = document.getElementById('three-kind')
  if (threeKind.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')

    let first = sortedDiceArray[0]
    let middle = sortedDiceArray[2]
    let last = sortedDiceArray[4]

    let firstArray = []
    let middleArray = []
    let lastArray = []

    for (let number of sortedDiceArray) {
      if (number === first) {
        firstArray.push(number)
      }
      if (number === middle) {
        middleArray.push(number)
      }
      if (number === last) {
        lastArray.push(number)
      }
    }
    if (firstArray.length >= 3 || middleArray.length >= 3 || lastArray.length >= 3) {
      let sum = sortedDiceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      threeKind.textContent = sum
    } else {
      threeKind.textContent = '0'
    }
    resetRollNumber()
  }
}
function scoreFourKind() {
  let fourKind = document.getElementById('four-kind')
  if (fourKind.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')

    let first = sortedDiceArray[0]
    let last = sortedDiceArray[4]

    let firstArray = []
    let lastArray = []

    for (let number of sortedDiceArray) {
      if (number === first) {
        firstArray.push(number)
      }
      if (number === last) {
        lastArray.push(number)
      }
    }
    if (firstArray.length >= 4 || lastArray.length >= 4) {
      let sum = sortedDiceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
      fourKind.textContent = sum
    } else {
      fourKind.textContent = '0'
    }
    resetRollNumber()
  }
}
function scoreFullHouse() {
  let fullHouse = document.getElementById('full-house')
  if (fullHouse.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')

    let first = sortedDiceArray[0]
    let last = sortedDiceArray[4]

    let firstArray = []
    let lastArray = []

    for (let number of sortedDiceArray) {
      if (number === first) {
        firstArray.push(number)
      }
      if (number === last) {
        lastArray.push(number)
      }
    }
    if ((firstArray.length === 3 && lastArray.length === 2) || (firstArray.length === 2 && lastArray.length === 3)) {
      fullHouse.textContent = '25'
    } else {
      fullHouse.textContent = '0'
    }
    resetRollNumber()
  }
}
function scoreSmallStraight() {
  let smallStraight = document.getElementById('small-straight')
  if (smallStraight.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')
    let uniqueItems = [...new Set(sortedDiceArray)]

    if (uniqueItems.length === 5) {
      let firstFour = sortedDiceArray.slice(0, 4).join('')
      let lastFour = sortedDiceArray.slice(1, 5).join('')

      let smallStraight = document.getElementById('small-straight')

      if (
        firstFour == '1234' ||
        firstFour == '2345' ||
        firstFour == '3456' ||
        lastFour == '1234' ||
        lastFour == '2345' ||
        lastFour == '3456'
      ) {
        smallStraight.textContent = '30'
      } else {
        smallStraight.textContent = '0'
      }
    } else if (uniqueItems.length === 4) {
      let joinedUnique = uniqueItems.join('')

      if (
        joinedUnique == '1234' ||
        joinedUnique == '2345' ||
        joinedUnique == '3456'
      ) {
        smallStraight.textContent = '30'
      } else {
        smallStraight.textContent = '0'
      }
    } else {
      smallStraight.textContent = '0'
    }
    resetRollNumber()
  }
}
function scoreLargeStraight() {
  const winningArrays = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6]
  ]
  let largeStraight = document.getElementById('large-straight')
  if (largeStraight.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')
    if (winningArrays[0].join('') === sortedDiceArray.join('') || winningArrays[1].join('') === sortedDiceArray.join('')) {
      largeStraight.textContent = '40'
    } else {
      largeStraight.textContent = '0'
    }
    resetRollNumber()
  }
}
function scoreYahtzee() {
  let yahtzee = document.getElementById('yahtzee')
  if (yahtzee.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')
    let uniqueItems = [...new Set(sortedDiceArray)]
    if (uniqueItems.length === 1) {
      yahtzee.textContent = '50'
    } else {
      yahtzee.textContent = '0'
    }
    resetRollNumber()
  }
}
function scoreChance() {
  let chanceDiv = document.getElementById('chance')
  if (chanceDiv.textContent === '' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')
    let sum = sortedDiceArray.reduce((a, b) => parseInt(a) + parseInt(b), 0);
    chanceDiv.textContent = sum;
    resetRollNumber()
  }
}
function scoreBonus() {
  let bonusDiv = document.getElementById('bonus')
  let yahtzee = document.getElementById('yahtzee')
  if (bonusDiv.textContent === '' && yahtzee.textContent === '50' && rollNumber > 0) {
    let sortedDiceArray = sortDiceArray('none')
    let uniqueItems = [...new Set(sortedDiceArray)]
    if (uniqueItems.length === 1) {
      bonusDiv.textContent = '100'
    } else {
      bonusDiv.textContent = '0'
    }
    resetRollNumber()
  } else if (bonusDiv.textContent === '100') {
    let sortedDiceArray = sortDiceArray('none')
    let uniqueItems = [...new Set(sortedDiceArray)]
    if (uniqueItems.length === 1) {
      bonusDiv.textContent = '200'
    }
    resetRollNumber()
  } else if (bonusDiv.textContent === '200') {
    let sortedDiceArray = sortDiceArray('none')
    let uniqueItems = [...new Set(sortedDiceArray)]
    if (uniqueItems.length === 1) {
      bonusDiv.textContent = '300'
    }
    resetRollNumber()
  }
}

function reset() {
  let dice = document.getElementsByClassName('die');
  for (let die of dice) {
    die.textContent = ''
    die.style = 'border: 2px solid black;'
    die.className = 'die'
  }
  let scoreSpans = document.getElementsByClassName('score-span');
  for (let span of scoreSpans) {
    span.textContent = ''
  }
  rollNumber = 0
  turnNumber = 0
  let rollSpan = document.getElementById('rollSpan')
  rollSpan.textContent = rollNumber
  let totalDiv = document.getElementById('total')
  totalDiv.textContent = ''
  let upperDiv = document.getElementById('upper-section')
  upperDiv.textContent = ''
  let rollBtn = document.getElementById('roll-btn')
  rollBtn.disabled = false
}
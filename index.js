function breakEven(risk) {
  if (risk < 100 && risk > -100) {
    throw new Error("Please enter a valid integer")
  }
  try {
    if (risk <= -100) {
      return ((Math.abs(risk) / (Math.abs(risk) + 100)) * 100).toFixed(2)
    } else {
      return ((100 / (100 + risk)) * 100).toFixed(2)
    }
  } catch (e) {}
}
const input = document.querySelector(".break-even-input")
const beDiv = document.querySelector(".break-even-div")
const outputDiv = document.querySelector(".output")
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    try {
      const risk = Number(e.target.value)
      const breakEvenPercentage = breakEven(risk)
      outputDiv.innerHTML = `Break Even Percentage:  <b>${breakEvenPercentage}%</b>`
      return breakEvenPercentage
    } catch (e) {
      outputDiv.textContent = e.message
    }
  }
})

const favInput = document.querySelector(".fav-odds-input")
const dogInput = document.querySelector(".dog-odds-input")
const holdOutput = document.querySelector(".holdOutput")
favInput.addEventListener("keypress", handleHoldCalculation)
dogInput.addEventListener("keypress", handleHoldCalculation)

function handleHoldCalculation(e) {
  if (e.key === "Enter") {
    try {
      const favOdds = Number(favInput.value)
      const dogOdds = Number(dogInput.value)

      if (
        isNaN(favOdds) ||
        isNaN(dogOdds) ||
        (favOdds > -100 && favOdds < 100) ||
        (dogOdds > -100 && dogOdds < 100) ||
        (favOdds > 0 && dogOdds > 0)
      ) {
        throw new Error(
          "Please enter valid American odds values for both favorite and underdog."
        )
      }
      holdOutput.innerHTML = `Hold Percentage: <b>${calcHold(
        favOdds,
        dogOdds
      )}%</b>`
    } catch (e) {
      holdOutput.textContent = `Error: Please enter valid odds for favorite and underdog`
    }
  }
}

function calcHold(favOdds, dogOdds) {
  if (favOdds && dogOdds < -100) {
    if (Math.abs(favOdds) < Math.abs(dogOdds)) {
      let temp = favOdds
      favOdds = dogOdds
      dogOdds = temp
    }
    let oddsB = Math.abs(dogOdds)
    let payoutA = Math.abs(favOdds) + 100
    let payoutB = Math.abs(dogOdds) + 100
    // the math is 105/205 = x/215 that will calc the amount
    let goodB = (oddsB * payoutA) / payoutB
    let totalPayout = goodB + (goodB * 100) / oddsB
    let totalBet = goodB + Math.abs(favOdds)
    houseHold = totalBet - totalPayout

    let houseHoldPercentage = ((houseHold / totalBet) * 100).toFixed(2)

    return houseHoldPercentage
  } else {
    let favBetAmt = Math.abs(favOdds)

    let payoutFav = favBetAmt + 100
    let dogBetAmt = 100
    let payoutDog = 100
    while (payoutDog <= payoutFav) {
      payoutDog = dogBetAmt + (dogBetAmt * dogOdds) / 100

      dogBetAmt += 0.01
    }

    let total_bet = favBetAmt + dogBetAmt
    let profit = total_bet - payoutFav
    let holdPercentage = ((profit / total_bet) * 100).toFixed(2)
    console.log(`${holdPercentage}%`)
    return `${holdPercentage}`
  }
}

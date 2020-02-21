//HEX Colors
const brown = "#4F2C1D",
      yellow = "#f9d342";

//Helper function
function compareNumbers(guess, secretNumber) {
    var rightPos = 0, wrongPos = 0;
    var i = 0;
    for (i; i < 4; i++) {
        if (secretNumber.indexOf(guess[i]) >= 0) {
            if (secretNumber[i] === guess[i]) {
                rightPos++;
            } else {
                wrongPos++
            }
        }
    }
    return {
        a: rightPos,
        b: wrongPos
    }
}

export {
    compareNumbers, brown, yellow
}

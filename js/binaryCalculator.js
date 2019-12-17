// display
const display = document.getElementById("res");
// buttons
const [
  btn0,
  btn1,
  btnC,
  btnEql,
  btnSum,
  btnSub,
  btnMul,
  btnDiv
] = Array.from(document.querySelectorAll("#btns > button"));

// Event Listeners
// Inserting into display
[btn0, btn1, btnSum, btnSub, btnMul, btnDiv].forEach(btn => {
  btn.addEventListener("click", handleClick);
});

function handleClick(btn) {
  display.innerHTML += this.innerHTML;
}

// Clearing the display
btnC.addEventListener("click", () => {
  display.innerHTML = "";
});

// Auxiliary functions
const fromDecimalToBinary = num => {
  num = parseInt(num);
  bin = [];
  do {
    bin.push(num & 1);
    num >>= 1;
  } while(num);
  return bin.reverse().join("");
}

const clearLeftZeros = coeffArr => {
  const arr = [...coeffArr];
  while (arr.length > 1) {
    if (arr[0] == "0") {
     arr.splice(0, 1);
    }
    else {
      break;
    }
  }
  return arr;
}

const fromBinaryToDecimal = bin => {
  const binaryCoeff = clearLeftZeros(bin.split(""))
    .reverse();

  let num = 0;
  binaryCoeff.forEach((c, i) => {
    num += (c << i);
  });
  return num;
}

// Operation object
opObj = {
  "+": function(a, b) { return a + b },
  "-": function(a, b) { return a - b },
  "*": function(a, b) { return a * b },
  "/": function(a, b) { return Math.floor(a / b) },
}

// Calculating result
function handleEql() {
  const re = /^([01]+)(\+|\-|\*|\/)([01]+)$/;
  const operation = display.innerHTML;
  if (re.test(operation)) {
    const [, bin1, op, bin2] = operation.match(re);
    // Convert binaries to decimals
    const num1 = fromBinaryToDecimal(bin1);
    const num2 = fromBinaryToDecimal(bin2);
    const decimalRes = opObj[op](num1, num2);
    const binaryRes = fromDecimalToBinary(decimalRes);
    display.innerHTML = binaryRes;
  }
}

btnEql.addEventListener("click", handleEql);

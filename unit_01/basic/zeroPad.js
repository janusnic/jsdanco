// вывестиИнвентаризациюФермы
function printFarmInventory(cows, chickens) {
  var cowString = String(cows);
  while (cowString.length < 3)
    cowString = "0" + cowString;
  console.log(cowString + " Коров");
  var chickenString = String(chickens);
  while (chickenString.length < 3)
    chickenString = "0" + chickenString;
  console.log(chickenString + " Куриц");
}
printFarmInventory(7, 11);

// выводСДобавлениемНулейИМеткой
function printZeroPaddedWithLabel(number, label) {
  var numberString = String(number);
  while (numberString.length < 3)
    numberString = "0" + numberString;
  console.log(numberString + " " + label);
}

// вывестиИнвентаризациюФермы
function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Коров");
  printZeroPaddedWithLabel(chickens, "Куриц");
  printZeroPaddedWithLabel(pigs, "Свиней");
}

printFarmInventory(7, 11, 3);

// добавитьНулей
function zeroPad(number, width) {
  var string = String(number);
  while (string.length < width)
    string = "0" + string;
  return string;
}

// вывестиИнвентаризациюФермы
function printFarmInventory(cows, chickens, pigs) {
  console.log(zeroPad(cows, 3) + " Коров");
  console.log(zeroPad(chickens, 3) + " Куриц");
  console.log(zeroPad(pigs, 3) + " Свиней");
}

printFarmInventory(7, 16, 3);

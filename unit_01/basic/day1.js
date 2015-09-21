var day1 = {
  squirrel: false,
  events: ["работа", "тронул дерево", "пицца", "пробежка", "телевизор"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
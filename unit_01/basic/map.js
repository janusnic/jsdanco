var map = {};
function storePhi(event, phi) {
  map[event] = phi;
}

storePhi("пицца", 0.069);
storePhi("тронул дерево", -0.081);
console.log("пицца" in map);
// → true
console.log(map["тронул дерево"]);
// → -0.081
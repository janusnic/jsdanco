function noArguments() {}
noArguments(1, 2, 3); // Пойдёт
function threeArguments(a, b, c) {}
threeArguments(); // И так можно

function argumentCounter() {
  console.log("Ты дал мне", arguments.length, "аргумента.");
}
argumentCounter("Дядя", "Стёпа", "Милиционер");
// → Ты дал мне 3 аргумента.

function addEntry(squirrel) {
  var entry = {events: [], squirrel: squirrel};
  for (var i = 1; i < arguments.length; i++)
    entry.events.push(arguments[i]);
  journal.push(entry);
}
addEntry(true, "работа", "тронул дерево", "пицца", "пробежка", "телевизор");

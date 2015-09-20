# danco-js
## Определение функции

Определение функции – обычное определение переменной, где значение, которое получает переменная, является функцией. 

```
var square = function(x) {
  return x * x;
};

console.log(square(12));
// → 144
```

Функция создаётся выражением, начинающимся с ключевого слова function. У функций есть набор параметров (в данном случае, только x), и тело, содержащее инструкции, которые необходимо выполнить при вызове функции. Тело функции всегда заключают в фигурные скобки, даже если оно состоит из одной инструкции.

У функции может быть несколько параметров, или вообще их не быть. В следующем примере makeNoise не имеет списка параметров, а у power их целых два:
```
var makeNoise = function() {
  console.log("Up!");
};

makeNoise();


var power = function(base, exponent) {
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
};

console.log(power(2, 10));
```

Для возврата значения используется директива return.
Некоторые функции возвращают значение, как power и square, другие не возвращают, как makeNoise, которая производит только побочный эффект. Инструкция return определяет значение, возвращаемое функцией. Она может находиться в любом месте функции. Как только до нее доходит управление — функция завершается и значение передается обратно.

Вызовов return может быть и несколько, например:

```
function checkAge(age) {
  if (age > 18) {
    return true;
  } else {
    return confirm('Родители разрешили?');
  }
}

var age = prompt('Ваш возраст?');

if (checkAge(age)) {
  alert( 'Доступ разрешен' );
} else {
  alert( 'В доступе отказано' );
}
```
Директива return может также использоваться без значения, чтобы прекратить выполнение и выйти из функции.

```

function showMovie(age) {
  if (!checkAge(age)) {
    return;
  }

  alert( "Фильм не для всех" ); // (*)
  // ...
}
```

## Значение функции без return и с пустым return
В случае, когда функция не вернула значение или return был без аргументов, считается что она вернула undefined:

```
function doNothing() { /* пусто */ }

alert( doNothing() ); // undefined
```

return без аргумента:

```
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```
## Параметры и область видимости

Параметры функции – такие же переменные, но их начальные значения задаются при вызове функции, а не в её коде.

Важное свойство функций в том, что переменные, созданные внутри функции (включая параметры), локальны внутри этой функции. 

Эта локальность переменных применяется только к параметрам и созданным внутри функций переменным. Переменные, заданные снаружи какой бы то ни было функции, называются глобальными, поскольку они видны на протяжении всей программы. Получить доступ к таким переменным можно и внутри функции, если только вы не объявили локальную переменную с тем же именем.

```
var x = "outside";

var f1 = function() {
  var x = "inside f1";
};
f1();
console.log(x);
// → outside

var f2 = function() {
  x = "inside f2";
};
f2();
console.log(x);
// → inside f2

```

## Вложенные области видимости

JavaScript различает не только глобальные и локальные переменные. Функции можно задавать внутри функций, что приводит к нескольким уровням локальности.


```
var landscape = function() {
  var result = "";
  var flat = function(size) {
    for (var count = 0; count &lt; size; count++)
      result += "_";
  };
  var mountain = function(size) {
    result += "/";
    for (var count = 0; count &lt; size; count++)
      result += "'";
    result += "\\";
  };

  flat(3);
  mountain(4);
  flat(6);
  mountain(1);
  flat(1);
  return result;
};

console.log(landscape());
```

Функции flat и mountain видят переменную result, потому что они находятся внутри функции, в которой она определена. Но они не могут видеть переменные count друг друга, потому что переменные одной функции находятся вне области видимости другой. А окружение снаружи функции landscape не видит ни одной из переменных, определённых внутри этой функции.

в каждой локальной области видимости можно увидеть все области, которые её содержат. Набор переменных, доступных внутри функции, определяется местом, где эта функция описана в программе. Все переменные из блоков, окружающих определение функции, видны – включая и те, что определены на верхнем уровне в основной программе. Этот подход к областям видимости называется лексическим.

в JavaScript область видимости создают только функции. Вы можете использовать отдельно стоящие блоки:
```
var something = 1;
{
  var something = 2;
  // Делаем что-либо с переменной something...
}
// Вышли из блока...
```

Но something внутри блока – это та же переменная, что и снаружи. Хотя такие блоки и разрешены, имеет смысл использовать их только для команды if и циклов.

В версии JavaScript 1.7 появилось ключевое слово let, которое работает как var, но создаёт переменные, локальные для любого данного блока, а не только для функции.

## Функции как значения

Вызов функции можно использовать, как простую переменную – например, использовать их в любых выражениях. Возможно хранить вызов функции в новой переменной, передавать её как параметр другой функции, и так далее. Также переменная, хранящая вызов функции, остаётся обычной переменной и её значение можно поменять:
````
var launchMissiles = function(value) {
  missileSystem.launch("пли!");
};
if (safeMode)
  launchMissiles = function(value) {/* отбой */};
```

## Объявление функций

Есть более короткая версия выражения “var square = function…”. Ключевое слово function можно использовать в начале инструкции:

```
function square(x) {
  return x * x;
}

```
Это объявление функции. Инструкция определяет переменную square и присваивает ей заданную функцию. 

console.log("The square says:", square(5));

function square(x) {
  return x * x;
}
```

Такой код работает, хотя функция объявляется ниже того кода, который её использует. Это происходит оттого, что объявления функций не являются частью обычного исполнения программ сверху вниз. Они «перемещаются» наверх их области видимости и могут быть вызваны в любом коде в этой области. 

А что будет, если мы поместим объявление функции внутрь условного блока или цикла? Не надо так делать. Исторически разные платформы для запуска JavaScript обрабатывали такие случаи по разному, а текущий стандарт языка запрещает так делать. Если вы хотите, чтобы ваши программы работали последовательно, используйте объявления функций только внутри других функций или основной программы.
```
function example() {
  function a() {} // Нормуль
  if (something) {
    function b() {} // Ай-яй-яй!
  }
}

```
## Стек вызовов

Полезным будет присмотреться к тому, как порядок выполнения работает с функциями. Вот простая программа с несколькими вызовами функций:
```
function greet(who) {
  console.log("Привет, " + who);
}
greet("Семён");
console.log("Пока");

```
Обрабатывается она примерно так: вызов greet заставляет проход прыгнуть на начало функции. Он вызывает встроенную функцию console.log, которая перехватывает контроль, делает своё дело и возвращает контроль. Потом он доходит до конца greet, и возвращается к месту, откуда его вызвали. Следующая строчка опять вызывает console.log.

Схематично это можно показать так:
```
top
   greet
        console.log
   greet
top
   console.log
top
```

Поскольку функция должна вернуться на то место, откуда её вызвали, компьютер должен запомнить контекст, из которого была вызвана функция. В одном случае, console.log должна вернуться обратно в greet. В другом, она возвращается в конец программы.

Место, где компьютер запоминает контекст, называется стеком. Каждый раз при вызове функции, текущий контекст помещается наверх стека. Когда функция возвращается, она забирает верхний контекст из стека и использует его для продолжения работы.

Хранение стека требует места в памяти. Когда стек слишком сильно разрастается, компьютер прекращает выполнение и выдаёт что-то вроде “stack overflow” или “ too much recursion”. Следующий код это демонстрирует – он задаёт компьютеру очень сложный вопрос, который приводит к бесконечным прыжкам между двумя функциями. Точнее, это были бы бесконечные прыжки, если бы у компьютера был бесконечный стек. В реальности стек переполняется.
```
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → ??

```
## Необязательные аргументы

Следующий код вполне разрешён и выполняется без проблем:
```
alert("Здрасьте", "Добрый вечер", "Всем привет!");

```
Официально функция принимает один аргумент. Однако, при таком вызове она не жалуется. Она игнорирует остальные аргументы и показывает «Здрасьте».

JavaScript очень лоялен по поводу количества аргументов, передаваемых функции. Если вы передадите слишком много, лишние будут проигнорированы. Слишком мало – отсутствующим будет назначено значение undefined.

Плюс в том, что вы можете создавать функции, принимающие необязательные аргументы. К примеру, в следующей версии функции power её можно вызывать как с двумя, так и с одним аргументом,- в последнем случае экспонента будет равна двум, и функция работает как квадрат.
```
function power(base, exponent) {
  if (exponent == undefined)
    exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
}

console.log(power(4));
// → 16
console.log(power(4, 3));
// → 64

```
К примеру, console.log выводит все переданные ему аргументы:
```
console.log("R", 2, "D", 2);
// → R 2 D 2

```
## Замыкания

Возможность использовать вызовы функций как переменные вкупе с тем фактом, что локальные переменные каждый раз при вызове функции создаются заново, приводит нас к интересному вопросу. Что происходит с локальными переменными, когда функция перестаёт работать?

Следующий пример иллюстрирует этот вопрос. В нём объявляется функция wrapValue, которая создаёт локальную переменную. Затем она возвращает функцию, которая читает эту локальную переменную и возвращает её значение.
```
function wrapValue(n) {
  var localVariable = n;
  return function() { return localVariable; };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2

```
Это допустимо и работает так, как должно – доступ к переменной остаётся. Более того, в одно и то же время могут существовать несколько экземпляров одной и той же переменной, что ещё раз подтверждает тот факт, что с каждым вызовом функции локальные переменные пересоздаются.

Эта возможность работать со ссылкой на какой-то экземпляр локальной переменной называется замыканием. Функция, замыкающая локальные переменные, называется замыкающей. Она не только освобождает вас от забот, связанных с временем жизни переменных, но и позволяет творчески использовать функции.

```
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

var twice = multiplier(2);
console.log(twice(5));
// → 10

```

В нашем примере multiplier возвращает замороженный кусок кода, который мы сохраняем в переменной twice. Последняя строка вызывает функцию, заключённую в переменной, в связи с чем активируется сохранённый код (return number * factor;). У него всё ещё есть доступ к переменной factor, которая определялась при вызове multiplier, к тому же у него есть доступ к аргументу, переданному во время разморозки (5) в качестве числового параметра.

## Рекурсия

Функция может вызывать сама себя, если она заботится о том, чтобы не переполнить стек. Такая функция называется рекурсивной. Вот пример альтернативной реализации возведения в степень:
```
function power(base, exponent) {
  if (exponent == 0)
    return 1;
  else
    return base * power(base, exponent - 1);
}

console.log(power(2, 3));
// → 8

```
Однако, у такой реализации есть проблема – в обычной среде JavaScript она раз в 10 медленнее, чем версия с циклом. Проход по циклу выходит дешевле, чем вызов функции.

Но рекурсия не всегда лишь менее эффективная альтернатива циклам. Некоторые задачи проще решить рекурсией. Чаще всего это обход нескольких веток дерева, каждая из которых может ветвиться.

получить бесконечное количество чисел, начиная с числа 1, и потом либо добавляя 5, либо умножая на 3. Как нам написать функцию, которая, получив число, пытается найти последовательность таких сложений и умножений, которые приводят к заданному числу? К примеру, число 13 можно получить, сначала умножив 1 на 3, а затем добавив 5 два раза. А число 15 вообще нельзя так получить.

Рекурсивное решение:
```
function findSolution(target) {
  function find(start, history) {
    if (start == target)
      return history;
    else if (start > target)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}

console.log(findSolution(24));
// → (((1 * 3) + 5) * 3)
```

Внутренняя функция find занимается рекурсией. Она принимает два аргумента – текущее число и строку, которая содержит запись того, как мы пришли к этому номеру. И возвращает либо строчку, показывающую нашу последовательность шагов, либо null.

## Сверхкороткие имена функций
Имена функций, которые используются очень часто, иногда делают сверхкороткими.
Например, во фреймворке jQuery есть функция $, во фреймворке Prototype — функция $$, а в библиотеке LoDash очень активно используется функция с названием из одного символа подчеркивания _.



# DOM

dom1.html
```
    function appendTitle(title){
        document.title += title;
    }

 <body onload="appendTitle('... addendum')">

```

dom2.html
```

   function loadCities(){
    var cities = ["New York, US","Paris, FR","Rome, IT","London, EN","Auckland, NZ","Brisbane, AUS","Wellington, NZ"];
    var ulElement = document.getElementById("cityList");
    for(var city in cities){
     var listItem = ulElement.appendChild(document.createElement("li"));
     listItem.appendChild(document.createTextNode(cities[city]));
    }
   }

 <body onload="loadCities()">
  <ul id="cityList"></ul>

```
dom3.html
```
window.onload = function(){
    var hour = (new Date()).getHours();
    var timeOfDay="";
    if(hour >= 6 && hour < 12){
        timeOfDay = "morning";
                (document.getElementsByTagName("img")[0]).src = "../images/morning.png";
    }
    else if(hour >= 12 && hour < 18){
        timeOfDay = "afternoon";
                (document.getElementsByTagName("img")[0]).src = "../images/afternoon.png";
    }
    else{
        timeOfDay = "night";
                (document.getElementsByTagName("img")[0]).src = "../images/evening.png";
    }
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("Good "+timeOfDay));
        (document.getElementsByTagName("body")[0]).appendChild(p);
}

<p><img width="201" height="142"></p>
```
dom4.html
```

    function changeTitle(){
         var title = document.getElementById("text").value;
         document.title = title;
        }

        window.onload = function(){
         document.getElementById("button").addEventListener('click',changeTitle);
        }

  <p>To change title: enter text then click button</p>
  <p><input type="text" id="text"></p>
  <p><input type="button" id="button" value="set title"></p>

```

dom5.html
```

    function clickHandler(e,objId,num,msg){
    var obj = document.getElementById(objId);
    obj.innerHTML = "DIV " + num + " says " + msg + "(" + e.screenX + "," + e.screenY + ")";
    }

    function yesWrapper(e){
        clickHandler(e,"heading",1,"yes");
        //e.target.removeEventListener('click',yesWrapper); // only to demonstrate
    }

    function noWrapper(e){
        clickHandler(e,"heading",2,"no");
        //e.target.removeEventListener('click',noWrapper); // only to demonstrate
    }

    function onLoadHandler(){
        document.getElementById("div1").addEventListener('click',yesWrapper,false);
        document.getElementById("div2").addEventListener('click',noWrapper,false);
    }


    window.onload = onLoadHandler;

  <div id="div1">Say Yes</div>
  <div id="div2">Say No</div>
  <h1 id="heading"></h1>

```



## Наборы данных

JavaScript предлагает тип данных специально для хранения последовательностей чисел. Он называется массивом (array), и записывается, как список значений в квадратных скобках, разделённых запятыми:

```
var listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[1]);
// → 3
console.log(listOfNumbers[1 - 1]);
// → 2
```

Запись для получения элемента из массива тоже использует квадратные скобки. Пара скобок после выражения, содержащая внутри ещё одно выражение, найдёт в массиве, который задан первым выражением, элемент, порядковый номер которого задан вторым выражением.

Номер первого элемента – ноль, а не один. Поэтому первый элемент можно получить так: listOfNumbers[0]. 

## Свойства

Почти у всех переменных в JavaScript есть свойства. Исключения — null и undefined. Если вы попробуете получить доступ к несуществующим свойствам этих не-величин, получите ошибку:
```
null.length;
// → TypeError: Cannot read property 'length' of null

```
Два основных способа доступа к свойствам – точка и квадратные скобки. value.x и value[x] получают доступ к свойству value – но не обязательно к одному и тому же. Разница в том, как интерпретируется x. При использовании точки запись после точки должна быть именем существующей переменной, и она таким образом напрямую вызывает свойство по имени. При использовании квадратных скобок выражение в скобках вычисляется для получения имени свойства. value.x вызывает свойство под именем “x”, а value[x] вычисляет выражение x и использует результат в качестве имени свойства.

Если вы знаете, что интересующее вас свойство называется “length”, вы пишете value.length. Если вы хотите извлечь имя свойства из переменной i, вы пишете value[i]. А поскольку свойство может иметь любое имя, для доступа к свойству по имени “2” или “Jon Doe” вам придётся использовать квадратные скобки: value[2] или value[«John Doe»]. Это необходимо даже когда вы знаете точное имя свойства, потому что “2” или «John Doe» не являются допустимыми именами переменных, поэтому к ним нельзя обратиться при помощи записи через точку.

Элементы массива хранятся в свойствах. Так как имена этих свойств – числа, и нам часто приходится получать их имена из значений переменных, нужно использовать квадратные скобки для доступа к ним. Свойство length массива говорит о том, сколько в нём элементов. Имя этого свойства – допустимое имя переменной, и мы его знаем заранее, поэтому обычно мы пишем array.length, потому, что это проще, чем писать array[“length”].

## Методы

Объекты string и array содержат, в дополнение к свойству length, несколько свойств, ссылающихся на функции.
```
var doh = "Дык";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → ДЫК

```
У каждой строки есть свойство toUpperCase. При вызове оно возвращает копию строки, в которой все буквы заменены на прописные. Есть также и toLowerCase.

Свойства, содержащие функции, обычно называют методами той переменной, которой они принадлежат. То есть, toUpperCase – это метод строки.

В следующем примере демонстрируются некоторые методы, имеющиеся у массивов:
```
var mack = [];
mack.push("Трест,");
mack.push("который", "лопнул");
console.log(mack);
// → ["Трест,", "который", "лопнул"]
console.log(mack.join(" "));
// → Трест, который лопнул
console.log(mack.pop());
// → лопнул
console.log(mack);
// → ["Трест,", "который"]

```
Метод push используется для добавления значений в конец массива. pop делает обратное: удаляет значение из конца массива и возвращает его. Массив строк можно сплющить в одну строку при помощи метода join. В качестве аргумента join передают строку, которая будет вставлена между элементами массива.

## Объекты

Переменные типа object (объект) – коллекции произвольных свойств, и мы можем добавлять и удалять свойства объекта по желанию. Один из способов создать объект – использовать фигурные скобки:
```
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
```
В скобках мы можем задать список свойств, разделённых запятыми. Записывается каждое свойство как имя, после которого идёт двоеточие, затем идёт выражение, которое и является значением свойства. Пробелы и переносы строк не учитываются. Разбивая запись свойств объекта на несколько строк, вы улучшаете читаемость кода. Если имя свойства не является допустимым именем переменной, его нужно заключать в кавычки:
```
var descriptions = {
  work: "Пошёл на работу",
  "тронул дерево": "Дотронулся до дерева"
};
```

Получается, у фигурных скобок в JavaScript два значения. Употреблённые в начале инструкции, они начинают новый блок инструкций. В любом другом месте они описывают объект. Обычно нет смысла начинать инструкцию с описания объекта, и поэтому в программах обычно нет двусмысленностей по поводу этих двух применений фигурных скобок.

Если вы попытаетесь прочесть значение несуществующего свойства, вы получите undefined.

Свойству можно назначать значение через оператор =. Если у него ранее было значение, оно будет заменено. Если свойство отсутствовало, оно будет создано.

## Оператор delete.
```
var anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true
```

Бинарный оператор in принимает строку и имя объекта, и возвращает булевское значение, показывающее, есть ли у объекта свойство с таким именем. Есть разница между установкой значения свойства в undefined и удалением свойства. В первом случае свойство сохраняется у объекта, просто оно пустое. Во втором – свойства больше нет, и тогда in возвращает false.

## Изменчивость (Mutability)

значения объекта можно менять. Типы значений – числа, строки, булевские значения,- неизменяемы. Нельзя поменять существующее значение заданного типа. Их можно комбинировать и выводить из них новые значения, но когда вы работаете с некоторым значением строки, это значение остаётся постоянным. Текст внутри строки нельзя поменять. Если у вас есть ссылка на строку «кошка», в коде нельзя поменять в ней символ, чтобы получилось «мошка».

Если у нас есть два числа, 120 и 120, мы можем рассматривать их как одно и тоже, независимо от того, хранятся ли они в памяти в одном и том же месте. Но когда мы имеем дело с объектами, есть разница, есть ли у нас две ссылки на один объект или же у нас есть два разных объекта, содержащих одинаковые свойства. Рассмотрим пример:
```
var object1 = {value: 10};
var object2 = object1;
var object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10

```
Переменные object1 и object2 держатся за один и тот же объект, поэтому изменения object1 приводят к изменениям в object2. Переменная object3 показывает на другой объект, который изначально содержит те же свойства, что и object1, но живёт своей собственной жизнью.

Оператор == при сравнении объектов возвращает true только, если сравниваемые объекты – это одна и та же переменная. Сравнение разных объектов вернёт false, даже если у них идентичное содержимое. Оператора «глубокого» сравнения, который бы сравнивал содержимое объектов, в JavaScript не предусмотрено.

методы push и pop добавляют и отнимают элементы в конце массива. Соответствующие методы для начала массива называются unshift и shift
```
var todoList = [];
function rememberTo(task) {
  todoList.push(task);
}
function whatIsNext() {
  return todoList.shift();
}
function urgentlyRememberTo(task) {
  todoList.unshift(task);
}
```

Данная программа управляет списком дел. Вы добавляете дела в конец списка, вызывая rememberTo(«поесть»), а когда вы готовы заняться чем-то, вызываете whatIsNext(), чтобы получить (и удалить) первый элемент списка. Функция urgentlyRememberTo тоже добавляет задачу, но только в начало списка.

У метода indexOf есть родственник по имени lastIndexof, который начинает поиск элемента в массиве с конца:
```
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
```

Оба метода, indexOf и lastIndexOf, принимают необязательный второй аргумент, который задаёт начальную позицию поиска.

Ещё один важный метод – slice, который принимает номера начального (start) и конечного (end) элементов, и возвращает массив, состоящий только из элементов, попадающих в этот промежуток. Включая тот, что находится по индексу start, но исключая тот, что по индексу end.
```
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]

```
Когда индекс end не задан, slice выбирает все элементы после индекса start. У строк есть схожий метод, который работает так же.

Метод concat используется для склейки массивов, примерно как оператор + склеивает строки. В примере показаны методы concat и slice в деле. Функция принимает массив array и индекс index, и возвращает новый массив, который является копией предыдущего, за исключением удалённого элемента, находившегося по индексу index.
```
function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]

```
## Строки и их свойства

Мы можем получать значения свойств строк, например length и toUpperCase. Но попытка добавить новое свойство ни к чему не приведёт:
```
var myString = "Шарик";
myString.myProperty = "значение";
console.log(myString.myProperty);
// → undefined

```
У каждой строки есть набор методов. Самые полезные, пожалуй – slice и indexOf, напоминающие те же методы у массивов.
```
console.log("кокосы".slice(3, 6));
// → осы
console.log("кокос".indexOf("с"));
// → 4

```
Разница в том, что у строки метод indexOf может принять строку, содержащую больше одного символа, а у массивов такой метод работает только с одним элементом.
```
console.log("раз два три".indexOf("ва"));
// → 5

```
Метод trim удаляет пробелы (а также переводы строк, табуляцию и прочие подобные символы) с обоих концов строки.
```
console.log("  ладно  \n ".trim());
// → ладно

```
Доступ к отдельным символам строчки можно получить через метод charAt, а также просто через нумерацию позиций, как в массиве:
```
var string = "abc";
console.log(string.length);
// → 3
console.log(string.charAt(0));
// → a
console.log(string[1]);
// → b

```
## Объект arguments

Когда вызывается функция, к окружению исполняемого тела функции добавляется особая переменная под названием arguments. Она указывает на объект, содержащий все аргументы, переданные функции. 
```
function noArguments() {}
noArguments(1, 2, 3); // Пойдёт
function threeArguments(a, b, c) {}
threeArguments(); // И так можно

```
У объекта arguments есть свойство length, которое содержит реальное количество переданных функции аргументов. Также у него есть свойства для каждого аргумента под именами 0, 1, 2 и т.д.

Это очень похоже на массив. К сожалению, у этого объекта нет методов типа slice или indexOf, что делает доступ к нему труднее.
```
function argumentCounter() {
  console.log("Ты дал мне", arguments.length, "аргумента.");
}
argumentCounter("Дядя", "Стёпа", "Милиционер");
// → Ты дал мне 3 аргумента.

```
Некоторые функции рассчитаны на любое количество аргументов, как console.log. Они обычно проходят циклом по свойствам объекта arguments. Это можно использовать для создания удобных интерфейсов. 
```
addEntry(["работа", "тронул дерево", "пицца", "пробежка", "телевизор"], false);

```
Так как мы часто вызываем эту функцию, мы можем сделать альтернативу, которую проще вызывать:
```
function addEntry(squirrel) {
  var entry = {events: [], squirrel: squirrel};
  for (var i = 1; i < arguments.length; i++)
    entry.events.push(arguments[i]);
  journal.push(entry);
}
addEntry(true, "работа", "тронул дерево", "пицца", "пробежка", "телевизор");

```
Эта версия читает первый аргумент как обычно, а по остальным проходит в цикле (начиная с индекса 1, пропуская первый аргумент) и собирает их в массив.

people.html
```

var people = [ 
  [ "Joseph",27,"United States",["blue","black"] ],
  [ "Maria",21,"Uraguay",["brown","green"] ], 
  [ "Brian",35,"United Kingdom",["green","red"] ], 
  [ "Susan",42,"Australia",["blue","blonde"] ]
];
// people[2][3][1] = "brown";
// document.write(people[2][3][1]);
for(var i = 0; i < people.length; i++) {
    document.write("<h2>"+people[i][0]+"</h2>");
    for(var j = 0; j < people[i].length; j++) {
        document.write(people[i][j]+"<br>");
    }
}
```
loop.html
```
<style>
#myTypingText {
    background-color:#000;
    width:700px;
    height:120px;
    padding:12px;
    color:#FFF;
    font-family:Arial, Helvetica, sans-serif;
        font-size:16px;
    line-height:1.5em;
}
</style>

<script>
var myString = "Place your string data here, and as much as you like.";
var myArray = myString.split("");
var loopTimer;
function frameLooper() {
    if(myArray.length > 0) {
        document.getElementById("myTypingText").innerHTML += myArray.shift();
    } else {
        clearTimeout(loopTimer); 
                return false;
    }
    loopTimer = setTimeout('frameLooper()',70);
}
frameLooper();
</script>

```
slide.html
```
<style>
#wss{
    opacity:0;
    -webkit-transition:opacity 1.0s linear 0s;
    transition:opacity 1.0s linear 0s;
}
</style>
<script>
var wss_i = 0;
var wss_array = ["Cute","Happy","<u>Playful</u>","Smart","Loyal"];
var wss_elem;
function wssNext(){
    wss_i++;
    wss_elem.style.opacity = 0;
    if(wss_i > (wss_array.length - 1)){
        wss_i = 0;
    }
    setTimeout('wssSlide()',1000);
}
function wssSlide(){
    wss_elem.innerHTML = wss_array[wss_i];
    wss_elem.style.opacity = 1;
    setTimeout('wssNext()',2000);
}
</script>
<h1>My dog is <span id="wss"></span></h1>
<script>wss_elem = document.getElementById("wss"); wssSlide(); </script>

```

banner.html
```
<style>
#wss{
    opacity:0;
    -webkit-transition:opacity 1.0s linear 0s;
    transition:opacity 1.0s linear 0s;
}
</style>
<script>
var wss_i = 0;
//var wss_array = ["Cute","Happy","<u>Playful</u>","Smart","Loyal"];
var wss_array = ["<img src='img/1.jpg'>","<img src='img/2.jpg'>","<img src='img/3.jpg'>"];
var wss_elem;
function wssNext(){
    wss_i++;
    wss_elem.style.opacity = 0;
    if(wss_i > (wss_array.length - 1)){
        wss_i = 0;
    }
    setTimeout('wssSlide()',1000);
}
function wssSlide(){
    wss_elem.innerHTML = wss_array[wss_i];
    wss_elem.style.opacity = 1;
    setTimeout('wssNext()',2000);
}
</script>
<h1>Follow me <span id="wss"></span></h1>
<script>wss_elem = document.getElementById("wss"); wssSlide(); </script>

```

quiz.html
```
<style>
div#test{ border:#000 1px solid; padding:10px 40px 40px 40px; }
</style>
<script>
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
var questions = [
    [ "What is 10 + 4?", "12", "14", "16", "B" ],
    [ "What is 20 - 9?", "7", "13", "11", "C" ],
    [ "What is 7 x 3?", "21", "24", "25", "A" ],
    [ "What is 8 / 2?", "10", "2", "4", "C" ]
];
function _(x){
    return document.getElementById(x);
}
function renderQuestion(){
    test = _("test");
    if(pos >= questions.length){
        test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
        _("test_status").innerHTML = "Test Completed";
        pos = 0;
        correct = 0;
        return false;
    }
    _("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    test.innerHTML = "<h3>"+question+"</h3>";
    test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
    test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
    test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
function checkAnswer(){
    choices = document.getElementsByName("choices");
    for(var i=0; i<choices.length; i++){
        if(choices[i].checked){
            choice = choices[i].value;
        }
    }
    if(choice == questions[pos][4]){
        correct++;
    }
    pos++;
    renderQuestion();
}
window.addEventListener("load", renderQuestion, false);
</script>
</head>
<body>
<h2 id="test_status"></h2>
<div id="test"></div>

```
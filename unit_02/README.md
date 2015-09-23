# jsdanco

## Методы у объектов

При объявлении объекта можно указать свойство-функцию, например:
```
var user = {
  name: 'Василий',

  // метод
  sayHi: function() {
    alert( 'Привет!' );
  }

};

// Вызов
user.sayHi();
```
Свойства-функции называют «методами» объектов. Их можно добавлять и удалять в любой момент, в том числе и явным присваиванием:
```

             var user = {
  name: 'Василий'
};

user.sayHi = function() { // присвоили метод после создания объекта
  alert('Привет!');
};

// Вызов метода:
user.sayHi();
```
## Доступ к объекту через this

Для полноценной работы метод должен иметь доступ к данным объекта. В частности, вызов user.sayHi() может захотеть вывести имя пользователя.

Для доступа к текущему объекту из метода используется ключевое слово this.

Значением this является объект перед «точкой», в контексте которого вызван метод, например:
```

                    var user = {
  name: 'Василий',

  sayHi: function() {
    alert( this.name );
  }
};

user.sayHi(); // sayHi в контексте user
```
Здесь при выполнении функции user.sayHi() в this будет храниться ссылка на текущий объект user.

Вместо this внутри sayHi можно было бы обратиться к объекту, используя переменную user:
```
                    ...
  sayHi: function() {
    alert( user.name );
  }
...
```
…Однако, такое решение нестабильно. Если мы решим скопировать объект в другую переменную, например admin = user, а в переменную user записать что-то другое — обращение будет совсем не по адресу:
```
                    var user = {
  name: 'Василий',

  sayHi: function() {
    alert( user.name ); // приведёт к ошибке
  }
};

var admin = user;
user = null;

admin.sayHi(); // упс! внутри sayHi обращение по старому имени, ошибка!
```
Использование this гарантирует, что функция работает именно с тем объектом, в контексте которого вызвана.

Через this метод может не только обратиться к любому свойству объекта, но и передать куда-то ссылку на сам объект целиком:
```

var user = {
  name: 'Василий',

  sayHi: function() {
    showName(this); // передать текущий объект в showName
  }
};

function showName(namedObj) {
  alert( namedObj.name );
}

user.sayHi(); // Василий
```

Любая функция может иметь в себе this. Совершенно неважно, объявлена ли она в объекте или отдельно от него.

Значение this называется контекстом вызова и будет определено в момент вызова функции.

Например, такая функция, объявленная без объекта, вполне допустима:
```
                       function sayHi() {
  alert( this.firstName );
}
```
Эта функция ещё не знает, каким будет this. Это выяснится при выполнении программы.

Если одну и ту же функцию запускать в контексте разных объектов, она будет получать разный this:
```

var user = { firstName: "Вася" };
var admin = { firstName: "Админ" };

function func() {
  alert( this.firstName );
}

user.f = func;
admin.g = func;

// this равен объекту перед точкой:
user.f(); // Вася
admin.g(); // Админ
admin['g'](); // Админ (не важно, доступ к объекту через точку или квадратные скобки)
```
Итак, значение this не зависит от того, как функция была создана, оно определяется исключительно в момент вызова.

## Значение this при вызове без контекста

Если функция использует this — это подразумевает работу с объектом. Но и прямой вызов func() технически возможен.

Как правило, такая ситуация возникает при ошибке в разработке.

При этом this получает значение window, глобального объекта:
```
function func() {
  alert( this ); // выведет [object Window] или [object global]
}

func();
```
Таково поведение в старом стандарте.

А в режиме use strict вместо глобального объекта this будет undefined:
```
function func() {
  "use strict";
  alert( this ); // выведет undefined (кроме IE9-)
}

func();
```
Обычно если в функции используется this, то она, всё же, служит для вызова в контексте объекта, так что такая ситуация — скорее исключение.

## Ссылочный тип

Контекст this никак не привязан к функции, даже если она создана в объявлении объекта. Чтобы this передался, нужно вызвать функцию именно через точку (или квадратные скобки).

Любой более хитрый вызов приведёт к потере контекста, например:
```

var user = {
  name: "Вася",
  hi: function() { alert(this.name); },
  bye: function() { alert("Пока"); }
};

user.hi(); // Вася (простой вызов работает)

// а теперь вызовем user.hi или user.bye в зависимости от имени
(user.name == "Вася" ? user.hi : user.bye)(); // undefined
```
В последней строке примера метод получен в результате выполнения тернарного оператора и тут же вызван. Но this при этом теряется.

Если хочется понять, почему, то причина кроется в деталях работы вызова obj.method().

Он ведь, на самом деле, состоит из двух независимых операций: точка . — получение свойства и скобки () — его вызов (предполагается, что это функция).

Функция сама по себе не запоминает контекст. точка возвращает не функцию, а значение специального «ссылочного» типа Reference Type.

Этот тип представляет собой связку «base-name-strict», где:

base — как раз объект,
name — имя свойства,
strict — вспомогательный флаг для передачи use strict.

То есть, ссылочный тип (Reference Type) — это своеобразное «три-в-одном». Он существует исключительно для целей спецификации, мы его не видим, поскольку любой оператор тут же от него избавляется:

Скобки () получают из base значение свойства name и вызывают в контексте base.
Другие операторы получают из base значение свойства name и используют, а остальные компоненты игнорируют.
Поэтому любая операция над результатом операции получения свойства, кроме вызова, приводит к потере контекста.

Аналогично работает и получение свойства через квадратные скобки obj[method].

## Внутренний и внешний интерфейс
Один из важнейших принципов ООП — отделение внутреннего интерфейса от внешнего.

## Внутренний и внешний интерфейс

В программировании мы будем разделять методы и свойства объекта на две группы:

- Внутренний интерфейс — это свойства и методы, доступ к которым может быть осуществлен только из других методов объекта, их также называют «приватными» (есть и другие термины, встретим их далее).
В- ешний интерфейс — это свойства и методы, доступные снаружи объекта, их называют «публичными».

Если продолжить аналогию с кофеваркой — то, что спрятано внутри кофеварки: трубка кипятильника, нагревательный элемент, тепловой предохранитель и так далее — это её внутренний интерфейс.

Внутренний интерфейс используется для обеспечения работоспособности объекта, его детали используют друг друга. Например, трубка кипятильника подключена к нагревательному элементу.

Но снаружи кофеварка закрыта специальным кожухом, чтобы никто к ним не подобрался. Детали скрыты и недоступны. Виден лишь внешний интерфейс.

Получив объект, всё, что нужно для пользования им — это знать внешний интерфейс. О внутреннем же знать вообще не обязательно.

Далее мы реализуем кофеварку на JavaScript с приватными и публичными свойствами. В кофеварке много деталей, мы конечно, не будем моделировать каждый винтик, а сосредоточимся на основных приёмах разработки.

1. : публичное и приватное свойство

Конструктор кофеварок будет называться CoffeeMachine.
```
function CoffeeMachine(power) {
  this.waterAmount = 0; // количество воды в кофеварке

  alert( 'Создана кофеварка мощностью: ' + power + ' ватт' );
}

// создать кофеварку
var coffeeMachine = new CoffeeMachine(100);

// залить воды
coffeeMachine.waterAmount = 200;
```
Локальные переменные, включая параметры конструктора, можно считать приватными свойствами.

В примере выше это power — мощность кофеварки, которая указывается при создании и далее будет использована для расчёта времени кипячения.

К локальным переменным конструктора нельзя обратиться снаружи, но они доступны внутри самого конструктора.

## Свойства, записанные в this, можно считать публичными.

Здесь свойство waterAmount записано в объект, а значит — доступно для модификации снаружи. Можно доливать и выливать воду в любом количестве.

Далее мы будем называть power как «локальной переменной», так и «приватным свойством» объекта.

ООП-принцип «приватного свойства» реализован через локальные переменные, поэтому и «локальная переменная» и «приватное свойство» — правильные термины, в зависимости от того, с какой точки зрения взглянуть — кода или архитектуры ООП.

2. : публичный и приватный методы

Добавим публичный метод run, запускающий кофеварку, а также вспомогательные внутренние методы getBoilTime и onReady:
```
function CoffeeMachine(power) {

  this.waterAmount = 0;

  // расчёт времени для кипячения
  function getBoilTime() {
    return 1000; // точная формула расчета будет позже
  }

  // что делать по окончании процесса
  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    // setTimeout - встроенная функция,
    // она запустит onReady через getBoilTime() миллисекунд
    setTimeout(onReady, getBoilTime());
  };
}

var coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
```

Приватные методы, такие как onReady, getBoilTime могут быть объявлены как вложенные функции.

В результате естественным образом получается, что доступ к ним (через замыкание) имеют только другие функции, объявленные в том же конструкторе.

3. : константа

Для расчёта времени на кипячение воды используется формула c*m*ΔT / power, где:

c — коэффициент теплоёмкости воды, физическая константа равная 4200.
m — масса воды, которую нужно согреть.
ΔT — температура, на которую нужно подогреть, будем считать, что изначально вода — комнатной температуры 20°С, то есть до 100° нужно греть на ΔT=80.
power — мощность.

Используем её в более реалистичном варианте getBoilTime(), включающем использование приватных свойств и константу:

```
"use strict"

function CoffeeMachine(power) {

  this.waterAmount = 0;

  // физическая константа - удельная теплоёмкость воды для getBoilTime
  var WATER_HEAT_CAPACITY = 4200;

  // расчёт времени для кипячения
  function getBoilTime() {
      return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power; // ошибка!
    }

  // что делать по окончании процесса
  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    setTimeout(onReady, getBoilTime());
  };

}

var coffeeMachine = new CoffeeMachine(1000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();

```
Удельная теплоёмкость WATER_HEAT_CAPACITY выделена большими буквами, так как это константа.

Внимание, при запуске кода выше в методе getBoilTime будет ошибка. 
Uncaught TypeError: Cannot read property 'waterAmount' of undefined

4. : доступ к объекту из внутреннего метода

Внутренний метод вызывается так: getBoilTime(). в современном стандарте он будет undefined, из-за этого при чтении this.waterAmount возникнет ошибка!

Её можно решить, если вызвать getBoilTime с явным указанием контекста: 

getBoilTime.call(this):
```

function CoffeeMachine(power) {
  this.waterAmount = 0;
  var WATER_HEAT_CAPACITY = 4200;

  function getBoilTime() {
    return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    setTimeout(onReady, getBoilTime.call(this));
  };

}

// создаю кофеварку, мощностью 100000W чтобы кипятила быстро
var coffeeMachine = new CoffeeMachine(100000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
```
Такой подход будет работать, но он не очень-то удобен. Ведь получается, что теперь везде, где мы хотим вызвать getBoilTime, нужно явно указывать контекст, т.е. писать getBoilTime.call(this).


## Привязка через bind

Можно при объявлении привязать getBoilTime к объекту через bind, тогда вопрос контекста отпадёт сам собой:
```

function CoffeeMachine(power) {
  this.waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  var getBoilTime = function() {
    return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }.bind(this);

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    setTimeout(onReady, getBoilTime());
  };

}

var coffeeMachine = new CoffeeMachine(100000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
```
Это решение будет работать, теперь функцию можно просто вызывать без call. Но объявление функции стало менее красивым.

## Сохранение this в замыкании 6

Пожалуй, самый удобный и часто применяемый путь решения состоит в том, чтобы предварительно скопировать this во вспомогательную переменную и обращаться из внутренних функций уже к ней.

```
function CoffeeMachine(power) {
  this.waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  var self = this;

  function getBoilTime() {
      return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    setTimeout(onReady, getBoilTime());
  };

}

var coffeeMachine = new CoffeeMachine(100000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
```
Теперь getBoilTime получает self из замыкания.

Конечно, чтобы это работало, мы не должны изменять self, а все приватные методы, которые хотят иметь доступ к текущему объекту, должны использовать внутри себя self вместо this.

Вместо self можно использовать любое другое имя переменной, например var me = this.

В терминологии ООП отделение и защита внутреннего интерфейса называется инкапсуляция.

публичный метод stop(), который будет останавливать кипячение (через clearTimeout).

Вот такой код должен ничего не выводить 7:

```

function CoffeeMachine(power) {
  this.waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;
  var timerId;
  var self = this;

  function getBoilTime() {
    return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  function onReady() {
    alert( 'Кофе готово!' );
  }

  this.run = function() {
    timerId = setTimeout(onReady, getBoilTime());
  };

  this.stop = function() {
    clearTimeout(timerId)
  };
}


var coffeeMachine = new CoffeeMachine(50000);
coffeeMachine.waterAmount = 200;

coffeeMachine.run();
coffeeMachine.stop(); // кофе приготовлен не будет
```

# Геттеры и сеттеры
Для управляемого доступа к состоянию объекта используют специальные функции, так называемые «геттеры» и «сеттеры».

## Геттер и сеттер для воды

На текущий момент количество воды в кофеварке является публичным свойством waterAmount:
```
function CoffeeMachine(power) {
  // количество воды в кофеварке
  this.waterAmount = 0;

  ...
}
```

Это немного опасно. Ведь в это свойство можно записать произвольное количество воды.
```
// не помещается в кофеварку!
coffeeMachine.waterAmount = 1000000;
```
Так происходит потому, что свойство полностью доступно снаружи.

Для лучшего контроля над свойством его делают приватным, а запись значения осуществляется через специальный метод, который называют «сеттер» (setter method).

Типичное название для сеттера — setСвойство, например, в случае с кофеваркой таким сеттером будет метод setWaterAmount:

```
function CoffeeMachine(power, capacity) { // capacity - ёмкость кофеварки
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  // "умная" установка свойства
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  function onReady() {
    alert( 'Кофе готов!' );
  }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(600); // упс, ошибка!
```
Теперь waterAmount — внутреннее свойство, его можно записать (через сеттер), но, увы, нельзя прочитать.

Для того, чтобы дать возможность внешнему коду узнать его значение, создадим специальную функцию — «геттер» (getter method).

Геттеры обычно имеют название вида getСвойство, в данном случае getWaterAmount 9:
```

function CoffeeMachine(power, capacity) {
  //...
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };
}

var coffeeMachine = new CoffeeMachine(1000, 500);
coffeeMachine.setWaterAmount(450);
alert( coffeeMachine.getWaterAmount() ); // 450
```
###  Единый геттер-сеттер

Для большего удобства иногда делают единый метод, который называется так же, как свойство и отвечает и за запись и за чтение.

При вызове без параметров такой метод возвращает свойство, а при передаче параметра — назначает его 10.

```
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  this.waterAmount = function(amount) {
    // вызов без параметра, значит режим геттера, возвращаем свойство
    if (!arguments.length) return waterAmount;

    // иначе режим сеттера
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

}

var coffeeMachine = new CoffeeMachine(1000, 500);

// пример использования
coffeeMachine.waterAmount(450);
alert( coffeeMachine.waterAmount() ); // 450
```
Единый геттер-сеттер используется реже, чем две отдельные функции, но в некоторых JavaScript-библиотеках, например jQuery и D3 подобный подход принят на уровне концепта.


## конструктор User для создания объектов:

С приватными свойствами имя firstName и фамилия surname.
С сеттерами для этих свойств.
С геттером getFullName(), который возвращает полное имя.

Должен работать так:
```
function User() {
  /* ваш код */
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов
```

Решение:
```
function User() {

  var firstName, surname;

  this.setFirstName = function(newFirstName) {
    firstName = newFirstName;
  };

  this.setSurname = function(newSurname) {
    surname = newSurname;
  };

  this.getFullName = function() {
    return firstName + ' ' + surname;
  }
}

var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов
```
Обратим внимание, что для «геттера» getFullName нет соответствующего свойства объекта, он конструирует ответ «на лету». Это нормально. Одна из целей существования геттеров/сеттеров — как раз и есть изоляция внутренних свойств объекта, чтобы можно было их как угодно менять, генерировать «на лету», а внешний интерфейс оставался тем же.

## геттер для приватного свойства power, чтобы внешний код мог узнать мощность кофеварки.

Исходный код:
```
function CoffeeMachine(power, capacity) {
  //...
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };

}
```

Здесь это означает, что мощность power можно указать лишь при создании кофеварки и в дальнейшем её можно прочитать, но нельзя изменить.
```
function CoffeeMachine(power, capacity) {
  //...
  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить воды больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.getWaterAmount = function() {
    return waterAmount;
  };

  this.getPower = function() {
    return power;
  };
}

```
Добавьте кофеварке публичный метод addWater(amount), который будет добавлять воду.

При этом, конечно же, должны происходить все необходимые проверки — на положительность и превышение ёмкости.

Исходный код 12:
```
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  function onReady() {
    alert( 'Кофе готов!' );
  }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}
Вот такой код должен приводить к ошибке:

var coffeeMachine = new CoffeeMachine(100000, 400);
coffeeMachine.addWater(200);
coffeeMachine.addWater(100);
coffeeMachine.addWater(300); // Нельзя залить больше, чем 400
coffeeMachine.run();
```
В решении ниже addWater будет просто вызывать setWaterAmount 13.

```
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    if (amount < 0) {
      throw new Error("Значение должно быть положительным");
    }
    if (amount > capacity) {
      throw new Error("Нельзя залить больше, чем " + capacity);
    }

    waterAmount = amount;
  };

  this.addWater = function(amount) {
    this.setWaterAmount(waterAmount + amount);
  };

  function onReady() {
    alert( 'Кофе готов!' );
  }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine(100000, 400);
coffeeMachine.addWater(200);
coffeeMachine.addWater(100);
coffeeMachine.addWater(300); // Нельзя залить больше..
coffeeMachine.run();
```
Обычно когда кофе готов, мы хотим что-то сделать, например выпить его.

Сейчас при готовности срабатывает функция onReady, но она жёстко задана в коде:

```
function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    // ... проверки пропущены для краткости
    waterAmount = amount;
  };

  this.getWaterAmount = function(amount) {
    return waterAmount;
  };

  function onReady() {
      alert( 'Кофе готов!' );
    }

  this.run = function() {
    setTimeout(onReady, getTimeToBoil());
  };

}
## сеттер setOnReady, чтобы код снаружи мог назначить свой onReady, вот так 14:

```

function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    // ... проверки пропущены для краткости
    waterAmount = amount;
  };

  this.getWaterAmount = function(amount) {
    return waterAmount;
  };

  function onReady() {
    alert( 'Кофе готов!' );
  }

  this.setOnReady = function(newOnReady) {
    onReady = newOnReady;
  };

  this.run = function() {
    setTimeout(function() {
      onReady();
    }, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(150);

coffeeMachine.run();

coffeeMachine.setOnReady(function() {
  var amount = coffeeMachine.getWaterAmount();
  alert( 'Готов кофе: ' + amount + 'мл' ); // Готов кофе: 150 мл
});

```

В сеттере setOnReady параметр называется newOnReady. Мы не можем назвать его onReady, так как тогда изнутри сеттера мы никак не доберёмся до внешнего (старого значения):
```
// нерабочий вариант
this.setOnReady = function(onReady) {
  onReady = onReady; // ??? внешняя переменная onReady недоступна
};
```
Чтобы setOnReady можно было вызывать в любое время, в setTimeout передаётся не onReady, а анонимная функция function() { onReady() }, которая возьмёт текущий (установленный последним) onReady из замыкания.


Из внешнего кода мы хотели бы иметь возможность понять — запущена кофеварка или нет.

Для этого добавьте кофеварке публичный метод isRunning(), который будет возвращать true, если она запущена и false, если нет.

Нужно, чтобы такой код работал:
```
var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(100);

alert( 'До: ' + coffeeMachine.isRunning() ); // До: false

coffeeMachine.run();
alert( 'В процессе: ' + coffeeMachine.isRunning() ); // В процессе: true

coffeeMachine.setOnReady(function() {
  alert( "После: " + coffeeMachine.isRunning() ); // После: false
});
```
Код решения модифицирует функцию run и добавляет приватный идентификатор таймера timerId, по наличию которого мы судим о состоянии кофеварки:
```

function CoffeeMachine(power, capacity) {
  var waterAmount = 0;

  var timerId;

  this.isRunning = function() {
    return !!timerId;
  };

  var WATER_HEAT_CAPACITY = 4200;

  function getTimeToBoil() {
    return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
  }

  this.setWaterAmount = function(amount) {
    // ... проверки пропущены для краткости
    waterAmount = amount;
  };

  this.getWaterAmount = function(amount) {
    return waterAmount;
  };

  function onReady() {
    alert( 'Кофе готов!' );
  }

  this.setOnReady = function(newOnReady) {
    onReady = newOnReady;
  };

  this.run = function() {
    timerId = setTimeout(function() {
      timerId = null;
      onReady();
    }, getTimeToBoil());
  };

}

var coffeeMachine = new CoffeeMachine(20000, 500);
coffeeMachine.setWaterAmount(100);

alert( 'До: ' + coffeeMachine.isRunning() ); // До: false

coffeeMachine.run();
alert( 'В процессе: ' + coffeeMachine.isRunning() ); // В процессе: true

coffeeMachine.setOnReady(function() {
  alert( "После: " + coffeeMachine.isRunning() ); // После: false
});

```


# jsdanco
## События

## Базовые

### .bind()
Устанавливает обработчик события на выбранные элементы страницы. Обработчик не сработает на элементах, появившихся после его установки.

### .unbind()
Удаляет обработчик событий у выбранных элементов.

### .live()
Устанавливает обработчик события на выбранные элементы страницы. Обработчик сработает и на элементах, появившихся после его установки.

### .die()
Удаляет обработчик событий, который был установлен с помощью live().

### .delegate()
Устанавливает обработчик события на выбранные элементы страницы. Элементы выбираются с помощью уточняющего селектора. Обработчик будет действовать и на элементах, появившихся после его установки.

### .undelegate()
Удаляет обработчик событий, который был установлен с помощью delegate().


### .on()
Универсальный метод для установки обработчиков событий на выбранные элементы страницы.
```
.on(events, [selector], [data], handler)
```
- events — тип(ы) обрабатываемых событий. Например "click", "resize" и.т.д.  Если необходимо привязать обработчик сразу на несколько типов событий, нужно перечислить их через пробел: "click resize ..."

- selector — селектор по которому будут фильтроваться элементы, лежащие внутри уже найденных. В итоге, обработчик будет срабатывать только в том случае, если событие «поднялось» от одного из отфильтрованных элементов.
- data — данные, передаваемые обработчику событий. В обработчике будут доступны в переменной event.data.
- handler — функция, которая будет установлена в качестве обработчика. Вместо функции, можно указать значение false, это будет эквивалентно установке такой функции: function(){return false;}.
```
.on(events-map, [selector], [data])
```
с помощью этого метода можно установить на выбранные элементы сразу несколько разных обработчиков событий, каждый из которых будет реагировать на свой тип события.
- events-map — объект, в котором нужно перечислить типы обрабатываемых событий и соответствующие им обработчики. Задается в формате {events-1:handler-1, events-2:handler-2, ...}, где events-i и handler-i соответствуют параметрам events и handler в первом варианте метода.

пример on/1:
```
// Установим обработчик нажатия кнопкой мыши, элементу с идентификатором foo

$('#foo').on('click', function(){
  alert('Вы нажали на элемент "foo"');
});
 
// Теперь, при нажатии на элемент foo, будет выведено сообщение
```
Метод on() введен в jQuery-1.7, чтобы объединить три метода библиотеки, устанавливающие обработчики событий на элементы страницы: .bind(), .delegate(), .live(). Сами эти методы считаются теперь устаревшими, хотя еще поддерживаться. Установить обработчик, срабатывающий только один раз, по прежнему можно только с помощью отдельного метода .one().

on/2

```
<!DOCTYPE html>
<html>
<head>
  <style>
    p {background:yellow; font-weight:bold; cursor:pointer; padding:5px;}
    p.over {background: #ccc;}
    .onev  {background: #00f;}
    span {color:red;}
  </style>
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
  (нажмите на один из элементов из списка)
  <ul>
    <li>Быстрее</li>
    <li>Выше</li>
    <li>Сильнее</li>
  </ul>
  <script>
    $('ul').on('click', "li", function(){
      var txt = $(this).text(); // вытащим текст из нажатого элемента
      alert('Вы нажали на элемент с текстом - «' + txt + '»'); // выведем сообщение с текстом
    });
  </script>

  (нажмите на один из элементов из списка)
  <ul id='foo'>
    <li class='l1'>Быстрее Быстрее</li>
    <li class='l2'>Выше Выше</li>
    <li class='l3'>Сильнее Сильнее</li>
  </ul>
  <script>
    $('#foo').on('click', function(){
      var txt = $(this).text(); // вытащим текст из нажатого элемента
      alert('Вы нажали на элемент с текстом - «' + txt + '»'); // выведем сообщение с текстом
    });
  </script>
<button id='but'>Greet</button>

<p>"Кликать" сюда.</p>
  <span></span>

  <div id='demo'>Demo element</div>
  <button id='dem'>Demo button</button>

<h3>mousemove-elm</h3>
<h4 class='mousemove-elm'>Большинство событий, как например нажатие мышью по элементу (click) происходят относительно редко и проблем с их обработкой практически не возникает. Однако такие события как mousemove и scroll могут происходить несколько раз в секунду. В этом случае, частое выполнение обработчиков может потребовать значительных вычислительных ресурсов компьютера и приводить к зависанию. Избежать этого можно, если грамотно организовать выполнение обработчиков. Например, стоит кэшировать вычисляемые величины, вместо того, чтобы считать их каждый раз заново. И в первую очередь следует кэшировать объекты jQuery, поскольку их создание зачастую требует весомых вычислительных затрат. Например, рассмотрим случай, когда нужно в элементе с идентификатором elm прописывать координаты мыши, когда она движется над элементом с классом mousemove-elm:</h4>
<div id='elm'></diV>


<script type="text/javascript">
function greet(event){
  alert("Hello "+event.data.name);
}
// установим на кнопки один обработчики с 2-мя разными данными
$("#but").on("click", { name: "Karl" }, greet);
$("#but").on("click", { name: "Addy" }, greet);

    // при нажатии по элементу <p> выведем текст, содержащий координаты клика
    $("p").on("click", function(event){
      var str = "( " + event.pageX + ", " + event.pageY + " )";
      $("span").text("Клик, это звучит гордо! Особенно в координатах " + str);
    });
    // при двойном нажатии по элементу <p> выведем название тега нажатого элемента
    $("p").on("dblclick", function(){
      $("span").text("Клик - хорошо, а двойной лучше! Нажат элемент " + this.nodeName);
    });

    // при наведении и отведении курсора от элемента <p> будем "переключать" наличие класса over
    $("p").on("mouseenter mouseleave", function(){
      $(this).toggleClass("over");
    });
    $("#dem").on("click", function(){
      $('#demo').toggleClass("onev");
    });
    // эффективное выполнение задачи - элемент с id=elm

    // ищется только один раз
    var elm = $("#elm");
    $('.mousemove-elm').on('mousemove', function(event){
      elm.text(event.pageX + ", " + event.pageY);
    });
</script>

</body>
</html>

```
on/3
```
<!DOCTYPE html>
<html>
<head>
  <style>
    p{background:yellow; font-weight:bold; cursor:pointer; padding:5px;}
    p.over{background: #ccc;}
    span{color:red;}
  </style>
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
  <p>"Кликать" сюда.</p>
  <span></span>
  <script>
    // при нажатии по элементу <p> выведем текст, содержащий координаты клика
    $("p").on("click", function(event){
      var str = "( " + event.pageX + ", " + event.pageY + " )";
      $("span").text("Клик, это звучит гордо! Особенно в координатах " + str);
    });

    // при двойном нажатии по элементу <p> выведем название тега нажатого элемента
    $("p").on("dblclick", function(){
      $("span").text("Клик - хорошо, а двойной лучше! Нажат элемент " + this.nodeName);
    });

    // при наведении и отведении курсора от элемента <p> будем "переключать" наличие класса over
    $("p").on("mouseenter mouseleave", function(){
      $(this).toggleClass("over");
    });

</script>
</body>
</html>
```

### .off()
Удаляет обработчики, установленные с помощь .on().

### .one()
Устанавливает обработчик события на выбранные элементы страницы, который сработает только по одному разу, на каждом из элементов.


### .trigger()

Выполнить события заданного типа и запустить обработчики, прикреплённые к элементам.

```
.trigger( eventType [, extraParameters ] )

.trigger( eventType [, extraParameters ] )
```
- eventType
- event
Тип: Строка с названием типа JavaScript события. 


- extraParameters 

Тип: Массив или Объект 

Дополнительный параметр, передаваемый в обработчик.

Каждый обработчик события, прикреплённый методом .on() или один из его сокращений будет выполнен при генерации события, которым можно “выстрелить” вручную, или методом .trigger(). Вызов метода .trigger() выполняет обработчики в том порядке, в котором они были прикреплены:

```
$( "#foo" ).on( "click", function() {

 alert( $( this ).text() );

});

$( "#foo" ).trigger( "click" );
```
Если вам необходимо только вызвать обработчики событий, без выполнения самого события, воспользуйтесь методом triggerHandler().

При создании собственного события и его настройки с помощью метода .on(), второй аргумент может быть очень полезен. К примеру, представьте, что мы прикрепили обработчик к событию custom:
```

$( "#foo" ).on( "custom", function( event, param1, param2 ) {

 alert( param1 + "\n" + param2 );

});

$( "#foo").trigger( "custom", [ "Custom", "Event" ] );
```
Объект события всегда передаётся в качестве первого аргумента. Так же в .trigger() можем передать и массив аргументов. Начиная с jQuery 1.6.2, можно передать просто строку или числовой аргумент.


trigger/1: Клик по кнопке #2, но так же вызвать обработку клика по кнопке #1.
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>trigger demo</title>
  <style>
  button {
    margin: 10px;
  }
  div {
    color: blue;
    font-weight: bold;
  }
  span {
    color: red;
  }
  </style>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>

<button>Button #1</button>
<button>Button #2</button>
<div><span>0</span> button #1 clicks.</div>
<div><span>0</span> button #2 clicks.</div>

<script>
$( "button:first" ).click(function() {
  update( $( "span:first" ) );
});

$( "button:last" ).click(function() {
  $( "button:first" ).trigger( "click" );
  update( $( "span:last" ) );
});

function update( j ) {
  var n = parseInt( j.text(), 10 );
  j.text( n + 1 );
}
</script>

</body>
</html>
```

trigger/2 Отправить первую форму, без запуска функции submit():
```

$( "form:first" ).trigger( "submit" );
```
Отправить первую форму, без запуска функции submit():
```

var event = jQuery.Event( "submit" );

$( "form:first" ).trigger( event );

if ( event.isDefaultPrevented() ) {

 // действие...

}

```
Передать данные в событие:

```

$( "p" )

 .click(function( event, a, b ) {

   // При обычном клике, a и b равны undefined

   // при ручном вызове, они будут равны значениям "foo" и "bar"

 })

 .trigger( "click", [ "foo", "bar" ] );
```
Передать данные через объект события.

```

var event = jQuery.Event( "logged" );

event.user = "foo";

event.pass = "bar";

$( "body" ).trigger( event );
```

Альтернативный способ передачи данных через объект события:

```
$( "body" ).trigger({

 type:"logged",

 user:"foo",

 pass:"bar"

});

```

trigger/4
```

  Нажми на элементы списка.  
  <ul id='foo'>
    <li>Один</li>
    <li>Два</li>
    <li>Три</li>
  </ul>
  <button>trigger</button><br><br>
  
  <span></span>
  <script>
 // установим обработчик нажатия кнопки мыши на элементе foo
$('#foo').bind('click', function(){
  alert('Шла Саша по шоссе')
});
 
// вызовем событие нажатия на элемент, что приведет к выполнению обработчика
$('#foo').trigger('click');
</script>

```


### .triggerHandler()
Запускает обработчик указанного события, без его выполнения.

trigger/5
```
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
  Нажми на элементы списка.  
  <ul id='foo'>
    <li>Один</li>
    <li>Два</li>
    <li>Три</li>
  </ul>

  <button>triggerHandler</button><br><br>
  
  <span></span>

  <script>
// установим обработчик нажатия кнопки мыши на элементе foo
$('#foo').bind('click', function(){
  alert('Шла Саша по шоссе')
});
 
// вызовем выполнение обработчика
$('#foo').triggerHandler('click', handler);

</script>

</body>
</html>
```

## jQuery.proxy()
По заданной функции, создает другую, внутри которой переменная this будет равна заданному значению.
- event
Объект, содержащий данные о текущем событии. Передается всем обработчикам событий.

## События мыши
- .click()
Устанавливает обработчик "клика" мышью по элементу, либо, запускает это событие.
- .dblclick()
Устанавливает обработчик двойного "клика" мышью по элементу, либо, запускает это событие.
- .hover()
Устанавливает обработчик двух событий: появления/исчезновения курсора над элементом.
- .mousedown()
Устанавливает обработчик нажатия кнопки мыши, либо, запускает это событие.
- .mouseup()
Устанавливает обработчик поднятия кнопки мыши, либо, запускает это событие.
- .mouseenter()
Устанавливает обработчик появления курсора в области элемента, либо, запускает это событие. Появление этого события, отработано лучше, чем стандартного mouseover.
- .mouseleave()
Устанавливает обработчик выхода курсора из области элемента, либо, запускает это событие. Появление этого события, отработано лучше, чем стандартного mouseout.
- .mousemove()
Устанавливает обработчик движения курсора в области элемента, либо, запускает это событие.
- .mouseout()
Устанавливает обработчик выхода курсора из области элемента, либо, запускает это событие.
- .mouseover()
Устанавливает обработчик появления курсора в области элемента, либо, запускает это событие.
- .toggle()
Поочередно выполняет одну из двух или более заданных функций, в ответ на "клик" по элементу.

## События клавиатуры

- .keydown()
Устанавливает обработчик перехода клавиши клавиатуры в нажатое состояние, либо, запускает это событие.

- .keyup()
Устанавливает обработчик возвращение клавиши клавиатуры в ненажатое состояние, либо, запускает это событие.

.keyup()
Устанавливает обработчик возвращения клавиши клавиатуры в ненажатое состояние, либо, запускает это событие. Метод имеет три варианта использования:

.keyup(eventData, handler(eventObject))

Является аналогом bind("keyup", eventData, handler(eventObject)).
handler(eventObject)

- handler(eventObject) — функция, которая будет установлена в качестве обработчика. При вызове она будет получать объект события eventObject.

- eventData — дополнительные данные, передаваемые в обработчик. Они должны быть представлены объектом в формате: {fName1:value1, fName2:value2, ...}.

Вызывает событие keyup, у выбранных элементов страницы. Метод является аналогом trigger("keyup").

Убрать установленный обработчик можно с помощью метода unbind().

Метод часто используют совместно с keydown(), который обрабатывает переход клавиши клавиатуры в нажатое состояние.

Обработчик может быть установлен на любой элемент страницы, однако он получит уведомление о событии, только если этот элемент будет находиться в фокусе. Поскольку в различных браузерах список элементов, которые могут получать фокус, может отличаться, то надежнее всего будет привязать это событие к элементам формы. Если необходимо отслеживать нажатие клавиши не в отдельном элементе, а на всей странице сразу, то можно привязать обработчик к объекту документа: $(document).keyup(handler).

Код нажатой клавиши

Для того, чтобы узнать какая именно клавиша клавиатуры была отпущена, можно посмотреть значение переменной eventObject.which, которая содержит код нажатой клавиши. Надо отметить, что метод keyup как и keydown определяют отпущенную клавишу, а не вводимый с ее помощью символ, таким образом, при введении латинских "a" и "A" и кириллических "ф" и "Ф", переменная eventObject.which внутри обработчика события keyup будет содержать одно значение — 65, поскольку все они находятся на одной кнопке. 

Для того, чтобы узнать вводимый символ (а не клавишу) нужно использовать метод keypress.

Пример key/2
```
// установим обработчик события keyup, элементу с идентификатором foo
// и проверим, какая именно клавиша была отпущена
$('#foo').keyup(function(eventObject){
  alert('Клавиша клавиатуры возвратилась в ненажатое состояние. Код символа на этой клавише - ' + eventObject.which);
});
 
// вызовем событие keyup на элементе foo
$('#foo').keyup();
 
// установим еще один обработчик события keyup, на этот раз элементам 
// с классом block. В обработчик передадим дополнительные данные
$('.block').keyup({a:12, b:"abc"}, function(eventObject){
  var externalData = "a=" + eventObject.data.a + ", b=" + eventObject.data.b;
  alert('Кнопка клавиатуры была отпущена. '+
        'В обработчик этого события переданы данные: ' + externalData );
});
```
- .keypress()
Устанавливает обработчик ввода символа с клавиатуры, либо, запускает это событие.
key/1
```

  <input id='foo'>
  
  <script>

// установим обработчик события keypress, элементу с идентификатором foo
$('#foo').keypress(function(eventObject){
  alert('Вы ввели символ с клавиатуры. Его код равен ' + eventObject.which);
});
 
// вызовем событие keypress на элементе foo
$('#foo').keypress();
 
// установим еще один обработчик события keypress, на этот раз элементам 
// с классом block. В обработчик передадим дополнительные данные
$('.block').keypress({a:12, b:"abc"}, function(eventObject){
  var externalData = "a=" + eventObject.data.a + ", b=" + eventObject.data.b;
  alert('Вы ввели символ с клавиатуры. '+
        'В обработчик этого события переданы данные: ' + externalData);
});
</script>

```

## События формы
- .focus()
Устанавливает обработчик получения фокуса, либо, запускает это событие.
- .blur()
Устанавливает обработчик потери фокуса, либо, запускает это событие.
- .focusin()
Устанавливает обработчик получения фокуса самим элементом или одним из его дочерних.
- .focusout()
Устанавливает обработчик потери фокуса самим элементом или одним из его дочерних.
- .select()
Устанавливает обработчик выделения текста, либо, запускает это событие.
- .submit()
Устанавливает обработчик отправки формы, либо, запускает это событие.
- .change()
Устанавливает обработчик изменения элемента формы, либо, запускает это событие.
## События загрузки страницы
- .ready()
Устанавливает обработчик готовности дерева DOM.
- .load()
Устанавливает обработчик завершения загрузки элемента.
- .unload()
Устанавливает обработчик ухода со страницы (при переходе по ссылке, закрытии браузера и.т.д.).
## События браузера
- .error()
Устанавливает обработчик ошибки при загрузке элементов (например отсутствие необходимой картинки на сервере).
- .resize()
Устанавливает обработчик изменения размеров окна браузера, либо, запускает это событие.
- .scroll()
Устанавливает обработчик "прокрутки" элементов документа, либо, запускает это событие.
## Перемещения по дереву DOM
- .children()
Находит все дочерние элементы у выбранных элементов. При необходимости, можно указать селектор для фильтрации.
```
$("div").children() вернет элементы, которые лежат непосредственно внутри div-элементов.
$("div").children(".bigBlock")  вернет элементы класса bigBlock, которые лежат непосредственно внутри div-элементов.
$("#lArea").children(".lBlock") вернет элементы класса lBlock, которые лежат непосредственно внутри элемента с идентификатором lArea.
```
- .closest()
Находит ближайший, соответствующий заданному селектору элемент, из числа следующих: сам выбранный элемент, его родитель, его прародитель, и так далее, до начало дерева DOM.
```
$("#lBlock").closest("div") будет искать первый div-элемент среди элемента с id = lBlock и всех его предков.
$(".lBlock").closest("div") для каждого элемента с классом lBlock будет искать первый div-элемент среди самого элемента и его предков.
```
- .find()
Находит элементы по заданному селектору, внутри выбранных элементов.
- .next()
Находит элементы, которые лежат непосредственно после каждого из выбранных элементов.
- .nextAll()
Находит элементы, которые лежат после каждого из выбранных элементов.
- .nextUntil()
Находит элементы, которые лежат после каждого из выбранных, но не дальше элемента, удовлетворяющего заданному селектору.
- .offsetParent()
Возвращает ближайшего предка c позиционированием, отличным от static (позиционирование по умолчанию).
- .parent()
Находит родительские элементы у всех выбранных элементов.
- .parents()
Находит всех предков у выбранных элементов, т.е. не только прямых родителей, но и прародителей, прапрародителей и так далее, до начало дерева DOM.
- .parentsUntil()
Находит предков, как и .parents(), но прекращает поиск перед элементом, удовлетворяющим заданному селектору.
- .prev()
Находит элементы, которые лежат непосредственно перед каждым из выбранных элементов.
- .prevAll()
Находит элементы, которые лежат перед каждым из выбранных элементов.
- .prevUntil()
Находит элементы, которые лежат перед каждым из выбранных, но не дальше элемента, соответствующего заданному селектору.
- .siblings()
Находит все соседние элементы (под соседними понимаются элементы с общим родителем).



## .addClass()

Добавляет класс(ы) каждому выбранному элементу страницы.


- className

Имя класса(или имена классов, через пробел), которое требуется добавить к связанному элементу.

.addClass( function(index, currentClass) )

- function(index, currentClass)

Добавляет классы, список которых возвращает заданная пользователем функция. Возвращаемое значение должно представлять из себя строку, с перечислением добавляемых классов через пробел. Функция вызывается отдельно для каждого из выбранных элементов. При вызове ей передаются следующие параметры: index — позиция элемента в наборе, class — текущий класс(ы) элемента.
Тут важно заметить, что данный метод не замещает классы. Он просто добавляет класс, к уже существующим.

Одновременно может быть добавлен один и более классов, разделённые через пробел:

```
$("p").addClass("myClass yourClass");
```
Часто в связке с данным методом, используется .removeClass() для удаления одних классов и добавления других:

```
$("p").removeClass("myClass noClass").addClass("yourClass");
```
В данном примере у параграфа удаляются элементы myClass и noClass; добавляется класс yourClass.

Начиная с jQuery 1.4, метод.addClass() в качестве аргумента может принимать функцию.

```
$("ul li").addClass(function(index) {

return "item-" + index;

});
```

Дан ненумерованный список из двух li элементов. В данном примере, к первому элементу будет добавлен класс "item-0", а ко второму li "item-1".


addclass/1: Добавляем класс “selected” к элементам, подходящим под селектор.
```
<!DOCTYPE html>
<html>
<head>
  <style>
  p { margin: 8px; font-size:16px; }
  .selected { color:blue; }
  .highlight { background:yellow; }
  </style>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>

  <p>Hello</p>
  <p>and</p>
  <p>Goodbye</p>

<script>
  $("p").last().addClass("selected");
  </script>

</body>
</html>
```
addclass/2: Добавляем класс “selected” и “highlight” к элементам, подходящим под селектор.
```
<!DOCTYPE html>
<html>
<head>
  <style>
  p { margin: 8px; font-size:16px; }
  .selected { color:red; }
  .highlight { background:yellow; }
  </style>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
  <p>Hello</p>
  <p>and</p>
  <p>Goodbye</p>
<script>
  $("p:last").addClass("selected highlight");
  </script>

</body>
</html>
```
addclass/3: Передаём в .addClass() функцию, которая вычислит элемент у которого есть класс “red” и прибавит к нему класс “green”.
```
<!DOCTYPE html>
<html>
<head>
  <style>
  div { background: white; }
  .red { background: red; }
  .red.green { background: green; }
  </style>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>

 <div>This div should be white</div>
 <div class="red">This div will be green because it now has the "green" and "red" classes.
   It would be red if the addClass function failed.</div>
 <div>This div should be white</div>
 <p>There are zero green divs</p>

<script>
  $("div").addClass(function(index, currentClass) {
    var addedClass;

    if ( currentClass === "red" ) {
      addedClass = "green";
      $("p").text("There is one green div");
    }

    return addedClass;
  });
</script>

</body>
</html>
```

## .removeClass()

Удаляет класс(ы) у выбранных элементов.


.removeClass( [className] )

- className 

- classNameOne - строка, содержащая имя класса (либо имена классов, разделенных пробелами), который(ые) требуется удалить у каждого элемента в наборе.

.removeClass( function(index, class) )

- function(index, class)

Удаляет классы, список которых возвращает заданная функция, которая должна возвращать строку с перечислением классов через пробел. Функция вызывается отдельно для каждого из выбранных элементов. При вызове ей передаются параметры: index (позиция элемента в наборе) и class (текущий класс(ы) элемента).

Если указано название класса, то будет удалён только класс. Если ни один класс не указан, то все классы будут удалены.

Удалить сразу несколько классов можно, перечислив их через запятую:

```
$('p').removeClass('myClass yourClass')
```
Данный метод может быть использован с методом .addClass():

```
$('p').removeClass('myClass noClass').addClass('yourClass');
```
Классы myClass и noClass будут удалены, а добавлен класс yourClass.

Для замены всех классов на один, можно использовать метод .attr('class', 'newClass').

Начиная с jQuery 1.4, метод .removeClass() удалить классы в отдельной функции.

```
$('li:last').removeClass(function() {

  return $(this).prev().attr('class');

});
```


removeclass/1: удаляем класс 'blue'.
```
<!DOCTYPE html>
<html>
<head>
 <style>
 p { margin: 4px; font-size:16px; font-weight:bolder; }
 .blue { color:blue; }
 .under { text-decoration:underline; }
 .highlight { background:yellow; }
 </style>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
 <p class="blue under">Hello</p>
 <p class="blue under highlight">and</p>
 <p class="blue under">then</p>
 <p class="blue under">Goodbye</p>
<script>$("p:even").removeClass("blue");</script>
</body>
</html>
```
2: удаляем классы 'blue' и 'under’.
```
<!DOCTYPE html>
<html>
<head>
 <style>
 p { margin: 4px; font-size:16px; font-weight:bolder; }
 .blue { color:blue; }
 .under { text-decoration:underline; }
 .highlight { background:yellow; }
 </style>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
 <p class="blue under">Hello</p>
 <p class="blue under highlight">and</p>
 <p class="blue under">then</p>
 <p class="blue under">Goodbye</p>
<script>$("p:odd").removeClass("blue under");</script>
</body>
</html>

```
3: удаляем все классы
```
<!DOCTYPE html>
<html>
<head>
 <style>
 p { margin: 4px; font-size:16px; font-weight:bolder; }
 .blue { color:blue; }
 .under { text-decoration:underline; }
 .highlight { background:yellow; }
 </style>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
 <p class="blue under">Hello</p>
 <p class="blue under highlight">and</p>
 <p class="blue under">then</p>
 <p class="blue under">Goodbye</p>
<script>$("p:eq(1)").removeClass();</script>
</body>
</html>

```
## .toggleClass()

Переключатель классов. Добавляет элементу указанный класс, если его нет. Иначе удаляет.

.toggleClass( className, switch )

- className

Класс или классы которые будут добавлены/удалены

- switch

Если switch === true, то только добавляет указанные классы, если же switch === false, то только удаляет.

.toggleClass( function(index, class, switch) [, switch] )

- function(index, class, switch)

- switch 

Переключает классы, список которых возвращается функцией function в виде строки с перечислением классов через пробел. Функция вызывается для каждого из выбранных элементов. При вызове ей передаются index — позиция элемента в наборе и class — текущий класс(ы) элемента. switch определяет должны ли классы только добавляться (true) или же только удаляться (false)

.toggleClass( [switch ] )

- switch

Указание должен класс быть добавлен или удалён.

Данный метод добавляет или удаляет класс элемента. В первой версии, если добавляемый класс присутствует у элемента то он будет удалён; если класса нет, то он будет добавлен. 

К примеру, можем применить метод .toggleClass() к простому div:
```

<div class="tumble">Some text.</div>
```
Сначала при работе $('div.tumble').toggleClass('bounce'), получим следующее:

```
<div class="tumble bounce">Some text.</div>
```
При втором использовании $('div.tumble').toggleClass('bounce'), из div класс будет удалён:

```
<div class="tumble">Some text.</div>
```
Ну и по аналогии применени .toggleClass('bounce spin') к тому же div получим следующее 
```
<div class="tumble bounce spin"> и <div class="tumble">.
```
Вторая версия метода .toggleClass() принимает второй аргумент, который является явным указанием удалить или добавить класс. Если значение параметра true, класс будет добавлен; если false, то будет удалён. 

```

$('#foo').toggleClass(className, addOrRemove);
```
это эквивалент:
```

if (addOrRemove) {

    $('#foo').addClass(className);

  }

  else {

    $('#foo').removeClass(className);

  }
```
Начиная с jQuery 1.4, можем написать функцию для определния какой класс нужно добавить элементу.

```
$('div.foo').toggleClass(function() {

  if ($(this).parent().is('.bar')) {

    return 'happy';

  } else {

    return 'sad';

  }

});
```
В данном примере, если у элемента div class="foo" есть класс bar, то добавим класс happy; в другом случае sad.

toggle/1: добавляем или удаляем класс 'highlight' при клике.
```
<!DOCTYPE html>
<html>
<head>
 <style>
 p { margin: 4px; font-size:16px; font-weight:bolder;
     cursor:pointer; }
 .blue { color:blue; }
 .highlight { background:yellow; }
 </style>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
 <p class="blue">Click to toggle</p>
 <p class="blue highlight">highlight</p>
 <p class="blue">on these</p>
 <p class="blue">paragraphs</p>
<script>
   $("p").click(function () {
     $(this).toggleClass("highlight");
   });
</script>
</body>
</html>
```
2: добавляем класс "highlight" при каждом третьем клике; удалить при каждом втором.
```
<!DOCTYPE html>
<html>
<head>
 <style>
 p { margin: 4px; font-size:16px; font-weight:bolder;
     cursor:pointer; }
 .blue { color:blue; }
 .highlight { background:red; }
 </style>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
 <p class="blue">Click to toggle (<span>clicks: 0</span>)</p>
 <p class="blue highlight">highlight (<span>clicks: 0</span>)</p>
 <p class="blue">on these (<span>clicks: 0</span>)</p>
 <p class="blue">paragraphs (<span>clicks: 0</span>)</p>
<script>
var count = 0;
$("p").each(function() {
 var $thisParagraph = $(this);
 var count = 0;
 $thisParagraph.click(function() {
   count++;
   $thisParagraph.find("span").text('clicks: ' + count);
   $thisParagraph.toggleClass("highlight", count % 3 == 0);
 });
});
</script>
</body>
</html>
```
3: добавляем/удаляем классы к элементам div в зависимости от нажатых кнопок.
```
<!DOCTYPE html>
<html>
<head>
 <style>
.wrap > div { float: left; width: 100px; margin: 1em 1em 0 0;
             padding=left: 3px; border: 1px solid #abc; }
div.a { background-color: aqua; }
div.b { background-color: burlywood; }
div.c { background-color: cornsilk; }
</style>
 <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
</head>
<body>
<div class="buttons">
 <button>toggle</button>
 <button class="a">toggle a</button>
 <button class="a b">toggle a b</button>
 <button class="a b c">toggle a b c</button>
 <a href="#">reset</a>
</div>
<div class="wrap">
 <div></div>
 <div class="b"></div>
 <div class="a b"></div>
 <div class="a c"></div>
</div>
<script>
var cls = ['', 'a', 'a b', 'a b c'];
var divs = $('div.wrap').children();
var appendClass = function() {
 divs.append(function() {
   return '<div>' + (this.className || 'none') + '</div>';
 });
};
appendClass();
$('button').on('click', function() {
 var tc = this.className || undefined;
 divs.toggleClass(tc);
 appendClass();
});
$('a').on('click', function(event) {
 event.preventDefault();
 divs.empty().each(function(i) {
   this.className = cls[i];
 });
 appendClass();
});
</script>
</body>
</html>
```

## Поиск элементов внутри выбранных
.find()
Осуществляет поиск элементов внутри уже выбранных элементов. Метод имеет три вариант использования:

.find(selector):jQueryv:1.0
Ищет элементы, соответствующие заданному селектору, внутри выбранных элементов.

.find(jQuery object):jQueryv:1.6
Осуществляет поиск элементов внутри выбранных элементов, оставляя те, которые содержатся в заданном объекте jQuery.

.find(element):jQueryv:1.6
Осуществляет поиск элемента element внутри выбранных элементов. Параметр element задается в виде DOM-элемента.

Примеры использования:
```
$("div").find("span")   вернет все элементы span, находящиеся внутри div-элементов.
$("div").find(".bigBlock")  вернет все элементы с классом bigBlock, находящиеся внутри div-элементов.
$("div").find( $(".bigBlock") ) вернет все элементы с классом bigBlock, находящиеся внутри div-элементов.
```

искать span-элементы, лежащие внутри div'ов:

```
$('div span')
```
.find() же удобно использовать, когда некоторые элементы уже найдены, и вам необходимо осуществить поиск элементов внутри них:
```

// найдем все ul-элементы на странице
var $ulElements = $('ul');
 
// ----- какой то код ... -----
 
// найдем li-элементы с классом userBox, внутри $ulElements
$ulElements.find('li.userBox');
```
Так же, .find() удобен для использования в цепочках методов:

```
$('ul') // найдем все ul-элементы на странице
  .addClass('listElements') // добавим ul'ам класс listElements
.find('li.userBox') // найдем li-элементы с классом userBox, внутри ul'ов
  .remove(); // и удалим их
```
Работа метода .find() схожа с .children(), который осуществляет поиск подходящих дочерних элементов. Отличие заключается в том, что .find() проводит поиск не только среди дочерних элементов, но и внутри них тоже (т.е. поиск проходит на всех вложенных уровнях иерархии DOM, в то время как .children() ищет только на одном уровне).

## find/1 пример

Внутри каждого ul-элемента, найдем первый li-элемент и последний p-элемент:
```
// найдем и сохраним все ul-элементы
var $matched = $('ul');
 
// выделим их
$matched
  .addClass('matched');
 
// найдем внутри уже выбранных элементов все требуемые
// и выделим их добавив класс result
$matched.find("li:first, p:last")
  .addClass("result");
```

## filter( выражение )
Удаляет все элементы, которые не соответствуют указанному выражению, из набора совпавших элементов.
Этот метод используется для ограничения результатов поиска.
Для указания нескольких выражений следует использовать запятую в качестве разделителя (например, filter(».class1, .class2″)).

Изменяет цвет фона всех элементов div и затем рисует границу вокруг некоторых из них.
```
    $("div").css("background", "#c8ebcc")
            .filter(".middle")
            .css("border-color", "red");
```
filter/1
```
<!DOCTYPE HTML>
<html>
<head>
  <script src="http://code.jquery.com/jquery-latest.js"></script>

  <script>
  $(document).ready(function(){

    $("div").css("background", "#c8ebcc")
            .filter(".middle")
            .css("border-color", "red");

  });
  </script>

  <style>
  div { width:60px; height:60px; margin:5px; float:left;
        border:2px white solid;}
  </style>
</head>
<body>
  <div></div>
  <div class="middle"></div>

  <div class="middle"></div>
  <div class="middle"></div>
  <div class="middle"></div>
  <div></div>

</body>
</html>
```
Выделяет все параграфы и удаляет те, которые не имеют класса «selected».
```
$("p").filter(".selected")
```
Выделяет все параграфы и удаляет первый из найденных, а также те, которые не имеют класса «selected» .
```
$("p").filter(".selected, :first")
```


## Метод объекта event preventDefault

Метод объекта event preventDefault позволяет предотвратить выполнение стандартного действия, например такого как переход на сайт после щелчка по ссылке или отправка формы после щелчка на кнопку отправления (то есть input type=submit).
 
Синтаксис

event.preventDefault()

```
$(document).ready(function(){

   $("#anc1").click(function(event){
      event.preventDefault();
      alert("Переход на главную страницу нашего сайта не был произведен\nт.к. стандартное действие ссылки было предотвращено. Свойство\nisDefaultPrevented="+event.isDefaultPrevented()+".");
   });
   $("#anc2").click(function(event){
     alert("Переход на главную страницу нашего сайта будет произведен\nт.к. стандартное действие ссылки не было предотвращено\nСвойство isDefaultPrevented="+event.isDefaultPrevented()+".");
   });

});
```

## Поиск в режиме реального времени через JavaScript
```

<h1>FAQ</h1>
<div class="faq">
    <input type="search" value="" placeholder="Type some keywords (e.g. giza, babylon, colossus)" />
    <ul>
        <li id="faq-1">
            <h2><a href="#faq-1">Great Pyramid of Giza</a></h2>
            <div>
                <p>The Great Pyramid of Giza <!-- ... --></p>
                <!-- ... -->
            </div>
        </li>
        <li id="faq-2">
            <h2><a href="#faq-2">Hanging Gardens of Babylon</a></h2>
            <div>
                <p>The Hanging Gardens of Babylon <!-- ... --></p>
                <!-- ... -->
            </div>
        </li>
        <!-- ... -->
    </ul>
    <div class="faq__notfound"><p>No matches were found.</p></div>
</div>
```


При загрузке страницы скрипт будет индексировать контент и помещать в память браузера.
После ввода текста в поисковое поле, скрипт будет сравнивать его с контентом страницы и прятать все пункты, которые не подходят под поисковой критерий. Если результат пуст, то должно быть выведено соответствующее сообщение.
Так же скрипт будет подсвечивать искомый текст следующим образом span class="highlight" babylon .

Отображение подходящего контента

отображать ответы на вопросы изначально, и показывать только тогда, когда пользователь кликнет на подходящий ему пункт:
```
.faq > ul > li:not( .is-active ) > div

{

    display: none;

}

$( document ).on( 'click', '.faq h2 a', function( e )
{
    e.preventDefault();
    $( this ).parents( 'li' ).toggleClass( 'is-active' );
});
```

Что если JavaScript будет отключён

Пользователь не сможет видеть ответы, если вы не предусмотрите какое-то решение без JavaScript. Для быстрой и простой реализации второго варианта:
```
<li id="faq-1">
<a href="#faq-1">
```
Можем воспользоваться преимуществами псевдо-класса :target:
```
.faq > ul > li:not( :target ) > div
{
    display: none;
}
```
Поиск по-прежнему не возможен, однако вы можете осуществить клиент-серверный запрос за результатами:
```

<html class="no-js">
    <head>
        <!-- remove this if you use Modernizr -->
        <script>(function(e,t,n){var r=e.querySelectorAll("html")[0];r.className=r.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")})(document,window,0);</script>
    </head>
</html>
```

класс no-js 

На стороне script данный класс будет удаляться:
```
.no-js .faq input
{
    display: none;
}
```

Если в результате поиска будет найден только один элемент, то неплохо было бы сразу раскрыть текст, не утруждая пользователя.

Скрытые ключевые слова

Так же есть возможность расширить поиск не только по названию, но и по другим ключевым словам, которые будут скрыты от видения пользователя. В коде они будут располагаться так:
```
<li>
    <h2><a href="/real-time-search-in-javascript">Real-Time Search in JavaScript</a></h2>
    <p class="hidden-keywords">jquery filter input html css</p>
</li>

.hidden-keywords
{
    display: none;
}

```
## Real-Time Search in JavaScript
```

<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Real-Time Search in JavaScript</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    
    <meta name="viewport" content="width=device-width,initial-scale=1" />
        
    <link rel="stylesheet" href="../main.css" />
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400" />
    <style>

        html
        {
        }
            body
            {
                font-family: Roboto, sans-serif;
                color: #34434b;
                background-color: #f4fbfc;
                padding: 5rem 1.25rem; /* 80 20 */
            }

            .container
            {
                width: 100%;
                max-width: 640px; /* 960 */
                margin: 0 auto;
            }

            .container h1
            {
                font-size: 42px;
                font-weight: 300;
                color: #5594b3;
                margin-bottom: 40px;
            }
                .container h1 a:hover,
                .container h1 a:focus
                {
                    color: #a664b7;
                }

            .container p
            {
                line-height: 1.6;
            }

            .faq
            {
            }
            .faq input
            {
                width: 100%;
                height: 60px;
                font-size: 20px;
                background-color: #fff;
                box-shadow: 0px 2px 4px rgba( 52, 67, 75, .2 );
                display: block;
                padding: 0 20px;
                margin-bottom: 40px;

                -webkit-transition: box-shadow .1s linear;
                transition: box-shadow .1s linear;
            }
            .faq input::-webkit-input-placeholder   { color: #a1bdcb !important; }
            .faq input::-moz-placeholder            { color: #a1bdcb !important; }
            .faq input:-ms-input-placeholder        { color: #a1bdcb !important; }
            .faq input:focus
            {
                box-shadow: 0px 4px 8px rgba( 52, 67, 75, .4 );
            }
            .faq .highlight
            {
                background-color: #fffd77;
            }
            .faq > ul
            {
            }
                .faq > ul > li
                {
                }
                .faq > ul > li:not( :first-child )
                {
                    border-top: 1px solid #dcebed;
                    margin-top: 20px;
                    padding-top: 20px;
                }
                .faq > ul > li.is-hidden
                {
                    display: none;
                }
                    .faq > ul > li h2
                    {
                        font-size: 24px;
                        font-weight: 700;
                    }
                        .faq > ul > li h2:hover,
                        .faq > ul > li h2:focus,
                        .faq > ul > li.is-active h2,
                        .faq > ul > li:target h2
                        {
                            color: #a664b7;
                        }
                    .faq > ul > li > div
                    {
                        display: none;
                    }
                    .faq > ul > li.is-active > div,
                    .faq > ul > li:target > div
                    {
                        display: block;
                        margin-top: 10px;
                    }

                .faq__notfound
                {
                    font-size: 20px;
                    font-style: italic;
                    display: none;
                }
                .faq__notfound.is-visible
                {
                    display: block;
                }

            .container footer
            {
                color: #a1bdcb;
                margin-top: 40px;
            }
                .container footer a:hover,
                .container footer a:focus
                {
                    color: #5594b3;
                }

    </style>
</head>

<body>


<div class="container" role="main">

    <h1>Real-Time Search in JavaScript</h1>

    <div class="faq">
        <input type="search" value="" placeholder="Type some keywords (e.g. giza, babylon, colossus)" />
        <ul>
            <li id="faq-1">
                <h2><a href="#faq-1">Great Pyramid of Giza</a></h2>
                <div>
                    <p>The Great Pyramid of Giza (also known as the Pyramid of Khufu or the Pyramid of Cheops) is the oldest and largest of the three pyramids in the Giza Necropolis bordering what is now El Giza, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.</p>
                </div>
            </li>
            <li id="faq-2">
                <h2><a href="#faq-2">Hanging Gardens of Babylon</a></h2>
                <div>
                    <p>The Hanging Gardens of Babylon were one of the Seven Wonders of the Ancient World, and the only one whose location has not been definitely established.</p>
                    <p>The Hanging Gardens were a distinctive feature of ancient Babylon. They were a great source of pride to the people, and were often described in accounts written by visitors to the city. Possibly built by King Nebuchadnezzar II in 600 BC, the gardens are believed to have been a remarkable feat of engineering: an ascending series of tiered gardens containing all manner of trees, shrubs, and vines. The gardens were said to have looked like a large green mountain constructed of mud bricks, rising from the center of the city.</p>
                </div>
            </li>
            <li id="faq-3">
                <h2><a href="#faq-3">Statue of Zeus at Olympia</a></h2>
                <div>
                    <p>The Statue of Zeus at Olympia was a giant seated figure, about 13 m (43 ft) tall, made by the Greek sculptor Phidias around 435 BC at the sanctuary of Olympia, Greece, and erected in the Temple of Zeus there. A sculpture of ivory plates and gold panels over a wooden framework, it represented the god Zeus sitting on an elaborate cedar wood throne ornamented with ebony, ivory, gold and precious stones. It was regarded as one of the Seven Wonders of the Ancient World until its eventual loss and destruction during the 5th century AD. No copy of the statue has ever been found, and details of its form are known only from ancient Greek descriptions and representations on coins.</p>
                </div>
            </li>
            <li id="faq-4">
                <h2><a href="#faq-4">Temple of Artemis</a></h2>
                <div>
                    <p>The Temple of Artemis or Artemision (Greek: Ἀρτεμίσιον, Turkish: Artemis Tapınağı), also known less precisely as the Temple of Diana, was a Greek temple dedicated to the goddess Artemis and is one of the Seven Wonders of the Ancient World. It was located in Ephesus (near the modern town of Selçuk in present-day Turkey), and was completely rebuilt three times before its eventual destruction in 401. Only foundations and sculptural fragments of the latest of the temples at the site remain.</p>
                </div>
            </li>
            <li id="faq-5">
                <h2><a href="#faq-5">Mausoleum at Halicarnassus</a></h2>
                <div>
                    <p>The Mausoleum at Halicarnassus or Tomb of Mausolus (Persian: آرامگاه هالیکارناسوس‎; Modern Greek: Μαυσωλείο της Αλικαρνασσού; Turkish: Halikarnas Mozolesi) was a tomb built between 353 and 350 BC at Halicarnassus (present Bodrum, Turkey) for Mausolus, a satrap in the Persian Empire, and Artemisia II of Caria, who was both his wife and his sister. The structure was designed by the Greek architects Satyros and Pythius of Priene.</p>
                </div>  
            </li>
            <li id="faq-6">
                <h2><a href="#faq-6">Colossus of Rhodes</a></h2>
                <div>
                    <p>The Colossus of Rhodes /roʊdz/ (Ancient Greek: ὁ Κολοσσὸς Ῥόδιος ho Kolossòs Rhódios) was a statue of the Greek titan-god of the sun Helios, erected in the city of Rhodes, on the Greek island of the same name, by Chares of Lindos in 280 BC. It is one of the Seven Wonders of the Ancient World. It was constructed to celebrate Rhodes' victory over the ruler of Cyprus, Antigonus I Monophthalmus, whose son unsuccessfully besieged Rhodes in 305 BC. Before its destruction in the earthquake of 226 BC, the Colossus of Rhodes stood over 30 metres (98 feet) high, making it one of the tallest statues of the ancient world.</p>
                </div>
            </li>
            <li id="faq-7">
                <h2><a href="#faq-7">Lighthouse of Alexandria</a></h2>
                <div>
                    <p>The Lighthouse of Alexandria, sometimes called the Pharos of Alexandria (/ˈfɛərɒs/; Ancient Greek: ὁ Φάρος τῆς Ἀλεξανδρείας), was a lighthouse built by the Ptolemaic Kingdom between 280 and 247 BC which was between 393 and 450 ft (120 and 137 m) tall. It was one of the tallest man-made structures in the world for many centuries, and was regarded as one of the Seven Wonders of the Ancient World. Badly damaged by three earthquakes between AD 956 and 1323, it then became an abandoned ruin. It was the third longest surviving ancient wonder (after the Mausoleum at Halicarnassus and the extant Great Pyramid of Giza) until in 1480 the last of its remnant stones were used to build the Citadel of Qaitbay on the site. In 1994, French archaeologists discovered some remains of the lighthouse on the floor of Alexandria's Eastern Harbour.</p>
                </div>
            </li>
        </ul>
        <div class="faq__notfound"><p>No matches were found&hellip; Try &ldquo;giza&rdquo;.</p></div>
    </div>

    <footer><p>These were Wonders of the World. Info source: <a href="https://en.wikipedia.org/wiki/Wonders_of_the_World">Wikipedia</a>.</p></footer>

</div>

<!--

    JQUERY DEPENDENCY
-->

<script src="../js/jquery.min.js"></script>
<script>

    'use strict';


    // search & highlight

    ;( function( $, window, document, undefined )
    {
        var $container = $( '.faq' );
        if( !$container.length ) return true;

        var $input          = $container.find( 'input' ),
            $notfound       = $container.find( '.faq__notfound' ),
            $items          = $container.find( '> ul > li' ),
            $item           = $(),
            itemsIndexed    = [];

        $items.each( function()
        {
            itemsIndexed.push( $( this ).text().replace( /\s{2,}/g, ' ' ).toLowerCase() );
        });

        $input.on( 'keyup', function( e )
        {
            if( e.keyCode == 13 ) // enter
            {
                $input.trigger( 'blur' );
                return true;
            }

            $items.each( function()
            {
                $item = $( this );
                $item.html( $item.html().replace( /<span class="highlight">([^<]+)<\/span>/gi, '$1' ) );
            });

            var searchVal = $.trim( $input.val() ).toLowerCase();
            if( searchVal.length )
            {
                for( var i in itemsIndexed )
                {
                    $item = $items.eq( i );
                    if( itemsIndexed[ i ].indexOf( searchVal ) != -1 )
                        $item.removeClass( 'is-hidden' ).html( $item.html().replace( new RegExp( searchVal+'(?!([^<]+)?>)', 'gi' ), '<span class="highlight">$&</span>' ) );
                    else
                        $item.addClass( 'is-hidden' );
                }
            }
            else $items.removeClass( 'is-hidden' );

            $notfound.toggleClass( 'is-visible', $items.not( '.is-hidden' ).length == 0 );
        });
    })( jQuery, window, document );


    // toggling items on title press

    ;( function( $, window, document, undefined )
    {
        $( document ).on( 'click', '.faq h2 a', function( e )
        {
            e.preventDefault();
            $( this ).parents( 'li' ).toggleClass( 'is-active' );
        });
    })( jQuery, window, document );


    // auto-show item content when show results reduces to single

    ;( function( $, window, document, undefined )
    {
        var $container = $( '.faq' );
        if( !$container.length ) return true;

        var $input      = $container.find( 'input' ),
            $items      = $container.find( '> ul > li' ),
            $item       = $();

        $input.on( 'keyup', function()
        {
            $item = $items.not( '.is-hidden' );
            if( $item.length == 1 )
                $item.addClass( 'js--autoshown is-active' );
            else
                $items.filter( '.js--autoshown' ).removeClass( 'js--autoshown is-active' );
        });
    })( jQuery, window, document );

</script>


<!--

    NO DEPENDENCIES (IE9+ support)

<script>

    'use strict';

    ;( function ( document, window, index )
    {
        var hasElementClass     = function( element, className ){ return element.classList ? element.classList.contains( className ) : new RegExp( '(^| )' + className + '( |$)', 'gi' ).test( element.className ); },
            addElementClass     = function( element, className ){ element.classList ? element.classList.add( className ) : element.className += ' ' + className; },
            removeElementClass  = function( element, className ){ element.classList ? element.classList.remove( className ) : element.className = element.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' ); };


        // search & highlight

        ;( function ( document, window, index )
        {
            var container = document.querySelector( '.faq' );
            if( !container ) return true;

            var input           = container.querySelector( 'input' ),
                notfound        = container.querySelector( '.faq__notfound' ),
                items           = document.querySelectorAll( '.faq > ul > li' ),
                item            = {},
                itemsIndexed    = [];

            [].forEach.call( items, function( entry )
            {
                itemsIndexed.push( entry.textContent.replace( /\s{2,}/g, ' ' ).toLowerCase() );
            });

            input.addEventListener( 'keyup', function( e )
            {
                if( e.keyCode == 13 ) // enter
                {
                    input.blur();
                    return true;
                }

                [].forEach.call( items, function( entry )
                {
                    entry.innerHTML = entry.innerHTML.replace( /<span class="highlight">([^<]+)<\/span>/gi, '$1' );
                });

                var searchVal = input.value.trim().toLowerCase();
                if( searchVal.length )
                {
                    itemsIndexed.forEach( function( entry, i )
                    {
                        if( itemsIndexed[ i ].indexOf( searchVal ) != -1 )
                        {
                            removeElementClass( items[ i ], 'is-hidden' );
                            items[ i ].innerHTML = items[ i ].innerHTML.replace( new RegExp( searchVal+'(?!([^<]+)?>)', 'gi' ), '<span class="highlight">$&</span>' );
                        }
                        else
                            addElementClass( items[ i ], 'is-hidden' );
                    });
                }
                else [].forEach.call( items, function( entry ){ removeElementClass( entry, 'is-hidden' ); });

                if( items.length == [].filter.call( items, function( entry ){ return hasElementClass( entry, 'is-hidden' ) } ).length )
                    addElementClass( notfound, 'is-visible' );
                else
                    removeElementClass( notfound, 'is-visible' );
                    
            });
        }( document, window, 0 ));


        // toggling items on title press

        ;( function ( document, window, index )
        {
            [].forEach.call( document.querySelectorAll( '.faq h2 a' ), function( entry )
            {
                addElementClass( entry, 'js--is-toggleable-item' );
            });

            document.addEventListener( 'click', function( e )
            {
                if( hasElementClass( e.target, 'js--is-toggleable-item' ) )
                {
                    e.preventDefault();
                    var current = e.target;
                    while( current.parentNode )
                    {
                        current = current.parentNode;
                        if( current.tagName.toLowerCase() == 'li' )
                        {
                            hasElementClass( current, 'is-active' ) ? removeElementClass( current, 'is-active' ) : addElementClass( current, 'is-active' );
                            break;
                        }
                    }
                }
            });
        }( document, window, 0 ));


        // auto-show item content when show results reduces to single

        ;( function ( document, window, index )
        {
            var container = document.querySelector( '.faq' );
            if( !container ) return true;

            var input   = container.querySelector( 'input' ),
                items   = document.querySelectorAll( '.faq > ul > li' ),
                item    = {};

            input.addEventListener( 'keyup', function( e )
            {
                item = [].filter.call( items, function( entry ){ return !hasElementClass( entry, 'is-hidden' ); } )

                if( item.length == 1 )
                {
                    addElementClass( item[ 0 ], 'js--autoshown' );
                    addElementClass( item[ 0 ], 'is-active' );
                }
                else
                    [].forEach.call( items, function( entry )
                    {
                        if( hasElementClass( entry, 'js--autoshown' ) )
                        {
                            removeElementClass( entry, 'js--autoshown' );
                            removeElementClass( entry, 'is-active' );
                        }
                    });
            });
        }( document, window, 0 ));

    }( document, window, 0 ));

</script>

-->


</body>

</html>

```


# jsdanco
# jQuery UI
jQuery UI - это библиотека на основе jQuery, реализующая более 20 плагинов, среди которых плагины организующие различное поведение (например перетаскивание или растягивание элементов), восемь видов виджетов (такие как календарь, диалоговые окна, систему вкладок и.т.д) и анимационные эффекты. Кроме этого, UI обладает несколькими темами оформления, с помощью которых оформляются виджеты и которые содержат набор полезных иконок (173 штуки). Любая из тем оформления может быть подкорректирована прямо на сайте jQuery UI, непосредственно перед загрузкой.

jQuery UI обладает пятью плагинами поведения

UI так же предоставляет восемь плагинов организующих виджеты:

Кроме того, развитую систему стилизации jQuery UI можно использовать, чтобы задавать скругленные углы или например стилизованные области, для системных предупреждениях или сообщениях об ошибке:

# Принцип работы со всей библиотекой jQuery UI.

## Выбор компонентов и загрузка
Зайдите на страницу загрузки jQuery UI и вы увидите, что перед скачиванием можно выбрать необходимые компоненты, тему оформления и версию библиотеки:

- вес js-файла, включающего все компоненты составляет 200кб (в несжатом виде), поэтому исключение ненужных компонент может оказаться весьма полезным. Посмотреть как выглядят те или иные темы оформления, а так же отредактировать одну из них для себя, можно на странице http://jqueryui.com/themeroller/.
- Если вы хотите использовать тему оформления, которую вы настроите самостоятельно, то в начале сделайте все необходимые настройки темы на этой странице, затем нажмите кнопку "Download theme" и вы окажетесь на странице загрузки библиотеки, где в поле Theme будет указана отредактированная вами тема.
- После того, как вы определились с темой оформления и требуемыми компонентами, на странице загрузки нужно нажать на Download, после чего на ваш компьютер будет загружен архив. Он будет содержать три папки:

1. css — содержит файлы оформления (CSS-файл и изображения).
2. Js — содержит файлы с jQuery и jQuery UI.
3. Development-bundle — эту папку можно не загружать на сайт, все ее содержимое носит вспомогательный характер. Здесь много различных файлов с демонстрацией работы плагина и другими вспомогательными файлами.
4. Кроме этих трех папок, в корне архива лежит файл index.html, с демонстрацией скачанных плагинов.

## Подключение UI к вашему сайту
Чтобы jQuery UI заработал на страницах вашего сайта необходимо, чтобы к странице был подключен js-файл библиотеки jQuery, js-файл jQuery UI (находится в папке js скачанного архива) и содержимое папки css (важно, чтобы все оно (содержимое css) располагалось на хостинге в одном каталоге):
```
<link type="text/css" href="css/themename/jquery-ui-1.8.12.custom.css" rel="Stylesheet" />      
<script type="text/javascript" src="js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.12.custom.min.js"></script>
```
После этого вы можете использовать возможности jQuery UI на вашей странице. Например с помощью одной строки javascript-кода сделать обычный элемент - перетаскиваемым
Все плагины поведения и виджетов обладают схожим принципом работы. Каждый плагин jQuery UI представлен одним основным методом, который вызывается на выбранных элементах. Его имя всегда совпадает с именем плагина. С помощью этого метода можно инстанцировать (устанавливать) плагин на элементы, узнавать и изменять свойства плагина, устанавливать обработчики событий, а так же, запускать функции плагина, которые обычно называют методами (хотя они не являются методами в обычном смысле этого понятия).

## Инстанцирование (установка)
Для установки любого плагина на элементы страницы, достаточно выбрать нужные элементы средствами jQuery и затем вызвать на них метод работы с плагином (имя которого всегда совпадает с названием плагина):
```
$("#someId").dialog()
```
применит плагин Dialog к элементу с идентификатором someId, превратив его в диалоговое окно.
```
$("div:lt(3)").draggable()
```
применит плагин Draggable к первым трем div'ам на странице, сделав их перетаскиваемыми.
## Методы
Обычно, под методом какого-то объекта в javascript, подразумевается функция, вызываемая на этом объекте следующим образом:
```
obj.A(); // вызов метода A на объекте obj
obj.B(); // вызов метода B на объекте obj
```
Однако в пределах работы с конкретными плагинами jQuery UI, методами называют такую форму записи:
```
$("#someId").plaginName("имя метода", параметры метода);
```
Например:
```
$("#someId").dialog("close")
```
Метод close закроет диалоговое окно, установленное на элемент с id = someId
$("div").draggable("destroy")
Destroy удалит функциональность draggable со всех div-элементов на странице
## Свойства
Каждый плагин обладают рядом свойств. Каждое свойство можно задать в момент инстанцирования плагина. Для этого, при установке плагина на элемент нужно передать объект со свойствами в формате {имя_свойства_1:значение_1, имя_свойства_2:значение_2, ...}:
```
// сделаем из элемента с id=someId диалоговое окно с помощью 
// плагина dialog и укажем при этом заголовок для окна
$("#someId").dialog({title:"Сообщение"});

// сделаем из первого div'а на странице календарь с помощью 
// плагина datepicker, и укажем минимальную и максимальную дату
$("div:first").datepicker({
  minDate:new Date(2007, 1 - 1, 1),
  maxDate:new Date(2013, 1 - 1, 1)
});
```
Кроме того, значение любого свойства можно узнать или изменить уже после инстанцирования плагина. Для этого необходимо использовать метод "option":
```
// узнаем заголовок у диалогового окна
var dialogTitle = $("#someId").dialog("option", "title");

// изменим заголовок, добавив к нему префикс "#1 "
$("#someId").dialog("option", "title", "#1 " + dialogTitle)

// изменим минимальную дату в календаре, 
// который установлен на первый div на странице
$("div:first").datepicker("option", "minDate", new Date(2008, 1 - 1, 1));
```
## События
Каждый плагин является источником ряда специфических событий. Например перетаскиваемые элементы производят события начала перетаскивания (dragstart) и окончания перетаскивания (dragstop), диалоговые окна являются источниками событий их открытия и закрытия (dialogopen и dialogclose) и т.д. Обработчики событий можно устанавливать средствами основного метода плагина:
```
// обработка события close диалогового окна
$("selector").dialog({
   close: function(event, ui) { ... }
});
```
или с помощью bind стандартного метода библиотеки jQuery. В этом случае, к названию события всегда будет добавляться префикс из названия плагина (dialogclose вместо close, dragstopвместо stop и т. д.):
```
// обработка события close диалогового окна
$("selector").bind( "dialogclose", function(event, ui){ ... });
```

### Оформление
Все плагины jQuery UI обладают общей системой оформления. Ее можно настраивать с помощью визуального редактора ThemeRoller, а так же манипулируя css напрямую. 

## Создание своих плагинов
Помимо того, что jQuery UI организует множество удобных и интуитивно понятных плагинов, она предоставляет средство, с помощью которого можно делать подобные плагины самостоятельно —фабрику виджетов UI. Одним из ее больших плюсов является то, что в ней организованы некоторые возможности ООП, позволяющие дорабатывать существующие виджеты и создавать собственные иерархии виджетов.

Все плагины jQuery UI спроектированы так, чтобы UI-виджеты можно было подстраивать под особенности оформления и работы большинства сайтов. Оформление каждого виджета описано с помощью CSS и содержит два уровня правил оформления: базовые стили CSS-фреймворка и специфические стили, описывающие правила выбранной темы оформления.

jQuery UI CSS-фреймворк обладает набором правил для названия классов, присваиваемых элементам, участвующим в работе виджета. Эти правила позволяют легко находить требуемые части виджета, как например заголовок, содержимое или кликабельная зона. Так же, эти правила действуют для всех плагинов UI, поэтому, к примеру, кликабельные зоны будет обладать одним и тем же классом - ui-state-default, как у UI-кнопок, так и у UI-аккордеона. Если пользователь наведет на элемент с таким классом курсор, то класс будет автоматически изменен на ui-state-hover, а если кликнет по нему, то элемент изменит этот класс на ui-state-active. Этот и многие другие принципы классификации UI-элементов помогают разработчикам работать с UI-плагинами в максимально просто и понятно.

Все стили jQuery UI CSS-фреймворка находятся в одном файле — ui.theme.css, изменения в котором можно производить в визуальном-онлайн редакторе ThemeRoller. Все правила в этом файле отвечают только за визуальное оформление элементов плагинов (цвета, фон элементов, иконки). Такое разделение гарантирует безопасное редактирование стилей, которое в дальнейшем не скажется на работе плагинов при обновлении UI. Структурные правила оформления элементов (размеры, отступы, позиционирование, float) расположены в отдельных файлах (обычно с именем, типа jquery.ui.accordion.css). Их стоит менять с большой осторожностью — они участвуют в логике поведения плагинов и при обновлении jQuery UI это может нарушить их нормальную работу.

Вносить изменения в оформление jQuery UI плагинов можно на трех различных уровнях:
- Воспользоваться визуальным редактором ThemeRoller. И это наиболее простой из способов. Вы просто вносите необходимые изменения и загружаете файл со стилями (ui.theme.css) и необходимыми картинками оформления. Однако это средство наименее гибкое, поскольку ограничено возможностями ThemeRoller.
- Вносить изменения в css вручную. Чтобы получить больший контроль над тем, как оформлены элементы, участвующие в работе плагина, можно в начале сконфигурировать тему с помощью ThemeRoller, а затем внести необходимые изменения в полученный ui.theme.css файл или в один из css-файлов конкретного плагина (последнее, как уже было описано, не рекомендуется). Так например, вы можете задать радиус углов у кнопок, отличный от радиуса у других компонентов или изменить путь к спрайту картинок плагина.
- Сделать css-файл "с нуля". Если необходимо кардинально изменить внешний вид элементов плагина, то вполне возможно, лучшим вариантом будет создать его самостоятельно, "с нуля". Однако, это требует хорошего понимания html и css структуры UI-плагинов, а так же хороших знаний в области css.

## Советы по созданию собственных UI css-правил
- Имя классов начинайте с указания пространства имен ui-
- Конкретизируя группу элементов, предворяйте имя их классов пространством имен менее конкретной группы. Например, класс диалогового окна является виджетом (более обширная группа), поэтому их класс имеет вид .ui-widget-dialog.
- Не создавайте глобальные стили
- Не используйте id для стилизации (только для поиска элементов)
- Не используйте заглавные буквы
- Используйте дефис, а не подчеркивания для разделения слов в именах классов

## jQuery UI CSS Framework
Следующие css-классы находятся в ui.core.css и ui.theme.css, в зависимости от того, за что они отвечают: расположение и структуру элементов или их оформление (цвет, фон, иконки) соответственно. Эти классы общие для всех UI-элементов, что обеспечивает единый стиль их оформления.
### Вспомогательные элементы (helper'ы)
В некоторых плагинах используются вспомогательные элементы. Например, в плагине, делающим элементы перетаскиваемыми, в течении перетаскивания, оригинал может быть заменен на вспомогательный элемент (в зависимости от настроек).
- .ui-helper-hidden — элемент скрыт (его css-свойство display будет равно true).
- .ui-helper-hidden-accessible — элемент скрыт но доступен на странице (для такого скрытия элемент убирается за пределы страницы, обычно на 10000 пикселей влево).
- .ui-helper-reset — этот класс присваивается вспомогательным элементам, у которых временно сбросили базовые UI css-правила. Такие как: padding, margin, text-decoration, list-style и т. д.
- .ui-helper-clearfix — этот класс присваивается "плавающим" (в смысле css-свойства float) элементам, к которым были применены меры, чтобы их родительские элементы могли их оборачивать.
- .ui-helper-zfix — Applies iframe "fix" css to iframe elements when needed in overlays.
## Контейнеры виджетов
- .ui-widget — Этот класс присваивается основному (внешнему) html-элементу, отвечающему за виджет. Обычно, для этого класса прописывают шрифтовые параметры виджета, поскольку они будут распространяться на него всего.
- .ui-widget-header — устанавливается элементу, который отвечает за область заголовка виджета.
- .ui-widget-content — устанавливается элементу, который отвечает за область содержимого виджета.
- .ui-widget-content — устанавливается элементу, который отвечает за область содержимого виджета.
## Состояния кликабельных элементов
- .ui-state-default — устанавливается "кнопкоподобным" кликабельным элементам.
- .ui-state-hover — устанавливается "кнопкоподобным" элементам, над которыми в настоящий момент находится курсор.
- .ui-state-focus — устанавливается "кнопкоподобным" элементам, которые находятся в фокусе в настоящий момент.
- .ui-state-active — устанавливается "кнопкоподобным" элементам, нажатым в настоящий момент.
## Interaction Cues
- .ui-state-highlight — этот класс присваивается подсвеченным или выбранным элементам.
- .ui-state-error — этот класс присваивается элементам с сообщением об ошибке.
- .ui-state-error-text — дополнительный класс, который присваивается элементам, в которых только текст будет стилизован под сообщение об ошибке, а фон нет. Это актуально напримерlabel-элементов в формах.
- .ui-state-disabled — класс неактивного элемента. Такой элемент не выполняет своего функционального назначения. Внешне он приглушается с помощью частичной прозрачности.
- .ui-priority-primary — если необходима иерархия кнопок, то такой класс присваивается элементам верхней иерархии (priority-1). Такие кнопки имеют жирный текст.
- .ui-priority-secondary — если необходима иерархия кнопок, то такой класс присваивается элементам второго уровня иерархии (priority-2). Такие кнопки имеют нежирный текст и небольшую прозрачность.
## Иконки
- .ui-icon — это базовый класс, который присваивается всем элементам с иконками jQuery UI. Таким элементам прописываются следующие css-правила: это 16-ти пиксельные квадратные элементы без текста, с фоном с заданной иконкой (берется из большого спрайта, идущего с jQuery UI). Нужно отметить, что вид иконок у элементов с классом ui-icon может варьироваться, в зависимости от их родительских элементов. Например, ui-icon элемент, лежащий внутри ui-state-default будет иметь цвет, прописанный специально для иконок лежащих в ui-state-default.
- .ui-icon-{icon type}-{icon sub description}-{direction} — после указания класса ui-icon, можно указать второй класс, который определит тип отображаемой иконки. Например класс ui-icon-triangle-1-e задаст иконку с треугольным указателем, направленным вправо. Все возможные варианты иконок можно найти на странице с Themeroller (наводя курсор на каждую из них, будет показываться имя соответствующего класса).
## Остальное
- .ui-corner-tl — присваивается элементу, с помощью которого выполняется скругление верхнего левого угла.
- .ui-corner-tr — присваивается элементу, с помощью которого выполняется скругление верхнего правого угла.
- .ui-corner-bl — присваивается элементу, с помощью которого выполняется скругление нижнего левого угла.
- .ui-corner-br — присваивается элементу, с помощью которого выполняется скругление нижнего правого угла.
- .ui-corner-top — присваивается элементу, с помощью которого выполняется скругление верхних углов.
- .ui-corner-bottom — присваивается элементу, с помощью которого выполняется скругление нижних углов.
- .ui-corner-right — присваивается элементу, с помощью которого выполняется скругление правых углов.
- .ui-corner-left — присваивается элементу, с помощью которого выполняется скругление левых углов.
- .ui-corner-all — присваивается элементу, с помощью которого выполняется скругление всех углов.

- .ui-widget-overlay — этот класс присваивается элементу, которому необходимо перекрыть весь экран (например для модального окна). За этим классом закрепляются css-правила, задающие ширину, высоту, фон (иногда с картинкой) и уровень прозрачности.
- .ui-widget-shadow — применяется к элементу, который должен организовывать эффект тени для другого элемента (он находится внутри первого). За этим классом закрепляются css-правила, задающие фон/текстуру, радиус скругления углов, прозрачность, верхний и левый отступ и "толщина" тени. Толщина задается параметром padding, а отступ с помощью margin-left и margin-top (могут быть отрицательными).
## jQuery.widget()
Все jQuery UI плагины (плагины поведения и виджеты) реализованы с помощью одного удобного инструмента — фабрики виджетов jQuery UI. Она позволяет создавать гибкие, настраиваемые плагины, с едиными, интуитивно понятными api, включающими свойства, методы и события, связанные с работой плагина.

Фабрика виджетов представляет из себя метод глобального объекта jQuery — jQuery.widget(). Он принимает 2 или 3 аргумента:
```
$.widget(pluginname, [parent], implementation)
```
- pluginname — задается строкой в формате "namespace.pluginname". Часть namespace (пространство имен) обязательна. Если не указать пространство имен, фабрика виджетов сделает это за вас. Часть pluginname станет непосредственным именем плагина и прототипа. Например, jQuery.widget("demo.multi", {…}) приведет к созданию следующих полей jQuery.demo,jQuery.demo.multi и jQuery.demo.multi.prototype, а так же jQuery.fn.multi (то есть, появится возможность вызывать метод multi для выбранных элементов)
parent — необязательный аргумент, в котором можно указать другой плагин. В этом случае, создаваемый плагин будет от него наследоваться.
- Implementation — реализация работы плагина. Задается с помощью js-объекта. Именно этот объект, становится прототипом для экземпляров создоваемого плагина (конечно, если задан параметрparent, объект будет предварительно подвергнут некоторым изменениям, связанным с наследованием). 

## Работа с готовыми плагинами
### Прототип плагина
Когда вы делаете плагин с помощью $.widget(), jQuery UI создает javascript-объект, содержащий все настройки по умолчанию и методы плагина. Этот объект называют прототипом плагина. При установке плагина на определенный элемент, делатся отдельная копия этого прототипа, которая будет хранить состояние плагина именно на этом элементе. Такую отдельно взятую копию прототипа называют экземпляром плагина.
Внутри всех методов плагина, соответствующий экземпляр будет доступен в переменной this.
Получить экземпляр плагина, закрепленный за определенным элементом (скажем с id = something), можно так $("#something").data("plaginName").
Получить элемент, за которым закреплен определенный экземпляр плагина тоже просто — он будет доступен в свойстве element экземпляра плагина. Если быть точным, в этом свойстве лежит не сам элемент, а объект jQuery с ним.
## Настройки (свойства) плагина
Все свойства плагина обладают значениями по умолчанию, а так же возможностью изменять их при установке и во время работы плагина на элементе.
- Задать настройки при инициализации плагина: $("#something").plaginName({option1:val1, option2:val2 ...});
- Узнать/изменить настройки после инициализации: $("#something").plaginName("option", optionName, [value]); (чтобы изменить настройку optionName нужно указать value, чтобы узнать ее текущее значение — параметр value следует пропустить).

## Методы плагина
Плагины, организованные с помощью $.widget() могут обладать как открытыми, так и защищенными методами, предназначенными исключительно для внутренних потребностей плагина. Пользовательский доступ (то есть только к открытым методам) осуществляется следующим образом: $("#something").plaginName("plaginMethod", methodParams ...). Его использование гарантирует, что вы не вызовете лишних методов, которые могут привести к неправильной работе плагина.
Если вам по какой то причине нужно получить доступ ко всем методам плагина, то это можно сделать так: $("#something").data("plaginName").plaginMethod(methodParams)(то есть непосредственно на экземпляре плагина).
## События
В методах плагина событие может быть вызвано с помощью this._trigger("myEventType"). В этом случае, обработчик этого события можно будет привязать одним из двух способов:
$("#something").multi({myEventType:function(event){}});
$("#something").bind("plaginNameMyEventType", function(event){});

На основе указанных имени плагина и пространства имен, организуется селектор вида :namespace-pluginname, с помощью которого можно находить элементы, на которых активирован плагин.
Работа плагина на элементе может быть приостановлена и возобновлена. Еще, можно уничтожить экземпляр плагина и возвратить элемент в его прежнее состояние.
Плагины защищены от многократной активации на одном и том же элементе.

## Tabs Widget
Tabs1.html
```
<!DOCTYPE html> 
<html> 
    <head> 
        <meta charset="utf-8"> 
        <title>Tabs</title> 
        <link rel="stylesheet" href="css/smoothness/jquery-ui-1.8.9.custom.css"> 
    </head> 
    <body> 
        <div id="myTabs"> 
            <ul> 
                <li><a href="#a">Tab 1</a></li> 
                <li><a href="#b">Tab 2</a></li> 
            </ul> 
            <div id="a">This is the content panel linked to the first tab, it is shown by default.</div> 
            <div id="b">This content is linked to the second tab and will be shown when its tab is clicked.</div> 
        </div> 
        <script src="development-bundle/jquery-1.4.4.js"></script> 
        <script src="development-bundle/ui/jquery.ui.core.js"></script> 
        <script src="development-bundle/ui/jquery.ui.widget.js"></script> 
        <script src="development-bundle/ui/jquery.ui.tabs.js"></script> 
        <script> 
            (function($){ 
                $("#myTabs").tabs(); 
            })(jQuery); 
        </script> 
    </body> 
</html>
```

## custom theme
tabs2.html
```
<link rel="stylesheet" href="css/tabsTheme.css">
#myTabs { width:400px; padding:5px; border:1px solid #636363; background:#c2c2c2 none; } 
.ui-widget-header { border:0; background:#c2c2c2 none; font-family:Georgia; } 
#myTabs .ui-widget-content { border:1px solid #aaa; background:#fff none; font-size:80%; } 
.ui-state-default, .ui-widget-content .ui-state-default { border:1px solid #636363; background:#a2a2a2 none; } 
.ui-state-active, .ui-widget-content .ui-state-active { border:1px solid #aaa; background:#fff none; }
```

Selecting a tab
Table3.html
```

            (function($){ 
                var tabOpts = { 
                    selected: 1  
                } 
                $("#myTabs").tabs(tabOpts); 
            })(jQuery); 

```
Disabling a tab
Tabs4.html
```

            (function($){ 
                var tabOpts = { 
                    disabled: [1] 
                } 
                $("#myTabs").tabs(tabOpts); 
            })(jQuery); 

```
Transition effects
tabs5.html
```
            (function($){ 
                var tabOpts = { 
                    fx: { 
                        opacity: "toggle", 
                        duration: "slow" 
                    } 
                } 
                $("#myTabs").tabs(tabOpts); 
            })(jQuery);
```
Collapsible tabs
Tabs7.html
```
            (function($){ 
                var tabOpts = { 
                    collapsible: true 
                } 
                $("#myTabs").tabs(tabOpts); 
            })(jQuery); 
```
Tab events
Tabs8.html
```
(function($){ 
    var handleSelect = function(e, tab) { 
       $("<p></p>", { 
        text: "Tab at index " + tab.index + " selected", 
        "class": "status-message ui-corner-all" 
    }).appendTo(".ui-tabs-nav", "#myTabs").fadeOut(5000, function() { 
        $(this).remove();    
        }); 
        }, 
        tabOpts = { 
            select: handleSelect 
            } 
                     
            $("#myTabs").tabs(tabOpts); 
            })(jQuery); 
        </script>

<link rel="stylesheet" href="css/tabSelect.css">
```



Event

Tabs9.html
```
(function($){ 
             
    $("#myTabs").tabs(); 
        $("#myTabs").bind("tabsselect", function(e, tab) { 
        alert("The tab at index " + tab.index + " was selected"); 
    });      
    })(jQuery); 
```

Using tab methods

Tabs10.html
```
        <div id="myTabs"> 
            <ul> 
                <li><a href="#a">Tab 1</a></li> 
                <li><a href="#b">Tab 2</a></li> 
            </ul> 
        <button type="button" id="enable">Enable</button> 
    <button type="button" id="disable">Disable</button> 
        <script> 
            (function($){ 
                 
                $("#myTabs").tabs({ 
                    disabled: [1] 
                }); 

                $("#enable").click(function() { 
                    $("#myTabs").tabs("enable", 1); 
                }); 

                $("#disable").click(function() { 
                    $("#myTabs").tabs("disable", 1); 
                });      
            })(jQuery); 
```

Adding and removing tabs tabs11.html
```
<label for="indexNum">Enter a tab to remove:</label> 
        <input id="indexNum"><button type="button" id="remove">Remove!</button><br> 
    <button type="button" id="add">Add a new tab!</button>

(function($){ 
    $("#myTabs").tabs(); 
    $("#remove").click(function() { 
    $("#myTabs").tabs("remove", parseInt($("#indexNum").val(), 10)); 
    }); 

$("#add").click(function() { 
    $("#myTabs").tabs("add", "remoteTab.txt", "A New Tab!"); 
    }); 
})(jQuery); 
```

Simulating clicks tabs12.html
```

            (function($){ 
                $("#myTabs").tabs(); 
                $("#remove").click(function() { 
                    $("#myTabs").tabs("remove", parseInt($("#indexNum").val(), 10)); 
                }); 

                $("#add").click(function() { 
                    $("#myTabs").tabs("add", "remoteTab.txt", "A New Tab!").tabs("select", $("#myTabs").tabs("length") - 1); 
                }); 
            })(jQuery); 
```
Creating a tab carousel yabs13.html
```
    (function($){ 
        $("#myTabs").tabs().tabs("rotate", 1000, true);  
    })(jQuery); 
```

tabs14.html
```
            (function($){ 
                 
                $("#myTabs").tabs(); 
                 
                $("#destroy").click(function() { 
                    $("#myTabs").tabs("destroy"); 
                }); 
            })(jQuery); 
```
Getting and setting options tabs15
```
<button type="button" id="show">Show Selected</button>
<script> 
(function($){ 
                 
    $("#myTabs").tabs(); 
    $("#show").click(function() { 
    $("<p></p>", { 
    text: "Tab at index " + $("#myTabs").tabs("option", "selected") + " is active" 
    }).appendTo(".ui-tabs-nav").fadeOut(5000); 
                     
    });      
    })(jQuery);
```
tabs16.html
```
<label for="newIndex">Enter a tab index to select</label> 
        <input id="newIndex" type="text"> 
        <button type="button" id="set">Change Selected</button>
<script> 
(function($){ 
    $("#myTabs").tabs(); 
        $("#set").click(function() { 
    $("#myTabs").tabs("option", "selected", parseInt($("#newIndex").val())); 
    }); 
    })(jQuery); 
```

AJAX tabs tabs17
```
<div id="myTabs"> 
    <ul> 
        <li><a href="#a">Tab 1</a></li> 
        <li><a href="#b">Tab 2</a></li> 
              <li><a href="remoteTab.txt">AJAX Tab</a></li> 
    </ul>


            (function($){ 
                $("#myTabs").tabs(); 
            })(jQuery); 
```

Changing the URL of a remote tab's content tabs18
```
<div id="myTabs"> 
    <ul> 
        <li><a href="#a">Tab 1</a></li> 
        <li><a href="#b">Tab 2</a></li> 
              <li><a href="remoteTab.txt">AJAX Tab</a></li> 
    </ul>
<select id="fileChooser"> 
        <option value="remoteTab1">remoteTab.txt</option> 
        <option value="remoteTab2">remoteTab2.txt</option> 
</select>
<script> 
    (function($){ 
        $("#myTabs").tabs(); 
                 
        $("#fileChooser").change(function() { 
        $("#myTabs").tabs("url", 2, $(this).val()); 
        }); 
    })(jQuery); 
</script>
```
Reloading a remote tab tabs19
```
<script> 
    (function($){ 
        $("#myTabs").tabs(); 
                 
        $("#fileChooser").change(function() { 

        $("#myTabs").tabs("url", 2, $(this).val()).tabs("load", 2); 
        }); 
    })(jQuery); 
</script>
```

Displaying data obtained via JSONP 20
```
<div id="myTabs"> 
<ul> 
    <li><a href="#a"><span>Nebula Information</span></a>
    </li> 
    <li><a href="#flickr"><span>Images</span></a></li> 
</ul>
    <div id="flickr"></div> 
</div>
<script> 
(function($){ 
    var img = $("<img/>", { 
        height: 100, 
        width: 100 
        }), 
    tabOpts = { 
        select: function(event, ui) { 
        if (ui.tab.toString().indexOf("flickr") != -1 ) { 
                                     
        $("#flickr").empty(); 

$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?tags=nebula&format=json&jsoncallback=?", function(data) { 
            $.each(data.items, function(i,item){ 
            img.clone().attr("src", item.media.m).appendTo("#flickr"); 
                             
            if (i == 5) { 
                return false; 
                    } 
                    }); 
                }); 
            } 
        } 
    }; 

$("#myTabs").tabs(tabOpts); 
})(jQuery); 
</script>
```
## Accordion Widget
Accordion's structure 1
```
<title>Accordion</title> 
<link rel="stylesheet" href="css/smoothness/jquery-ui.css"> 
        <div id="myAccordion"> 
            
        </div> 
<script src="development-bundle/jquery-1.4.4.js"></script> 
<script src="development-bundle/ui/jquery.ui.core.js"></script> 
<script src="development-bundle/ui/jquery.ui.widget.js"></script> 
<script src="development-bundle/ui/jquery.ui.accordion.js">
</script> 
        <script> 
            (function($){ 
                $("#myAccordion").accordion(); 
            })(jQuery); 
        </script> 
    </body> 
</html>
```
Styling accordion 2
```
<link rel="stylesheet" href="css/accordionTheme.css">
```
Configuring an accordion 3
```
event "click" Specify the event on headers that trigger drawers to open.
 <script> 
        (function($){ 
            var accOpts = { 
                event: "mouseover" 
            }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
Changing the default active header 4
```
<script> 
            (function($){ 
                var accOpts = { 
                    active: 2 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
Change the configuration object once again 5
```
<script> 
            (function($){ 
                var accOpts = { 
                    active: false 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
6:
```
<script> 
            (function($){ 
                var accOpts = { 
                    active: false, 
                    collapsible: true 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
Filling the height of its container 7
```
<style> 
            #container { height:600px; width:400px; } 
</style>
<div id="container"> 
            <div id="myAccordion">
<script> 
            (function($){ 
                var accOpts = { 
                    fillSpace: true 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
Accordion animation 8
```
<script> 
            (function($){ 
                var accOpts = { 
                    animated: false 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
jquery.effects.core.js 9
```
<script src="development-bundle/ui/jquery.effects.core.js">
</script> 
        <script> 
            (function($){ 
                var accOpts = { 
                    animated: "bounceslide" 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
jquery.effects.core.js 10 - 11
```
<script> 
            (function($){ 
                var accOpts = { 
                    animated: "easeOutBounce" 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
(function($){ 
                var accOpts = { 
                    clearStyle: true, 
                    animated: "easeOutBounce" 
                };
```
Accordion events Using the change event 12

```
<script> 
(function($){ 
    var accOpts = { 
        change: function(e, ui) { 
        $(".notify").remove(); 
        $("<div />", { 
        "class": "notify", 
           text: ([
                ui.newHeader.find("a").text(), 
               "was activated,",  
               ui.oldHeader.find("a").text(), 
               "was closed"].join(" ")) 
    }).insertAfter("#myAccordion").fadeOut(2000, function(){ 
        $(this).remove(); 
    }); 
} 
}; 
    $("#myAccordion").accordion(accOpts); 
    })(jQuery); 
</script>
```
The changestart event 13
```
<script> 
(function($){ 
    var accOpts = { 
    changestart: function(e, ui) { 
        $(".notify").remove(); 
        $("<div />", { 
        "class": "notify", 
        text: ([ui.newHeader.find("a").text(), "was activated,", ui.oldHeader.find("a").text(), "was closed"].join(" ")) 
    }).insertAfter("#myAccordion").fadeOut(2000, function(){ 
        $(this).remove(); 
    }); 
    } 
}; 
                 
    $("#myAccordion").accordion(accOpts); 
    })(jQuery); 
</script>
```
Accordion navigation 14
```
<link rel="stylesheet" href="css/accordionTheme2.css">
<script> 
            (function($){ 
                var accOpts = { 
                    navigation: true 
                }; 
                $("#myAccordion").accordion(accOpts); 
            })(jQuery); 
        </script>
```
### Accordion methods
Header activation 15
```
<label for="activateChoice">Enter a header index to activate</label> 
        <input id="activateChoice"> 
        <button type="button" id="activate">Activate</button>
<script> 
(function($){ 
    $("#myAccordion").accordion(); 
    $("#activate").click(function() { 
            $("#myAccordion").accordion("activate", parseInt($("#activateChoice").val(), 10)); 
}); 
})(jQuery); 
</script>
```
Resizing an accordion panel 16
```
            <h2 id="remote"><a href="remoteAccordion.txt">Remote</a></h2> 
            <div></div>
        <script> 
    (function($){ 
        var accOpts = { 
        changestart: function(e, ui) { 
        if (ui.newHeader.attr("id") === "remote") { 
        $.get(ui.newHeader.find("a").attr("href"), function(data) { 
        ui.newHeader.next().text(data); 
    }); 
} 
}, 
    change: function(e, ui) { 
    ui.newHeader.closest("#myAccordion").accordion("resize");    
    } 
}; 
$("#myAccordion").accordion(accOpts); 
})(jQuery); 
</script> 
```
Accordion interoperability 17
```
<div id="myAccordion"> 
<h2><a href="#">Header 1</a></h2> 
<h2><a href="#">Header 2</a></h2> 
<h2><a href="#">Header 3</a></h2> 
<div> 
    <div id="myTabs"> 
    <ul> 
        <li><a href="#0"><span>Tab 1</span></a></li> 
        <li><a href="#1"><span>Tab 2</span></a></li> 
    </ul> 
<div id="0">This is the content panel linked to the first tab, it is shown by default.</div> 
<div id="1">This content is linked to the second tab and will be shown when its tab is clicked.</div> 
    </div> 
</div> 
</div>
<script> 
    (function($){ 
        $("#myAccordion").accordion(); 
        $("#myTabs").tabs(); 
    })(jQuery); 
</script>
```
19
```
<div id="container" class="ui-helper-clearfix"> 
    <div id="myAccordion"> 
        <h2><a href="#me" title="About Me">About Me</a></h2> 
    <div> 
                    <a href="accordionMe.html#me" title="Bio">My Bio</a> 
                    <a href="accordionMe.html#me" title="Contact Me">Contact Me</a> 
                    <a href="accordionMe.html#me" title="Resume">My Resume</a> 
                </div> 
                <h2><a href="#js" title="JavaScript">JavaScript</a></h2> 
                <div> 
                    <a href="accordionJS.html#js" title="Tutorials">Tutorials</a> 
                    <a href="accordionJS.html#js" title="AJAX">AJAX</a> 
                    <a href="accordionJS.html#js" title="Apps">Apps</a> 
                </div> 
    </div> 
            <div id="contentCol"> 
                <h1>JavaScript</h1> 
            </div> 
</div> 
<script> 
            (function($){ 
                var accOpts = { 
                    fillSpace: true, 
                    navigation: true 
                }; 
        $("#myAccordion").accordion(accOpts); 
})(jQuery); 
</script>
```
20
```
<link rel="stylesheet" href="css/accordionTheme2.css"> 
<div id="container" class="ui-helper-clearfix"> 
            <div id="myAccordion"> 
                <h2><a href="#me" title="About Me">About Me</a></h2> 
            <div> 
                    <a href="accordionMe.html#me" title="Bio">My Bio</a> 
                    <a href="accordionMe.html#me" title="Contact Me">Contact Me</a> 
                    <a href="accordionMe.html#me" title="Resume">My Resume</a> 
                </div> 
                <h2><a href="#js" title="JavaScript">JavaScript</a></h2> 
                <div> 
                    <a href="accordionJS.html#js" title="Tutorials">Tutorials</a> 
                    <a href="accordionJS.html#js" title="AJAX">AJAX</a> 
                    <a href="accordionJS.html#js" title="Apps">Apps</a> 
                </div> 
</div> 
            <div id="contentCol"> 
                <h1>About Me</h1> 
            </div> 
</div> 
        <script> 
            (function($){ 
                var accOpts = { 
                    fillSpace: true, 
                    navigation: true 
                }; 
        $("#myAccordion").accordion(accOpts); 
    })(jQuery); 
</script>
```


## Dialog  dialog1
```
jquery-ui-x.x.x.custom.css 
jquery-x.x.x.js 
jquery.ui.core.js 
jquery.ui.widget.js 
jquery.ui.position.js 
jquery.ui.dialog.js
<!DOCTYPE html> 
<html> 
    <head> 
        <meta charset="utf-8"> 
        <title>Dialog</title> 
        <link rel="stylesheet" href="css/smoothness/jquery-ui-1.8.9.custom.css"> 
    </head> 
    <body> 
        <div id="myDialog" title="This is the title!">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean sollicitudin. Sed interdum pulvinar justo. Nam iaculis volutpat ligula. Integer vitae felis quis diam laoreet ullamcorper. Etiam tincidunt est vitae est.</div> 
        <script src="development-bundle/jquery-1.4.4.js"></script> 
        <script src="development-bundle/ui/jquery.ui.core.js"></script> 
        <script src="development-bundle/ui/jquery.ui.widget.js"></script> 
        <script src="development-bundle/ui/jquery.ui.position.js"></script> 
        <script src="development-bundle/ui/jquery.ui.dialog.js"></script> 
        <script> 
            (function($){ 
                $("#myDialog").dialog(); 
            })(jQuery); 
        </script> 
    </body> 
</html>
```

## The Slider Widget
Implementing a slider1
```
<div id="mySlider"></div> 
        <script src="development-bundle/jquery-1.4.4.js"></script> 
        <script src="devpment-bundle/ui/jquery.ui.core.js"></script> 
 <script src="devopment-bundle/ui/jquery.ui.widget.js"></script> 
<script src="development-bundle/ui/jquery.ui.mouse.js"></script> 
 <script src="development-bundle/ui/jquery.ui.slider.js"></script> 
        <script> 
            (function($){ 
                $("#mySlider").slider(); 
            })(jQuery); 
```

## The Datepicker Widget 1
```
<label>Enter a date: </label><input id="date"> 
        <script src="development-bundle/jquery-1.4.4.js"></script> 
        <script src="devment-bundle/ui/jquery.ui.core.js"></script> 
<script src="devent-bundle/ui/jquery.ui.datepicker.js"></script> 
            (function($){ 
                $("#date").datepicker(); 
            })(jQuery); 
```

## Progressbar
1 The default progressbar implementation
```
<div id="myProgressbar"></div> 
<script src="development-bundle/jquery-1.4.4.js"></script> 
 <script src="development-bundle/ui/jquery.ui.core.js"></script> 
<script src="development-bundle/ui/jquery.ui.widget.js"></script> 
<script src="devnt-bundle/ui/jquery.ui.progressbar.js"></script> 
            (function($){ 
                $("#myProgressbar").progressbar(); 
            })(jQuery); 
```

## Autocomplete Widgets
```
        <title>Autocomplete</title> 
<link rel="stylesheet" href="css/smoothness/jquery-ui-1.8.9.custom.css"> 
  <label>Enter your city:</label><input id="city"> 
<script src="development-bundle/jquery-1.4.4.js"></script> 
<script src="development-bundle/ui/jquery.ui.core.js"></script> 
<script src="development-bundle/ui/jquery.ui.widget.js"></script> 
<script src="development-bundle/ui/jquery.ui.position.js"></script> 
<script src="development-bundle/ui/jquery.ui.autocomplete.js"></script> 
        <script> 
            (function($){ 
                var autoOpts = { 
                    source: [ 
                        "Aberdeen", 
                        "Armagh", 
                        "Bangor", 
                        "York" 
                    ] 
                }; 
                $("#city").autocomplete(autoOpts); 
            })(jQuery); 
```

## button widget 

1 Standard implementations
```
<link rel="stylesheet" href="css/smoothness/jquery-ui-1.8.9.custom.css"> 
<a href="#" id="myButton">A link button</a> 
        <script src="development-bundle/jquery-1.4.4.js"></script> 
  <script src="development-bundle/ui/jquery.ui.core.js"></script> 
<script src="development-bundle/ui/jquery.ui.widget.js"></script> 
<script src="development-bundle/ui/jquery.ui.button.js"></script> 
            (function($){ 
                $("#myButton").button(); 
            })(jQuery); 
```

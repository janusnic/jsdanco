# jQuery
jQuery - библиотека JavaScript, которая упрощает работу и взаимодействие с объектами и элементами DOM, а также позволяет реагировать на различные события, которые проиходят внутри окна браузера.

## Установка библиотеки:

- Загружаем библиотеку с официального сайта
- Помещаем в папку со скриптами
- С помощью тега script подгружаем библиотеку на страницу.
Функция $ может возвращать различные элементы DOM и её результат на прямую зависит от того какие значения мы передаём в эту функцию. В эту функцию мы можем передавать строчные значения. Часто сюда передают название селектора - который определяет какие элементы нужно отобрать из всей структуры документа.

## Селекторы

Селекторы позволяют отобрать необходимые элементы на странице для выполнения каких-либо дальнейших действий.
```
$('#sidebar') - все элементы с идентификатором sidebar
$('.post') - все элементы с классом post
$('div') - все элементы div
$('div.post') - все элементы div с классом post
$('div span') - все элементы span внутри div
$('div').find('span') - все элементы span внутри div
$('div > span') - все элементы span внутри div, при этом span должен быть прямым потомком div
$('div, span') - все div и span
$('span + img') - все img после span
$('#banner').prev() - элемент перед #banner
$('#banner').next() - элемент после #banner
$('*') - всё
$('p > *') - все потомки элемента p
$('p').children() - все потомки p
$('p').parent() - все непосредственные предки p
$('p').parents() - все предки p
$('p').parents('div') - все предки p, которые div
```
## Фильтры

Фильтра позволяют больше конкретизировать выборку элементов и сделать селекторы более гибкими.
```
$('div:first') - первый div
$('div:last') - последний div
$('div:not(.post)') - div у которых нет класса post
$('div:even') - четные div
$('div:odd') - нечетные div
$('div:eq(3)') - div, 3-й по счету
$('div:gt(3)') - div с индексом > 3
$('div:lt(3)') - div с индексом < 3
$(':header') - все заголовки h1, h2, h3 и т.д.
$('div:contains("Copyright")') - div содержащие текст Copyright
$('div:empty') - пустые div
$('div:has(p)') - div содержащие p
$('div').filter('.post') - div содержащие класс post
$('div:hidden') - скрытые div
$('div:visible') - видимые div
$("div[class]") - все div с атрибутом class
$("div[title = 'title']") - все div с атрибутом title="title"
$("div[title != 'title']") - все div с атрибутом title не равным "title"
$("div[title ^= 'ti']") - все div с атрибутом title начинающимся с "ti"
$("div[title $= 'le']") - все div с атрибутом title заканчивающимся на "le"
$("div[title *= 'itl']") - все div с атрибутом title содержащим "itl"
$(":text") - все input с типом text
$(":radio") - все input с типом radio
$("input:enabled") - все включенные элементы input
$("input:checked") - все отмеченные чекбоксы
$("div[title = 'title']:visible:has(p)") - div с атрибутом title="title", видимый, содержащий теги p
$("form select option:selected") - выбранные элементы select
$("form :radio[name=some]:checked").val() - получение выбранного значения радиобатона с именем some
$("form :checkbox:checked") - выбор всех выбранных чекбоксов
```
## Методы для работы с DOM

Перед началом создадим файл index.html в котором подгрузим библиотеку jQuery и файл скриптов, где мы будем записывать свой код.
```
<head>
    <title>jQuery</title>
    <style>
    .red_border{
        border: 1px solid red;
    }
    </style>
    <script src="jquery.js"></script>
    <script src="script.js"></script>
</head>
<body>

<h1>Lorem ipsum dolor sit amet.</h1>

<p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, molestiae, corporis, alias eligendi omnis voluptates debitis mollitia cum voluptas odit excepturi similique repellat impedit assumenda veritatis vel deleniti provident distinctio nostrum dolorum vitae laudantium dolorem iste ad soluta veniam reprehenderit quidem molestias nemo vero illum cupiditate cumque ipsa! Debitis, deserunt?</p>

<p class="red_border">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, molestiae, corporis, alias eligendi omnis voluptates debitis mollitia cum voluptas odit excepturi similique repellat impedit assumenda veritatis vel deleniti provident distinctio nostrum dolorum vitae laudantium dolorem iste ad soluta veniam reprehenderit quidem molestias nemo vero illum cupiditate cumque ipsa! Debitis, deserunt?</p>

<p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, molestiae, corporis, alias eligendi omnis voluptates debitis mollitia cum voluptas odit excepturi similique repellat impedit assumenda veritatis vel deleniti provident distinctio nostrum dolorum vitae laudantium dolorem iste ad soluta veniam reprehenderit quidem molestias nemo vero illum cupiditate cumque ipsa! Debitis, deserunt?</p>

<button>Show/Hide</button>

<br>
<br>

<form action="#">
    <input type="text" name="name" id="name" value="hello">
    <input type="submit" value="Send">
</form>

</body>
</html>
```
css - задаёт стили CSS:
```
$(document).ready(function(){
    $('p').css('border', '3px solid blue');
});
```
Если не передать другой параметр может просто возвращать уже имеющиеся значения указанного свойства:
```
$(document).ready(function(){
    $('p').css('border', '1px solid red');
    $('p').each(function(){
        alert($(this).css('border'));
    });
});
```
Также в метод css можно передавать целый массив свойст CSS:
```
$(document).ready(function(){
    $('p').css({'border' : '1px solid red', 'backgroundColor': 'grey', 'color' : '#fff'});
});
```
each - позволяет применить к каждому выбранному элементу указанную функцию.
```
$(document).ready(function(){
    $('.paragraph').each(function(){
        alert(this.innerHTML);
    });
});
```
addClass - добавляет указанный класс:
```
$(document).ready(function(){
    $('p').addClass('red_border');
});
```
hasClass - возвращает true в том случае, когда выбранный элемент имеет указанный класс:
```
$(document).ready(function(){
    $('p').each(function(){
        if($(this).hasClass('paragraph')){
            alert('Element has class');  
        }
    });
});
```
toggleClass - делает проверку есть ли указанный класс и если его нет, то добавляет его выбранному элементу, а если есть, то удаляет его.
```
$(document).ready(function(){
    $('p').toggleClass('red_border');
});
```
attr - позволяет как получить значение указанного атрибута:
```
$(document).ready(function(){
    $('p').each(function(){
        alert($(this).attr('class'));
    });
});
```
Так и указать его для выбранного элемента:
```
$(document).ready(function(){
    $('.paragraph').attr('class', 'red_border');
});
```
removeAttr - удаляет значение атрибута
```
$(document).ready(function(){
    $('.paragraph').attr('class', 'red_border');
    $('.red_border').removeAttr('class');
});
```
html - задаёт или перезаписывает:
```
$(document).ready(function(){
    $('.paragraph').html('text');
});
```
Или просто получает текст или html-код внутри выбранного элемента:
```
$(document).ready(function(){
    $('.paragraph').each(function(){
        alert($(this).html());
    });
});
```
val - действует точно также как и метод html, но только для элементов форм.
```
$(document).ready(function(){
    $('input').each(function(){
        alert($(this).val());
    });        
});
```
after - добавить определённый текст или html-код, после указанного элемента.
```
$(document).ready(function(){
    $('.paragraph').after('<p>hello, world</p>');
});
```
before - то же самое но уже перед указанным элементом.

append - вставляет указанный элемент в конец определённого элемента.
```
$(document).ready(function(){
    $('.paragraph').append('<code>This is new code</code>');
});
```
prepend - то же самое только элемент будет добавлен в конец.

empty - очищает содержимое элементов.
```
$(document).ready(function(){
    $('p').empty();
});
```
remove - удаляет элемент.

$(document).ready(function(){
    $('p').remove();
});
```
wrap - обворачивает выбранный элемент переданным в параметре.
```
$(document).ready(function(){
    $('p').wrap('<a href="#">');
});
```
Обработчики событий

Обработчики событий - это функции JavaScript, которые срабатывают при инициализации указанных событий.

ready - применяеться к объекту document и срабатывает в тот момент как только парсер браузера сформирует DOM дерево. В то время как обработчик события window.onload срабатывает только тогда когда страница уже полностью загруженна (загруженны все картинки, скрипты, стили, шрифты и т. д.).
```
$(document).ready(function(){
    console.log('some code...');
});
```
live - функция позволяющая повестить обработчик события для элементов, которые сгенерировались JavaScript.

## События

События определяют при каких условиях инициализируються те или иные обработчики событий.

change — изменение значения элемента (значение, при потери фокуса, элемента отличается от изначального, при получении фокуса)
click — клик по элементу (порядок событий — mousedown, mouseup, click)
dblclick — двойной клик по элементу
resize — изменение размеров элементов
scroll – скроллинг элемента
select — выбор текста (актуален только для input[type=text] и textarea)
submit — отправка формы
focus — фокус на элементе – актуально для input[type=text], но в современных браузерах работает и с другими элементами
blur — фокус ушел с элемента – актуально для input[type=text] — срабатывает при клике по другому элементу на странице или по событию клавиатуры (к примеру переключение по tab’у)
focusin — фокус на элементе, данное событие срабатывает на предке элемента, для которого произошло событие focus
focusout — фокус ушел с элемента, данное событие срабатывает на предке элемента, для которого произошло событие blur
keydown — нажатие клавиши на клавиатуре
keypress — нажатие клавиши на клавиатуре (порядок событий — keydown, keypress, keyup)
keyup — отжатие клавиши на клавиатуре
load — загрузка элемента (img)
unload — выгрузка элемента или переход на другую страницу (window)
mousedown — нажатие клавиши мыши
mouseup — отжатие клавиши мыши
mousemove — движение курсора
mouseenter — наведение курсора на элемент, не срабатывает при переходе фокуса на дочерние элементы
mouseleave — вывод курсора из элемента, не срабатывает при переходе фокуса на дочерние элементы
mouseover — наведение курсора на элемент
mouseout — вывод курсора из элемента
## Анимация

Анимация позволяет придать различные эффекты при взаимодействии с элементами HTML.

hide - позволяет скрыть элемент.
```
$(document).ready(function(){ 
    $('button').click(function(){
        $('p').hide();
    });
});
```
show - отображает скрытые элементы.

toggle - функция-переключатель, тоесть если элемент скрыт, то она его отображает, а если он отображаеться, то скрывает его.
```
$(document).ready(function(){ 
    $('button').click(function(){
        $('p').toggle();
    });
});
```
slideUp и slideDown - скрытие и отображение элемента с использованием эффекта в виде слайда.
```
$(document).ready(function(){
    $('p').hide();
    $('button').click(function(){
        $('p:not(.red_border)').slideDown();
    });
});
```
slideToggle - переключатель слайдов, объединяющий две вышеперечисленных функции.
```
$(document).ready(function(){
    $('button').click(function(){
        $('p').slideToggle();
    });
});
```
fadeIn, fadeOut, fadeToggle - отображение, отображение и переключатель скрытия/отображения элементов с эффектом затухания (плавным изменением прозрачности).
```
$(document).ready(function(){
    $('button').click(function(){
        $('p').fadeToggle();
    });
});
```
animate - через заданный промежуток времени меняет значения указанных свойст CSS. Можно также запускать цепочки анимации.
```
// animate(properties, [duration], [easing], [callback])
$(document).ready(function(){
    $('button').click(function(){
        $('.red_border').animate({'fontSize':'30px', 'borderLeftWidth':'10px', 'padding':'20px'}, 5000, 'linear').animate({'opacity':0.5}, 1000, function(){console.log("Animation complite")});
    });
});
```
Для начала этой информации будет достаточно чтобы разобраться с тем как работает эта замечательная библиотека, а для более детального ознакомления следует более активно изучать докуметацию, а также разрабатывать или хотя бы разбирать более сложные примеры использования.


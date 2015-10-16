# jsdanco

В jQuery существует официальное деление всех ajax методов на две группы:
- низкоуровневый ajax интерфейс
- высокоуровневый ajax интерфейс (упрощенные ajax методы)

К первой группе относятся два jQuery ajax метода:
- jQuery.ajax(options)
- jQuery.ajaxSetup(options)

Ко второй группе относятся, соответственно остальные jQuery методы:
- load(url, data, callback)
- jQuery.get(url, data, callback, type)
- jQuery.getJSON(url, data, callback)
- jQuery.getScript(url, callback)
- jQuery.post(url, data, callback, type)

Низкоуровневый ajax интерфейс предоставляет больше возможностей для работы с объектом XMLHttpRequest(в IE ActiveXObject), например в методе jQuery.ajax(options) вы можете установить обработку глобальных jQuery ajax событий (ajaxStart,ajaxStop,ajaxSucess,ajaxComplate,ajaxError), например, если Вам необходимо перед отправкой данных на сервер отобразить прогрессбар, а после того как данные успешно будут возвращены его скрыть, то метод jQuery.ajax(options) как раз то, что Вам нужно. Либо иногда возникает необходимость в том, чтобы отправить данные на сервер не как строку, а как необработанный объект, по умолчанию упрощенные методы трансформируют все данные отсылаемые на сервер в строковой тип, чтобы исправить это Вы должны применить метод jQuery.ajax(options), изменив опцию processData на false. 


1. Как отправить запрос на сервер и получить данные?

Если Вам необходим отрезок HTMl кода, который встраивается в структуру страницы, то вполне подойдет метод $.load():
```

"jQuery"
 $("#loadhtml").click(function(){
 $("#feeds").load("ajax/base.php", function(data){
$(this).text(data);
        }).show("slow");
    });  

```

При условии, что код php будет следующим:
```
<?php
header('Content-Type: text/html; charset=UTF-8');
echo '<html>';
echo '<body>';
echo '<div><b>Привет я сервер!</b></div>';
echo '</body>';
echo '</html>';
?>
```
# Node Js
```

            <script type=text/javascript>
                $(document).ready(function(){ 
                    $("#loadtxt").click(function(){
                        $("#feeds").load("test.txt", function(data){
                            $(this).text(data);
                        }).show("slow");
                    });  
                    $("#loadhtml").click(function(){
                        $("#feeds").load("html.txt", function(data){
                            $(this).html(data);
                        }).show("slow");
                    });  
                });
            </script>
            <button id="loadtxt"> Получить txt данные с сервера</button>
            <button id="loadhtml"> Получить html данные с сервера</button>
            <div id="feeds" style="margin:20px;display:none;height:50px;"></div>
            </p>
```


## Делаем запрос GET с помощью $.get()

Метод jQuery $.get() предоставляет легкий и удобный способ сделать простой запрос AJAX. Он выполняет запрос с помощью метода HTTP GET (используется для получения URL, например страниц и изображений), вместо метода POST (который традиционно используется для отправки данных формы).

В простейшей форме можно вызвать метод так:
```

$.get( url );
```
...где url является адресом URL ресурса, от которого ожидается ответ. Обычно это скрипт на стороне сервера, который выполняет какие-нибудь действия и может возвращать некие данные:

```
$.get( "http://example.com/get.php" );
```
...хотя можно также запросить статический документ:

```
$.get( "http://example.com/mypage.html" );
```

При запросе URL, вы можете отправить данные с запросом. Вы можете передать данные в строке запроса, так же как и при обычном запросе GET:

```
$.get( "http://example.com/get.php?city=rome&date=20160318" );
```
Корректно будет сделать то же самое передав объект данных в качестве второго параметра методу $.get(). Объект данных должен содержать информацию в виде пар имя свойства/значение свойства. Например:

```
var data = { city: "rome", date: "20160318" };

$.get( "http://example.com/get.html", data );
```
В качестве альтернативы вы можете передать данные методу $.get() как строку:

```
var data = "city=rome&date=20120318";

$.get( "http://example.com/get.html", data );
 
```
### Получаем данные с сервера

AJAX запрос - асинхронный, что означет его выполнение в фоновом режиме, когда остальной код JavaScript продолжает действовать. 

Вам нужно написать возвратную функцию,  которая будет автоматически выполняться по завершению запроса AJAX и отправке ответа сервером. Как минимум, ваша функция должна принимать данные, возвращаемые сервером, как свой первый аргумент:

```

function myCallback( returnedData ) {

  // Делаем обработку данных returnedData

}
 
```
Как только возвратная функция создана, вы можете передать ее в качестве третьего аргумента в метод $.get():

```
var data = { city: "rome", date: "20160318" };

$.get( "http://example.com/get.html", data, myCallback );
``` 

### Определяем тип данных ответа

серверная сторона передает данные в одном из нескольких типовых форматов, включая XML, JSON, JavaScript, или HTML. По умолчанию jQuery пытается определить наиболее подходящий формат и разобрать данные соответствующим образом. Но лучше явно определить формат.

Для указания формата надо передать четвертый аргумент методу $.get(). Данный аргумент может быть строкой из следующего списка:
```
"xml"
"json"
"script"
"html"
```
Например, если вы знаете, что скрипт сервера возвращает данные в формате JSON, то вызываете метод $.get() следующим образом:

```
$.get( "http://example.com/get.html", data, myCallback, "json" );
 
```
## Пример использования метода $.get()

Здесь приводится пример создания запроса AJAX с помощью метода $.get() и простая обработка ответа. Для работы примера нужно на сервере создать простой текстовый файл с именем  getForecast.txt, содержащий следующий текст:
```
{
  "city": "Васюки",
  "date": "18 марта 2016",
  "forecast": "Зубодробительный холод и слякоть",
  "maxTemp": 1
}
```
Данный файл будет имитировать ответ в формате JSON, который мог быть сформирован скриптом прогноза погоды на сервере.

Затем создаем страницу get.html в той же папке что и getForecast.txt:

```

    $( function() {
 
    $('#getForecast').click( function() {
      var data; 
      $.get( "getForecast.txt", data, success, "json" );
    } );
 
    function success( forecastData ) {
      var forecast = forecastData.city + " прогноз на " + forecastData.date;
      forecast += ": " + forecastData.forecast + ". Максимальная температура: " + forecastData.maxTemp + "C";

      $("#feeds").html(forecast).show("slow");
      
    }
 
  } );

  <button id="getForecast">Получить прогноз погоды</button> 
        
  <div id="feeds" style="margin:20px;display:none;height:50px;"></div>

```

Вот как работает данный код:

- get.html содержит элемент button "Получить прогноз погоды" с ID getForecast.

- JavaScript вверху страницы выполняется как только страница будет загружена и DOM окажется в состоянии готовности.

- Код JavaScript сначала привязывает обработчик события click к кнопке #getForecast. Данный обработчик выполняет AJAX запрос GET к getForecast.txt, передавая название города и дату для прогноза. 

- Также определяется возвратная функция success(), которая будет выполняться по завершению запроса. Формат возвращаемых сервером данных определяется как JSON.

- Файл getForecast.txt возвращает браузеру данные прогноза в формате JSON.

- Вызывается функция success(). jQuery разбирает данные JSON, полученные от getForecast.txt, конвертирует их в объект JavaScript, и передает их в функцию.

- Функция возвращает объект данных forecastData и выводит сообщение, которое содержит несколько свойств объекта, включая название города, прогноз и температуру.

## Ajax запрос JSON-данных

### jQuery.getJSON()
Производит запрос json-данных у сервера, методом GET, без перезагрузки страницы. Функция имеет несколько необязательных параметров.
```
jQuery.getJSON(url,[data],[callback]):jqXHRv:1.0
```
- url — url-адрес, по которому будет отправлен запрос.
- data — данные, которые будут отправлены на сервер. Они должны быть представлены в объектом, в формате: {fName1:value1, fName2:value2, ...}.
- callback(data, textStatus, jqXHR) — пользовательская функция, которая будет вызвана после ответа сервера.
- data — данные, присланные с сервера.
- textStatus — статус того, как был выполнен запрос.
- jqXHR — объект jqXHR (в версиях до jquery-1.5, вместо него использовался XMLHttpRequest)
- $.getJSON() является сокращенным вариантом функции $.ajax(), вызванной со следующими параметрами:
```
$.ajax({
  url: url,
  dataType: 'json',
  data: data,
  success: callback
});
```
Полученные в результате запроса данные, можно получить в обработчике удачного выполнения запроса. Они будут предварительно преобразованы в javascript-объект или массив с помощью $.parseJSON(). 

запрошенный json-файл содержит данные в следующем формате:
```

 {
        "age": 0,
        "id": "motorola-xoom-with-wi-fi",
        "imageUrl": "img/phones/motorola-xoom-with-wi-fi.0.jpg",
        "name": "Motorola XOOM\u2122 with Wi-Fi",
        "snippet": "The Next, Next Generation\r\n\r\nExperience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb)."
    },

```

Сформируем из полученных данных html-список и вставим на страницу:
```
$(window).load(function(){

$.getJSON('phones.json', function(data){
 var items = [];
 console.log(data[0]['name']);
  $.each(data[0], function(key, val){
    items.push('<li id="' + key + '">' + val + '</li>');
  });
 
  $('<ul/>', {
    'class': 'my-new-list',
    html: items.join('')
  }).appendTo('body');
});


});
```

Начиная с jQuery-1.5, метод $.getJSON() возвращает объект jqXHR, который помимо прочего реализует интерфейс deferred, что позволяет задавать дополнительные обработчики выполнения. Помимо стандартных для объекта deferred методов .done(), .fail() и .then(), с помощью которых можно устанавливать обработчики, в jqXHR реализованы их копии: .success(), .error() и .complete(). Это сделано для соответствия привычным названиям методов, с помощью которых устанавливаются обработчики выполнения ajax-запросов.
```
  // Запустим ajax-запрос, установим обработчики его выполнения и
  // сохраним объект jqxhr данного запроса для дальнейшего использования.
  var jqxhr = $.getJSON("phones.json")
  .success(function() { alert("Успешное выполнение"); })
  .error(function() { alert("Ошибка выполнения"); })
  .complete(function() { alert("Завершение выполнения"); });
 
  // какой-либо код...
 
  // установим еще один обработчик удачного выполнения запроса
  jqxhr.complete(function(){ alert("Успешное выполнения 2"); });

```
загрузить 4 последних изображений с помощью Flickr JSONP API
```
    <div id="images">
    </div>


(function() {
 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
 $.getJSON( flickerAPI, {
   tags: "mount rainier",
   tagmode: "any",
   format: "json"
 })
 .done(function( data ) {
   $.each( data.items, function( i, item ) {
     $( "<img/>" ).attr( "src", item.media.m ).appendTo( "#images" );
     if ( i === 3 ) {
       return false;
     }
   });
 });
})();

```
## jQuery.getScript

данная функция загружает и выполняет локальный JavaScript. Может принимать следующие параметры:
- url запрашиваемого скрипта
- callback функция, которой будет скормлен результат (необязательный параметр)

```
$(document).ready(function(){                          // по завершению загрузки страницы
    $('#example-5').click(function(){                  // вешаем на клик по элементу с id = example-5
        $.getScript('ajax/example.js', function(){     // загрузку JavaScript'а из файла example.js 
            testAjax();                                // выполняем загруженный JavaScript
        });                
    })
});
```
Файл example.js:
```
function testAjax() {
    $('#example-5').html('Test completed');  // изменяем элемент с id = example-5
}
```


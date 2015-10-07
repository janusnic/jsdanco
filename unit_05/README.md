# js-danco
# Node.js-приложение: «Hello world»
## main.js 
```
/* Hello, World! program in node.js */
console.log("Hello, World!");
```
node main.js 


## веб-приложение с Node.js

- Пользователь должен иметь возможность использовать наше приложение с браузером;
- Пользователь должен видеть страницу приветствия по адресу http://domain/start;
- Когда запрашивается http://domain/upload, пользователь должен иметь возможность загрузить картинку со своего компьютера и просмотреть её в своем браузере.

## Простой HTTP-сервер

Давайте начнём с модуля сервера. Создайте файл server1.js в корневой директории вашего проекта и поместите туда следующий код:
```
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```
## Creating Node.js Application

1. - Import required module
строчка подключает http-модуль

```
var http = require("http");
```

2. Create Server

```
http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
```
3. Testing Request & Response

```
var http = require("http");

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
```

## start server:
```
$ node server1.js

```
Server running at http://127.0.0.1:8081/

Open http://127.0.0.1:8081/ in any browser and see the below result.

## рефакторинг нашего кода server2.js: 
```
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

```

## обратный вызов или callback server3.js
```
var http = require("http");

function onRequest(request, response) {
  console.log("Request received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);

console.log("Server has started.");
```

## внутри тела нашей callback-функции onRequest().

Когда callback запускается и наша функция onRequest() срабатывает, в неё передаются 2 параметра: request и response.

Они являются объектами и вы можете использовать их методы для обработки пришедшего HTTP-запроса и ответа на запрос (то есть, просто что-то посылать по проводам обратно в браузер, который запрашивал ваш сервер).

И наш код делает именно это: Всякий раз, когда запрос получен, он использует функцию response.writeHead() для отправки HTTP-статуса 200 и Content-Type в заголовке HTTP-ответа, а функцию Response.Write() для отправки текста «Hello World» в теле HTTP-ответа.

И последнее, мы вызываем response.end() чтобы завершить наш ответ.

## Выбор места для нашего серверного модуля

мы уже использовали модули в нашем коде:
```
var http = require("http");

...

http.createServer(...);
```
## как создать свой собственный модуль и как его использовать?
### app01

поместим код нашего сервера в функцию под название start и будем экспортировать эту функцию:
```
var http = require("http");

function start() {
  function onRequest(request, response) {
    console.log("Request received from maim app."); //наш callback
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
Теперь мы можем создать наш основной файл app.js, и запускать наш HTTP-сервер там, хотя код для сервера находится всё ещё в файле server.js.

Создаём файл app.js со следующим содержимым:
```
var server = require("./server");

server.start();
```
## мы можем запустить наше приложение
node app.js

## app02


### server.js
```
var http = require('http');

var fs = require('fs');
var url = require('url');

function start() {
  function onRequest(request, response) {
    console.log("Request received from maim app."); //наш callback
    
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
   
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

    
    // Read the requested file content from file system
    fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{    
         //Page found     
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});    
         
         // Write the content of the file to response body
         response.write(data.toString());       
      }

    // Send the response body 
      response.end();
   });   
  }

  http.createServer(onRequest).listen(8888);
  
  // Console will print the message
  console.log('Server running at http://127.0.0.1:8888/');
}

exports.start = start;
```

## index.html

```
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head>

<body>
  <h1>Hello World from unit #02 App!</h1>
</body>
</html>

```
## app03 Основы XMLHttpRequest
Объект XMLHttpRequest (или, как его кратко называют, «XHR») дает возможность из JavaScript делать HTTP-запросы к серверу без перезагрузки страницы.

Несмотря на слово «XML» в названии, XMLHttpRequest может работать с любыми данными, а не только с XML.

Как правило, XMLHttpRequest используют для загрузки данных.

пример использования, который загружает файл test.txt из текущей директории и выдаёт его содержимое:

```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <button onclick="loadTest()">Загрузить test.txt!</button>

  <script>
    function loadTest() {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'test.txt', false);
      xhr.send();

      if (xhr.status != 200) {
        // обработать ошибку
        alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
      } else {
        // вывести результат
        alert(xhr.responseText);
      }
    }
  </script>

</body>

</html>

```

## метод open

Синтаксис:
```
xhr.open(method, URL, async, user, password)
```
Этот метод — вызывается первым после создания объекта XMLHttpRequest.

##  Задаёт основные параметры запроса:

- method — HTTP-метод. Как правило, используется GET либо POST, хотя доступны и более экзотические, вроде TRACE/DELETE/PUT и т.п.
- URL — адрес запроса. Можно использовать не только http/https, но и другие протоколы, например ftp:// и file://.
При этом есть ограничения безопасности, называемые «Same Origin Policy»: запрос со страницы можно отправлять только на тот же протокол://домен:порт, с которого она пришла. 

- async — если установлено в false, то запрос производится синхронно, если true — асинхронно.
«Синхронный запрос» означает, что после вызова xhr.send() и до ответа сервера главный поток будет «заморожен»: посетитель не сможет взаимодействовать со страницей — прокручивать, нажимать на кнопки и т.п. После получения ответа выполнение продолжится со следующей строки.

«Асинхронный запрос» означает, что браузер отправит запрос, а далее результат нужно будет получить через обработчики событий, которые мы рассмотрим далее.

- user, password — логин и пароль для HTTP-авторизации, если нужны.

## Вызов open не открывает соединение
Он лишь настраивает запрос, а коммуникация инициируется методом send.

## Отослать данные: send

Синтаксис:
```
xhr.send([body])
```
Именно этод метод открывает соединение и отправляет запрос на сервер.

В body находится тело запроса. Не у всякого запроса есть тело, например у GET-запросов тела нет, а у POST — основные данные как раз передаются через body.

## Отмена: abort

Вызов xhr.abort() прерывает выполнение запроса.

## Ответ: status, statusText, responseText

Основные свойства, содержащие ответ сервера:

- status
HTTP-код ответа: 200, 404, 403 и так далее. Может быть также равен 0, если сервер не ответил или при запросе на другой домен.
- statusText
Текстовое описание статуса от сервера: OK Not Found, Forbidden и так далее.
- responseText
Текст ответа сервера.

- responseXML
Если сервер вернул XML, снабдив его правильным заголовком Content-type: text/xml, то браузер создаст из него XML-документ. По нему можно будет делать запросы xhr.responseXml.querySelector("...") и другие.
Оно используется редко, так как обычно используют не XML, а JSON. То есть, сервер возвращает JSON в виде текста, который браузер превращает в объект вызовом JSON.parse(xhr.responseText).

## Синхронные и асинхронные запросы

Если в методе open установить параметр async равным false или просто забыть его указать, то запрос будет синхронным.

Синхронные вызовы используются чрезвычайно редко, так как блокируют взаимодействие со страницей до окончания загрузки. Посетитель не может даже прокручивать её. Никакой JavaScript не может быть выполнен, пока синхронный вызов не завершён — в общем, в точности те же ограничения как alert.
```
// Синхронный запрос
xhr.open('GET', 'test.txt', false);

// Отсылаем его
xhr.send();
// ...весь JavaScript "подвиснет", пока запрос не завершится
```
Если синхронный вызов занял слишком много времени, то браузер предложит закрыть «зависшую» страницу.

Из-за такой блокировки получается, что нельзя отослать два запроса одновременно. Кроме того ряд продвинутых возможностей, таких как возможность делать запросы на другой домен и указывать таймаут, в синхронном режиме не работают.

Для того, чтобы запрос стал асинхронным, укажем параметр async равным true.
### Изменённый JS-код index1.html:
```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <button  id="button" onclick="loadTest()">Загрузить test.txt!</button>

  <script>
    function loadTest() {
      var xhr = new XMLHttpRequest();

      xhr.open('GET', 'test.txt', true);
      xhr.send(); // (1)

      xhr.onreadystatechange = function() { // (3)
          if (xhr.readyState != 4) return;

          button.innerHTML = 'Готово!';

          if (xhr.status != 200) {
            // обработать ошибку
            alert('Ошибка ' + xhr.status + ': ' + xhr.statusText);
          } else {
            // вывести результат
            alert(xhr.responseText);
          }

        }
      button.innerHTML = 'Загружаю...'; //2
      button.disabled = true;

    }
  </script>

</body>
</html>

```

Если в open указан третий аргумент true, то запрос выполняется асинхронно. Это означает, что после вызова xhr.send() в строке (1) код не «зависает», а преспокойно продолжает выполняться, выполняется строка (2), а результат приходит через событие (3).

## Событие readystatechange

Событие readystatechange происходит несколько раз в процессе отсылки и получения ответа. При этом можно посмотреть «текущее состояние запроса» в свойстве xhr.readyState.

## Все состояния, по спецификации:
```
const unsigned short UNSENT = 0; // начальное состояние
const unsigned short OPENED = 1; // вызван open
const unsigned short HEADERS_RECEIVED = 2; // получены заголовки
const unsigned short LOADING = 3; // загружается тело (получен очередной пакет данных)
const unsigned short DONE = 4; // запрос завершён
```
## json

app04/index.html
```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <button onclick="loadPhones()" id="button">Загрузить phones.json!</button>
  <script>
    function loadPhones() {

      // 1. Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', 'phones.json', true);


      // 3. Отсылаем запрос
      xhr.send();


      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        button.innerHTML = 'Готово!';

        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
          // обработать ошибку
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          // вывести результат
          alert(xhr.responseText);
        }

      }

      button.innerHTML = 'Загружаю...';
      button.disabled = true;
    }
  </script>

</body>

</html>
```

### HTTP-заголовки

XMLHttpRequest умеет как указывать свои заголовки в запросе, так и читать присланные в ответ.

Для работы с HTTP-заголовками есть 3 метода:

- setRequestHeader(name, value)
Устанавливает заголовок name запроса со значением value.
```
xhr.setRequestHeader('Content-Type', 'application/json');
```
### Ограничения на заголовки

Нельзя установить заголовки, которые контролирует браузер, например Referer или Host и ряд других.
Это ограничение существует в целях безопасности и для контроля корректности запроса.

### Поставленный заголовок нельзя снять
Особенностью XMLHttpRequest является то, что отменить setRequestHeader невозможно.
Повторные вызовы лишь добавляют информацию к заголовку, например:
```
xhr.setRequestHeader('X-Auth', '123');
xhr.setRequestHeader('X-Auth', '456');

// в результате будет заголовок:
// X-Auth: 123, 456
```
- getResponseHeader(name)

Возвращает значение заголовка ответа name, кроме Set-Cookie и Set-Cookie2.
```

xhr.getResponseHeader('Content-Type')
```
- getAllResponseHeaders()
Возвращает все заголовки ответа, кроме Set-Cookie и Set-Cookie2.
Заголовки возвращаются в виде единой строки, например:
```
Cache-Control: max-age=31536000
Content-Length: 4260
Content-Type: image/png
Date: Sat, 08 Sep 2012 16:53:16 GMT
```
Между заголовками стоит перевод строки в два символа "\r\n" (не зависит от ОС), значение заголовка отделено двоеточием с пробелом ": ". Этот формат задан стандартом.

Таким образом, если хочется получить объект с парами заголовок-значение, то эту строку необходимо разбить и обработать.

### Таймаут

Максимальную продолжительность асинхронного запроса можно задать свойством timeout:
```
xhr.timeout = 30000; // 30 секунд (в миллисекундах)
```
При превышении этого времени запрос будет оборван и сгенерировано событие ontimeout:
```
xhr.ontimeout = function() {
  alert( 'Извините, запрос превысил максимальное время' );
}
```
## Полный список событий

Современная спецификация предусматривает следующие события по ходу обработки запроса:

- loadstart — запрос начат.
- progress — браузер получил очередной пакет данных, можно прочитать текущие полученные данные в responseText.
- abort — запрос был отменён вызовом xhr.abort().
- error — произошла ошибка.
- load — запрос был успешно (без ошибок) завершён.
- timeout — запрос был прекращён по таймауту.
- loadend — запрос был завершён (успешно или неуспешно)
Используя эти события можно более удобно отслеживать загрузку (onload) и ошибку (onerror), а также количество загруженных данных (onprogress).


## IE8,9: XDomainRequest

В IE8 и IE9 поддержка XMLHttpRequest ограничена:

Не поддерживаются события, кроме onreadystatechange.
Некорректно поддерживается состояние readyState = 3: браузер может сгенерировать его только один раз во время запроса, а не при каждом пакете данных. Кроме того, он не даёт доступ к ответу responseText до того, как он будет до конца получен.
Дело в том, что, когда создавались эти браузеры, спецификации были не до конца проработаны. Поэтому разработчики браузера решили добавить свой объект XDomainRequest, который реализовывал часть возможностей современного стандарта.

А обычный XMLHttpRequest решили не трогать, чтобы ненароком не сломать существующий код.

что для того, чтобы получить некоторые из современных возможностей в IE8,9 — вместо new XMLHttpRequest() нужно использовать new XDomainRequest.

## Кросс-браузерно:
```
var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
var xhr = new XHR();
```
Теперь в IE8,9 поддерживаются события onload, onerror и onprogress. Это именно для IE8,9. Для IE10 обычный XMLHttpRequest уже является полноценным.

## IE9- и кеширование

Обычно ответы на запросы XMLHttpRequest кешируются, как и обычные страницы.

Но IE9- по умолчанию кеширует все ответы, не снабжённые антикеш-заголовком. Другие браузеры этого не делают. Чтобы этого избежать, сервер должен добавить в ответ соответствующие антикеш-заголовки, например Cache-Control: no-cache.

Впрочем, использовать заголовки типа Expires, Last-Modified и Cache-Control рекомендуется в любом случае, чтобы дать понять браузеру (не обязательно IE), что ему следует делать.

Альтернативный вариант — добавить в URL запроса случайный параметр, предотвращающий кеширование.

Например, вместо xhr.open('GET', 'service', false) написать:
```
xhr.open('GET', ''service?r=' + Math.random(), false);
```
В результате, чтобы создать кросс-броузерный объект требуемого класса, вы можете сделать следующее:
```
var httpRequest;
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}
```
index1.html
```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

  <button onclick="loadPhones()" id="button">Загрузить phones.json!</button>

  <script>
    function loadPhones() {

      // 1. Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', 'phones.json', true);

      // 3. Отсылаем запрос
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        button.innerHTML = 'Готово!';

        // 4. Если код ответа сервера не 200, то это ошибка
        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (xhr.status != 200) {
          // обработать ошибку
          alert( 'ошибка: ' + (this.status ? this.statusText || 'запрос не удался') );
          return;
        } else {
          // получить результат из this.responseText или this.responseXML
          // вывести результат
          alert(xhr.responseText);
        }

      }

      button.innerHTML = 'Загружаю...';
      button.disabled = true;
    }
  </script>

</body>
</html>
```
## app05/index.html создать кросс-броузерный объект

Наш JavaScript запросит HTML документ test.html, который содержит текст "I'm a test." и выведет содержимое файла в диалоговом окне.
```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

   <script>
    function makeRequest(url) {
        var httpRequest = false;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
                
            }
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!httpRequest) {
            alert('Не вышло :( Невозможно создать экземпляр класса XMLHTTP ');
            return false;
        }
        httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
        httpRequest.open('GET', url, true);
        httpRequest.send(null);

    }

    function alertContents(httpRequest) {

        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                alert(httpRequest.responseText);
            } else {
                alert('С запросом возникла проблема.');
            }
        }

    }
  </script>
<span
    style="cursor: pointer; text-decoration: underline"
    onclick="makeRequest('test.html')">
        Сделать запрос
</span>
</body>

</html>

```

Строка httpRequest.overrideMimeType('text/xml'); вызовет ошибки в консоли JavaScript в Firefox 1.5 или более позднем, как описано в https://bugzilla.mozilla.org/show_bug.cgi?id=311724, если страница вызванная с помощью XMLHttpRequest не является правильным XML (например, если это обычный текст). На самом деле это корректное поведение.

## app06 Работа с XML ответом

создадим правильный XML документ, который мы будем запрашивать. Документ (test.xml) содержит следующее:
```
<?xml version="1.0" ?>
<root>
    I'm a test.
</root>
```
В скрипте нам необходимо заменить строку запроса на:

...
onclick="makeRequest('test.xml')">
...

в alertContents() нам нужно заменить строку alert(httpRequest.responseText); на:
```
var xmldoc = httpRequest.responseXML;
var root_node = xmldoc.getElementsByTagName('root').item(0);
alert(root_node.firstChild.data);
```
Этот код берет объект XMLDocument, возвращаемый responseXML и использует методы DOM для доступа к данным, содержащимся в документе XML.
```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
</head>

<body>

   <script>
    function makeRequest(url) {
        var httpRequest = false;

        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            httpRequest = new XMLHttpRequest();
            if (httpRequest.overrideMimeType) {
                httpRequest.overrideMimeType('text/xml');
                
            }
        } else if (window.ActiveXObject) { // IE
            try {
                httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!httpRequest) {
            alert('Не вышло :( Невозможно создать экземпляр класса XMLHTTP ');
            return false;
        }
        httpRequest.onreadystatechange = function() { alertContents(httpRequest); };
        httpRequest.open('GET', url, true);
        httpRequest.send(null);

    }

    function alertContents(httpRequest) {

        if (httpRequest.readyState == 4) {
            if (httpRequest.status == 200) {
                var xmldoc = httpRequest.responseXML;
                var root_node = xmldoc.getElementsByTagName('root').item(0);
                alert(root_node.firstChild.data);
            } else {
                alert('С запросом возникла проблема.');
            }
        }

    }
  </script>
<span
    style="cursor: pointer; text-decoration: underline"
    onclick="makeRequest('test.xml')">
        Сделать запрос
</span>
</body>

</html>
```
## app07
```
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <link rel="stylesheet" type="text/css" href="css/normalize.css">
  
    
  <style type='text/css'>
    th, td {
    border: 1px solid;
}
th {
    font-weight : bold
}
  </style>
</head>

<body>

  <script>

  var USER_FILE;

    var VanillaRunOnDomReady = function() {

      var _table_ = document.createElement('table'),
          _tr_ = document.createElement('tr'),
          _th_ = document.createElement('th'),
          _td_ = document.createElement('td');

       function buildHtmlTable(arr) {
           var table = _table_.cloneNode(false),
               columns = addAllColumnHeaders(arr, table);
           for (var i=0, maxi=arr.length; i < maxi; ++i) {
               var tr = _tr_.cloneNode(false);
               for (var j=0, maxj=columns.length; j < maxj ; ++j) {
                   var td = _td_.cloneNode(false);
                       cellValue = arr[i][columns[j]];
                   td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                   tr.appendChild(td);
               }
               table.appendChild(tr);
           }
           return table;
       }
       
       function addAllColumnHeaders(arr, table)
       {
           var columnSet = [],
               tr = _tr_.cloneNode(false);
           for (var i=0, l=arr.length; i < l; i++) {
               for (var key in arr[i]) {
                   if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key)===-1) {
                       columnSet.push(key);
                       var th = _th_.cloneNode(false);
                       th.appendChild(document.createTextNode(key));
                       tr.appendChild(th);
                   }
               }
           }
           table.appendChild(tr);
           return columnSet;
       }

          var persone  =  JSON.parse(USER_FILE);

          document.body.appendChild(buildHtmlTable(persone));
      }

      
    function loadPhones() {

      // 1. Создаём новый объект XMLHttpRequest
      var xhr = new XMLHttpRequest();

      // 2. Конфигурируем его: GET-запрос на URL 'phones.json'
      xhr.open('GET', 'phones.json', true);

      // 3. Отсылаем запрос
      xhr.send();

      xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;

        button.innerHTML = 'Готово!';

        // 4. Если код ответа сервера не 200, то это ошибка
        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (xhr.status != 200) {
          // обработать ошибку
          alert( 'ошибка: ' + this.status + 'запрос не удался');
          return;
        } else {
          // получить результат из this.responseText или this.responseXML
          // вывести результат
          //alert(xhr.responseText);
          USER_FILE = xhr.responseText;
          
          alreadyrunflag = 1;
          VanillaRunOnDomReady();
        }

      }

      button.innerHTML = 'Загружаю...';
      button.disabled = true;

  }

 </script>
<button onclick="loadPhones()" id="button">Загрузить phones.json!</button>
</body>

</html>
```
app09

package.json
```
{
  "name" : "blog",
  "version" : "0.0.1",
  "description" : "My minimalistic blog",
  "dependencies" : {
    "mime" : "~1.2.7"
  }
}
```
server.js
```
var http = require('http');

var fs = require('fs');
var url = require('url');

var path = require("path");
var mime = require("mime");

function start() {

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  // response.writeHead(200, {"Content-type" : "text/plain"});
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = "www/index.html";
  } else {
    filePath = "www" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
});


function onRequest(request, response) {
    console.log("Request received from maim app."); //наш callback
    
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
   
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

      var filePath = false;

      if (request.url == '/') {
        filePath = "www/index.html";
      } else {
        filePath = "www" + request.url;
      }

      var absPath = "./" + filePath;
      serverWorking(response, absPath);

  }

  http.createServer(onRequest).listen(8888);
  
  // Console will print the message
  console.log('Server running at http://127.0.0.1:8888/');

}

exports.start = start;

```
app.js
```
var server = require("./server");

server.start();
```
## app10
How to GET and POST in node.js
```
    <div id="content">
           
    <h2>How to GET and POST in node.js</h2>

    <form method="post" action="/">
        <textarea name="text" id="textbox">Enter text here that will be sent to the server using the POST method.</textarea>
        <br />
        <input type="submit" id="submit" name="submit" value="SUBMIT" />
    </form>
            
    </div>
```
server.js
```
var http = require('http');

var fs = require('fs');
var url = require('url');

var path = require("path");
var mime = require("mime");

var qs = require('qs'); // querystring parser

function start() {

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  // response.writeHead(200, {"Content-type" : "text/plain"});
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {

  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {


  var filePath = false;

  if (request.url == '/') {
    filePath = "www/index.html";
  } else {
    filePath = "www" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
});


function onRequest(request, response) {

   console.log("Request received from maim app."); //наш callback
    
    // Parse the request containing file name
    var pathname = url.parse(request.url).pathname;
   
    // Print the name of the file for which request is made.
    console.log("Request for " + pathname + " received.");

  // store the contents of 'index.html' to a buffer
  var html = fs.readFileSync('www/index.html');

    // handle the routes
  if (request.method == 'POST') {

    // pipe the request data to the console
    request.pipe(process.stdout);

    // pipe the request data to the response to view on the web
    response.writeHead(200, {'Content-Type': 'text/plain'});
    request.pipe(response);

  } else {
    
    // for GET requests, serve up the contents in 'index.html'
    
      var filePath = false;

      if (request.url == '/') {
        filePath = "www/index.html";
      } else {
        filePath = "www" + request.url;
      }

      var absPath = "./" + filePath;
      serverWorking(response, absPath);
    }

  }

  http.createServer(onRequest).listen(8888);
  
  // Console will print the message
  console.log('Server running at http://127.0.0.1:8888/');

}

exports.start = start;

```
## app11

## Событие readystatechange

Событие readystatechange происходит несколько раз в процессе отсылки и получения ответа. При этом можно посмотреть «текущее состояние запроса» в свойстве xhr.readyState.

## Все состояния, по спецификации:
```
const unsigned short UNSENT = 0; // начальное состояние
const unsigned short OPENED = 1; // вызван open
const unsigned short HEADERS_RECEIVED = 2; // получены заголовки
const unsigned short LOADING = 3; // загружается тело (получен очередной пакет данных)
const unsigned short DONE = 4; // запрос завершён

```
## POST
```
function startAjax(url){
  var request; 
  if(window.XMLHttpRequest){ 
      request = new XMLHttpRequest(); 
  } else if(window.ActiveXObject){ 
      request = new ActiveXObject("Microsoft.XMLHTTP");  
  } else { 
      return; 
  } 
  
  request.onreadystatechange = function(){
    switch (request.readyState) {
      case 1: print_console("<br/><em>1: вызван open...</em>"); break
      case 2: print_console("<br/><em>2: получены заголовки...</em>"); break
      case 3: print_console("<br/><em>3: загружается тело..</em>"); break
      case 4:{
       if(request.status==200){   
            print_console("<br/><em>4: запрос завершён</em>"); 
            document.getElementById("printResult").innerHTML = "<b>"+request.responseText+"</b>"; 
           }else if(request.status==404){
            alert("HTTP Status: 404 : NOT FOUND!");
           }
            else alert("текущее состояние запроса: "+ request.status);
       
      break
      }
    }   
    } 
  //request.open("GET",url+"?a1=1&a2=2",true);
  request.open("POST",url,true);
  request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  request.send("param1=1&param2=2");
  } 
  function print_console(text){
    document.getElementById("console").innerHTML += text; 
  }


<a href="#" onclick="startAjax('/');">Post Ajax</a>  
<div id="console" style="border: 1px solid gray; width:250px; height: 110px; padding: 10px; background:lightgray;">
Cosole log panel
</div>
<br/>
<div id="printResult">
print result
</div>

```

##

```
## app12
Оставьте ваш комментарий
```
function XmlHttp()
{
var xmlhttp;
try{xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");}
catch(e)
{
 try {xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");} 
 catch (E) {xmlhttp = false;}
}
if (!xmlhttp && typeof XMLHttpRequest!='undefined')
{
 xmlhttp = new XMLHttpRequest();
}
  return xmlhttp;
}
 
function ajax(param)
{
 if (window.XMLHttpRequest) req = new XmlHttp();
   method=(!param.method ? "POST" : param.method.toUpperCase());

  if(method=="GET")
    {
      send=null;
      param.url=param.url+"&ajax=true";
    }
    else
     {
      send="";
      for (var i in param.data) send+= i+"="+param.data[i]+"&";
     // send=send+"ajax=true"; // если хотите передать сообщение об успехе
     }
 
                req.open(method, param.url, true);
                if(param.statbox)document.getElementById(param.statbox).innerHTML = '<img src="www/wait.gif">';
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                req.send(send);
                req.onreadystatechange = function()
                {
                  if (req.readyState == 4 && req.status == 200) //если ответ положительный
                     {
                       if(param.success)param.success(req.responseText);
                     }
                }
  }

    </head>
    <body>
        <div id="header">
            <span>My Simple Blog</span>
            <ul id="menu">
                <li><a class="article" href="hode.html">Comments</a></li>
                <li><a href=getpost.html class="article">Get/Post</a></li>
                <li><a href=ajax.html class="article">Ajax</a></li>
                <li><a href=table.html class="article">Table</a></li>
            </ul>
        </div>
        <div id="content">
        <div id="status" style="width:470px;background:#fff;padding:20px 10px 20px 10px;border:solid 5px #D1D1D1;font: 13 Arial;">
            Ни одного комментария пока нет.
        </div>
      <form action="/">
      <p><b>Оставьте ваш комментарий</b></p>
      <p><textarea id="area_1" name="area_1" style="height:50px; width:500px;padding:10px;font: 13 Arial;">Введите имя</textarea></p>
      <p><textarea id="area_2" name="area_1" style="height:100px; width:500px;padding:10px;font: 13 Arial;">Текст сообщения</textarea></p>
      <input type='button' value='Сохранить комментарий' onclick='
            ajax({
                  url:"/",
                  statbox:"status",
                  method:"POST",
                  data:
                 {                                                          first_area:document.getElementById("area_1").value,
                  second_area:document.getElementById("area_2").value
                 },
                 success:function(data){document.getElementById("status").innerHTML=data;}

                 })'
                >
                </form>
        </div>
```






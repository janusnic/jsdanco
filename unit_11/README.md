# jsdanco
# AngularJS Expressions
basic.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="" ng-init="firstName='John'; lastName='Doe'; person={firstName:'Marry',lastName:'Ann'}; quantity=1; cost=5; points=[1,15,19,2,40]">

<p>The name is <span ng-bind="firstName"></span></p>
<p>The Last Name <span>{{lastName}}</span></p>

First Name: <input type="text" ng-model="firstName"><br>
Last Name: <input type="text" ng-model="lastName"><br>
<br>
<p>The full name is: {{ firstName + " " + lastName }}</p>

<p>The full name is: <span ng-bind="firstName + ' ' + lastName"></span></p>

<p>The name is {{ person.lastName }}</p>
<p>The full name is: {{ person.firstName + " " + person.lastName }}</p>
<p>My first expression: {{ 5 + 5 }}</p>
<p>Total in dollar: {{ quantity * cost }}</p>
<p>The third result is {{ points[2] }}</p>
<p>The third result is <span ng-bind="points[2]"></span></p>
</div>

</body>
</html>

```

# AngularJS Directives
directive.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div data-ng-app="" data-ng-init="firstName='John'; quantity=1;price=5;names=['Jani','Hege','Kai'];mnames=[
{name:'Jani',country:'Norway'},
{name:'Hege',country:'Sweden'},
{name:'Kai',country:'Denmark'}]">

<p>Input something in the input box:</p>
<p>Name: <input type="text" ng-model="firstName"></p>
<p>You wrote: {{ firstName }}</p>

<h2>Cost Calculator</h2>

Quantity: <input type="number" ng-model="quantity">
Price: <input type="number" ng-model="price">

<p><b>Total in dollar:</b> {{quantity * price}}</p>

<p>Looping with ng-repeat:</p>
  <ul>
    <li data-ng-repeat="x in names">
      {{ x }}
    </li>
  </ul>

<p>Looping with objects:</p>
<ul>
  <li ng-repeat="x in mnames">
  {{ x.name + ', ' + x.country }}</li>
</ul>
</div>

</body>
</html>


```
# AngularJS Controllers
ctrl.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp">

<div ng-controller="myCtrl">

<p>Try to change the names. controller 1</p>

First Name: <input type="text" ng-model="firstName"><br>
Last Name: <input type="text" ng-model="lastName"><br>
<br>
Full Name: {{firstName + " " + lastName}}

</div>

<p>Try to change the names. controller 2</p>
<div ng-controller="personCtrl">

First Name: <input type="text" ng-model="firstName"><br>
Last Name: <input type="text" ng-model="lastName"><br>
<br>
Full Name: {{fullName()}}

</div>

<p>Try to change the names. controller 3</p>
<div ng-controller="personsCtrl">

First Name: <input type="text" ng-model="person.firstName"><br>
Last Name: <input type="text" ng-model="person.lastName"><br>
<br>
Full Name: {{fullName()}}

</div>


</div>


<script>
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
});

app.controller('personCtrl', function($scope) {
    $scope.firstName = "John";
    $scope.lastName = "Doe";
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
});

app.controller("personsCtrl",function($scope) {
    $scope.person = {
        firstName: "John",
        lastName: "Doe",
    };
    $scope.fullName = function() {
        var x = $scope.person;  
        return x.firstName + " " + x.lastName;
    }
});

</script>



</body>

</html>

```
ctrl4.html

```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp">
<p>Try to change the names. controller 4</p>
<div ng-controller="namesCtrl"> 

<ul>
  <li ng-repeat="x in names">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

</div>

</div>

<script src="namesController.js"></script>


</body>

</html>


angular.module('myApp', []).controller('namesCtrl', function($scope) {
    $scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Hege',country:'Sweden'},
        {name:'Kai',country:'Denmark'}
    ];
});
```

# AngularJS Filters
filter.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="personCtrl">

<p>The name is {{ lastName | uppercase }}</p>

</div>

<script src="personController.js"></script>

</body>
</html>

```
personController.js
```
angular.module('myApp', []).controller('personCtrl', function($scope) {
    $scope.firstName = "John",
    $scope.lastName = "Doe",
    $scope.fullName = function() {
        return $scope.firstName + " " + $scope.lastName;
    }
});
```

filter1.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>
<div ng-app="myApp">

<div ng-controller="costCtrl">

Quantity: <input type="number" ng-model="quantity">
Price: <input type="number" ng-model="price">

<p>Total = {{ (quantity * price) | currency }}</p>

</div>
</div>

<script>
var app = angular.module('myApp', []);
app.controller('costCtrl', function($scope) {
    $scope.quantity = 1;
    $scope.price = 9.99;
});
</script>

</body>
</html>

```

filter2.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="namesCtrl">

<p>Looping with objects:</p>
<ul>
  <li ng-repeat="x in names | orderBy:'country'">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

</div>

<script src="namesController.js"></script>

</body>
</html>

```
Filtering input:
```
<p>Filtering input:</p>

<p><input type="text" ng-model="test"></p>

<ul>
  <li ng-repeat="x in names | filter:test | orderBy:'country'">
    {{ (x.name | uppercase) + ', ' + x.country }}
  </li>
</ul>

```

php1.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<ul>
  <li ng-repeat="x in names">
    {{ x.Name + ', ' + x.Country }}
  </li>
</ul>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
  $http.get("./customers.json")
  .success(function (response) {$scope.names = response.records;});
});
</script>

</body>
</html>

```

php2.html
```
<!DOCTYPE html>
<html>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("./customers.json")
    .success(function (response) {$scope.names = response.records;});
});
</script>

</body>
</html>

```

php3.html
```
<!DOCTYPE html>
<html>
<style>
table, th , td  {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
}
table tr:nth-child(odd) {
  background-color: #f1f1f1;
}
table tr:nth-child(even) {
  background-color: #ffffff;
}
</style>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("./customers.json")
    .success(function (response) {$scope.names = response.records;});
});
</script>

</body>
</html>

```
Order - php4.html
```
<!DOCTYPE html>
<html>
<style>
table, th , td  {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
}
table tr:nth-child(odd) {
  background-color: #f1f1f1;
}
table tr:nth-child(even) {
  background-color: #ffffff;
}
</style>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<table>
  <tr ng-repeat="x in names | orderBy : 'Country'">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country }}</td>
  </tr>
</table>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("./customers.json")
    .success(function (response) {$scope.names = response.records;});
});
</script>

</body>
</html>

```

Filter- php5.html
```
<!DOCTYPE html>
<html>
<style>
table, th , td  {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
}
table tr:nth-child(odd) {
  background-color: #f1f1f1;
}
table tr:nth-child(even) {
  background-color: #ffffff;
}
</style>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<table>
  <tr ng-repeat="x in names">
    <td>{{ x.Name }}</td>
    <td>{{ x.Country | uppercase }}</td>
  </tr>
</table>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("./customers.jsom")
    .success(function (response) {$scope.names = response.records;});
});
</script>

</body>
</html>

```
Zebra - php6.html
```
<!DOCTYPE html>
<html>
<style>
table, td  {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
}
</style>
<script src= "http://ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js"></script>
<body>

<div ng-app="myApp" ng-controller="customersCtrl"> 

<table>
  <tr ng-repeat="x in names">
    <td ng-if="$odd" style="background-color:#f10000">
    {{ x.Name }}</td>
    <td ng-if="$even">
    {{ x.Name }}</td>
    <td ng-if="$odd" style="background-color:#f10000">
    {{ x.Country }}</td>
    <td ng-if="$even">
    {{ x.Country }}</td>
  </tr>
</table>

</div>

<script>
var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $http.get("./customers.json")
    .success(function (response) {$scope.names = response.records;});
});
</script>

</body>
</html>

```
example/navigations
```
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8"/>
        <title>Learn AngularJS - Navigation Menu</title>

        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />

        <!-- The main CSS file -->
        <link href="style.css" rel="stylesheet" />

        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>

    <!-- The ng-app directive tells angular that the code below should be evaluated -->

    <body ng-app>

        <!-- The navigation menu will get the value of the "active" variable as a class.
             The $event.preventDefault() stops the page from jumping when a link is clicked. -->

        <nav class="{{active}}" ng-click="$event.preventDefault()">

            <!-- When a link in the menu is clicked, we set the active variable -->

            <a href="#" class="home" ng-click="active='home'">Home</a>
            <a href="#" class="projects" ng-click="active='projects'">Projects</a>
            <a href="#" class="services" ng-click="active='services'">Services</a>
            <a href="#" class="contact" ng-click="active='contact'">Contact</a>
        </nav>

        <!-- ng-show will show an element if the value in the quotes is truthful,
             while ng-hide does the opposite. Because the active variable is not set
             initially, this will cause the first paragraph to be visible. -->

        <p ng-hide="active">Please click a menu item</p>
        <p ng-show="active">You chose <b>{{active}}</b></p>

        <!-- Include AngularJS from Google's CDN -->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    </body>
</html>

```

example/edit

```

<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8"/>
        <title>Learn AngularJS - Inline Editor</title>

        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" />

        <!-- The main CSS file -->
        <link href="style.css" rel="stylesheet" />

        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>

    <!-- Notice the controller directive -->
    <body ng-app ng-controller="InlineEditorController">

        <!-- When this element is clicked, hide the tooltip -->
        <div id="main" ng-click="hideTooltip()">

            <!-- This is the tooltip. It is shown only when the showtooltip variable is truthful -->
            <div class="tooltip" ng-click="$event.stopPropagation()" ng-show="showtooltip">

                <!-- ng-model binds the contents of the text field with the "value" model.
                     Any changes to the text field will automatically update the value, and
                     all other bindings on the page that depend on it.  -->

                <input type="text" ng-model="value" />
            </div>

            <!-- Call a method defined in the InlineEditorController that toggles
             the showtooltip varaible -->
            <p ng-click="toggleTooltip($event)">{{value}}</p>

        </div>

        <!-- Include AngularJS from Google's CDN -->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
        <script src="script.js"></script>
    </body>
</html>

// The controller is a regular JavaScript function. It is called
// once when AngularJS runs into the ng-controller declaration.

function InlineEditorController($scope){

    // $scope is a special object that makes
    // its properties available to the view as
    // variables. Here we set some default values:

    $scope.showtooltip = false;
    $scope.value = 'Edit me.';

    // Some helper functions that will be
    // available in the angular declarations

    $scope.hideTooltip = function(){

        // When a model is changed, the view will be automatically
        // updated by by AngularJS. In this case it will hide the tooltip.

        $scope.showtooltip = false;
    }

    $scope.toggleTooltip = function(e){
        e.stopPropagation();
        $scope.showtooltip = !$scope.showtooltip;
    }
}

```
Instant Search

```
<!DOCTYPE html>
<html>

    <head>
        <meta charset="utf-8"/>
        <title>Learn AngularJS - Instant Search</title>

        <link href="http://fonts.googleapis.com/css?family=Cookie|Open+Sans:400,700" rel="stylesheet" />

        <!-- The main CSS file -->
        <link href="style.css" rel="stylesheet" />

        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    </head>

    <!-- Initialize a new AngularJS app and associate it with a module named "instantSearch"-->
    <body ng-app="instantSearch" ng-controller="InstantSearchController">

        <div class="bar">
            <!-- Create a binding between the searchString model and the text field -->
            <input type="text" ng-model="searchString" placeholder="Enter your search terms" />
        </div>

        <ul>
            <!-- Render a li element for every entry in the items array. Notice
                 the custom search filter "searchFor". It takes the value of the
                 searchString model as an argument.
             -->
            <li ng-repeat="i in items | searchFor:searchString">
                <a href="{{i.url}}"><img ng-src="{{i.image}}" /></a>
                <p>{{i.title}}</p>
            </li>
        </ul>

        <!-- Include AngularJS from Google's CDN -->
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
        <script src="script.js"></script>
    </body>
</html>

// Define a new module for our app
var app = angular.module("instantSearch", []);

// Create the instant search filter

app.filter('searchFor', function(){

    // All filters must return a function. The first parameter
    // is the data that is to be filtered, and the second is an
    // argument that may be passed with a colon (searchFor:searchString)

    return function(arr, searchString){

        if(!searchString){
            return arr;
        }

        var result = [];

        searchString = searchString.toLowerCase();

        // Using the forEach helper method to loop through the array
        angular.forEach(arr, function(item){

            if(item.title.toLowerCase().indexOf(searchString) !== -1){
                result.push(item);
            }

        });

        return result;
    };

});

// The controller

function InstantSearchController($scope){

    // The data model. These items would normally be requested via AJAX,
    // but are hardcoded here for simplicity. See the next example for
    // tips on using AJAX.

    $scope.items = [
        {
            url: 'http://tutorialzine.com/2013/07/50-must-have-plugins-for-extending-twitter-bootstrap/',
            title: '50 Must-have plugins for extending Twitter Bootstrap',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/07/featured_4-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/08/simple-registration-system-php-mysql/',
            title: 'Making a Super Simple Registration System With PHP and MySQL',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/simple_registration_system-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/08/slideout-footer-css/',
            title: 'Create a slide-out footer with this neat z-index trick',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/08/slide-out-footer-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/06/digital-clock/',
            title: 'How to Make a Digital Clock with jQuery and CSS3',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/06/digital_clock-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/05/diagonal-fade-gallery/',
            title: 'Smooth Diagonal Fade Gallery with CSS3 Transitions',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/featured-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/05/mini-ajax-file-upload-form/',
            title: 'Mini AJAX File Upload Form',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/05/ajax-file-upload-form-100x100.jpg'
        },
        {
            url: 'http://tutorialzine.com/2013/04/services-chooser-backbone-js/',
            title: 'Your First Backbone.js App – Service Chooser',
            image: 'http://cdn.tutorialzine.com/wp-content/uploads/2013/04/service_chooser_form-100x100.jpg'
        }
    ];


}


```
Order Form 

```
<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8"/>
    <title>Learn AngularJS - Order Form</title>

    <link href="http://fonts.googleapis.com/css?family=Cookie|Open+Sans:400,700" rel="stylesheet" />

    <!-- The main CSS file -->
    <link href="style.css" rel="stylesheet" />

    <!--[if lt IE 9]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <!-- Declare a new AngularJS app and associate the controller -->
  <body ng-app ng-controller="OrderFormController">

    <form>

      <h1>Services</h1>

      <ul>
        <!-- Loop through the services array, assign a click handler, and set or
          remove the "active" css class if needed -->
        <li ng-repeat="service in services" ng-click="toggleActive(service)" ng-class="{active:service.active}">
          <!-- Notice the use of the currency filter, it will format the price -->
          {{service.name}} <span>{{service.price | currency}}</span>
        </li>
      </ul>

      <div class="total">
        <!-- Calculate the total price of all chosen services. Format it as currency. -->
        Total: <span>{{total() | currency}}</span>
      </div>

    </form>

    <!-- Include AngularJS from Google's CDN -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>

function OrderFormController($scope){

  // Define the model properties. The view will loop
  // through the services array and genreate a li
  // element for every one of its items.

  $scope.services = [
    {
      name: 'Web Development',
      price: 300,
      active:true
    },{
      name: 'Design',
      price: 400,
      active:false
    },{
      name: 'Integration',
      price: 250,
      active:false
    },{
      name: 'Training',
      price: 220,
      active:false
    }
  ];

  $scope.toggleActive = function(s){
    s.active = !s.active;
  };

  // Helper method for calculating the total price

  $scope.total = function(){

    var total = 0;

    // Use the angular forEach helper method to
    // loop through the services array:

    angular.forEach($scope.services, function(s){
      if (s.active){
        total+= s.price;
      }
    });

    return total;
  };
}


```
Switchable Grid
```
<!DOCTYPE html>
<html>

  <head>
    <meta charset="utf-8"/>
    <title>Learn AngularJS - Switchable Grid</title>

    <link href="http://fonts.googleapis.com/css?family=Cookie|Open+Sans:400,700" rel="stylesheet" />

    <!-- The main CSS file -->
    <link href="style.css" rel="stylesheet" />

    <!--[if lt IE 9]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
  </head>

  <body ng-app="switchableGrid" ng-controller="SwitchableGridController">

    <div class="bar">

      <!-- These two buttons switch the layout varaible,
         which causes the correct UL to be shown. -->

      <a href="#" class="list-icon" ng-class="{active: layout == 'list'}" ng-click="layout = 'list'"></a>
      <a href="#" class="grid-icon" ng-class="{active: layout == 'grid'}" ng-click="layout = 'grid'"></a>
    </div>

    <!-- We have two layouts. We choose which one to show depending on the "layout" binding -->

    <ul ng-show="layout == 'grid'" class="grid">
      <!-- A view with big photos and no text -->
      <li ng-repeat="p in pics">
        <a href="{{p.link}}" target="_blank"><img ng-src="{{p.images.low_resolution.url}}" /></a>
      </li>
    </ul>

    <ul ng-show="layout == 'list'" class="list">
      <!-- A compact view smaller photos and titles -->
      <li ng-repeat="p in pics">
        <a href="{{p.link}}" target="_blank"><img ng-src="{{p.images.thumbnail.url}}" /></a>
        <p>{{p.caption.text}}</p>
      </li>
    </ul>

    <!-- Include AngularJS from Google's CDN and the resource module -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular-resource.min.js"></script>
    <script src="script.js"></script>
  </body>
</html>

// Define a new module. This time we declare a dependency on
// the ngResource module, so we can work with the Instagram API

var app = angular.module("switchableGrid", ['ngResource']);

// Create and register the new "instagram" service
app.factory('instagram', function($resource){

  return {
    fetchPopular: function(callback){

      // The ngResource module gives us the $resource service. It makes working with
      // AJAX easy. Here I am using a client_id of a test app. Replace it with yours.

      var api = $resource('https://api.instagram.com/v1/media/popular?client_id=:client_id&callback=JSON_CALLBACK',{
        client_id: '642176ece1e7445e99244cec26f4de1f'
      },{
        // This creates an action which we've chosen to name "fetch". It issues
        // an JSONP request to the URL of the resource. JSONP requires that the
        // callback=JSON_CALLBACK part is added to the URL.

        fetch:{method:'JSONP'}
      });

      api.fetch(function(response){

        // Call the supplied callback function
        callback(response.data);

      });
    }
  }

});

// The controller. Notice that I've included our instagram service which we
// defined below. It will be available inside the function automatically.

function SwitchableGridController($scope, instagram){

  // Default layout of the app. Clicking the buttons in the toolbar
  // changes this value.

  $scope.layout = 'grid';

  $scope.pics = [];

  // Use the instagram service and fetch a list of the popular pics
  instagram.fetchPopular(function(data){

    // Assigning the pics array will cause the view
    // to be automatically redrawn by Angular.
    $scope.pics = data;
  });

}


```
# jsdanco

## Table Sort

### TABLE | THEAD | TFOOT | TBODY

0.html

```
<head>
<title>Traversing an HTML Table with JavaScript and DOM Interfaces</title>
<script>
    function start() {
        // get the reference for the body
        var mybody = document.getElementsByTagName("body")[0];

        // creates <table> and <tbody> elements
        mytable     = document.createElement("table");
        mytablebody = document.createElement("tbody");
        mytablehead = document.createElement("thead");
        mytablefoot = document.createElement("tfoot");

        // creating all cells
        for(var j = 0; j < 2; j++) {
            // creates a <tr> element
            mycurrent_row = document.createElement("tr");

            for(var i = 0; i < 2; i++) {
                // creates a <td> element
                mycurrent_cell = document.createElement("td");
                // creates a Text Node
                currenttext = document.createTextNode("cell is row " + j + ", column " + i);
                // appends the Text Node we created into the cell <td>
                mycurrent_cell.appendChild(currenttext);
                // appends the cell <td> into the row <tr>
                mycurrent_row.appendChild(mycurrent_cell);
            }
            // appends the row <tr> into <tbody>
            mytablebody.appendChild(mycurrent_row);
        }

        // appends <tbody> into <table>
        mytable.appendChild(mytablehead);
        mytable.appendChild(mytablebody);
        mytable.appendChild(mytablefoot);
        
        // appends <table> into <body>
        mybody.appendChild(mytable);
        // sets the border attribute of mytable to 2;
        mytable.setAttribute("border","2");
    }
</script>
</head>
<body onload="start()">
</body>
</html>
```
### id: myTable myTHead myTFoot myTBody

1.html
```
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>Traversing an HTML Table with JavaScript and DOM Interfaces</title>
      
  <link rel="stylesheet" type="text/css" href="../css/normalize.css">

<script>
    function start() {
        // get the reference for the body
        var mybody = document.getElementsByTagName("body")[0];

        // creates <table> and <tbody> elements
        mytable     = document.createElement("table");
        mytablebody = document.createElement("tbody");
        mytablehead = document.createElement("thead");
        mytablefoot = document.createElement("tfoot");

        // creating all cells
        // creates a <tr> element
        mycurrent_row = document.createElement("tr");
        for(var i = 0; i < 2; i++) {
                // creates a <th> element
                mycurrent_cell = document.createElement("th");
                // creates a Text Node
                currenttext = document.createTextNode("Header " + i);
                // appends the Text Node we created into the cell <td>
                mycurrent_cell.appendChild(currenttext);
                // appends the cell <td> into the row <tr>
                mycurrent_row.appendChild(mycurrent_cell);
            }
            // appends the row <tr> into <tbody>
            mytablehead.appendChild(mycurrent_row);
            mytablehead.setAttribute("border","2");
            mytablehead.setAttribute("id","myTHead");

            mycurrent_row = document.createElement("tr");
            for(var i = 0; i < 2; i++) {
                // creates a <th> element
                mycurrent_cell = document.createElement("td");
                // creates a Text Node
                currenttext = document.createTextNode("Footer " + i);
                // appends the Text Node we created into the cell <td>
                mycurrent_cell.appendChild(currenttext);
                // appends the cell <td> into the row <tr>
                mycurrent_row.appendChild(mycurrent_cell);
            }
            // appends the row <tr> into <tbody>
            mytablefoot.appendChild(mycurrent_row);
            mytablefoot.setAttribute("border","2");
            mytablefoot.setAttribute("id","myTFoot");


        // creating all cells
        for(var j = 0; j < 2; j++) {
            // creates a <tr> element
            mycurrent_row = document.createElement("tr");

            for(var i = 0; i < 2; i++) {
                // creates a <td> element
                mycurrent_cell = document.createElement("td");
                // creates a Text Node
                currenttext = document.createTextNode("cell is row " + j + ", column " + i);
                // appends the Text Node we created into the cell <td>
                mycurrent_cell.appendChild(currenttext);
                // appends the cell <td> into the row <tr>
                mycurrent_row.appendChild(mycurrent_cell);
            }
            // appends the row <tr> into <tbody>
            mytablebody.appendChild(mycurrent_row);
        }
        mytablebody.setAttribute("id","myTBody");

        // appends <tbody> into <table>
        mytable.appendChild(mytablehead);
        mytable.appendChild(mytablebody);
        mytable.appendChild(mytablefoot);

        // appends <table> into <body>
        mybody.appendChild(mytable);
        // sets the border attribute of mytable to 2;
        mytable.setAttribute("border","2");
        mytable.setAttribute("id","myTable");
    }
</script>
</head>
<body onload="start()">

</body>
</html>

```
### test
```
        var tableEl = document.getElementById("myTable");
        var theadEl = document.getElementById("myTHead");
        var tfootEl = document.getElementById("myTFoot");
        var tbodyEl = document.getElementById("myTBody");

        console.log(tableEl.getAttribute("border"));
        console.log(theadEl.rows.length);
        console.log(tfootEl.rows.length);
        console.log(tbodyEl.rows.length);
```
2.html

```
        var tableEl = document.getElementById("myTable");
        var theadEl = document.getElementById("myTHead");
        var tfootEl = document.getElementById("myTFoot");
        var tbodyEl = document.getElementById("myTBody");

        var i, j;

        for (i = 0; i < tableEl.rows.length; i++)
          for (j = 0; j < tableEl.rows[i].cells.length; j++)
            console.log("rows[" + i + "].cells[" + j + "] = "
              + tableEl.rows[i].cells[j].firstChild.nodeValue);

            }
```

## Sort
```
     <th style="text-align:left">
        <a href="" onclick="return sortTable(0)">Header 0</a>
      </th>
      <th style="text-align:center">
        <a href="" onclick="return sortTable(1)">Header 1</a>
      </th>
```
3.html
```
function sortTable(i){
      //console.log(i);
      return i;
    }

mycurrent_row = document.createElement("tr");
        for(var i = 0; i < 2; i++) {
                // creates a <th> element
                mycurrent_cell = document.createElement("th");
                                
                var s = '<b>Header'+i+'</b>'; // HTML string
                var a = document.createElement('a');
                a.innerHTML = s;
                a.setAttribute("href","#");
                var sa = "return sortTable("+i+")";
                a.setAttribute("onclick",sa);

                mycurrent_cell.appendChild(a);
                
                mycurrent_row.appendChild(mycurrent_cell);
            }
```

4.html
```
function sortTable(tbody, col, asc) {
            var rows = tbody.rows,
                rlen = rows.length,
                arr = new Array(),
                i, j, cells, clen;
            // fill the array with values from the table
            for (i = 0; i < rlen; i++) {
                cells = rows[i].cells;
                clen = cells.length;
                arr[i] = new Array();
                for (j = 0; j < clen; j++) {
                    arr[i][j] = cells[j].innerHTML;
                }
            }
            // sort the array by the specified column number (col) and order (asc)
            arr.sort(function (a, b) {
                return (a[col] == b[col]) ? 0 : ((a[col] > b[col]) ? asc : -1 * asc);
            });
            // replace existing rows with new rows created from the sorted array
            for (i = 0; i < rlen; i++) {
                rows[i].innerHTML = "<td>" + arr[i].join("</td><td>") + "</td>";
            }
        }
```


            for(var i = 0; i < 2; i++) {
                // creates a <th> element
                mycurrent_cell = document.createElement("th");
                
                var s = '<b>Header'+i+'</b>'; // HTML string
                var a = document.createElement('a');
                a.innerHTML = s;
                a.setAttribute("href","#");
                var asc[i] = 1;
                var sa = "return sortTable("+tbody, i, asc[i]+"); for (var j=0; j<2; j++){asc[j] = 1;} asc[i] *=-1;";
                a.setAttribute("onclick",sa);
                mycurrent_cell.appendChild(a);
               
                mycurrent_row.appendChild(mycurrent_cell);
            }

```

## Dynamically generate HTML table using JavaScript
```
function addRow() {
         
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= age.value;

}

function deleteRow(obj) {
     
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}

function addTable() {
     
    var myTableDiv = document.getElementById("myDynamicTable");
     
    var table = document.createElement('TABLE');
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var i=0; i<3; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<4; j++){
           var td = document.createElement('TD');
           td.width='75';
           td.appendChild(document.createTextNode("Cell " + i + "," + j));
           tr.appendChild(td);
       }
    }
    myTableDiv.appendChild(table);
    
}

function load() {
    
    console.log("Page load finished");
    if (typeof(Storage) == "undefined" ) {
            alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    } 
    else {
        console.log("Both localStorage and sessionStorage support is there.");
    }
}
```

create_form.html
```
<script>
function addRow() {
         
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= age.value;

}

function deleteRow(obj) {
     
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}

function addTable() {
     
    var myTableDiv = document.getElementById("myDynamicTable");
     
    var table = document.createElement('TABLE');
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var i=0; i<3; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<4; j++){
           var td = document.createElement('TD');
           td.width='75';
           td.appendChild(document.createTextNode("Cell " + i + "," + j));
           tr.appendChild(td);
       }
    }
    myTableDiv.appendChild(table);
    
}

function load() {
    
    console.log("Page load finished");
    if (typeof(Storage) == "undefined" ) {
            alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    } 
    else {
        console.log("Both localStorage and sessionStorage support is there.");
    }
}
</script>
</head>

<body>

<div class="clear"></div>

<div id="myContent">
<h1>
        Dynamically generate HTML table using JavaScript
</h1>
<h2>
    HTML Dynamic TABLE using JavaScript
</h2>
</div>                                  
<div id="myExample">
    <div id="myform">
    <b>Simple form with name and age ...</b>
    <table>
        <tr>
            <td>Name:</td>
            <td><input type="text" id="name"></td>
        </tr>
        <tr>
            <td>Age:</td>
            <td><input type="text" id="age">
            <input type="button" id="add" value="Add" onclick="Javascript:addRow()"></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
        </tr>
    </table>
    </div>
    <div id="mydata">
    <b>Current data in the system ...</b>
    <table id="myTableData"  border="1" cellpadding="2">
        <tr>
            <td>&nbsp;</td>
            <td><b>Name</b></td>
            <td><b>Age</b></td>
        </tr>
    </table>
    &nbsp;<br/>
    </div>

```
create1.html
```
    
<!DOCTYPE html>
<html>

<head>

<title>Programmers sample</title>
<link href="../css/master.css" rel="stylesheet" type="text/css" />

<script>
function addRow() {
         
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= age.value;

}

function deleteRow(obj) {
     
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}

function addTable() {
     
    var myTableDiv = document.getElementById("myDynamicTable");
     
    var table = document.createElement('TABLE');
    table.border='1';
    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var i=0; i<3; i++){
       var tr = document.createElement('TR');
       tableBody.appendChild(tr);
       
       for (var j=0; j<4; j++){
           var td = document.createElement('TD');
           td.width='75';
           td.appendChild(document.createTextNode("Cell " + i + "," + j));
           tr.appendChild(td);
       }
    }
    myTableDiv.appendChild(table);
    
}

function load() {
    
    console.log("Page load finished");
    if (typeof(Storage) == "undefined" ) {
            alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    } 
    else {
        console.log("Both localStorage and sessionStorage support is there.");
    }
}
</script>
</head>

<body>

<div class="clear"></div>

<div id="myContent">
<h1>
        Dynamically generate HTML table using JavaScript
</h1>
<h2>
    HTML Dynamic TABLE using JavaScript
</h2>
</div>                                  
<div id="myExample">
    <div id="myDynamicTable">
    <input type="button" id="create" value="Click here" onclick="Javascript:addTable()">
    to create a Table and add some data using JavaScript
    </div>
</div> 
 
<script>
 addTable();
 mybody = document.getElementsByTagName("body")[0];
    
 mytable = mybody.getElementsByTagName("table")[0];
 console.log(mytable);
 mytable.setAttribute("id",'myTable');
 console.log(mytable.getAttribute("id"));
 console.log(mytable.getAttribute("border"));

</script>

```
create_sort

```
    
<!DOCTYPE html>
<html>

<head>

<title>Programmers sample</title>
<link href="../css/master.css" rel="stylesheet" type="text/css" />

    <style>


        table {
            text-align: left;
            font-size: 12px;
            font-family: verdana;
            background: #c0c0c0;
        }

 


        table thead  {
            cursor: pointer;
        }


        table thead tr,

        table tfoot tr {


            background: #c0c0c0;


        }

 


        table tbody tr {


            background: #f0f0f0;


        }


        td, th {
            border: 1px solid white;
        }

    </style>


<script>
/**
*
*  Sortable HTML table
*
**/
 
function SortableTable (tableEl) {
 
    this.tbody = tableEl.getElementsByTagName('tbody');
    this.thead = tableEl.getElementsByTagName('thead');
    this.tfoot = tableEl.getElementsByTagName('tfoot');
 
    this.getInnerText = function (el) {
        if (typeof(el.textContent) != 'undefined') return el.textContent;
        if (typeof(el.innerText) != 'undefined') return el.innerText;
        if (typeof(el.innerHTML) == 'string') return el.innerHTML.replace(/<[^<>]+>/g,'');
    }
 
    this.getParent = function (el, pTagName) {
        if (el == null) return null;
        else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())
            return el;
        else
            return this.getParent(el.parentNode, pTagName);
    }
 
    this.sort = function (cell) {
 
        var column = cell.cellIndex;
        var itm = this.getInnerText(this.tbody[0].rows[1].cells[column]);
        var sortfn = this.sortCaseInsensitive;
 
        if (itm.match(/\d\d[-]+\d\d[-]+\d\d\d\d/)) sortfn = this.sortDate; // date format mm-dd-yyyy
        if (itm.replace(/^\s+|\s+$/g,"").match(/^[\d\.]+$/)) sortfn = this.sortNumeric;
 
        this.sortColumnIndex = column;
 
        var newRows = new Array();
        for (j = 0; j < this.tbody[0].rows.length; j++) {
            newRows[j] = this.tbody[0].rows[j];
        }
 
        newRows.sort(sortfn);
 
        if (cell.getAttribute("sortdir") == 'down') {
            newRows.reverse();
            cell.setAttribute('sortdir','up');
        } else {
            cell.setAttribute('sortdir','down');
        }
 
        for (i=0;i<newRows.length;i++) {
            this.tbody[0].appendChild(newRows[i]);
        }
 
    }
 
    this.sortCaseInsensitive = function(a,b) {
        aa = thisObject.getInnerText(a.cells[thisObject.sortColumnIndex]).toLowerCase();
        bb = thisObject.getInnerText(b.cells[thisObject.sortColumnIndex]).toLowerCase();
        if (aa==bb) return 0;
        if (aa<bb) return -1;
        return 1;
    }
 
    this.sortDate = function(a,b) {
        aa = thisObject.getInnerText(a.cells[thisObject.sortColumnIndex]);
        bb = thisObject.getInnerText(b.cells[thisObject.sortColumnIndex]);
        date1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
        date2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
        if (date1==date2) return 0;
        if (date1<date2) return -1;
        return 1;
    }
 
    this.sortNumeric = function(a,b) {
        aa = parseFloat(thisObject.getInnerText(a.cells[thisObject.sortColumnIndex]));
        if (isNaN(aa)) aa = 0;
        bb = parseFloat(thisObject.getInnerText(b.cells[thisObject.sortColumnIndex]));
        if (isNaN(bb)) bb = 0;
        return aa-bb;
    }
 
    // define variables
    var thisObject = this;
    var sortSection = this.thead;
 
    // constructor actions
    if (!(this.tbody && this.tbody[0].rows && this.tbody[0].rows.length > 0)) return;
 
    if (sortSection && sortSection[0].rows && sortSection[0].rows.length > 0) {
        var sortRow = sortSection[0].rows[0];
    } else {
        return;
    }
 
    for (var i=0; i<sortRow.cells.length; i++) {
        sortRow.cells[i].sTable = this;
        sortRow.cells[i].onclick = function () {
            this.sTable.sort(this);
            return false;
        }
    }
 
}
/*   */
function addRow() {
         
    var myName = document.getElementById("name");
    var age = document.getElementById("age");
    var table = document.getElementById("myTableData");

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    row.insertCell(0).innerHTML= '<input type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= myName.value;
    row.insertCell(2).innerHTML= age.value;

}

function deleteRow(obj) {
     
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    
}

function addTable() {
     
    var myTableDiv = document.getElementById("myDynamicTable");
     
    var table = document.createElement('TABLE');
    table.border='1';
    var mytablehead = document.createElement("thead");

    mycurrent_row = document.createElement("tr");
        for(var i = 0; i < 4; i++) {
                // creates a <th> element
                mycurrent_cell = document.createElement("th");
                              
                currenttext = document.createTextNode('Header'+i);
                // appends the Text Node we created into the cell <td>
                mycurrent_cell.appendChild(currenttext);
                // appends the cell <td> into the row <tr>
                mycurrent_row.appendChild(mycurrent_cell);
                var cn = 'c'+ i+1;
                mycurrent_row.setAttribute("class",cn);
            }
            // appends the row <tr> into <tbody>
            mytablehead.appendChild(mycurrent_row);
            table.appendChild(mytablehead);


    
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
      
    for (var i=0; i<3; i++){
       var tr = document.createElement('TR');
       var cr = 'r'+ i+1;
           tr.setAttribute("class",cr);
       tableBody.appendChild(tr);
       
       for (var j=0; j<4; j++){
           var td = document.createElement('TD');
           var cn = 'c'+ j+1;
           td.setAttribute("class",cn);
           td.width='75';
           td.appendChild(document.createTextNode("Cell " + i + "," + j));
           

           tr.appendChild(td);
       }
    }
    myTableDiv.appendChild(table);
    
}

function load() {
    
    console.log("Page load finished");
    if (typeof(Storage) == "undefined" ) {
            alert("Your browser does not support HTML5 localStorage. Try upgrading.");
    } 
    else {
        console.log("Both localStorage and sessionStorage support is there.");
    }
}
</script>
</head>

<body>

<div class="clear"></div>

<div id="myContent">
<h1>
        Dynamically generate HTML table using JavaScript
</h1>
<h2>
    HTML Dynamic TABLE using JavaScript
</h2>
</div>                                  
<div id="myExample">
    <div id="myDynamicTable">
    <input type="button" id="create" value="Click here" onclick="Javascript:addTable()">
    to create a Table and add some data using JavaScript
    </div>
</div> 
 
<script>
 addTable();
 mybody = document.getElementsByTagName("body")[0];
    
 mytable = mybody.getElementsByTagName("table")[0];
 console.log(mytable);
 mytable.setAttribute("id",'myTable');
 console.log(mytable.getAttribute("id"));
 console.log(mytable.getAttribute("border"));

 var t = new SortableTable(document.getElementById('myTable'), 100);

</script>


```


var d = new Date();
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var mon = month[d.getMonth()];
var day = d.getDate();
var year = d.getFullYear();
var ind = 0;
var SearchList = [];
var date = [[mon + ' ' + day + ', ' + year, []]];
var leftDiv = document.createElement("div")
a = document.createElement('h2');
a.innerHTML = 'To Do List for ' + date[ind][0] + ' <input type="button" value="&#9654;" id="btnTom"' + ind + '" onclick="Tom(' + ind + ')"/>';
leftDiv.appendChild(a); // Add name to left div

document.getElementById("updateDiv").appendChild(leftDiv);

function addToPage()
{
    d = new Date();
    d.setDate(d.getDate() + ind);
    mon = month[d.getMonth()];
    day = d.getDate();
    year = d.getFullYear();
    var h2 = document.querySelector('h2');
    if (ind == 0)
    {
        h2.innerHTML = '<button type="button" class="btn btn-info glyphicon glyphicon-search" onclick="newSearch(document.getElementById(\'addToDo\').value);"> Search</button> To Do List for ' + date[ind][0] + ' <input type="button" value="&#9654;" id="btnTom"' + ind + '" onclick="Tom(' + ind + ')"/>';
    }
    else
    {
        h2.innerHTML = '<button type="button" class="btn btn-info glyphicon glyphicon-search" onclick="newSearch(document.getElementById(\'addToDo\').value);"> Search</button> To Do List for ' + date[ind][0] + ' <input type="button" value="&#x25C0;" id="btnYes"' + ind + '" onclick="Yes(' + ind + ')"/><input type="button" value="&#9654;" id="btnTom"' + ind + '" onclick="Tom(' + ind + ')"/>';
    }
    
    var table = document.querySelector("#updateTable"); //Create left div
    while (table.rows.length > 0)
    {
        table.deleteRow(0);
    }

    if(typeof date[ind][1] !== "undefined")
    {
        for(i = 0; i < date[ind][1].length; i++)
        {
            var row = table.insertRow(i);
     
            var colCount = 6;

            for(var j=0; j<colCount; j++) {

                var newcell = row.insertCell(j);
                newcell.id = "row" + i + "cell" + j;

                switch(j) {
                    case 1:
                             if (date[ind][1][i][0] == false)
                            {
                                newcell.innerHTML = '<p id="p' + i + '">' + date[ind][1][i][1] + '</p>';
                            }
                            else
                            {
                                newcell.innerHTML = '<p id="p' + i + '" style="color:gray;"><strike>' + date[ind][1][i][1] + '</strike></p>';
                            }
                            
                            break;
                    case 0:
                            if (date[ind][1][i][0] == false)
                            {
                                newcell.innerHTML = '<input type="checkbox" id="ckb' + i + '" onchange="Comp(' + i + ')" />';
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="checkbox" id="ckb' + i + '" onchange="Comp(' + i + ')" checked="true" />';    
                            }
                            
                            break;
                    case 2:
                            if (date[ind][1][i][0] == false)
                            {
                                newcell.innerHTML = '<input type="button" class="btn btn-warning" value="EDIT" id="btnEdit' + i + '" onclick="Ed(' + i + ')"/>';
                                break;
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="button" disabled class="btn disabled" value="EDIT" id="btnEdit' + i + '" onclick="Ed(' + i + ')"/>';
                                break;  
                            }
                            
                    case 3:
                            if (date[ind][1][i][0] == false)
                            {
                                newcell.innerHTML = '<input type="button" class="btn btn-danger" value="DELETE" id="btnDelete' + i + '" onclick="Del(' + i + ')"/>';
                                break;
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="button" disabled class="btn disabled" value="DELETE" id="btnDelete' + i + '" onclick="Del(' + i + ')"/>';
                                break;  
                            }
                    case 4:
                            if (date[ind][1][i][0] == false && i != 0 )
                            {
                                newcell.innerHTML = '<input type="button" value="&#9650;" id="btnMoveUp' + i + '" onclick="mUp(' + i + ')"/>';
                                break;
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="button" disabled class="btn disabled" value="&#9650;" id="btnMoveUp' + i + '" onclick="mUp(' + i + ')"/>';
                                break;
                            }
                    case 5:
                            if (date[ind][1][i][0] == false && i != date[ind][1].length - 1 && date[ind][1][i +1][0] != true) 
                            {
                                newcell.innerHTML = '<input type="button" value="&#9660;" id="btnMoveDown' + i + '" onclick="mDown(' + i + ')"/>';
                                break;
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="button" disabled class="btn disabled" value="&#9660;" id="btnMoveDown' + i + '" onclick="mDown(' + i + ')"/>';
                                break;
                            }
                }
            }
        }
    
    }

    row = table.insertRow(0);
    newcell = row.insertCell(0);
    newcell.innerHTML = "Complete";
    newcell = row.insertCell(1);
    newcell.innerHTML = "To Do Item";
    newcell = row.insertCell(2);
    newcell.innerHTML = "Edit";
    newcell = row.insertCell(3);
    newcell.innerHTML = "Delete";
    newcell = row.insertCell(4);
    newcell.innerHTML = "Move Up";
    newcell = row.insertCell(5);
    newcell.innerHTML = "Move Down";

    leftDiv.appendChild(table); // Add name to left div

    document.getElementById("addToDo").value = "";
}
function newToDo(toDo)
{
    console.log(toDo);
    if(!toDo || typeof(toDo) !== "string")
    {
        alert("You need to add a to do item in the textbox provided.")
       return;
    }
    else
    {
        toDo = upperCase(toDo);

        var x = 0;
        if(date[ind][1] != "undefined" && date[ind][1].length != 0)
        {
            if (date[ind][1] != "undefined")
            {
                while(x < date[ind][1].length)
                {
                    if(toDo == date[ind][1][x][1])
                    {
                        alert("That is already on your list!");
                        return;
                    }
                    x += 1;
                }
                date[ind][1].push([false, toDo]);
               addToPage();
            }
            else
            {
                date[ind][1].push([false, toDo]);
                addToPage();
            }
            
        }
        else
        {
            date[ind][1].push([false, toDo]); 
            addToPage();
        }
            document.getElementById("addToDo").focus();
    }
 
    

}
function Comp(ind2)
{
    var move = date[ind][1].slice(ind2);
     while(date[ind][1].length > ind2)
    {
        date[ind][1].pop();
    }
    for (i = 1; i < move.length; i++)
    {
        date[ind][1].push(move[i]);
    }
    if(move[0][0] == false)
    {
       date[ind][1].push([true, move[0][1]]);
    }
    else
    {
        date[ind][1].splice(0,0,[false, move[0][1]]);
    }
    
    addToPage();
}

function Del(ind2)
{
    var conf = confirm("Are you sure you want to delete this item?");
    if(conf == true)
    {
        var move = date[ind][1].slice(ind2);
        while(date[ind][1].length > ind2)
        {
            date[ind][1].pop(ind2);
        }
        for (i = 1; i < move.length; i++)
        {
            date[ind][1].push(move[i]);
        }
        addToPage();  
    }
    
}

function Ed(ind2)
{
    var p = document.getElementById("p" + ind2);
    var rowCell2 = document.getElementById("row" + ind2 + "cell" + 2);
    var rowCell3 = document.getElementById("row" + ind2 + "cell" + 3);
    var txt = p.textContent;
    var txtbx = document.createElement("input");
    txtbx.type = "text";
    txtbx.value = txt;
    p.textContent = "";
    p.appendChild(txtbx);
    var btnEd = document.getElementById("btnEdit" + ind2);
    btnEd.setAttribute("class", "hidden");
    var btnDel = document.getElementById("btnDelete" + ind2);
    btnDel.setAttribute("class", "hidden");
    var btnUpd = document.createElement("input");
    btnUpd.value = "UPDATE";
    btnUpd.type = "button";
    btnUpd.setAttribute("class", "btn btn-default");
    btnUpd.addEventListener('click', function(ind2) {

        ask = txtbx.value;

        if(!ask || typeof(ask) !== "string")
        {
           return;
        }
        else
        {
            var x = 0;
            while(x < date[ind][1].length)
                {
                    if(ask == date[ind][1][x][1])
                    {
                        alert("That is already on your list!");
                        return;
                    }
                    x += 1;
                }
            date[ind][1].splice(ind2, 1, ["0", ask]);
            addToPage();
        }
    });

    var btnCan = document.createElement("input");
    btnCan.value = "CANCEL";
    btnCan.setAttribute("class", "btn btn-default");
    btnCan.type = "button";
    btnCan.addEventListener('click', function(ind2) {

        btnEd.removeAttribute("class");
        btnDel.removeAttribute("class");
        p.textContent = txt;
        rowCell2.removeChild(btnUpd);
        rowCell3.removeChild(btnCan);
    });
    p.appendChild(txtbx);
    rowCell2.appendChild(btnUpd);
    rowCell3.appendChild(btnCan);
}
function mDown(ind2)
{
   var move = date[ind][1].splice(ind2,1);
   var stay = date[ind][1].slice(ind2);
   date[ind][1].splice(ind2, date[ind][1].length - ind2);
   for(i = 0; i <= stay.length; i++)
   {
    if(i == 1)
    {
        date[ind][1].push([move[0][0],move[0][1]]);
    }
    else if(i < 1)
    {
        date[ind][1].push([stay[i][0],stay[i][1]]);
    }
    else
    {
        date[ind][1].push([stay[i - 1][0],stay[i - 1][1]]);
    }
    
   }
   addToPage();
}

function mUp(ind2)
{
   var move = date[ind][1].splice(ind2,1);
   var stay = date[ind][1].slice(ind2 - 1);
   date[ind][1].splice(ind2 - 1, date[ind][1].length);
   for(i = 0; i <= stay.length; i++)
   {
    if(i == 0)
    {
        date[ind][1].push([move[0][0],move[0][1]]);
    }
    else
    {
        date[ind][1].push([stay[i - 1][0],stay[i - 1][1]]);
    }
    
   }
   addToPage();
}

function Tom()
{

    ind += 1;
    if(date.length == ind)
    {
        d = new Date();
        d.setDate(d.getDate() + ind);
        mon = month[d.getMonth()];
        day = d.getDate();
        year = d.getFullYear();
        date.push([mon + ' ' + day + ', ' + year, []]);
    }
    addToPage();
}

function Yes()
{

    ind -= 1;
    addToPage();
}

function newSearch(toDo)
{
    if (!toDo)
    {
        var toDo = prompt("what would you like to search for?");
    }
    
    if(!toDo || typeof(toDo) !== "string")
    {
        alert("You need to add search criteria in the textbox provided.")
       return;
    }
    else
    {
        SearchList = [];
        var x = 0;
        var j = 0;
        while(x < date.length)
        {
            while(j < date[x][1].length)
            {
                var SC = toDo.toLowerCase();
                while(SC.indexOf(" ") != -1)
                {
                    SC = SC.replace(" ", "|");
                }
               
                if(date[x][1][j][1].toLowerCase().search(SC) != -1)
                {
                    SearchList.push([date[x][0], date[x][1][j],x,j]);
                }
                j += 1;
            }
            x += 1;
            j = 0;
        }
       addSearchToPage(toDo);
        document.getElementById("addToDo").focus();
    }
}

function addSearchToPage(SC)
{
   
    var h2 = document.querySelector('h2');
    h2.innerHTML = '<button type="button" class="btn btn-info glyphicon glyphicon-search" onclick="newSearch(document.getElementById(\'addToDo\').value);"> Search</button> List of to do items for search criteria "' + SC + '" <input type="button" value="Back to list" id="btnBack" onclick="addToPage()"/>';
    
    var table = document.querySelector("#updateTable"); //Create left div
    while (table.rows.length > 0)
    {
        table.deleteRow(0);
    }
    if(typeof SearchList !== "undefined")
    {
        for(i = 0; i < SearchList.length; i++)
        {
            var row = table.insertRow(i);
     
            var colCount = 6;

            for(var j=0; j<colCount; j++) {

                var newcell = row.insertCell(j);
                newcell.id = "row" + i + "cell" + j;

                switch(j) {
                    case 2:
                            if (SearchList[i][1][0] == false)
                            {
                                newcell.innerHTML = '<p id="p' + i + '">' + SearchList[i][1][1] + '</p>';
                            }
                            else
                            {
                                newcell.innerHTML = '<p id="p' + i + '" style="color:gray;"><strike>' + SearchList[i][1][1] + '</strike></p>';
                            }
                            break;
                    case 0:
                            if (SearchList[i][1][0] == false)
                            {
                                newcell.innerHTML = '<input type="checkbox" id="ckb' + i + '" onchange="searchComp(' + SearchList[i][2] + ', ' + SearchList[i][3] + ', &quot;' + SC + '&quot;)" />';
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="checkbox" id="ckb' + i + '" onchange="searchComp(' + SearchList[i][2] + ', ' + SearchList[i][3] + ', &quot;' + SC + '&quot;)" checked="true" />';    
                            }
                            
                            break;
                    case 3:
                            if (SearchList[i][1][0] == false)
                            {
                                newcell.innerHTML = '<input type="button" class="btn btn-warning" value="EDIT" id="btnEdit' + i + '" onclick="searchEd(' + SearchList[i][2] + ', ' + SearchList[i][3] + ', ' + i + ', &quot;' + SC + '&quot;)"/>';
                                break;
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="button" disabled class="btn disabled" value="EDIT" id="btnEdit' + i + '" onclick="searchEd(' + SearchList[i][2] + ', ' + SearchList[i][3] + ', ' + i + ', &quot;' + SC + '&quot;)"/>';
                                break;  
                            }
                            
                    case 4:
                            if (SearchList[i][1][0] == false)
                            {
                                newcell.innerHTML = '<input type="button" class="btn btn-danger" value="DELETE" id="btnDelete' + i + '" onclick="searchDel(' + SearchList[i][2] + ', ' + SearchList[i][3] + ', &quot;' + SC + '&quot;)"/>';
                                break;
                            }
                            else
                            {
                                newcell.innerHTML = '<input type="button" disabled class="btn disabled" value="DELETE" id="btnDelete' + i + '" onclick="searchDel(' + SearchList[i][2] + ', ' + SearchList[i][3] + ', &quot;' + SC + '&quot;)"/>';
                                break;  
                            }
                    case 5:
                            newcell.innerHTML = '<input type="button" value="Go To List" id="btnGoToList' + SearchList[i][2] + '" onclick="goToList(' + SearchList[i][2] + ')"/>';
                            break;
                    case 1:
                            newcell.innerHTML = '<p>' + SearchList[i][0] + '</p>';
                            break;
                }
            }
        }
    
    }

     row = table.insertRow(0);
    newcell = row.insertCell(0);
    newcell.innerHTML = "Complete";
    newcell = row.insertCell(1);
    newcell.innerHTML = "Date";
    newcell = row.insertCell(2);
    newcell.innerHTML = "To Do Item";
    newcell = row.insertCell(3);
    newcell.innerHTML = "Edit";
    newcell = row.insertCell(4);
    newcell.innerHTML = "Delete";
    newcell = row.insertCell(5);
    newcell.innerHTML = "Return";

    leftDiv.appendChild(table); // Add name to left div

    document.getElementById("addToDo").value = "";
}
function searchComp(dateInd, itemInd, SC)
{
    var move = date[dateInd][1].slice(itemInd);
     while(date[dateInd][1].length > itemInd)
    {
        date[dateInd][1].pop();
    }
    for (i = 1; i < move.length; i++)
    {
        date[dateInd][1].push(move[i]);
    }
    if(move[0][0] == false)
    {
       date[dateInd][1].push([true, move[0][1]]);
    }
    else
    {
        date[dateInd][1].splice(0,0,[false, move[0][1]]);
    }
    
    newSearch(SC);
}

function searchDel(dateInd, itemInd, SC)
{
    var conf = confirm("Are you sure you want to delete this item?");
    if(conf == true)
    {
        var move = date[dateInd][1].slice(itemInd);
        while(date[dateInd][1].length > itemInd)
        {
            date[dateInd][1].pop(itemInd);
        }
        for (i = 1; i < move.length; i++)
        {
            date[dateInd][1].push(move[i]);
        }
        newSearch(SC);
    }
}

function searchEd(dateInd, itemInd, SId, SC)
{
     var p = document.getElementById("p" + SId);
    var rowCell3 = document.getElementById("row" + SId + "cell" + 3);
    var rowCell4 = document.getElementById("row" + SId + "cell" + 4);
    var txt = p.textContent;
    var txtbx = document.createElement("input");
    txtbx.type = "text";
    txtbx.value = txt;
    p.textContent = "";
    p.appendChild(txtbx);
    var btnEd = document.getElementById("btnEdit" + SId);
    btnEd.setAttribute("class", "hidden");
    var btnDel = document.getElementById("btnDelete" + SId);
    btnDel.setAttribute("class", "hidden");
    var btnUpd = document.createElement("input");
    btnUpd.value = "UPDATE";
    btnUpd.type = "button";
    btnUpd.setAttribute("class", "btn btn-default");
    btnUpd.addEventListener('click', function(itemInd) {

        ask = txtbx.value;

        if(!ask || typeof(ask) !== "string")
        {
           return;
        }
        else
        {
            var x = 0;
            while(x < date[dateInd][1].length)
                {
                    if(ask == date[dateInd][1][x][1])
                    {
                        alert("That is already on your list!");
                        return;
                    }
                    x += 1;
                }
            date[dateInd][1].splice(itemInd, 1, ["0", ask]);
            newSearch(SC);
        }
    });

    var btnCan = document.createElement("input");
    btnCan.value = "CANCEL";
    btnCan.setAttribute("class", "btn btn-default");
    btnCan.type = "button";
    btnCan.addEventListener('click', function() {

        btnEd.removeAttribute("class");
        btnDel.removeAttribute("class");
        p.textContent = txt;
        rowCell3.removeChild(btnUpd);
        rowCell4.removeChild(btnCan);
    });
    p.appendChild(txtbx);
    rowCell3.appendChild(btnUpd);
    rowCell4.appendChild(btnCan);
   
}

function goToList(ind2)
{
    ind = ind2;
    addToPage();
}
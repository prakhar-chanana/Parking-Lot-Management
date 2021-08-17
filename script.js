const form = document.querySelector('#itemForm');
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector('.display-task');

let dict = {};
let list = [];
let i = 1;

const handleItem = function(itemName){

    const items = itemList.querySelectorAll('.tsk');

    items.forEach(function(item){

        if(item.querySelector('.item-name').textContent === itemName){
            

            item.querySelector('.del-btn').addEventListener('click',function(){
                itemList.removeChild(item);
                delete dict[itemName];
                setLocalStorage('dict',dict);
            });
        }
    })
}

const getList = function(dict){
    itemList.innerHTML = '';
        for(const [key,value] of Object.entries(dict)){
            // itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii ${value}"><div class="hi"><div class="complete"><button class="complete-btn"><i class="far fa-check-square fa-2x"></i></button></div><div class="task-details"><span class="item-name" id="tds">${key}</span></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            itemList.insertAdjacentHTML('beforeend',`<div class="tsk" id="tsk"><div class="hii"><div class="hi"><div class="hidden"><span class="item-name">${key}</span></div><div class="task-details"><table class="table"><tr><th class="th1">Name</th><td>:</td><td class="td1">${value[0]}</td></tr><tr><th class="th1">Vehicle Name</th><td>:</td><td class="td1">${value[1]}</td></tr><tr><th class="th1">Vehicle Number</th><td>:</td><td class="td1">${value[2]}</td></tr><tr><th class="th1">Entry Date</th><td>:</td><td class="td1">${value[3]}</td></tr><tr><th class="th1">Exit Date</th><td>:</td><td class="td1">${value[4]}</td></tr></table></div><div class="del"><button class="del-btn"><i class="fas fa-times fa-2x"></i></button></div></div></div></div>`);
            handleItem(key);
        };
}

const getLocalStorage = function(){
    
    const todoStorage = localStorage.getItem('dict');
    if (todoStorage=== 'undefined' || todoStorage === null){
        dict = {};
    } else{
        dict = JSON.parse(todoStorage);
        getList(dict);
    }
}

const setLocalStorage = function(list,dict){
    localStorage.setItem(list, JSON.stringify(dict));
}

getLocalStorage();

form.addEventListener('submit', function(e){
    e.preventDefault();

    var itemName = document.getElementById('itemName').value;
    var itemVName= document.getElementById('itemVName').value;
    var itemVNo= document.getElementById('itemVNo').value;
    var itemEntry= document.getElementById('itemEntry').value;
    var itemExit= document.getElementById('itemExit').value;

    list.push(itemName);
    list.push(itemVName);
    list.push(itemVNo);
    list.push(itemEntry);
    list.push(itemExit);
    
    dict[i] = list;
    setLocalStorage('dict',dict);
    getList(dict);

    i = i+1;
    document.getElementById('itemName').value = "";
    document.getElementById('itemVName').value = "";
    document.getElementById('itemVNo').value = "";
    document.getElementById('itemEntry').value = "";
    document.getElementById('itemExit').value = "";
    list = [];

});



const task = document.querySelector('.to-do')
const taskArea = document.querySelector('.content ul')
const addBtn = document.querySelector('.add')
let id = 0;
let theList = [];
let clear = document.querySelector('.clearr')

let date = document.querySelector('.date')



let data = localStorage.getItem("TODO");
const options = { month: "short", weekday: "long", day: "numeric" };
const today = new Date();

date.innerHTML = today.toLocaleDateString("en-US", options);






// check if data is not empty
if (data) {
    theList = JSON.parse(data);
    id = theList.length; // set the id to the last one in the list
    loadList(theList); // load the list to the user interface
} else {
    // if data isn't empty
    LIST = [];
    id = 0;
}










function addToDo(taskName, id, done, trash) {

    if (done == 1) {
        if (trash == 1) { }
        else {
            let position = 'beforeend'
            let htmlCode = `
                <li class="xflex">
                    <span  id="${id}" class="material-icons  not-done  hide pointer ">radio_button_unchecked</span>
                    <span id="${id}" class="material-icons pointer show  green ">done</span>
                    <p class="task green big ">${taskName}</p>
                    <span id="${id}" class="material-icons   pointer red">clear</span>
        
    
                 </li>
    
                         `
            taskArea.insertAdjacentHTML(position, htmlCode)

        }
    }


    else {
        if (trash == 1) { }
        else {
            let position = 'beforeend'
            let htmlCode = `
        <li class="xflex">
        <span  id="${id}" class="material-icons  not-done  pointer ">radio_button_unchecked</span>
        <span id="${id}" class="material-icons pointer  hide green ">done</span>
        <p class="task big ">${taskName}</p>
        <span id="${id}" class="material-icons   pointer red">clear</span>


        </li>

            `
            taskArea.insertAdjacentHTML(position, htmlCode)
        }
    }

}

//remove to do 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    theList[element.id].trash = 1;
    localStorage.setItem("TODO", JSON.stringify(theList))


}


//task done 
function taskDone(element) {
    let check = element.nextElementSibling
    let para = element.nextElementSibling.nextElementSibling
    check.classList.add('show')
    element.classList.add('hide')
    element.classList.remove('show')
    para.classList.add('green')
    theList[element.id].done = 1;
    localStorage.setItem("TODO", JSON.stringify(theList))


}
// load the list
function loadList(array) {
    array.forEach(function (item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//task undone

function taskUndone(element) {
    let para = element.nextElementSibling
    let uncheck = element.parentNode.firstChild.nextElementSibling
    para.classList.remove('green')
    uncheck.classList.remove('hide')
    element.classList.remove('show')
    element.classList.add('hide')
    theList[element.id].done = 0;

    localStorage.setItem("TODO", JSON.stringify(theList))



}

// event listener
document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        let taskName = task.value;

        if (taskName) {
            addToDo(taskName, id, 0, 0)

            theList.push({
                name: taskName,
                id: id,
                done: 0,
                trash: 0
            })
            id++;
            localStorage.setItem("TODO", JSON.stringify(theList));
            task.value = ''

        }
    }
})


addBtn.addEventListener('click', function () {

    let taskName = task.value;
    if (taskName) {
        addToDo(taskName, id, 0, 0)

        theList.push({
            name: taskName,
            id: id,
            done: 0,
            trash: 0
        })
        id++;
        localStorage.setItem("TODO", JSON.stringify(theList));
        task.value = ''

        task.value = ''
    }


})

taskArea.addEventListener('click', function (event) {
    let element = event.target;
    let action = element.innerText;
    if (action == 'clear') {
        removeToDo(element);
    }
    else if (action == 'radio_button_unchecked') {
        taskDone(element)
    }
    else if (action == 'done') {
        taskUndone(element)
    }
})


clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});


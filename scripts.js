let message = document.getElementById("inputMessage");
let submitBtn = document.getElementById("submit");
let id = 0;

class ToDoList {
    constructor(message){
        this.message = message;
    }

    static DisplayList(){
        let listArray = [];
        
        listArray.forEach(message => {
            ToDoList.AddToList(message);
        });
    }

    static AddToList(message){
        let list = document.getElementById("listFormUL");

        let div = document.createElement("div");
        div.classList = "listItem";
        div.innerHTML = `
            <li>${message}</li>
            <div class="wrap">
                <div class="checkboxWrap">
                    <input type="checkbox" id = "check${id}" class = "jsCheckbox" hidden>
                    <label for="check${id}" class="checkmark"></label>
                </div>
                <img class = "deleteImg" src="https://img.icons8.com/ios/64/000000/delete-sign.png"/>
            </div>
        `;

        list.appendChild(div);
        checkboxes();
        deleteBtn();
        
    }

    static RemoveFromList(listItem){
        listItem.remove();
    }

    static ChangeBgColor(listItem, checkedInput){
        // This checks to see if the listItem and done class are already applied and if the checked status is false or true to then determine if the background colour needs to be added or removed.
        if (listItem.classList.contains("listItem") && listItem.classList.contains("done") && checkedInput.checked === false){
            listItem.classList.remove("done");
        } else if (listItem.classList.contains("listItem") && !listItem.classList.contains("done") && checkedInput.checked === true){
            listItem.classList.add("done");
        }
    }
}

window.addEventListener("load", ToDoList.DisplayList());

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    id++
    if(message.value === ""){
        let errorMessage = document.getElementById("errorMessage");
        errorMessage.innerText = "Please input a item for the To Do List.";
    } else {
        ToDoList.AddToList(message.value);
        message.value = "";
    }
});

function deleteBtn(){
    document.querySelectorAll(".deleteImg").forEach( (item) => {
        item.addEventListener("click", (e) => {
            let target = e.target.parentElement.parentElement;
            ToDoList.RemoveFromList(target);
        });
    });
}

function checkboxes(){
    // This is used to add event listeners to each checkbox and then provides arguments to the ChangeBGColor method under ToDoList.
    document.querySelectorAll(".jsCheckbox").forEach( (checkbox) => {
        checkbox.addEventListener("click", (e) => {
            let targetCheckbox = e.target;
            let targetLi = e.target.parentElement.parentElement.parentElement;
            ToDoList.ChangeBgColor(targetLi, targetCheckbox);
        });
    });
}

window.addEventListener("load", deleteBtn);
window.addEventListener("load", checkboxes);
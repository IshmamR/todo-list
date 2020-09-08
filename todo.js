var cont = document.querySelector(".list"); // List contaier
var input = document.querySelector(".work"); // To-Do Input

var todo;
// var local = JSON.parse(localStorage.getItem('todos'));
if(localStorage.getItem('todos') === null) {	
	todo = [];
} else {
	todo = JSON.parse(localStorage.getItem('todos'));
}
todo.forEach(publishing);

function addList() {
	if (input.value.trim() != "") {
		todo.push(input.value);
		localStorage.setItem('todos', JSON.stringify(todo));
		var it = input.value;
		var ind = todo.indexOf(input.value);
		publishing(it, ind);
	}
	return false;
}

function publishing (item, index) {
	// console.log(item + 'has index of:' + index);
	var newDiv = document.createElement("DIV");
	newDiv.classList.add("newDiv");
	cont.appendChild(newDiv);

	// Creating neccessary elements
	var todoInput = document.createElement("INPUT");
	var todoDiv = document.createElement("DIV");
	var editBtn = document.createElement("BUTTON");
	var rmvBtn = document.createElement("BUTTON");
	// Icons
	var iconPub = document.createElement("I");
	iconPub.classList.add("material-icons");
	iconPub.innerHTML = "edit";
	var iconRmv = document.createElement("I");
	iconRmv.classList.add("material-icons");
	iconRmv.innerHTML = "remove";

	// For the list that will show
	todoInput.classList.add("input-width");
	todoInput.classList.add("do-to");

	todoInput.value = item;
	// console.log(todoInput.value + "hello");
	todoInput.disabled = true;
	newDiv.appendChild(todoInput);

	// For Edit button
	editBtn.classList.add("btn-floating");
	editBtn.classList.add("waves-effect");
	editBtn.classList.add("waves-light");
	editBtn.classList.add("green");
	editBtn.appendChild(iconPub); // Appending the edit icon
	todoDiv.appendChild(editBtn);

	editBtn.addEventListener("click", editFunc);

	// For Remove button
	rmvBtn.classList.add("btn-floating");
	rmvBtn.classList.add("waves-effect");
	rmvBtn.classList.add("waves-light");
	rmvBtn.classList.add("red");
	rmvBtn.appendChild(iconRmv); // Appending the remove icon
	todoDiv.appendChild(rmvBtn);

	rmvBtn.addEventListener("click", rmvFunc);

	// For the div with edit/remove button
	todoDiv.classList.add("right");
	todoDiv.classList.add("btnDiv");
	newDiv.appendChild(todoDiv);
	
	input.value = ""; // The input goes blank

	function editFunc() {
		// setting localstorage twice to be sure -_-
		localStorage.setItem('todos', JSON.stringify(todo));
		
		var thisInput = this.parentElement.previousSibling; // Gets the input inside the same div
		todo[index] = thisInput.value;
		
		localStorage.setItem('todos', JSON.stringify(todo));
		thisInput.disabled = !thisInput.disabled; // Works like a disabled toggle
	}
	function rmvFunc() {
		// var todo;
		if(localStorage.getItem('todos') === null) {	
			todo = [];
		} else {
			todo = JSON.parse(localStorage.getItem('todos'));
		}
		const thisTodo = this.parentElement.previousSibling.value; // getting index the hard way
		todoIndex = todo.indexOf(thisTodo);
		todo.splice(index, 1);
		localStorage.setItem("todos", JSON.stringify(todo));
		const thisDiv = this.parentElement.parentElement; // Gets the div containing both input and the buttons div
		thisDiv.remove();

		localStorage.setItem("todos", JSON.stringify(todo));
		// console.log(index);
	}
}
function rmvFromLS() {
	// var document.querySelectorAll(".do-to");
	// forEach


	// const thisTodo = this.parentElement.previousSibling.value; // getting index the hard way
	// todoIndex = todo.indexOf(thisTodo);
	// todo.splice(index, 1);
	// localStorage.setItem("todos", JSON.stringify(todo));
}
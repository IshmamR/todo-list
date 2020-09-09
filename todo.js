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

	// scroll into view after publishing
	setTimeout(scrolled, 1000);
	
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

		const thisDiv = this.parentElement.parentElement; // Gets the div containing both input and the buttons div
		thisDiv.classList.add("animation");
		thisDiv.addEventListener("animationend", ()=> {
			console.log("hello");
			thisDiv.remove();
			rmvFromLS();
		})
		// console.log(index);
	}
}
function rmvFromLS() {
	var dotos = document.querySelectorAll(".do-to");
	var tod = [];
	dotos.forEach((item)=> {
		// console.log(item.value);
		tod.push(item.value);
	});
	localStorage.setItem("todos", JSON.stringify(tod));
}

document.querySelector("#rmv").addEventListener("click", ()=> {
	var dotos = document.querySelectorAll(".newDiv");
	var tod = [];
	dotos.forEach((item)=> {
		const thisDiv = item; // Gets the div containing both input and the buttons
		thisDiv.remove();
	});
	localStorage.setItem("todos", JSON.stringify(tod));
});

function scrolled() {
	cont.lastChild.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
}

// Love react
const fav = document.querySelector(".fav");
const span = document.querySelector(".l-text");
var loved;
document.querySelector("#loved").addEventListener("click", ()=> {
	if(localStorage.getItem("loved") === null || localStorage.getItem("loved") == 0) {
		loved = 1;
		localStorage.setItem("loved", loved);
		fav.innerHTML = 'favorite';
		span.innerHTML = 'Loved it!';
	} else {
		loved = 0;
		localStorage.setItem("loved", loved);
		fav.innerHTML = 'favorite_border';
		span.innerHTML = "";
	}
});
if(localStorage.getItem("loved") === null || localStorage.getItem("loved") == 0) {
	fav.innerHTML = 'favorite_border';
	span.innerHTML = "";
} else if (localStorage.getItem("loved") == 1) {
	fav.innerHTML = 'favorite';
	span.innerHTML = 'Loved it!';
}

// CLOCK
inteval = setInterval(clock, 1000);
function clock() {
	var time = new Date();
	var scDig = time.getSeconds();
	var mnDig = time.getMinutes();
	var hrDig = time.getHours();
	var ap;
	if (hrDig > 12) {
		hrDig = hrDig - 12;
		ap = "AM";
	} else {
		ap = "PM";
	}
	//This part will show the digital clock
	var digClock = document.querySelector(".time");
	digClock.innerHTML =  hrDig + ":" + mnDig + ":" + scDig + " " + ap;
}
// CALENDER
var d = new Date();
var day = d.getDay();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var dateToday = date + "/" + month + "/" + year;
var dayx = "<h5>" + days[day]; + "</h5>";
var datex = "<h6>" + dateToday + "</h6>";
var cal = document.querySelector(".calender");
cal.innerHTML = dayx + datex;
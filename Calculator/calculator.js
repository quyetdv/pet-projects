//============ GÁN
let screen = document.getElementsByClassName("screen")[0];
let wrapper = document.getElementsByClassName("wrapper")[0];

//============ Binding event
wrapper.addEventListener("click", function (event) {
	switch (event.target.id) {
		case "AC":
			clearContent();
			break;
		case "sqr":
			sqrCalc();
			break;
		case "factorial":
			factorialCalc();
			break;
		case "sqrt":
			sqrtCalc();
			break;
		case "percent":
			percentCalc();
			break;
		case "equal":
			evaluate();
			break;
		default: //không phải những thằng trên thì chỉ cần display content
			displayContent(event);
			break;
	}
});

//=================== FUNCTION

function displayContent(event) {
 	screen.textContent += event.target.textContent;
}

function clearContent() {
	screen.textContent = "";
}

function evaluate() {
	let screen_text = screen.textContent;

	//viết cho dấu ÷
	screen_text = screen_text.replace(/÷/g, "/"); //dùng RegEx để thay tất cả dấu ÷, thay vì chỉ thay được 1 dấu ÷ 

	//viết cho dấu ×
	screen_text = screen_text.replace(/×/g, "*");
	
	try {
	 	eval(screen_text);
	 } catch(e) {
	 	alert("Ông phá máy rồi!");
	 	screen.textContent = "";
	 }

	
		screen.style.animation = "0.75s fadeIn";
		screen.textContent = eval(screen_text);
	
	setTimeout(function() {
		screen.style.animation = "";
	}, 500);
	
}

function sqrCalc() {
	screen.style.animation = "0.75s fadeIn";
	screen.textContent = eval(screen.textContent * screen.textContent);

	setTimeout(function() {
		screen.style.animation = "";
	}, 500);

	ongPhaMayRoi();
}

function factorialCalc() {
	screen.style.animation = "0.75s fadeIn";

	let result = 1;
	let input = Number(screen.textContent);

	if (screen.textContent === "0") screen.textContent = "1";
	else if (input > 0 && Number.isInteger(input)) {

		for (let i = 1; i <= input; i++) {
			result *= i;
		}
		screen.textContent = result;
		setTimeout(function() {
			screen.style.animation = "";
		}, 500);

	} else {
		alert("Ông phá máy rồi!");
		screen.textContent = "";
	}
}

function sqrtCalc() {
	screen.style.animation = "0.75s fadeIn";
	screen.textContent = Math.sqrt(screen.textContent);
	setTimeout(function() {
			screen.style.animation = "";
		}, 500);
	ongPhaMayRoi();
}

function percentCalc() {
	screen.style.animation = "0.75s fadeIn";
	screen.textContent = screen.textContent / 100;
	setTimeout(function() {
		screen.style.animation = "";
	}, 500);
	ongPhaMayRoi();
}

function ongPhaMayRoi() {
	if (!eval(screen.textContent)) {
		alert("Ông phá máy rồi!");
		screen.textContent = "";
	}
}

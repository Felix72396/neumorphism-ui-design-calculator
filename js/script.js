const $screen = document.querySelector("#txt-screen"),
$btn0 = document.querySelector("#btn-0"),
$btn00 = document.querySelector("#btn-00"),
$btn1 = document.querySelector("#btn-1"),
$btn2 = document.querySelector("#btn-2"),
$btn3 = document.querySelector("#btn-3"),
$btn4 = document.querySelector("#btn-4"),
$btn5 = document.querySelector("#btn-5"),
$btn6 = document.querySelector("#btn-6"),
$btn7 = document.querySelector("#btn-7"),
$btn8 = document.querySelector("#btn-8"),
$btn9 = document.querySelector("#btn-9"),
$btnSubstraction = document.querySelector("#btn-substraction"),
$btnAddition = document.querySelector("#btn-addition"),
$btnMultiplication = document.querySelector("#btn-multiplication"),
$btnDivision = document.querySelector("#btn-division"),
$btnClean = document.querySelector("#btn-clean"),
$btnPeriod = document.querySelector("#btn-period"),
$btnEqual = document.querySelector("#btn-equal");

let number = 0,
    accumulator = 0,
    start = true,
    isPeriodPressed = false,
    isOperatorPressed = false,
    isNumberPressed = false,
    isEqualPressed = true,
    operation = "";

//logic----------------------------------------------



function assignNumbers(n)
{
    
    if(isPeriodPressed)
    {
        $screen.value += `${n}`;
    }
    else if($screen.value === "" || $screen.value === "0" || isOperatorPressed && !isNumberPressed)
    {
        $screen.value = `${eval(n)}`;
    }
    else
    {
        $screen.value += `${n}`;
    }

    number = eval($screen.value);
    isNumberPressed = true;
}

$btn0.onclick = () => assignNumbers("0");

$btn00.onclick = () => assignNumbers("00");

$btn1.onclick = () => assignNumbers("1");

$btn2.onclick = () => assignNumbers("2");

$btn3.onclick = () => assignNumbers("3");

$btn4.onclick = () => assignNumbers("4");

$btn5.onclick = () => assignNumbers("5");

$btn6.onclick = () => assignNumbers("6");

$btn7.onclick = () => assignNumbers("7");

$btn8.onclick = () => assignNumbers("8");

$btn9.onclick = () => assignNumbers("9");



// operations -------------------------------------------------------------------------------------------------
function performOperationLogic(op)
{
    if(isOperatorPressed)
    {
        if(isNumberPressed)
            applyOperation();
    }

    isOperatorPressed = true;
    isPeriodPressed = false;
    operation = op;
    isNumberPressed = false;

    if(start)
    {
        accumulator = number;
        start = false;
        return;
    }

 
}

function applyOperation()
{
    switch(operation)
    {
        case "+":
            accumulator += number;
        break;

        case "-":
            accumulator -= number;
        break;

        case "*":
            accumulator *= number;
        break;

        case "/":
            accumulator /= number;
        break;
    }

    $screen.value = accumulator;
}

$btnAddition.onclick = () => {
    
    performOperationLogic("+");
}



$btnSubstraction.onclick = () => {
   
    performOperationLogic("-");
}

$btnMultiplication.onclick = () => {
    performOperationLogic("*");
}

$btnDivision.onclick = () => {
    performOperationLogic("/");
}

$btnEqual.onclick = () => {
    if(start)
    {
        accumulator = number;
        start = false;
    }

    applyOperation();
    isOperatorPressed = false;
    isPeriodPressed = false;

}

$btnPeriod.onclick = () => {

    if(!$screen.value.includes("."))
    {
        if($screen.value === "" || $screen.value === "0")
        {
            $screen.value = "0.";
        }
        else{
            $screen.value += ".";
            isNumberPressed = false;
        }

        isPeriodPressed = true;
    }

    number = eval($screen.value);
}

$btnClean.onclick = () => {
    clean();
}


function clean()
{
    $screen.value = "";
    isPeriodPressed = false;
    isNumberPressed = false;
    isOperatorPressed = false;
    number = 0;
    accumulator = 0;
    operation = "";
    start = true;
}

document.body.onkeydown = (e) => {
    const key = e.key;
    
    if(key !== 'Backspace' && key !== 'Tab' && key !== 'Escape' && key !== 'Enter' && isNaN(key))
    {
        e.preventDefault();
    }
    else{
        $screen.focus();
    }

    const $buttons = Array.from(document.getElementsByTagName("button"));

    $buttons.forEach($btn => {
        if(key === $btn.textContent.toLocaleLowerCase())
        {
            $btn.click();
            console.log($btn)
        }
    })
    
}





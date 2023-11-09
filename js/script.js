const $pantalla = document.querySelector("#txt-pantalla"),
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
$btnResta = document.querySelector("#btn-resta"),
$btnSuma = document.querySelector("#btn-suma"),
$btnMultiplicacion = document.querySelector("#btn-multiplicacion"),
$btnDivision = document.querySelector("#btn-division"),
$btnLimpiar = document.querySelector("#btn-limpiar"),
$btnPunto = document.querySelector("#btn-punto"),
$btnIgual = document.querySelector("#btn-igual");

let numero = 0,
    acumulador = 0,
    inicio = true,
    puntoPresionado = false,
    operadorPresionado = false,
    numeroPresionado = false,
    igualPresionado = true,
    operacion = "";

//logica----------------------------------------------



function asignarNumeros(n)
{
    console.log(`numeroPresionado ${numeroPresionado}; operadorPresionado ${operadorPresionado}`)
    if(puntoPresionado)
    {
        $pantalla.value += `${n}`;
    }
    else if($pantalla.value === "" || $pantalla.value === "0" || operadorPresionado && !numeroPresionado)
    {
        $pantalla.value = `${eval(n)}`;
    }
    else
    {
        $pantalla.value += `${n}`;
    }

    numero = eval($pantalla.value);
    numeroPresionado = true;
    // operadorPresionado = false;
}

$btn0.onclick = () => asignarNumeros("0");

$btn00.onclick = () => asignarNumeros("00");

$btn1.onclick = () => asignarNumeros("1");

$btn2.onclick = () => asignarNumeros("2");

$btn3.onclick = () => asignarNumeros("3");

$btn4.onclick = () => asignarNumeros("4");

$btn5.onclick = () => asignarNumeros("5");

$btn6.onclick = () => asignarNumeros("6");

$btn7.onclick = () => asignarNumeros("7");

$btn8.onclick = () => asignarNumeros("8");

$btn9.onclick = () => asignarNumeros("9");



// operaciones ---------------------------------------------------------------------------------------------------------
function logicaOperaciones(op)
{
    if(operadorPresionado)
    {
        if(numeroPresionado)
            aplicarOperacion();
    }

    operadorPresionado = true;
    puntoPresionado = false;
    operacion = op;
    numeroPresionado = false;

    if(inicio)
    {
        acumulador = numero;
        inicio = false;
        return;
    }

 
}

function aplicarOperacion()
{
    switch(operacion)
    {
        case "+":
            acumulador += numero;
        break;

        case "-":
            acumulador -= numero;
        break;

        case "*":
            acumulador *= numero;
        break;

        case "/":
            acumulador /= numero;
        break;
    }

    $pantalla.value = acumulador;
}

$btnSuma.onclick = () => {
    
    logicaOperaciones("+");
}



$btnResta.onclick = () => {
   
    logicaOperaciones("-");
}

$btnMultiplicacion.onclick = () => {
    logicaOperaciones("*");
}

$btnDivision.onclick = () => {
    logicaOperaciones("/");
}

$btnIgual.onclick = () => {
    if(inicio)
    {
        acumulador = numero;
        inicio = false;
    }

    aplicarOperacion();
    operadorPresionado = false;
    puntoPresionado = false;

}

$btnPunto.onclick = () => {

    // if(operadorPresionado)
    //     $pantalla.value = "";

    if(!$pantalla.value.includes("."))
    {
        if($pantalla.value === "" || $pantalla.value === "0")
        {
            $pantalla.value = "0.";
        }
        else{
            $pantalla.value += ".";
            numeroPresionado = false;
        }

        puntoPresionado = true;
    }

    numero = eval($pantalla.value);
}

$btnLimpiar.onclick = () => {
    limpiar();
}


function limpiar()
{
    $pantalla.value = "";
    puntoPresionado = false;
    numeroPresionado = false;
    operadorPresionado = false;
    numero = 0;
    acumulador = 0;
    operacion = "";
    inicio = true;
}

document.body.onkeydown = (e) => {
    const key = e.key;
    

    // if(key === "." && numeroPresionado)
    // {
    //     if($pantalla.value.includes("."))
    //     {
    //         e.preventDefault();
    //         return;
    //     }
    //     else {
    //         numeroPresionado = false;
    //         $pantalla.value += ".";
    //     }
    // }


//    if($pantalla === document.activeElement)
    if(key !== 'Backspace' && key !== 'Tab' && key !== 'Escape' && key !== 'Enter' && isNaN(key))
    {
        e.preventDefault();
    }
    else{
        // numeroPresionado = true;
        $pantalla.focus();
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





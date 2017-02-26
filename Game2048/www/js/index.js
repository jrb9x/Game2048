	var tab = new Array(4);
    var numeroFila=0, numeroColumna=0;
    var indiceMinino=0, indiceMaximo=0, indiceSuma=-1, huboCombinacion=false;
    const NUMERO_FINAL = 2048;

	/*************SPLASH SCREEN*****************/
    /*navigator.splashscreen.show();
	window.setTimeout(function () {
		navigator.splashscreen.hide();
	}, 2000);*/
	/******************************************/
	
	$("#aumento").fadeOut(10);
	inicializarArray();
    recogerTabla();
    rellenarTabla();
	juegoNuevo();
	
	/*************SCORE: ANIMACION*************/
	$("#aumento").fadeOut(10);
	document.getElementById("score").innerHTML = "0";
	var score = parseInt(document.getElementById("score").innerHTML);
	
	function actualizarScore(numero){
		score += numero;
		animacionScore(numero);
		document.getElementById("score").innerHTML = score;
	}
	
	function animacionScore(numero){
		document.getElementById("aumento").innerHTML = "+"+numero;
		$("#aumento").fadeIn(50);
		$("#aumento").animate({
			fontSize: "+=5px"
		},500);
		$("#aumento").css("fontSize","25px");
		$("#aumento").fadeOut(100);
		
	}
	/******************************************/
	
	
   	
	/*********CONFIRMACION NUEVO JUEGO*************/
	document.getElementById("nuevo").addEventListener("click",dialogConfirmNuevo);
    function confirmCallbackNuevo(buttonIndex) {
		if(buttonIndex==1){
			juegoNuevo();
		}else
		    startWatch();
    }
    function dialogConfirmNuevo() {
        stopWatch();
        var message = "Desea empezar un nuevo juego?";
        var title = "Nuevo Juego";
        navigator.notification.confirm(message, confirmCallbackNuevo, title, ['Continuar','Cancelar']);
    }
	/******************************************/

    /*********NUEVA PARTIDA*************/

    function confirmCallbackNuevaPartida(buttonIndex) {
        if(buttonIndex==1){
            juegoNuevo();
        }
        else
            navigator.app.exitApp();
    }

    /*********PARTIDA GANADA*************/

    function dialogConfirmPartidaGanada() {
        stopWatch();
        var message = "Empezar un nuevo juego?";
        var title = "Ha ganado la Partida!";
        navigator.notification.confirm(message, confirmCallbackNuevaPartida, title, ['Aceptar','Cancelar']);
    }

    /*********PARTIDA PERDIDA *************/

    function dialogConfirmPartidaPerdida() {
        stopWatch();
        var message = "Empezar un nuevo juego?";
        var title = "Ha perdido la Partida!";
        navigator.notification.confirm(message, confirmCallbackNuevaPartida, title, ['Aceptar','Cancelar']);
    }
    /******************************************/
	
	/***********CONFIRMACION SALIR**************/
    document.getElementById("salir").addEventListener("click",dialogConfirmSalir);
    function confirmCallbackSalir(buttonIndex) {
		if(buttonIndex==1){
			navigator.app.exitApp();
		}else
		    startWatch();
    }
    function dialogConfirmSalir() {
        stopWatch();
        var message = "Desea salir del juego?";
        var title = "Salir";
        navigator.notification.confirm(message, confirmCallbackSalir, title, ['Si','No']);
    }
	/******************************************/
	
/*
    $(document).ready(function () {
        document.onkeydown = asignarMovimientos;
    });

    function asignarMovimientos(){
        var evento = window.event;
        switch (event.keyCode){
            case 40: moverAbajo();break;
            case 38: moverArriba();break;
            case 39: moverDerecha();break;
            case 37: moverIzquierda();break;
        }
    }

    $("#nuevo").click(function(){
        document.onkeydown = false;
    });

    $("#noNuevoJuego").click(function(){
        document.onkeydown = asignarMovimientos;
    });*/

    function juegoNuevo(){
        //document.onkeydown = asignarMovimientos;

		inicializarArray();
        rellenarNuevaCasillaAleatoria();
        $("#casilla"+numeroFila+numeroColumna).hide();
        $("#casilla"+numeroFila+numeroColumna).fadeIn(1000);
        rellenarNuevaCasillaAleatoria();
        $("#casilla"+numeroFila+numeroColumna).hide();
        $("#casilla"+numeroFila+numeroColumna).fadeIn(1000);
        rellenarTabla();
        onLoad();
    }

    function inicializarArray() {
        for(var i=0; i<4; i++){
            tab[i] = new Array(4);
            for(var j=0; j<4; j++){
                tab[i][j] = 0;

            }
        }
    }

    function moverAbajo(){
        recogerTabla();
        var hayMovimiento = false;
        for(var j=0;j<4;j++){
            indiceMaximo = 3;
            indiceSuma = -1;
            for(var i=2;i>=0;i--){
                var valor = tab[i][j];
                if(esNumeroDistintoCero(valor)){
                    for(var k=i+1;k<=indiceMaximo;k++){
                        var aux = tab[k][j];
                        if(i==0 && esNumeroDistintoCero(tab[2][j]) && indiceSuma==2){
                            indiceMaximo--;
                        }
                        if(i==0 && esNumeroDistintoCero(tab[2][j]) && esNumeroDistintoCero(tab[1][j])){
                            indiceMaximo=2;
                        }
                        if(esNumeroDistintoCero(aux)){
                            if(sonIguales(valor,aux)){
                                tab[k][j] = valor+aux;
                                tab[k-1][j] = 0;
                                hayMovimiento = true;
                                indiceMaximo--;
                                indiceSuma = k;
								actualizarScore(valor+aux);
                                if(valor+aux==NUMERO_FINAL){
                                    ganarJuego();
                                }
                            }
                        }else{
                            tab[k][j] = valor;
                            tab[k-1][j] = 0;
                            hayMovimiento = true;
                            //$("#casilla"+(k+1)+""+j).fadeOut(2000);
                            //$("#casilla"+k+j).fadeIn(5000);
                        }
                        valor=tab[k][j];
                    }
                    //mostrarTablaConsola();
                }
                rellenarTabla();
            }
        }
        if(hayMovimiento) {
            rellenarNuevaCasillaAleatoria();
            $("#casilla" + numeroFila + numeroColumna).hide();
            $("#casilla" + numeroFila + numeroColumna).fadeIn(1000);
        }
    }

    function moverArriba(){
        recogerTabla();
        var hayMovimiento = false;
        for(var j=0;j<4;j++){
            indiceMinino = 0;
            indiceSuma =-1;
            for(var i=1;i<4;i++){
                var valor = tab[i][j];
                if(esNumeroDistintoCero(valor)){
                    for(var k=i-1;k>=indiceMinino;k--){
                        var aux = tab[k][j];
                        if(i==3 && esNumeroDistintoCero(tab[1][j]) && indiceSuma==1){
                            indiceMinino++;
                        }
                        if(i==3 && esNumeroDistintoCero(tab[1][j]) && esNumeroDistintoCero(tab[2][j])){
                            indiceMinino=2;
                        }
                        if(esNumeroDistintoCero(aux)){
                            if(sonIguales(valor,aux)){
                                tab[k][j] = valor+aux;
                                tab[k+1][j] = 0;
                                hayMovimiento = true;
                                indiceMinino++;
                                indiceSuma = k;
								actualizarScore(valor+aux);
                                if(valor+aux==NUMERO_FINAL){
                                    ganarJuego();
                                }
                            }
                        }else{
                            tab[k][j] = valor;
                            tab[k+1][j] = 0;
                            hayMovimiento = true;
                            //$("#casilla"+(k+1)+""+j).fadeOut(2000);
                            //$("#casilla"+k+j).fadeIn(5000);
                        }
                        valor=tab[k][j];
                    }
                    //mostrarTablaConsola();
                }
                rellenarTabla();
            }
        }
        if(hayMovimiento) {
            rellenarNuevaCasillaAleatoria();
            $("#casilla" + numeroFila + numeroColumna).hide();
            $("#casilla" + numeroFila + numeroColumna).fadeIn(1000);
        }
    }

    function moverDerecha(){
        recogerTabla();
        var hayMovimiento = false;
        for(var i=0;i<4;i++){
            indiceMaximo = 3;
            indiceSuma = -1;
            for(var j=2;j>=0;j--){
                var valor = tab[i][j];
                if(esNumeroDistintoCero(valor)){
                    for(var k=j+1;k<=indiceMaximo;k++){
                        var aux = tab[i][k];
                        if(j==0 && esNumeroDistintoCero(tab[i][2]) && indiceSuma==2){
                            indiceMaximo--;
                        }
                        if(j==0 && esNumeroDistintoCero(tab[i][2]) && esNumeroDistintoCero(tab[i][1])){
                            indiceMaximo=2;
                        }
                        if(esNumeroDistintoCero(aux)){
                            if(sonIguales(valor,aux)){
                                tab[i][k] = valor+aux;
                                tab[i][k-1] = 0;
                                hayMovimiento = true;
                                indiceMaximo--;
                                indiceSuma = k;
								actualizarScore(valor+aux);
                                if(valor+aux==NUMERO_FINAL){
                                    ganarJuego();
                                }
                            }
                        }else{
                            tab[i][k] = valor;
                            tab[i][k-1] = 0;
                            hayMovimiento = true;
                            //$("#casilla"+(k+1)+""+j).fadeOut(2000);
                            //$("#casilla"+k+j).fadeIn(5000);
                        }
                        valor=tab[i][k];
                    }
                    //mostrarTablaConsola();
                }
                rellenarTabla();
            }
        }
        if(hayMovimiento) {
            rellenarNuevaCasillaAleatoria();
            $("#casilla" + numeroFila + numeroColumna).hide();
            $("#casilla" + numeroFila + numeroColumna).fadeIn(1000);
        }

    }

    function moverIzquierda(){
        recogerTabla();
        var hayMovimiento = false;
        for(var i=0;i<4;i++){
            indiceMinino = 0;
            indiceSuma =-1;
            for(var j=1;j<4;j++){
                var valor = tab[i][j];
                if(esNumeroDistintoCero(valor)){
                    for(var k=j-1;k>=indiceMinino;k--){
                        var aux = tab[i][k];
                        if(j==3 && esNumeroDistintoCero(tab[i][1]) && indiceSuma==1){
                            indiceMinino++;
                        }
                        if(j==3 && esNumeroDistintoCero(tab[i][1]) && esNumeroDistintoCero(tab[i][2])){
                            indiceMinino=2;
                        }
                        if(esNumeroDistintoCero(aux)){
                            if(sonIguales(valor,aux)){
                                tab[i][k] = valor+aux;
                                tab[i][k+1] = 0;
                                hayMovimiento = true;
                                indiceMinino++;
                                indiceSuma = k;
								actualizarScore(valor+aux);
                                if(valor+aux==NUMERO_FINAL){
                                    ganarJuego();
                                }
                            }
                        }else{
                            tab[i][k] = valor;
                            tab[i][k+1] = 0;
                            hayMovimiento = true;
                            //$("#casilla"+(k+1)+""+j).fadeOut(2000);
                            //$("#casilla"+k+j).fadeIn(5000);
                        }

                        valor=tab[i][k];
                    }
                    //mostrarTablaConsola();
                }
                rellenarTabla();
            }
        }
        if(hayMovimiento) {
            rellenarNuevaCasillaAleatoria();
            $("#casilla" + numeroFila + numeroColumna).hide();
            $("#casilla" + numeroFila + numeroColumna).fadeIn(1000);
        }
    }

    function rellenarNuevaCasillaAleatoria(){
        var opciones = [2,2,4,2,2,2,4,2,2,2,2,2,2,2,2];
        var posicion = Math.floor(15*Math.random());
        var numero = opciones[posicion];
        var valor;
        var huecoVacio = false;

        for(var i=0;i<4;i++) {
            for (var j = 0; j < 4; j++) {
                valor = tab[i][j];
                if(valor == 0)
                    huecoVacio = true;
            }
        }

        if(huecoVacio) {
            do {
                numeroFila = Math.floor(4 * Math.random());
                numeroColumna = Math.floor(4 * Math.random());
                valor = tab[numeroFila][numeroColumna];
            } while (valor != 0);
            tab[numeroFila][numeroColumna] = numero;
            rellenarTabla();
        }
        else
            perderJuego();
    }


    function rellenarTabla(){
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                rellenarCasilla(tab[i][j],"casilla"+i+j);
            }
        }
    }

    function rellenarCasilla(valor,id) {
        var celda = document.getElementById(id);

        if(valor==0){
            celda.innerHTML = "";
        }else{
            celda.innerHTML = valor+"";
        }

        switch(valor){
            case 0:     celda.style.backgroundColor="#CCC0B3" ;break;
            case 2:     celda.style.backgroundColor="#EEE4DA";
                celda.style.color="#776E65";
                celda.style.fontSize="45px";
                celda.style.fontWeight="bold";
                break;
            case 4:     celda.style.backgroundColor="#EDE0C8";
                celda.style.color="#776E65";
                celda.style.fontSize="45px";
                celda.style.fontWeight="bold";
                break;
            case 8:     celda.style.backgroundColor="#F2B179";
                celda.style.fontSize="45px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 16:    celda.style.backgroundColor="#F59563";
                celda.style.fontSize="40px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 32:    celda.style.backgroundColor="#F67C5F";
                celda.style.fontSize="40px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 64:    celda.style.backgroundColor="#F65E3B";
                celda.style.fontSize="40px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 128:   celda.style.backgroundColor="#EDCF72";
                celda.style.fontSize="35px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 256:   celda.style.backgroundColor="#EDCC61";
                celda.style.fontSize="35px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 512:   celda.style.backgroundColor="#EDC850";
                celda.style.fontSize="35px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 1024:  celda.style.backgroundColor="#EDC53F";
                celda.style.fontSize="30px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
            case 2048:  celda.style.backgroundColor="#EDC22E";
                celda.style.fontSize="30px";
                celda.style.fontWeight="bold";
                celda.style.color="white";
                break;
        }
    }

    function mostrarTablaConsola(){
        var text="";
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                var valor = tab[i][j]
                if(valor<10){
                    text += valor+"    ";
                }else{
                    if(valor<100){
                        text += valor+"   ";
                    }else{
                        if(valor<1000){
                            text += valor+"  ";
                        }else{
                            text += valor+" ";
                        }
                    }
                }
            }
            text+="\n";
        }
        console.log(text+"\n");
    }

    function recogerTabla(){
        tab[0][0] = devolverNumeroCasilla("casilla00");
        tab[0][1] = devolverNumeroCasilla("casilla01");
        tab[0][2] = devolverNumeroCasilla("casilla02");
        tab[0][3] = devolverNumeroCasilla("casilla03");

        tab[1][0] = devolverNumeroCasilla("casilla10");
        tab[1][1] = devolverNumeroCasilla("casilla11");
        tab[1][2] = devolverNumeroCasilla("casilla12");
        tab[1][3] = devolverNumeroCasilla("casilla13");

        tab[2][0] = devolverNumeroCasilla("casilla20");
        tab[2][1] = devolverNumeroCasilla("casilla21");
        tab[2][2] = devolverNumeroCasilla("casilla22");
        tab[2][3] = devolverNumeroCasilla("casilla23");

        tab[3][0] = devolverNumeroCasilla("casilla30");
        tab[3][1] = devolverNumeroCasilla("casilla31");
        tab[3][2] = devolverNumeroCasilla("casilla32");
        tab[3][3] = devolverNumeroCasilla("casilla33");
    }

    function devolverNumeroCasilla(id){
        var contenido = document.getElementById(id).innerHTML;
        if(contenido.length==0){
            return 0;
        }
        return parseInt(contenido);
    }

    function sonIguales(a, b){
        return a==b;
    }

    function esNumeroDistintoCero(numero){
        if(numero!=0 && numero%2==0){
            return true;
        }
        return false;
    }

    function ganarJuego(){
        dialogConfirmPartidaGanada();
    }

    function perderJuego(){
        dialogConfirmPartidaPerdida();
    }

    /*************MOTION*****************/

    var watchID = null;
    function onLoad(){
        document.addEventListener("deviceready", onDeviceReady, false);
    }
    function onDeviceReady() {
        startWatch();
    }
    function startWatch() {
        // Vibrate for X seconds
        navigator.vibrate(1000);

        var options = { frequency: 1000 };
        watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    }
    function stopWatch() {
        if (watchID) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
        }
    }
    function onSuccess(acceleration) {

        if(acceleration.x >= 3) {
            alert("Izquierda " + acceleration.x);
            moverIzquierda();
        }
        else if(acceleration.x <= -3){
            alert("Derecha " + acceleration.x);
            moverDerecha()
        }
        else if(acceleration.y >= 7) {
            alert("Abajo " + acceleration.y);
            moverAbajo();
        }
        else if(acceleration.y <= -2) {
            alert("Arriba " + acceleration.y);
            moverArriba();
        }
    }
    function onError() {
        alert('onError!');
    }
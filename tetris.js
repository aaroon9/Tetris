var estadoActual = {
    actual: [
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0],
        ],
    statusTauler : 1,
    puntuacioJugador: 0,
    puntuacioMaxima: 0,
    piezaActual: function(){

    },
    piezaSig: function(){

    },
    contadorPieza: new Array(7),
    interval: 400,
    level: 1,
    lvlCont: 0,
    //parametro interval modificado hace que el juego vaya mas rapido*.
    //var corre = setInterval(jugar, this.interval);
    
    iniciarJuego: function(){
        
        var prime = this.calcSigPieza();
        this.piezaActual = new pieza(prime[0],prime[1], 0, 3);
        prime = this.calcSigPieza();
        this.piezaSig = new pieza(prime[0],prime[1], 0, 3);
        
    },
    calcSigPieza: function(){
        return GeneraPecaAleatoria();
    },
    fijarPieza: function(){
        
        for(var i = 0; i < this.actual.length; i++){
            for(var j = 0; j < this.actual[i].length; j++){
                if (this.actual[i][j] == "A"){
                    this.actual[i][j] = "P";
                }
            }
        }
    },
    borrarPieza: function(){
        //alert("borrar pieza");
        for(var i = 0; i < this.actual.length - 1; i++){
            for( var j = 0; j < this.actual[i].length; j++){
                if(this.actual[i][j] == "A"){
                    this.actual[i][j] = 0;
                }
            }
        }
    },
    mAuto: function(){
        //this.puntuacioJugador+=10;
        this.piezaActual.pintarMapa();
        this.piezaActual.moverAbajo();
        this.borrarPieza();
        if(this.posBuena()){
            //alert("pos buena");
            this.piezaActual.pintarMapa();
        }
        else{
            //alert("pos mala");
            this.lvlCont++;
            if(this.lvlCont % 10 == 0){
                this.level++;
            }
            this.puntuacioJugador+=10;
            this.piezaActual.moverArriba();
            this.piezaActual.pintarMapa();
            this.fijarPieza();
            this.comLinea();
            this.piezaActual = this.piezaSig;
            pa = this.calcSigPieza();
            this.piezaSig = new pieza(pa[0], pa[1], 0, 3);
        }
        
        
    },
    posBuena: function(){
      for(var i = 0; i < this.piezaActual.forma.length; i++){
          for(var j = 0; j < this.piezaActual.forma[i].length; j++){
              if(this.piezaActual.forma[i][j] != 0){
                  if( (this.piezaActual.x + i < 0) || (this.piezaActual.x + i > 24)){
                      return false;
                  }
                  if( (this.piezaActual.y + j < 0) || (this.piezaActual.y + j > 9)){
                      return false;
                  }           
                  if(this.actual[(this.piezaActual.x + i)][(this.piezaActual.y + j)] != 0){
                      return false;
                  }
              }
          }
      }
        return true;
    },
    comLinea: function(){
        var cont = 0;
        var linea = 0;
        for(var i = this.actual.length-1; i >= 0; i--){
            linea = i;
            for(var j = this.actual[i].length -1; j >= 0; j--){
                if(this.actual[i][j] == "P"){
                    cont++;
                }
            }
            if (cont == 10){
                for(var j = 9; j >= 0; j--){
                    this.actual[linea][j] = 0;
                }
                this.puntuacioJugador += 50;
                for(var k = linea - 1; k >= 0; k--){
                    for (var j = this.actual[k].length - 1; j >= 0; j--) {
                        if (this.actual[k][j] == "P") {
                            this.actual[k+1][j] = "P";
                        }
                        if (this.actual[k][j] == 0) {
                            this.actual[k+1][j] = 0;
                        }
                    }
                }
            }
            cont = 0;
        }
    },
    pintar: function(){
        var resul = "<table>";
        for(var i = 0; i < 25; i++){
            for(var k = 0; k < 10; k++){
                if(this.actual[i][k] == 0){
                   resul += "<img src='img/fondo.jpg' width=20; height=20;>"; 
                }else if(this.actual[i][k] == "A"){               
                    switch(this.piezaActual.color){
                           case "amarilla":
                               resul = resul + "<img src='img/amarillo.png' width=20; height=20;>";
                               break;
                           case "lila":
                               resul = resul + "<img src='img/lila.png' width=20; height=20;>";
                               break;
                           case "verde":
                               resul = resul + "<img src='img/verde.png' width=20; height=20;>";
                               break;
                           case "rojo":
                               resul = resul + "<img src='img/rojo.jpg' width=20; height=20;>";
                               break;
                           case "azul":
                               resul = resul + "<img src='img/azul.jpg' width=20; height=20;>";
                               break;
                           case "naranja":
                               resul = resul + "<img src='img/naranja.png' width=20; height=20;>";
                               break;
                           case "rosa":
                               resul = resul + "<img src='img/rosa.jpg' width=20; height=20;>";
                               break;
                       }
                    //resul+= "A";
                }else if(this.actual[i][k] == "P"){
                    resul+= "<img src='img/fichaFija.jpg' width=20; height=20;>";
                }
                //resul += " ";
            }
            resul += "<br>";
        }
        resul += "</table>";
        return resul;
    }
}
/*----Objecto Pieza----*/
var pieza = function(forma, color, x, y){ 
    this.forma = forma;
    this.color = color;
    this.x = x;  
    this.y = y;
};
//Funcion que ereda de pieza y se encarga de printar en una tabla la forma de la pieza que se ha elegido.
pieza.prototype.pintarPieza = function(){
    var resultat = "<table>";
           for (var i = 0; i < this.forma.length;i++)
            { resultat = resultat + "<tr>"
                for (var j = 0; j<this.forma[i].length;j++) 
                 { resultat = resultat + "<td>";
                   if (this.forma[i][j]==1) { 
                       switch(this.color){
                           case "amarilla":
                               resultat = resultat + "<img src='img/amarillo.png' width=20; height=20;>";
                               break;
                           case "lila":
                               resultat = resultat + "<img src='img/lila.png' width=20; height=20;>";
                               break;
                           case "verde":
                               resultat = resultat + "<img src='img/verde.png' width=20; height=20;>";
                               break;
                           case "rojo":
                               resultat = resultat + "<img src='img/rojo.jpg' width=20; height=20;>";
                               break;
                           case "azul":
                               resultat = resultat + "<img src='img/azul.jpg' width=20; height=20;>";
                               break;
                           case "naranja":
                               resultat = resultat + "<img src='img/naranja.png' width=20; height=20;>";
                               break;
                           case "rosa":
                               resultat = resultat + "<img src='img/rosa.jpg' width=20; height=20;>";
                               break;
                       }
                       //resultat=resultat+"X" 
                   }
                    else { 
                        resultat = resultat + "<img src='img/blanco.png' width=20; height=20;>" 
                    };
                   resultat = resultat + "</td>";
                   }
                
              resultat = resultat + "</tr>";
              }
            resultat = resultat + "</table>";
            return resultat;
};

pieza.prototype.pintarMapa = function(){
    
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4 ; j++){
            if(this.forma[i][j] == 1){
                estadoActual.actual[this.x + i][this.y + j] = "A";
            }
        }
    }
}

//Funcion que se encarga de elegir la forma de la pieza aleatoriamente.
function GeneraPecaAleatoria(){
    var peces = [
                 [[[0,0,0,0],
                   [0,1,1,0],
                   [0,1,1,0],
                   [0,0,0,0]],"amarilla"],
                 [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],"lila"],
                 [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],"verde"],
                 [[[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]],"rojo"],
                 [[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],"azul"],
                 [[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],"naranja"],
                 [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],"rosa"] ]
           var numeroAleatori = Math.round(Math.random()*6);                      
           return peces[numeroAleatori];     
}

//console.log(GeneraPecaAleatoria());
//Funcion que hereda el objeto "pieza" para generar una tabla a partir de haber generado una pieza aleatoria con la funcion "GeneraPecaAleatoria()".
/*pieza.prototype.pintar = function(){ var resultat = "<table border='1'>";
           for (var i = 0; i < this.forma.length;i++)
            { resultat = resultat + "<tr>"
                for (var j = 0; j<this.forma[i].length;j++) 
                 { resultat = resultat + "<td>";
                   if (this.forma[i][j]==1) { resultat=resultat+"X" }
                    else { resultat = resultat + "-" };
                   resultat = resultat + "</td>";
                   }
              resultat = resultat + "</tr>";
              }
            resultat = resultat + "</table>";
            return resultat;
           };*/

//Funcion que implementa el movimiento de la pieza hacia la derecha, siempre y cuando la columna hacia esa direccion no sea menor a 0(TABLERO).
pieza.prototype.moverDerecha = function(){
    if ((this.y+1)>=0) { 
        this.y++;
        return true;
    }
    else { 
        return false;
    };
};

//Funcion que implementa el movimiento de la pieza hacia la izquierda, siempre que la posicion siguiente(COLUMNAS) no sea superior a 14(TABLERO).
pieza.prototype.moverIzquierda = function(){
    if ((this.y-1)<10) { 
        this.y--;
        return true;
   }
   else { 
       return false;
   };
};

pieza.prototype.rotarDerecha = function () {
            var formaNova = new Array();
            for (var i=0;i<this.forma.length;i++) {
                formaNova[i]=new Array();
                for (var j=0;j<this.forma[i].length;j++) {
                    formaNova[i][j]=this.forma[this.forma[i].length-1-j][i];
                }
            }
            this.forma = formaNova;
};

pieza.prototype.rotarIzquierda = function(){
    p.rotarDreta();
    p.rotarDreta();
    p.rotarDreta();
}

pieza.prototype.moverAbajo = function(){
    if ((this.x+1)<25) { 
        this.x++;
        return true;
    }
    else { 
        return false;
    }
}

pieza.prototype.moverArriba = function(){
    this.x--;
}
           
//var pa = GeneraPecaAleatoria();
//var pa2 = GeneraPecaAleatoria();
//var primeraMapa = estadoActual.piezaActual();
//var segundaMapa = estadoActual.piezaSig();
var element = document.getElementById("all");
document.onkeydown = teclas;


//Funcio encarregada de llegir la direccio introduida per teclat
//- Assigna la direccio introduida a una variable
function teclas(e) {
   var tecla = document.all ? e.which : e.key;
    console.log(e);
     estadoActual.borrarPieza();
   //La direccio a dalt i a baix estan invertides!
   if (tecla == "ArrowDown") {
       estadoActual.puntuacioJugador++;
        estadoActual.piezaActual.moverAbajo();
            if(!estadoActual.posBuena()){
                estadoActual.piezaActual.moverArriba();
            }
       
   }
   if (tecla == "ArrowRight") {
        estadoActual.piezaActual.moverDerecha();
            if(!estadoActual.posBuena()){
                estadoActual.piezaActual.moverIzquierda();
            }
       
    }
   if (tecla === "ArrowLeft") {
       estadoActual.piezaActual.moverIzquierda();
       //console.log(estadoActual.posBuena());
           if(!estadoActual.posBuena()){
                estadoActual.piezaActual.moverDerecha();
            }
       
   }
   if (tecla == "ArrowUp") {
       var cont = 0;
            if(cont % 2 == 0){
                estadoActual.piezaActual.rotarDerecha();
                if(!estadoActual.posBuena()){
                    if(estadoActual.piezaActual.y < 0){
                        estadoActual.piezaActual.moverDerecha();
                        estadoActual.piezaActual.rotarIzquierda();
                    }else{
                        estadoActual.piezaActual.moverIzquierda();
                        estadoActual.piezaActual.rotarIzquierda();
                    }
                }
                cont++;
            }
            else{
                estadoActual.piezaActual.rotarIzquierda();
                if(!estadoActual.posBuena()){
                    if(estadoActual.piezaActual.y < 0){
                        estadoActual.piezaActual.moverDerecha();
                        estadoActual.piezaActual.rotarIzquierda();
                    }else{
                        estadoActual.piezaActual.moverIzquierda();
                        estadoActual.piezaActual.rotarIzquierda();
                    }
                }
                cont++;
            }
       
   }
    estadoActual.piezaActual.pintarMapa();
}
       

//Funcions que se ejecutaran despues de leer el archivo HTML 
window.onload = function(){ 
    
    estadoActual.iniciarJuego();
    var jugar = setInterval(juego, estadoActual.interval);
    //var jugar = setInterval(juego, 1000);

};
function juego(){
    document.getElementById("piezaActual").innerHTML = estadoActual.piezaActual.pintarPieza();
    document.getElementById("piezaSig").innerHTML = estadoActual.piezaSig.pintarPieza();
    //document.getElementById("pos").innerHTML = estadoActual.piezaActual.x;
    //document.getElementById("pos2").innerHTML = estadoActual.piezaActual.y;
    document.getElementById("puntuacion").innerHTML = estadoActual.puntuacioJugador;
    document.getElementById("level").innerHTML = estadoActual.level;
    document.getElementById("tetris").innerHTML = estadoActual.pintar();
    estadoActual.mAuto();
}

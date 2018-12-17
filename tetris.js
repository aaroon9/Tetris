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
    puntuacioJugador : 0,
    puntuacioMaxima: 0,
    piezaActual: function(){

    },
    piezaSig: function(){

    },
    contadorPieza: new Array(7),
    interval: 500,
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
    teclas: function(){
        
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
            for( var j = 0; j < this.actual[i].length - 1; j++){
                if(this.actual[i][j] == "A"){
                    this.actual[i][j] = 0;
                }
            }
        }
    },
    mAuto: function(){
        
        this.piezaActual.pintarMapa();
        this.piezaActual.moverAbajo();
        this.borrarPieza();
        if(this.posBuena()){
            //alert("pos buena");
            this.piezaActual.pintarMapa();
        }
        else{
            //alert("pos mala");
            this.piezaActual.moverArriba();
            this.piezaActual.pintarMapa();
            this.fijarPieza();
            this.piezaActual = this.piezaSig;
            pa = this.calcSigPieza();
            this.piezaSig = new pieza(pa[0], pa[1], 0, 3);
        }
        
        
    },
    posBuena: function(){
      for(var i = 0; i < this.piezaActual.forma.length; i++){
          for(var j = 0; j < this.piezaActual.forma[i].length; j++){
              if(this.piezaActual.forma[i][j] != 0){
                  if( this.piezaActual.x + i < 0 || this.piezaActual.x + i > 24){
                      return false;
                  }
                  if( this.piezaActual.y + j < 0 || this.piezaActual.y + j > 9){
                      return false;
                  }
                  if(this.actual[this.piezaActual.x + i][this.piezaActual.y + j] != 0){
                      return false;
                  }
              }
          }
      }
        return true;
    },
    pintar: function(){
        var resul = "<table>";
        for(var i = 0; i < 25; i++){
            for(var k = 0; k < 10; k++){
                if(this.actual[i][k] == 0){
                   resul += "0"; 
                }else if(this.actual[i][k] == "A"){
                    resul+= "A";
                }else if(this.actual[i][k] == "P"){
                    resul+= "P";
                }
                resul += " ";
            }
            resul += "<br>";
        }
        resul += "</table>";
        return resul;
    }
}

var pieza = function(forma, color, x, y){ 
    this.forma = forma;
    this.color = color;
    this.x = x;  
    this.y = y;
};
//Funcion que ereda de pieza y se encarga de printar en una tabla la forma de la pieza que se ha elegido.
pieza.prototype.pintarPieza = function(){
    var resultat = "<table border='1'>";
           for (var i = 0; i < this.forma.length;i++)
            { resultat = resultat + "<tr>"
                for (var j = 0; j<this.forma[i].length;j++) 
                 { resultat = resultat + "<td>";
                   if (this.forma[i][j]==1) { 
                       resultat=resultat+"X" 
                   }
                    else { 
                        resultat = resultat + "0" 
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
        for(var j = 0; j < 4; j++){
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
                 [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],"morado"] ]
           var numeroAleatori = Math.round(Math.random()*6);                      
           return peces[numeroAleatori];     
}

//console.log(GeneraPecaAleatoria());
//Funcion que hereda el objeto "pieza" para generar una tabla a partir de haber generado una pieza aleatoria con la funcion "GeneraPecaAleatoria()".
pieza.prototype.pintar = function(){ var resultat = "<table border='1'>";
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
           };

//Funcion que implementa el movimiento de la pieza hacia la derecha, siempre y cuando la columna hacia esa direccion no sea menor a 0(TABLERO).
pieza.prototype.moverDerecha = function(){
    if ((x+1)>0) { 
        x++;
        return true;
    }
    else { 
        return false;
    };
};

//Funcion que implementa el movimiento de la pieza hacia la izquierda, siempre que la posicion siguiente(COLUMNAS) no sea superior a 14(TABLERO).
pieza.prototype.moverIzquierda = function(){
    if ((x-1)<10) { 
        x--;
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
           
var pa = GeneraPecaAleatoria();
var pa2 = GeneraPecaAleatoria();
var primeraMapa = estadoActual.piezaActual();
var segundaMapa = estadoActual.piezaSig();
//primeraMapa.pintarMapa(primeraMapa);
//var segunda = estadoActual.piezaSig;

//document.write(p.pintar());        

//Funcions que se ejecutaran despues de leer el archivo HTML 
window.onload = function(){ 

    //document.getElementById("original").innerHTML = primera.pintarPieza();
    //primera.rotarDreta();
    //document.getElementById("rDreta").innerHTML = primera.pintarPieza();
    //primera.rotarEsquerra(primera);
    //document.getElementById("rEsquerra").innerHTML = primera.pintarPieza();
    //primera.pintarMapa(primera);
    document.getElementById("piezaActual").innerHTML = estadoActual.piezaActual.pintarPieza();
    document.getElementById("piezaSig").innerHTML = estadoActual.piezaSig.pintarPieza();
    document.getElementById("tetris").innerHTML = estadoActual.pintar();
    //estadoActual.piezaActual.pintarMapa();
    estadoActual.mAuto();

    //document.getElementById("tetris").innerHTML = segunda.pintar();
};
estadoActual.iniciarJuego();
var jugar = setInterval(window.onload, estadoActual.interval);
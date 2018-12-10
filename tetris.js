var estadoActual = function(){
    var actual = new Array(25);
        actual[00] = [0,0,0,0,0,0,0,0,0,0];
        actual[01] = [0,0,0,0,0,0,0,0,0,0];
        actual[02] = [0,0,0,0,0,0,0,0,0,0];
        actual[03] = [0,0,0,0,0,0,0,0,0,0];
        actual[04] = [0,0,0,0,0,0,0,0,0,0];
        actual[05] = [0,0,0,0,0,0,0,0,0,0];
        actual[06] = [0,0,0,0,0,0,0,0,0,0];
        actual[07] = [0,0,0,0,0,0,0,0,0,0];
        actual[08] = [0,0,0,0,0,0,0,0,0,0];
        actual[09] = [0,0,0,0,0,0,0,0,0,0];
        actual[10] = [0,0,0,0,0,0,0,0,0,0];
        actual[11] = [0,0,0,0,0,0,0,0,0,0];
        actual[12] = [0,0,0,0,0,0,0,0,0,0];
        actual[13] = [0,0,0,0,0,0,0,0,0,0];
        actual[14] = [0,0,0,0,0,0,0,0,0,0];
        actual[15] = [0,0,0,0,0,0,0,0,0,0];
        actual[16] = [0,0,0,0,0,0,0,0,0,0];
        actual[17] = [0,0,0,0,0,0,0,0,0,0];
        actual[18] = [0,0,0,0,0,0,0,0,0,0];
        actual[19] = [0,0,0,0,0,0,0,0,0,0];
        actual[20] = [0,0,0,0,0,0,0,0,0,0];
        actual[21] = [0,0,0,0,0,0,0,0,0,0];
        actual[22] = [0,0,0,0,0,0,0,0,0,0];
        actual[23] = [0,0,0,0,0,0,0,0,0,0];
        actual[24] = [0,0,0,0,0,0,0,0,0,0];
    statusTauler: 1;
    puntuacioJugador: 0;
    puntuacioMaxima: 0;
    piezaActual: "new Object";
    piezaSig: "new Object";
    contadorPieza: new Array(7);
    interval: 1000;
    //parametro interval modificado hace que el juego vaya mas rapido*.
    //var corre = setInterval(jugar, this.interval);
    
    /*iniciarJuego: function(){
        
    }
    calcSigPieza: function(){
        
    }
    teclas: function(){
        
    }
    mAuto: function(interval){
        
    } */ 
}

var pieza = function(forma, color){ 
    this.forma = forma;
    this.color = color;
    //this.x = x;  
    //this.y = y;
};

pieza.prototype.pintar = function(){
    var resultat = "<table border='1'>";
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

function GeneraPecaAleatoria(){
    var peces = [
                 [[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],"amarilla"],
                 [[[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],"lila"],
                 [[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],"verde"],
                 [[[0,0,0,0],[0,1,1,0],[0,0,1,1],[0,0,0,0]],"rojo"],
                 [[[0,1,0,0],[0,1,0,0],[0,1,1,0],[0,0,0,0]],"azul"],
                 [[[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,0,0,0]],"naranja"],
                 [[[0,0,0,0],[1,1,1,0],[0,1,0,0],[0,0,0,0]],"morado"] ]
           var numeroAleatori = Math.round(Math.random()*6);                      
           return peces[numeroAleatori];     
}

console.log(GeneraPecaAleatoria());
//Funcion que hereda el objeto "pieza" para generar una tabla a partir de haber generado una pieza aleatoria con la funcion "GeneraPecaAleatoria()".
       pieza.prototype.pintar = function()
         { var resultat = "<table border='1'>";
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
    if ((x-1)>0) { 
        x--;
        return true;
    }
    else { 
        return false;
    };
};
//Funcion que implementa el movimiento de la pieza hacia la izquierda, siempre que la posicion siguiente(COLUMNAS) no sea superior a 14(TABLERO).
pieza.prototype.moverIzquierda = function(){
    if ((x+1)<14) { 
        x++;
        return true;
   }
   else { 
       return false;
   };
};

pieza.prototype.rotarDreta = function () {
            var formaNova = new Array();
            for (var i=0;i<this.forma.length;i++) {
                formaNova[i]=new Array();
                for (var j=0;j<this.forma[i].length;j++) {
                    formaNova[i][j]=this.forma[this.forma[i].length-1-j][i];
                }
            }
            this.forma = formaNova;
};
pieza.prototype.rotarEsquerra = function(){
    pieza.rotarDreta();
    pieza.rotarDreta();
    pieza.rotarDreta();
}
           
var pa = GeneraPecaAleatoria();
var p = new pieza(pa[0],pa[1]);
//document.write(p.pintar());        

//Funcions que se ejecutaran despues de leer el archivo HTML 
window.onload = function(){ 

         document.getElementById("original").innerHTML = p.pintar();
        p.rotarDreta();
    document.getElementById("rDreta").innerHTML = p.pintar();
    p.rotarEsquerra();
    document.getElementById("rEsquerra").innerHTML = p.pintar();
};
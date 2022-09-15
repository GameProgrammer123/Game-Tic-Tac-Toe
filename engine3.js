var
   zajete_pola = 0, i, j, tpoldlugosc = 0, nr_wiersza, nr_kolumny; 

console.log(nmax);

var gra = new Array(nmax);

function make2darray(rows, cols) {
  for (var i = 0; i < rows; ++i) {
    gra[i] = new Array(cols);
  }
}

make2darray(nmax,nmax);    

var tpol = new Array(nmax*nmax);

function Wyg(wsk_linii,znak_wyg){
var
  r,c,z;

     nr_wiersza = null; nr_kolumny = null;
     
	 for(r = 0; r < nmax; ++r){ 
	   z = 0;
       for(c = 0; c < nmax; ++c)
	    if (wsk_linii[r][c] === znak_wyg) z = z + 1;
          if (z === nmax) { nr_wiersza = r; /* wiersz */ break;  }
}

  if (z === nmax) return true;



     for(c = 0; c < nmax; ++c){
      z = 0;
      for(r = 0; r < nmax; ++r)
       if (wsk_linii[r][c] === znak_wyg) z = z + 1;
	 if (z === nmax){ nr_kolumny = c;  /* kolumna */ break;}
	 }

    if (z === nmax) return true;
    
    z = 0;
	 
     for(r = 0; r < nmax; ++r)
      if (wsk_linii[r][r] === znak_wyg) z = z + 1;
	   if (z === nmax){ nr_wiersza = r; nr_kolumny = r ; console.log(nr_wiersza+' 1: '+nr_kolumny); return true; /* przekatna nr. 1 */ }
	   
     z = 0;
	 
    for(r = 0; r < nmax; ++r)
	  if (r < nmax)
       if (wsk_linii[r][(nmax-1)-r] === znak_wyg) z = z + 1;
	    if (z === nmax){ nr_wiersza = r; nr_kolumny = (nmax-1) - r; console.log(nr_wiersza+' 2: '+nr_kolumny); return true; /* przekatna nr. 2 */ }
}

var obj1 = { zatrzymanie: false }

function MiniMax(tablica_gry, znak_gracza, ilosc_zajetych_pol, deep, alfa, beta, glebokosc, obj){
var
   m, mmx, fi, fj;

     if (Wyg(tablica_gry,X) === true){ return 100 - deep; }
      else
          if (Wyg(tablica_gry,O) === true){ return -1; }
          else
              if ((ilosc_zajetych_pol === (nmax*nmax)) || (glebokosc === 4 && nmax > 3)){ return 0; }
              else
                if (obj.zatrzymanie === false){
					if (znak_gracza === X) znak_gracza = O 
					else znak_gracza = X;
                    
					if (znak_gracza === X) mmx = -10 
					else mmx = 10;
                    
					for(fi = 0; fi < nmax; ++fi){
					  for(fj = 0; fj < nmax; ++fj)
                        if (tablica_gry[fi][fj] === null){
						  tablica_gry[fi][fj] = znak_gracza;
						
						
						m = MiniMax(tablica_gry,znak_gracza,ilosc_zajetych_pol+1,deep+1,alfa,beta,glebokosc+1,obj);
						
						if (glebokosc === 4 && nmax > 3) obj.zatrzymanie = true;
						tablica_gry[fi][fj] = null;
						if (znak_gracza === X){
						if (mmx < m){ 
						  mmx = m;
                          alfa = m;
                        }
                       } else if (m < mmx){ 
					            mmx = m;
                                beta = m
							   }

                    if (glebokosc === 0) obj.zatrzymanie = false;

                    if (beta <= alfa) break;
                    
					if ((obj.zatrzymanie === true) && (glebokosc > 0)) break;
					  }
                    if (beta <= alfa) break;
                    
					if ((obj.zatrzymanie === true) && (glebokosc > 0)) break;
					}
                       return mmx;
				}
}

function Nr_Wezla(w,k){
   return w * nmax + k;
}

function RuchKomputera(tab_gry, liczba_pol){
var
   fi, fj, sp, m, mmx = -10, fieldNumber; obj1.zatrzymanie = false;
   // tpoldlugosc = 0;
   
   if (Wyg(tab_gry,X) !== true && Wyg(tab_gry,O) !== true)
     for(fi = 0; fi < nmax; ++fi){
       for(fj = 0; fj < nmax; ++fj)
        if(tab_gry[fi][fj] === null){
		  tab_gry[fi][fj] = X;
		  m = MiniMax(tab_gry,X,liczba_pol+1,0,-10,10,0,obj1);
		  tab_gry[fi][fj] = null;
          if (mmx <= m){
		   if((mmx < m && m > 0) || (mmx < m && m === 0)){
			tpoldlugosc = 0; tpol.length = tpoldlugosc;
			// debugger;
           }
		   tpoldlugosc = tpoldlugosc + 1;
		   tpol.push(Nr_Wezla(fi,fj));
           // tpol[tpoldlugosc] = Nr_Wezla(fi,fj);
           /* for(sp = 0; sp < tpoldlugosc; ++sp)
            console.log(tpol[sp]); */
		   console.table(tpol);
           mmx = m;
           fieldNumber = Nr_Wezla(fi,fj);
		   // debugger;
           }
        }
       if (obj1.zatrzymanie === true) break;
     }
   
  return fieldNumber;
}

var obj2 = { wsp_y: 0, wsp_x: 0 }

function Wspolrzedne(nr_pola,obj){
var
     ResultFunction = false;
	 
	 obj.wsp_y = nr_pola / nmax;
	 obj.wsp_x = nr_pola % nmax;
	 console.log('wsp1: '+obj.wsp_y+' '+obj.wsp_x);
	 obj.wsp_y = Math.floor(obj.wsp_y);  obj.wsp_x = Math.floor(obj.wsp_x);
	 console.log('wsp2: '+obj.wsp_y+' '+obj.wsp_x);
	 if (gra[obj.wsp_y][obj.wsp_x] === null) ResultFunction = true;
	 
	 return ResultFunction;
}

function RandomNumberInTheRange(min,max){
  return Math.floor(Math.random()*(max+1-min)+min);
}
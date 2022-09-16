var
  edgespace, elemsquare, numsquare, realSizeFont, numberTagP = 0, widthDiv, heightDiv;
  
 for(var i = 0; i < nmax; ++i)
  for(var j = 0; j < nmax; ++j)
   gra[i][j] = null; 
 
function bestMove(board,filledField){
  RuchKomputera(board,filledField);
  console.table(tpol);
  var valueOfField = tpol[RandomNumberInTheRange(0,tpol.length - 1)];
  Wspolrzedne(valueOfField,obj2);
  board[obj2.wsp_y][obj2.wsp_x] = X;
  console.table(board);
  document.getElementById(valueOfField).innerHTML = '<p class="circle" id="'+'p'+valueOfField+'">'+X+'</p>';
  insertSign('p'+valueOfField,valueOfField);
}

function graphicWin(){
	var numberField;
	for(var wi = 0; wi < nmax; ++wi){
	  for(var wj = 0; wj < nmax; ++wj){
		if(wi < nmax && wj < nmax){
		 if (Wyg(gra,X) || Wyg(gra,O)){
		  if (nr_wiersza === wi && nr_kolumny === null){
			if(wi === nr_wiersza){  
			numberField = Nr_Wezla(wi,wj);
			// alert('row :'+numberField);
			document.getElementById(numberField).style.color = 'red';
			}
		   } else if (nr_kolumny === wj && nr_wiersza === null){
			        if(wj === nr_kolumny){
			        numberField = Nr_Wezla(wi,wj);
					// alert('col :'+numberField);
			        document.getElementById(numberField).style.color = 'red';
					}
		          }
		 }
        }
	  }
	 if(wi < nmax && wj === nmax){
	  // alert('skos');
	  if (wj === nmax) wj = nmax - 1;
	  if (Wyg(gra,X) || Wyg(gra,O)){
	   if (nr_wiersza - nr_kolumny === 0 && nr_wiersza !== null && nr_kolumny !== null){
	    // alert('/\/'); 
        numberField = Nr_Wezla(wi,wi);
	    // alert('przekatna1: '+numberField);
	    document.getElementById(numberField).style.color = 'red';
	   } else if (nr_wiersza === nmax && nr_kolumny === -1){
			   // alert('/');
		      // if(wi + wj === nmax - 1){
                  numberField = Nr_Wezla(wi,wj-wi);
				  // alert('przekatna2: '+numberField);
				  document.getElementById(numberField).style.color = 'red';
		       // }
	          }
	  }
	 }
    }
}














function smallsquare(num,fieldMax){
  var numsquare = 0, mleft = 0, mtop = 0;
  for(var j = 0; j < fieldMax; ++j){
   elemsquare = document.createElement("div");
   elemsquare.classList.add('field');
   var numberField = Nr_Wezla(num,j);
   // if(numberField % 2 === 0) elemsquare.style.background = 'grey'
   if(fieldMax % 2 === 0 && num % 2 !== 0)
    if(j % 2 !== 0) elemsquare.style.background = 'white'
    else elemsquare.style.background = 'grey'
   else if (fieldMax % 2 === 0){ 
	     if(j % 2 !== 0) elemsquare.style.background = 'grey';
		} else if(numberField % 2 === 0) elemsquare.style.background = 'white'
			   else elemsquare.style.background = 'grey'; 
   elemsquare.setAttribute('id',numberField);
   /* elemsquare.onmouseover = function(){ funkcja1(this.id); }
   elemsquare.onmouseout = function(){ funkcja2(this.id); } */
   elemsquare.onclick = function(){
	if(document.getElementById(this.id).textContent === '' && Wyg(gra,X) !== true && zajete_pola < nmax * nmax){
	document.getElementById(this.id).innerHTML = '<p class="circle" id="'+'p'+this.id+'">'+O+'</p>';
	var TagPId = 'p'+this.id; numberTagP = numberTagP + 1;
	Wspolrzedne(this.id,obj2);
	gra[obj2.wsp_y][obj2.wsp_x] = O;
	zajete_pola = zajete_pola + 1;
	insertSign(TagPId,this.id);
	if(zajete_pola < nmax * nmax){
	tpol.length = 0;
	bestMove(gra,zajete_pola);
	zajete_pola = zajete_pola + 1;
	/* WidthDiv = document.getElementById(1).clientWidth;
	heightDiv = document.getElementById(1).clientHeight; */
	graphicWin();
	}
	} else
		if (document.getElementById(this.id).textContent !== '' && Wyg(gra,X) !== true && zajete_pola < nmax * nmax) alert('Field filled')
		else
			if (zajete_pola === nmax * nmax && Wyg(gra,X) !== true) alert('Draw !!!')
			else alert('WON: '+X+' !!!');
   }
   elemsquare.style.position = 'absolute';
   elemsquare.style.left = edgespace + mleft+'%';
   // elemsquare.style.top = mtop+'%';
   elemsquare.style.width = (100 / fieldMax) +'%';
   elemsquare.style.height = 100+'%';
   numsquare = numsquare + 1;
   div = document.querySelector('.box'+num);
   elemsquare.style.border = '1px solid #000000';
   div.appendChild(elemsquare);
   mleft = mleft + (100 / fieldMax);
   }
}
function drawBoard(sizemax){
	var numbersquare = 0, marleft = 0, martop = 0;
	for(var i = 0; i < sizemax; ++i){
	 edgespace = 0;
	 elemsquare = document.createElement("div");
     elemsquare.classList.add('box'+numbersquare);
     elemsquare.style.position = 'absolute';
     elemsquare.style.left = edgespace + marleft+'%';
	 elemsquare.style.top = martop+'%';
     elemsquare.style.width = 100 + '%';
	 elemsquare.style.height = 100 / sizemax + '%';
	 const div = document.querySelector(".board-of-game");
     div.appendChild(elemsquare);
	 smallsquare(i,sizemax);
	 // marleft = marleft + (100 / sizemax);
    //  if(i % sizemax === 0){
     martop = martop + (100 / sizemax); marleft = 0;
	 console.log(martop);
	 // }
	numbersquare = numbersquare + 1;
	}
}
function middleOfElement(numberID){
// console.log(heightDiv+' i '+heightP);
var elementDiv = document.getElementById(numberID);
if(widthDiv >= heightDiv) elementDiv.style.top = ((50/100)*widthDiv) - (heightDiv/2)  + 'px'
else elementDiv.style.top = ((50/100)*heightDiv) - (widthDiv/2)  + 'px';
var variable = elementDiv.style.top;
console.log('variable: '+variable);
}

function insertSign(numberIdTagP,numberIdTagDiv){
  widthDiv  = document.getElementById(numberIdTagDiv).clientWidth;
  heightDiv = document.getElementById(numberIdTagDiv).clientHeight;
  var fieldP = document.getElementById(numberIdTagP);
  if (heightDiv < widthDiv) realSizeFont = heightDiv
  else realSizeFont = widthDiv; 
  fieldP.style.fontSize = realSizeFont+'px';
  fieldP.style.lineHeight = realSizeFont+'px';
  fieldP.style.position = 'relative';
  fieldP.style.margin = 0;
  middleOfElement(numberIdTagP);
  console.log(realSizeFont);
}

function getElementsSize(){
setTimeout(() => {
	/* widthDiv = document.getElementById(1).clientWidth;
	heightDiv = document.getElementById(1).clientHeight; */
	for(var numberIdPTag = 0; numberIdPTag < nmax*nmax; ++numberIdPTag){
	 var numberTagPID = 'p'+numberIdPTag;
	 if(document.getElementById(numberIdPTag).textContent === O || document.getElementById(numberIdPTag).textContent === X){
	  insertSign(numberTagPID,numberIdPTag);
	 }
	}
}, 1000);
}

// call function
drawBoard(nmax);


if(startGame === 'Computer'){
  console.log('First Computer');
  bestMove(gra,zajete_pola);
  zajete_pola = 1;
   
} else {
	 console.log('First Player');
   }



window.addEventListener('resize',getElementsSize);



getElementsSize();

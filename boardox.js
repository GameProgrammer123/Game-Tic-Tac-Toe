var
  edgespace, elemsquare, numsquare, realSizeFont, numberTagP = 0, widthDiv, heightDiv;

document.getElementById("maxNumberFields").value = nmax.toString();
document.getElementById("level").value = gameLevel;
$('input:radio[name="sign"]').val(['signPlayer']);

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
			setTimeout(function(){
			document.getElementsByClassName('gameover')[0].style.visibility = 'visible';
			if(Wyg(gra,X)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON COMPUTER !!!</span></p>';
			if(Wyg(gra,O)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON PLAYER !!!</span></p>';
			document.getElementsByClassName('board-of-game')[0].style.opacity = '0.5';},1000);
			}
		   } else if (nr_kolumny === wj && nr_wiersza === null){
			        if(wj === nr_kolumny){
			        numberField = Nr_Wezla(wi,wj);
					// alert('col :'+numberField);
			        document.getElementById(numberField).style.color = 'red';
					setTimeout(function(){
					document.getElementsByClassName('gameover')[0].style.visibility = 'visible';
					if(Wyg(gra,X)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON COMPUTER !!!</span></p>';
					if(Wyg(gra,O)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON PLAYER !!!</span></p>';
					document.getElementsByClassName('board-of-game')[0].style.opacity = '0.5';},1000);
					}
		          }
		 } else if(zajete_pola === nmax * nmax){
				setTimeout(function(){
			    document.getElementsByClassName('gameover')[0].style.visibility = 'visible';
				document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>DRAW !!!</span></p>';
				document.getElementsByClassName('board-of-game')[0].style.opacity = '0.5';},1000);
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
		setTimeout(function(){
		document.getElementsByClassName('gameover')[0].style.visibility = 'visible';
		if(Wyg(gra,X)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON COMPUTER !!!</span></p>';
		if(Wyg(gra,O)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON PLAYER !!!</span></p>';
		document.getElementsByClassName('board-of-game')[0].style.opacity = '0.5';},1000);
	   } else if (nr_wiersza === nmax && nr_kolumny === -1){
			   // alert('/');
		      // if(wi + wj === nmax - 1){
                  numberField = Nr_Wezla(wi,wj-wi);
				  // alert('przekatna2: '+numberField);
				  document.getElementById(numberField).style.color = 'red';
				  setTimeout(function(){
				  document.getElementsByClassName('gameover')[0].style.visibility = 'visible';
				  if(Wyg(gra,X)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON COMPUTER !!!</span></p>';
				  if(Wyg(gra,O)) document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>WON PLAYER !!!</span></p>';
				  document.getElementsByClassName('board-of-game')[0].style.opacity = '0.5';},1000);
		       // }
	          }
	  } else  if(zajete_pola === nmax * nmax){
		        setTimeout(function(){
			    document.getElementsByClassName('gameover')[0].style.visibility = 'visible';
				document.getElementsByClassName('gameover')[0].innerHTML = '<p style="display: grid"><span>GAME OVER !!!</span><span>DRAW !!!</span></p>';
				document.getElementsByClassName('board-of-game')[0].style.opacity = '0.5';},1000);
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
	if(document.getElementById(this.id).textContent === '' && Wyg(gra,X) !== true && Wyg(gra,O) !== true && zajete_pola < nmax * nmax){
	document.getElementById(this.id).innerHTML = '<p class="circle" id="'+'p'+this.id+'">'+O+'</p>';
	var TagPId = 'p'+this.id; numberTagP = numberTagP + 1;
	Wspolrzedne(this.id,obj2);
	gra[obj2.wsp_y][obj2.wsp_x] = O;
	zajete_pola = zajete_pola + 1;
	insertSign(TagPId,this.id);
	if(zajete_pola < nmax * nmax && Wyg(gra,O) !== true){
	tpol.length = 0;
	bestMove(gra,zajete_pola);
	zajete_pola = zajete_pola + 1;
	/* WidthDiv = document.getElementById(1).clientWidth;
	heightDiv = document.getElementById(1).clientHeight; */
	}
	graphicWin();
	} else
		if (document.getElementById(this.id).textContent !== '' && Wyg(gra,X) !== true && Wyg(gra,O) !== true && zajete_pola < nmax * nmax) alert('FIELD FILLED')
		else
			if (zajete_pola === nmax * nmax && Wyg(gra,X) !== true && Wyg(gra,O) !== true) alert('DRAW !!!')
			else if (Wyg(gra,X) === true) alert('WON Computer !!!')
				 else alert('WON Player !!!');
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

function middleOfElement(ClassName1,ClassName2,numInd1,numInd2){
var heightDiv = document.getElementsByClassName(ClassName1)[numInd1].clientHeight;
var heightP = document.getElementsByClassName(ClassName2)[numInd2].clientHeight;
if(heightDiv > heightP) document.getElementsByClassName(ClassName2)[numInd2].style.top = ((50/100)*heightDiv) - (heightP/2)  + 'px'
else if(heightDiv === heightP) document.getElementsByClassName(ClassName2)[numInd2].style.top = 0
	 else document.getElementsByClassName(ClassName2)[numInd2].style.top = ((50/100)*heightDiv) - (heightP/2)  + 'px';
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
  middleOfElement('field','circle',numberIdTagDiv,numberIdTagP);
  console.log(realSizeFont);
}

function getElementsSize(){
setTimeout(() => {
	/* widthDiv = document.getElementById(1).clientWidth;
	heightDiv = document.getElementById(1).clientHeight; */
	for(var numberIdPTag = 0; numberIdPTag < nmax*nmax; ++numberIdPTag){
	 var numberTagPID = 'p'+numberIdPTag;
	 if(document.getElementById(numberIdPTag).textContent === O || document.getElementById(numberIdPTag).textContent === X)
	  insertSign(numberTagPID,numberIdPTag);
	}
	
	if(window.innerWidth < window.innerHeight)
	  document.getElementsByClassName('containerform')[0].style.top = document.getElementsByClassName('button')[1].clientHeight + 6 + (window.innerHeight / 2) + 'px'
	else document.getElementsByClassName('containerform')[0].style.top = document.getElementsByClassName('button')[1].clientHeight + 6 + 'px';
	
	document.getElementsByClassName('button')[0].style.height = document.getElementsByClassName('button')[1].clientHeight + 6 + 'px';
}, 1000);
}

// call function
drawBoard(nmax);


if(startGame === 'First start computer'){
  console.log('First Computer');
  bestMove(gra,zajete_pola);
  zajete_pola = 1;
   
} else {
	 console.log('First Player');
   }

document.getElementsByClassName('containerform')[0].style.visibility = 'hidden';

window.addEventListener('resize',getElementsSize);



getElementsSize();

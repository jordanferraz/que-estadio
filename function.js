
/* VARIAVEIS */

var number;
var tip;
var erro;
var nomeEstadio;
var apelido;
var code;
var dica;
var diaEstadio;
var shareIcon;

/* CONFIGURA DATA */

var today = new Date();

    var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    };

    today = today.toLocaleDateString("en", options);
	//today = "6/16/2022";

/* CONFIG ARRAY */

const dicas = [];
const lista = [];

/* FUNÇÃO - CONFIGURA O JOGO */

function configGame(){

	number = 5;
	tip = 2;
	erro = 1;
	document.getElementById('chances').innerHTML = number;
}


/* D3 - IMPORTA CSV DATABASE */

d3.csv("./db-estadios.csv", function(data) {


	/* ADICIONA OS ESTÁDIOS NO DATALIST */

	for (var i = 0; i < data.length; i++) {
		apelido = data[i].Apelido;
		nomeOficial = data[i].NomeOficial;
		cidade = data[i].Cidade;
		estado = data[i].Estado;
		html = '<option onclick="hideList()" id="estadio-option" onclick="clickedData()" value="'+apelido+'"></option>';
		

		lista.push(apelido);

		document.getElementById('estadios').insertAdjacentHTML('beforeend', html);
		
		if(apelido != nomeOficial){
			html2 = '<option onclick="hideList()" id="estadio-option" value="'+nomeOficial+'"></option>';
			document.getElementById('estadios').insertAdjacentHTML('beforeend', html2);
		}

		diaEstadio = data[i].Data;

		
	}


    for (var i = 0; i < data.length; i++) {
        apelido = data[i].Apelido;
		nomeOficial = data[i].NomeOficial;
		cidade = data[i].Cidade;
		estado = data[i].Estado;
		diaEstadio = data[i].Data;

		if(diaEstadio == today){
			for(contDica = 1; contDica <= 5; contDica++){
			dica = data[i]['Dica' + contDica];


			document.getElementById('dica'+contDica).insertAdjacentHTML('beforeend', dica);

			dicas.push(dica);
			}

			imgEstadio = './img/' + data[i].Imagem;
			document.getElementById('img-estadio').setAttribute('src', imgEstadio);
			
			document.getElementById('nome-estadio1').insertAdjacentHTML('beforeend', "(" + apelido + ")");
			document.getElementById('nome-estadio2').insertAdjacentHTML('beforeend', "(" + apelido + ")");

			document.getElementById('apelido-estadio1').insertAdjacentHTML('beforeend', nomeOficial);
			document.getElementById('apelido-estadio2').insertAdjacentHTML('beforeend', nomeOficial);

			local = cidade + ' - ' + estado;
			document.getElementById('local-estadio1').insertAdjacentHTML('beforeend', local);
			document.getElementById('local-estadio2').insertAdjacentHTML('beforeend', local);

			
			break
		}

    }

});



function showList(){
	var size = document.getElementById('estadio').value.length;
	if(size > 2){
		document.getElementById('estadio').setAttribute('list', 'estadios');
		
	}else{
		document.getElementById('estadio').setAttribute('list', '');
	}
	console.log(size);
}

function hideList(){
	document.getElementById('estadios').style.display('none');
}

/* FUNÇÃO - TESTA A RESPOSTA */

function pressEnter(e, input){
	code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13) { //Enter keycode
		var a = document.getElementById("estadio");
		if(a.value==apelido || a.value==nomeOficial){
			document.getElementById('answer').classList.add('container-answer');
			document.getElementById('answer').classList.remove('container-answer-hide');
			document.getElementById('wrap').style.display = 'none';
		}else{
			if(number > 1){
				document.getElementById('chance'+erro).innerHTML = document.getElementById('chance'+erro).textContent = "❌";
				document.getElementById('dica'+tip).classList.add('revealed');
				document.getElementById('dica'+tip).classList.remove('hidden');
				document.getElementById('estadio').value = '';
				
				number--;
			}else{
				document.getElementById('chance'+erro).innerHTML = document.getElementById('chance'+erro).textContent = "❌";
				number = 0;
				document.getElementById('wrap').style.display = 'none';
				document.getElementById('tut-desc').style.display = 'none';
				document.getElementById('answer-wrong').classList.remove('container-answer-hide');
				document.getElementById('answer-wrong').classList.add('container-answer-wrong');				
			}
			
			tip++;
			erro++;
			
			document.getElementById('chances').innerHTML = number;
			
		}
	}
}


/* FUNÇÃO - TESTA A RESPOSTA PARA CLIQUE NO DATALIST */

function clickedData(a){

	
		var a = document.getElementById("estadio");
		if(a.value==apelido || a.value==nomeOficial){
			document.getElementById('answer').classList.add('container-answer');
			document.getElementById('answer').classList.remove('container-answer-hide');
			document.getElementById('wrap').style.display = 'none';
		}else{
			if(number > 1){
				document.getElementById('chance'+erro).innerHTML = document.getElementById('chance'+erro).textContent = "❌";
				document.getElementById('dica'+tip).classList.add('revealed');
				document.getElementById('dica'+tip).classList.remove('hidden');
				document.getElementById('estadio').value = '';
				
				number--;
			}else{
				document.getElementById('chance'+erro).innerHTML = document.getElementById('chance'+erro).textContent = "❌";
				number = 0;
				document.getElementById('wrap').style.display = 'none';
				document.getElementById('tut-desc').style.display = 'none';
				document.getElementById('answer-wrong').classList.remove('container-answer-hide');
				document.getElementById('answer-wrong').classList.add('container-answer-wrong');				
			}
			
			tip++;
			erro++;
			
			document.getElementById('chances').innerHTML = number;
			
		}
	
}

/* SHARE RESULT */

function shareResult() {

	if(erro == 1){
		tentativa = " tentativa.";
	}else{
		tentativa = " tentativas.";
	}

if(erro<4){

	var copyText = "Eu acertei o estádio em " + erro + tentativa + ". E você, consegue acertar? Tenta aí: " + document.URL;
	insertShare = "<p>" + copyText + "</p>";
	navigator.clipboard.writeText(copyText);
	window.alert("Copiado para o seu ctrl+c. É só colar lá no WhatsApp ou Twitter!");
	document.getElementById('share-clicked').insertAdjacentHTML('beforeend', insertShare);

}else{

	var copyText = "Fiz " + erro + tentativa + " mas não acertei o estádio. E você, consegue acertar? Tenta aí: " + document.URL;
	insertShare = "<p>" + copyText + "</p>";
	navigator.clipboard.writeText(copyText);
	window.alert("Copiado para o seu ctrl+c. É só colar lá no WhatsApp ou Twitter!");
	document.getElementById('share-clicked2').insertAdjacentHTML('beforeend', insertShare);

}
}
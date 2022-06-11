
/* VARIAVEIS */

var number;
var tip;
var erro;
var nomeEstadio;
var apelido;
var code;
var dica;
var diaEstadio;

/* CONFIGURA DATA */

var today = new Date();

    var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    };

    //today = today.toLocaleDateString("en", options);
	today = "7/3/2022";

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
		html = '<option onclick="hideList()" id="estadio-option" value="'+apelido+'"></option>';

		lista.push(apelido);

		document.getElementById('estadios').insertAdjacentHTML('beforeend', html);

		diaEstadio = data[i].Data;

		if(diaEstadio == today){
			for(contDica = 1; contDica <= 5; contDica++){
			dica = data[i]['Dica' + contDica];


			document.getElementById('dica'+contDica).insertAdjacentHTML('beforeend', dica);

			dicas.push(dica);
			}

			imgEstadio = './img/' + data[i].Imagem;
			document.getElementById('img-estadio').setAttribute('src', imgEstadio);

			document.getElementById('nome-estadio').insertAdjacentHTML('beforeend', apelido);

			console.log(apelido);
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
		if(a.value==apelido || a.value=="Lomanto Júnior"){
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
				document.getElementById('answer-wrong').classList.remove('container-answer-hide');
				document.getElementById('answer-wrong').classList.add('container-answer-wrong');				
			}
			
			tip++;
			erro++;
			
			document.getElementById('chances').innerHTML = number;
			
		}
	}
}

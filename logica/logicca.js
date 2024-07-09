//base de dato local de las preguntas de baciii//
const bd_juego = [
  {
    id: 0,
    pregunta: "¿cúal es el país mas pequeño del mundo?",
    op0: "Estado baticano",
    op1: "Mónaco",
    op2: "San Marino",
    correcta: "0",
  },

  {
    id: 1,
    pregunta: "¿cúantos oceanos hay en la tierra?",
    op0: "Seis",
    op1: "Cuatro",
    op2: "tres",
    correcta: "1",
  },

  {
    id: 2,
    pregunta: "¿Qué país tiene mas habitantes ?",
    op0: "China ",
    op1: "EE.UU",
    op2: "Rusia",
    correcta: "0",
  },
  {
    id: 3,
    pregunta: "¿Qué país es el mas grande ?",
    op0: "Rusia ",
    op1: "EE.UU",
    op2: "India",
    correcta: "0",
  },
  {
    id: 4,
    pregunta: "¿Cúal es la montaña mas grande del mundo ?",
    op0: "Aconcagua ",
    op1: "Tabor",
    op2: "Everest",
    correcta: "2",
  },
  {
    id: 5,
    pregunta: "¿Cúal es la montaña mas grande del mundo ?",
    op0: "Nilo",
    op1: "Amazonas",
    op2: "Eufrates",
    correcta: "0",
  },
  {
    id: 6,
    pregunta: "¿Cúal es la capital de la India?",
    op0: "Chennai",
    op1: "Bonbay",
    op2: "Nueva Delhi",
    correcta: "2",
  },
  {
    id: 7,
    pregunta: "¿Qué continente se encuentra en los 4 hemisferios ?",
    op0: "Africa ",
    op1: "Europa",
    op2: "Ninguno",
    correcta: "0",
  },
  {
    id: 8,
    pregunta: "¿Cúal es la capital de Egipto?",
    op0: "Alejandria",
    op1: "El Cairo",
    op2: "Menfis",
    correcta: "1",
  },
  {
    id: 9,
    pregunta: "¿Donde se ecuentra el estrecho de Magallanes?",
    op0: "Parte Sur de America del Norte",
    op1: "En Europa",
    op2: "Partesur de Sudamerica",
    correcta: "2",
  },
];
//para guardar las respuestas elegidas

let respuestas = [];

//cantidad de correctas

let cantiCorrectas = 0;

//pregunta acutal que debe de cargarse

let numPregunta = 0;

//carga una pregunta de JSON

function cargarPreguntas() {
  //carga la pregunta actual de la bd
  const pregunta = bd_juego[numPregunta];

  const contenedor = document.createElement("div"); //div con class=contenedor-pregunta
  contenedor.className = "contenedor-pregunta";
  contenedor.id = pregunta.id;

  const h2 = document.createElement("h2");
  h2.textContent = pregunta.id + 1 + "-" + pregunta.pregunta;
  contenedor.appendChild(h2);

  const opciones = document.createElement("div");

  //vamos a crear los tres labels
  //lo vamos hacer mdediante una función
  //a dicho funcion le enviamos la cantidad de labels y opciones
  //el texto, de dicho label

  const label1 = crearLabel("0", pregunta.op0);
  const label2 = crearLabel("1", pregunta.op1);
  const label3 = crearLabel("2", pregunta.op2);

  // agrego los label al contedor de las opciones
  opciones.appendChild(label1);
  opciones.appendChild(label2);
  opciones.appendChild(label3);

  //agrego las opcione al contenedor principal
  contenedor.appendChild(opciones);
  document.getElementById("juego").appendChild(contenedor);
}

//crea la funcion de que retornara el label con todo su contenido
function crearLabel(num, txtOpcion) {
  const label = document.createElement("label");
  label.id = "l" + numPregunta + num;

  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.name = "p" + numPregunta;
  input.setAttribute("onclick", "seleccionar(" + numPregunta + "," + num + ")");
  const span = document.createElement("span");
  const correccion = document.createElement("span");
  correccion.id = "p" + numPregunta + num;
  span.textContent = txtOpcion;
  label.appendChild(input);
  label.appendChild(span);
  label.appendChild(correccion);

  return label;
}

//mediante un for cargo todas las preguntas JSON

for (i = 0; i < bd_juego.length; i++) {
  cargarPreguntas();

  // actualizó el numero de pregunta actual
  numPregunta++;
}

//funcion que carga elegida en el arreglo respuesta

function seleccionar(pos, opElegida) {
  respuestas[pos] = opElegida;
}

//BOTON CORREGIR

let corregir = document.getElementById("corregir");
corregir.onclick = function () {
  //recorro el arreglo que tiene las repuestas y comparo
  for (i = 0; i < bd_juego.length; i++) {
    //cargo la pregunta
    const pregunta = bd_juego[i];
    if (pregunta.correcta == respuestas[i]) {
      //respuesta corre
      cantiCorrectas++;
      let idCorreccion = "p" + i + pregunta.correcta;
      document.getElementById(i).className = "contenedor-pregunta correcta";
      document.getElementById(idCorreccion).innerHTML = "&check;";
      document.getElementById(idCorreccion).className = "acierto";
    } else {
      //no acerto

      let id = "p" + i + respuestas[i];
      let idCorreccion = "p" + i + pregunta.correcta;
      document.getElementById(i).className = "contenedor-pregunta incorrecta";
      document.getElementById(id).innerHTML = "&#x2715;";
      document.getElementById(id).className = "no-acierto";
      document.getElementById(idCorreccion).innerHTML = "&check;";
      document.getElementById(idCorreccion).className = "acierto";
    }
  }

  //desabilitamos todos los input
  let inputs = document.getElementsByTagName("input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].disabled = true;
  }

  //hacemos un scroll hacia arriba
  window.scrollTo(0, 0);
  //colocamos los acierto y fallas
  h2 = document.createElement("h2");
  h2.className = "resultado";
  h2.textContent =
    cantiCorrectas +
    " " +
    "CORRECTAS -" +
    (10 - cantiCorrectas) +
    " " +
    "INCORRECTAS.";
  document.getElementById("juego").appendChild(h2);
};

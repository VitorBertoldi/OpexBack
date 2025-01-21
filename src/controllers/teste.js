import { log } from 'mathjs';

function calcularFormula(metragem, projecao_log, cnst, s6) {
  
  return (projecao_log * log(metragem) + e6) * metragem;
}

const metragem = 20000;
const projecao_log = -0.05;
const cnst = 0.56;
const s6 = 0;

const resultado = calcularFormula(metragem, projecao_log, cnst, s6);
console.log(resultado);
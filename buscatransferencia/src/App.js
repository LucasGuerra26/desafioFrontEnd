import { checkError } from "./util/checkError";
import { useEffect, useState } from 'react';
import { findTransfers } from "./services/transfersService";
import ImputText from "./ImputText";

import './styles.css'

function App() {
  const [nomeOperador, setNomeOperador] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [idConta, setIdConta] = useState("");

  const [transferencias, setTransferencias] = useState([]);

  const [indices, setIndices] = useState([0, 1, 2, 3])
  const [paginaAtual, setPaginaAtual] = useState(1)
  
  const [saldoTotal, setSaldoTotal] = useState(0)
  const [saldoNoPeriodo, setSaldoNoPeriodo] = useState(0)
  
  useEffect(() => {
    var saldoAux = 0
    var saldoPeriodoAux = 0
    if (transferencias.length > 0){
      transferencias.forEach(element => {
        if (element.tipoTransacao === 'TRANSFERENCIA') {
          saldoAux -= element.valorTransacao
        } else {
          saldoAux += element.valorTransacao
        }
        if (element.valorTransacao<0) {
          saldoPeriodoAux += (element.valorTransacao*-1)
        } else {
          saldoPeriodoAux += element.valorTransacao
        }
      })
      setSaldoNoPeriodo(saldoPeriodoAux)
      setSaldoTotal(saldoAux)
    }
  }, [transferencias])

  function anterior(){
      if (paginaAtual > 1) {
       setIndices([indices[0]-4, indices[1]-4, indices[2]-4, indices[3]-4])
        setPaginaAtual(paginaAtual-1)
      }
  }

  function proximo(){
      if (transferencias.length > 4 && Math.ceil((transferencias.length/4)) > paginaAtual) {
        setPaginaAtual(paginaAtual+1)
        setIndices([indices[0]+4, indices[1]+4, indices[2]+4, indices[3]+4])
      }
  }

  async function search(){
    if (!checkError(idConta, dataFinal, dataInicial, nomeOperador)){
      return
    } else {
      const dataFinalAux = dataFinal.replace('/', '').replace('/', '');
      const dataInicalAux = dataInicial.replace('/', '').replace('/', '')

      try {
        const response = await findTransfers(nomeOperador, dataInicalAux, dataFinalAux, idConta);
        setTransferencias(response);
      } catch {
        alert("Ocorreu um erro inesperado")
        setNomeOperador("");
        setDataInicial("");
        setDataFinal("");
        setIdConta("");
      }
    }

  }
  function renderData(indice){
    return transferencias[indices[indice]]? 
    transferencias[indices[indice]].dataTransacao.slice(8,10) +
    '/' +
    transferencias[indices[indice]].dataTransacao.slice(5,7) + 
    '/' + 
    transferencias[indices[indice]].dataTransacao.slice(0, 4) : '__/__/__'
  }

  function renderValue(indice){
    return transferencias[indices[indice]]? transferencias[indices[indice]].valorTransacao.toFixed(2) : 0
  }

  function renderTransfers(indice){
    return transferencias[indices[indice]]? transferencias[indices[indice]].tipoTransacao: '--------'
  }

  function renderOperador(indice){
    return transferencias[indices[indice]] && transferencias[indices[indice]].operadorTransacao !== null ? transferencias[indices[indice]].operadorTransacao: '--------'
  }

  return (
    <div className="container">
      <div className="box">
        <div className="form">
            <div className="inputContainer">
              <h3 className="titleForm">Faça sua busca</h3>
              <h5 className="subTitleForm">informe os dados da busca</h5>
                <ImputText
                title="Número da conta"
                mensage="digite o número da conta"
                value={idConta}
                onChange={(e)=>setIdConta(e.target.value)}
                />
                
                <ImputText
                title="Nome do operador"
                mensage="digite o nome do operador"
                value={nomeOperador}
                onChange={(e)=>setNomeOperador(e.target.value)}
                />
                <ImputText
                title="Data de início"
                mensage="DD/MM/AAAA"
                value={dataInicial}
                onChange={(e)=>setDataInicial(e.target.value)}
                />
                <ImputText
                title="Data de fim"
                mensage="DD/MM/AAAA"
                value={dataFinal}
                onChange={(e)=>setDataFinal(e.target.value)}
                />
            </div>
            <div className="button">
                <button 
                  className="buttonSearch"
                  onClick={search}
                  >
                    PESQUISAR
                </button>
            </div>
        </div>
        <div className="table">
            <h1 className="titleTable">Resultado da busca</h1>
            <div>
            <div>
              <div className="tableContainer">
                <div className="headerContainer">
                    <h1 className='textStile'> Saldo Total: R${saldoTotal.toFixed(2)} Saldo no período: R${saldoNoPeriodo.toFixed(2)}</h1>
                </div>
                <div className="columnContainer">
                    <div className='itemContainer'>
                        <h1 className='textStile'> Data </h1>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderData(0)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderData(1)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderData(2)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderData(3)} </h1>
                        </div>
                    </div>
                    <div className='itemContainer'>
                        <h1 className='textStile'> Valentia </h1>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> R${renderValue(0)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> R${renderValue(1)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> R${renderValue(2)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> R${renderValue(3)} </h1>
                        </div>
                    </div>
                    <div className='itemContainer'>
                        <h1 className='textStile'> Tipo </h1>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderTransfers(0)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderTransfers(1)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderTransfers(2)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderTransfers(3)} </h1>
                        </div>
                    </div>
                    <div className='itemContainerRight'>
                        <h1 className='textStile'> Nome operador transacionado </h1>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderOperador(0)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderOperador(1)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderOperador(2)} </h1>
                        </div>
                        <div className='subItemContainer'>
                            <h1 className='textStile'> {renderOperador(3)} </h1>
                        </div>
                    </div>
                </div>
             </div>
            <div className='containerButtons'>
                <button 
                  className="tableButton"
                    onClick={anterior}
                  >
                    voltar
                </button>
                <div className='pageContainer'>
                    <h1 className='textStile'> {paginaAtual}/{Math.ceil((transferencias.length/4))} </h1>
                </div>
                
                <button 
                  className="tableButton"
                    onClick={proximo}
                  >
                    próximo
                </button>

            </div>
                

        </div>

            </div>
        </div>
      </div>
    </div>
  );
}
/* 
var dataInput = '2020-02-06';

data = new Date(dataInput);
dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
*/

export default App;

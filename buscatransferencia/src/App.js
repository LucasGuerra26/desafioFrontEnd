import ImputText from "./ImputText";
import { checkError } from "./util/checkError";
import { useState } from 'react';
import { findTransfers } from "./services/transfersService";

import './styles.css'

function App() {
  const [nomeOperador, setNomeOperador] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [idConta, setIdConta] = useState("");

  const [transferencias, setTransferencias] = useState([]);

  async function search(){
    if (!checkError(idConta, dataFinal, dataInicial, nomeOperador)){
      return
    } else {
      const dataFinalAux = dataFinal.replace('/', '').replace('/', '');
      const dataInicalAux = dataInicial.replace('/', '').replace('/', '')

      try {
        const response = await findTransfers(nomeOperador, dataInicalAux, dataFinalAux, idConta);
        setTransferencias(response);
        console.log(response)
      } catch {
        alert("Ocorreu um erro inesperado")
        setNomeOperador("");
        setDataInicial("");
        setDataFinal("");
        setIdConta("");
      }
    }

  }

  return (
    <div className="container">
      
      <div className="box">
      <h1 className="title"> Buscador de Transações</h1>
        <div className="containerImput">
          <div>
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
          </div>
          <div>
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
      
    </div>
  );
}

export default App;

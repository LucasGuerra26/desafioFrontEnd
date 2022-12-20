import ImputText from "./ImputText"
import { useState } from 'react';

import './styles.css'

function App() {
  const [nomeOperador, setNomeOperador] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [idConta, setIdConta] = useState("");

  function search(){
    if (idConta === "" && dataFinal === "" && dataInicial === "" && nomeOperador === "") {
      alert("PELO MENOS UM CAMPO DA PESQUISA DEVE SER PREENCHIDO")
    }

    setIdConta("");
    setNomeOperador("");
    setDataInicial("");
    setDataFinal("");
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

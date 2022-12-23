import api from "./api";

export async function findTransfers(nomeOperador, dataInicial, dataFinal, idConta){
    try {
        if (idConta === "") {
          if (dataFinal === "" && dataInicial === "" && nomeOperador !== "") {
            const response = await api.get(`?nomeOperador=${nomeOperador}`)
            return response.data;
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador !== "") {
            const dataIni = dataInicial.slice(2,4)+dataInicial.slice(0,2)+dataInicial.slice(4,8);
            const dataFim = dataFinal.slice(2,4)+dataFinal.slice(0,2)+dataFinal.slice(4,8);
            const response = await api.get(`?nomeOperador=${nomeOperador}&dataInicial=${dataIni}&dataFinal=${dataFim}`)
            return response.data
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador === "") {
            const dataIni = dataInicial.slice(2,4)+dataInicial.slice(0,2)+dataInicial.slice(4,8);
            const dataFim = dataFinal.slice(2,4)+dataFinal.slice(0,2)+dataFinal.slice(4,8);
            const response = await api.get(`?dataInicial=${dataIni}&dataFinal=${dataFim}`)
            return response.data
          }
        } else {
          if (idConta !== "" && dataFinal === "" && dataInicial === "" && nomeOperador === ""){
            const response = await api.get(`?contaId=${idConta}`)
            return response.data
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador !== "") {
            const dataIni = dataInicial.slice(2,4)+dataInicial.slice(0,2)+dataInicial.slice(4,8);
            const dataFim = dataFinal.slice(2,4)+dataFinal.slice(0,2)+dataFinal.slice(4,8);
            const response = await api.get(`?contaId=${idConta}&nomeOperador=${nomeOperador}&dataInicial=${dataIni}&dataFinal=${dataFim}`)
            return response.data
          }
          else if (dataFinal === "" && dataInicial === "" && nomeOperador !== "") {
            const response = await api.get(`?contaId=${idConta}&nomeOperador=${nomeOperador}`)
            return response.data;
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador === "") {
            const dataIni = dataInicial.slice(2,4)+dataInicial.slice(0,2)+dataInicial.slice(4,8);
            const dataFim = dataFinal.slice(2,4)+dataFinal.slice(0,2)+dataFinal.slice(4,8);
            const response = await api.get(`?contaId=${idConta}&dataInicial=${dataIni}&dataFinal=${dataFim}`)
            return response.data
          }

        }  
      } catch (e) {
        alert("Ocorreu um erro inesperado")
        return e;
      }
}
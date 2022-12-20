import api from "./api";

export async function findTransfers(nomeOperador, dataInicial, dataFinal, idConta){
    try {
        if (idConta === "") {
          if (dataFinal === "" && dataInicial === "" && nomeOperador !== "") {
            const response = await api.get(`?nomeOperador=${nomeOperador}`)
            return response.data;
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador !== "") {
            const response = await api.get(`?nomeOperador=${nomeOperador}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
            return response.data
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador === "") {
            const response = await api.get(`?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
            return response.data
          }
        } else {
          if (idConta !== "" && dataFinal === "" && dataInicial === "" && nomeOperador === ""){
            const response = await api.get(`?contaId=${idConta}`)
            return response.data
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador !== "") {
            const response = await api.get(`?contaId=${idConta}&nomeOperador=${nomeOperador}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
            return response.data
          }
          else if (dataFinal === "" && dataInicial === "" && nomeOperador !== "") {
            const response = await api.get(`?contaId=${idConta}&nomeOperador=${nomeOperador}`)
            return response.data;
          }
          else if (dataFinal !== "" && dataInicial !== "" && nomeOperador === "") {
            const response = await api.get(`?contaId=${idConta}&dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
            return response.data
          }

        }  
      } catch (e) {
        alert("Ocorreu um erro inesperado")
        return e;
      }
}
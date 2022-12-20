export function checkError(idConta, dataFinal, dataInicial, nomeOperador) {
    if (idConta === "" && dataFinal === "" && dataInicial === "" && nomeOperador === "") {
      alert("PREENCHA CAMPOS DA PESQUISA")
      return false;
    }
    if (dataFinal !== "" && dataInicial === "" || dataFinal === "" && dataInicial !== "" ) {
      alert("PREENCHA OS CAMPOS DATA DE INICIO E DATA DE FIM PARA CONCLUIR A SOLICITAÇÂO");
      return false;
    }
    if (dataFinal !== "" && dataInicial !== "") {
      const dateEnd = dataFinal.split("/");
      const dateStart = dataInicial.split("/")

      if (dateEnd.length !== 3 || dateStart.length !== 3) {
        alert("FORMATO DE DATA INVÁLIDO");
        return false;
      }

      else if (dateEnd[0]>31 || dateEnd[1]>12 || dateEnd[2]<1000) {
        alert("FORMATO DE DATA INVÁLIDO");
        return false;
      }

      else if (dateStart[0]>31 || dateStart[1]>12 || dateStart[2]<1000) {
        alert("FORMATO DE DATA INVÁLIDO");
        return false;
      }
      
    }
    return true;
}
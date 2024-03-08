export default function GetStatusForm(status:String):string{
    switch (status) {
        case "open":
            return "Em progresso"
        case "closed":
            return "Concluido"
        case "paused":
            return "Pausado"
        case "analysed":
            return "Analisado"
        case "analysing":
            return "Analisando respostas"
    
        default:
            return "Status inválido"
    }
}
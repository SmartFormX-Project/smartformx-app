export enum StatusEnum {
  InProgress = "in_progress",
  Closed = "closed",
  Analysed = "analysed",
  Analysing = "analysing",
  FormDone = "form_done",
  Cancelled = "cancelled",
}

export enum CategoryEnum {
  General = 'general',
  Quality = 'quality',
  Experience = 'experience',
  Product = 'product',
}

export function getStatusStringCategoryForm(status?: CategoryEnum): string {
  switch (status) {
    case CategoryEnum.General:
      return "Feedback Geral";
    case CategoryEnum.Quality:
      return "Feedback de qualidade";
    case CategoryEnum.Product:
      return "Feedback de produto";
    case CategoryEnum.Experience:
      return "Feedback de analise de experiência";
  
    default:
      return "";
  }
}
export function getStatusString(status: String): string {
  switch (status) {
    case "in_progress":
      return "Em Progresso";
    case "form_done":
      return "Pronto para analise";
    case "analysing":
      return "Analisando";
    case "analysed":
      return "Insights emitidos";
    case "canceled":
      return "Cancelled";
    // add cases for other statuses as needed
    default:
      return "status inválido";
  }
}

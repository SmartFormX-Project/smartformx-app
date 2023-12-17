import { CategoryEnum, StatusEnum } from "./variables";

export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  plan?: string;
  country: string;
  password?: string;
  createdAt: Date;
  updateAt: Date;
  businessId: string;
  business: Business;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  clients: string;
  createdAt: Date;
  updateAt: Date;
  form: Form[];
  user?: User;
}

export interface Form {
  id?: string;
  title?: string;
  description?: string;
  shortId?: string;
  category?: CategoryEnum;
  entrances?: number;
  status: StatusEnum;
  businessId?: string;
  createdAt: Date;
  _count?: any;
  updateAt: Date;
  analyse?: Analyse;
  bus?: Business;
  questions?: Questions[];
  userAnswear?: UserAnswear[];
}

export interface Questions {
  id: string;
  question: string;
  goal: string;
  type: string;
  options: string[];
  formId: string;
  createdAt: Date;
  updateAt: Date;
  form: Form;
}

export interface UserAnswear {
  id: string;
  name: string;
  referenceCode: string;
  formId: string;
  createdAt: Date;
  updateAt: Date;
  answears: Answears[];
  form: Form;
}

export interface Answears {
  id: string;
  questionId: string;
  userAwnsearId: string;
  answear: string;
  createdAt: Date;
  updateAt: Date;
  userAwnser: UserAnswear;
}
interface Analyse {
  id: string;
  formId: string;
  feeling: string;
  feelingDesc: string;
  keywords: string[];
  createdAt: Date;
  updateAt: Date;
  form: Form;
  topics: TopicAnalyses[];
  stats: Stats[];
}

interface Stats {
  id: string;
  title: string;
  info: string;
  data: string;
  analyseId?: string;
  createdAt: Date;
  updateAt: Date;
  Analyses?: Analyse;
}

interface TopicAnalyses {
  id: string;
  title: string;
  type: string;
  description: string;
  howToImprove?: string;
  analyseId?: string;
  createdAt: Date;
  updateAt: Date;
  Analyses?: Analyse;
}

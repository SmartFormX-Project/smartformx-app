
export interface User {
  id: string;
  name: string;
  email: string;
  provider: string;
  country: string;
  password?: string | null;
  createdAt: Date;
  updateAt: Date;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  tempToken?: string | null;
  verifiedEmail: boolean;
  metadata?: Record<string, any> | null;
  paymentIntentStatus?: string | null;
  subscribeStatus: string;
  Reports: Report[];
}

interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  clients: string;
  createdAt: Date;
  updateAt: Date;
  Forms: Form[];
  User?: User | null;
}

export interface Form {
  id: string;
  _count: any;
  category: String;
  status: String;
 userId: string;
  createdAt: Date;
  updateAt: Date;
  description?: string | null;
  title: string;
  entrances: number;
  shortId: string;
  limitAns: number;
  extraEntrances: number;
  Analyse?: Analyse | null;
  Business: Business;
  Questions: Question[];
  UserAnswers: UserAnswer[];
}

export interface Question {
  id: string;
  question: string;
  formId: string;
  createdAt: Date;
  updateAt: Date;
  options: string[];
  goal: string;
  inputType: string;
  Answers: Answer[];
  Form: Form;
}

interface UserAnswer {
  id: string;
  name: string;
  referenceCode: string;
  formId: string;
  createdAt: Date;
  updateAt: Date;
  Answers: Answer[];
  Form: Form;
}

interface Answer {
  id: string;
  questionId: string;
  userAwnsearId: string;
  answear: string;
  createdAt: Date;
  updateAt: Date;
  Question: Question;
  UserAnswer: UserAnswer;
}

export interface Analyse {
  id: string;
  formId: string;
  summary: string;
  usage: Record<string, any>;
  keywords: string[];
  createdAt: Date;
  updateAt: Date;
  Form: Form;
  Stats: Stats[];
  Topics: TopicAnalyses[];
}

interface Stats {
  id: string;
  title: string;
  info: string;
  value: string;
  analyseId?: string | null;
  createdAt: Date;
  updateAt: Date;
  Analyse?: Analyse | null;
}

export interface TopicAnalyses {
  id: string;
  title: string;
  type: string;
  description: string;
  howToImprove?: string | null;
  createdAt: Date;
  updateAt: Date;
  analyseId?: string | null;
  Analyse?: Analyse | null;
}

interface Report {
  id: string;
  title: string;
  category: string;
  description: string;
  media?: string | null;
  userId: string;
  createdAt: Date;
  updateAt: Date;
  User: User;
}

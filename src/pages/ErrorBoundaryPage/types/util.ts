export interface ApiErrorType {
  name: string;
  status: number;
}

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

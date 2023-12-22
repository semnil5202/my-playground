interface ApiErrorProps {
  name: string;
  status: number;
}

export default class ApiError extends Error {
  name: string;
  status: number;

  constructor({ name, status }: ApiErrorProps) {
    super(name);

    this.name = name;
    this.status = status;
  }
}

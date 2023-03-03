export class ApiSuccess<T = unknown> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

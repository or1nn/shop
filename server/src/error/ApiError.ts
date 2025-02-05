class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.message = message;
    this.status = status;
  }
  static badRequest(message: string) {
    return new ApiError(404, message);
  }

  static internal() {
    return new ApiError(500, 'Произошла ошибка на стороне сервера');
  }
  static forbidden(message: string) {
    return new ApiError(403, message);
  }
}

export default ApiError;

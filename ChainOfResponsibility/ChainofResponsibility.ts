// Định nghĩa giao diện cho trình xử lý
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

// Lớp trừu tượng BaseHandler để triển khai cơ chế chuỗi
abstract class BaseHandler implements Handler {
  private nextHandler: Handler | null = null;

  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }
}

// Trình xử lý Logger
class LoggerHandler extends BaseHandler {
  public handle(request: string): void {
    console.log(`Logging: ${request}`);
    super.handle(request);
  }
}

// Trình xử lý Authenticator
class AuthenticatorHandler extends BaseHandler {
  public handle(request: string): void {
    if (request === "AUTH") {
      console.log("Authentication successful.");
    } else {
      console.log("Authentication failed.");
    }
    super.handle(request);
  }
}

// Trình xử lý Validator
class ValidatorHandler extends BaseHandler {
  public handle(request: string): void {
    if (request === "VALID") {
      console.log("Validation successful.");
    } else {
      console.log("Validation failed.");
    }
    super.handle(request);
  }
}

// Hàm client code để gửi yêu cầu qua chuỗi
function clientCode(handler: Handler, request: string): void {
  console.log(`Processing request: ${request}`);
  handler.handle(request);
  console.log("Finished processing request\n");
}

// Sử dụng chuỗi trách nhiệm
const logger = new LoggerHandler();
const authenticator = new AuthenticatorHandler();
const validator = new ValidatorHandler();

// Thiết lập chuỗi xử lý: Logger -> Authenticator -> Validator
logger.setNext(authenticator).setNext(validator);

// Sử dụng hàm client code để gửi yêu cầu qua chuỗi
clientCode(logger, "AUTH");
clientCode(logger, "VALID");
clientCode(logger, "NO AUTH");

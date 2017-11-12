import { ExceptionMessage } from './exception-message';

export class RequestExceptionHandler {

  static getBadRequestMessages(errorArray): ExceptionMessage[] {
    const messageList = [];
    for (let i = 0; i < errorArray.length; i++) {
      const field = errorArray[i].field;
      const message = errorArray[i].defaultMessage;
      const cur = new ExceptionMessage(field, message);
      messageList.push(cur);
    }
    return messageList;
  }
}

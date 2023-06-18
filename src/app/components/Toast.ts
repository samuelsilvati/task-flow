/* eslint-disable no-new */
import Toast from 'awesome-toast-component'

export default class toast {
  static success(message: string, position?: string) {
    new Toast(message, {
      ...(position && { position }),
      style: {
        container: [['background-color', 'green']],
        message: [['color', '#eee']],
        bold: [['font-weight', 'bold']],
      },
    })
  }

  static error(message: string, position?: string) {
    new Toast(message, {
      ...(position && { position }),
      style: {
        container: [['background-color', 'red']],
        message: [['color', '#eee']],
        bold: [['font-weight', 'bold']],
      },
    })
  }
}

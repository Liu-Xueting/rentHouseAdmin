
import { App } from 'vue'
import auth from './modules/auth'

const directivesList: any = {
  // Custom directives
  auth,
}
const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key])
    })
  },
}

export default directives

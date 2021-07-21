import Vue from 'vue'
import { Button, Form, FormItem, Input, Message, Container, Aside, Main, Header, Menu, Submenu, MenuItem, MenuItemGroup } from 'element-ui'
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message // 同理，通过Vue的原型挂载自定义属性message 赋值为Element-ui中的Message
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Header)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)

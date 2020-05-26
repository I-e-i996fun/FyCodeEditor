import Vue from 'vue'
import Router from 'vue-router'

// RouterTab 内置路由
import { RouterTabRoutes } from '@/components/RouterTab'

// 引入布局框架组件
import Frame from '@/components/Layout/Frame'

// 异步加载页面组件
const importPage = view => () =>
  import(/* webpackChunkName: "p-[request]" */ `../views/${view}.vue`)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // 父路由组件内必须包含 <router-tab>
      component: Frame,
      // 子路由里配置需要通过页签打开的页面路由
      children: [
        // 引入 RouterTab 内置路由以支持 iframe 页签
        ...RouterTabRoutes,
        {
          path: '/', // 默认页和父级路由一致
          name: 'Home',
          component: importPage('Home'),
          meta: {
            title: 'Home' // 页签标题
          }
        },
        {
          path: '/about',
          name: 'About',
          component: importPage('About'),
          meta: {
            title: 'About' // 页签标题
          }
        },
        // {
        //   path: '/OnlineEditor',
        //   name: 'OnlineEditor',
        //   component: importPage('OnlineEditor'),
        //   meta: {
        //     title: 'OnlineEditor' // 在线编辑器页面
        //   }
        // },
        {
          path: '/TestEditor/:id',
          name: 'TestEditor',
          component: importPage('TestEditor'),
          meta: {
            title: '' // 在线编辑器页面
          }
        },
        {
          path: '/TestSlot',
          name: 'TestSlot',
          component: importPage('TestSlot'),
          meta: {
            title: '' // 测试slot页面
          }
        }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

//.webpack提供的require.ensure(),这样可以实现按需加载，并且你可以将多个相同类的组件打包成一个文件，只要给他们指定相同的chunkName即可。

const main = r =>require.ensure([],()=>r(require('@/components/common/Main')),'Main');
const home = r =>require.ensure([],()=>r(require('@/components/common/Home')),'Home');
const login = r => require.ensure([], () => r(require('@/components/page/Login')), 'Login');
const theme = r => require.ensure([], () => r(require('@/components/page/theme')), 'theme');
const fzthree = r => require.ensure([], () => r(require('@/components/page/403')), '403');
const baseCharts = r => require.ensure([], () => r(require('@/components/page/BaseCharts')), 'BaseCharts');
const baseTable = r => require.ensure([], () => r(require('@/components/page/BaseTable')), 'BaseTable');
const baseForm = r => require.ensure([], () => r(require('@/components/page/BaseForm')), 'BaseForm');
const echarts = r => require.ensure([], () => r(require('@/components/page/Echarts')), 'Echarts');
const drag = r => require.ensure([], () => r(require('@/components/page/DragList')), 'drag');

export default new Router({
  routes: [
    {
      path: '/',
      component: main,
      name: 'main',
      redirect: '/home',
      meta:{title:'主入口整体布局'},
      children:[
        {
          path: '/home',
          component:home,
          name:'home',
          meta: { title: '系统首页' }
        },
        {
          path: '/baseCharts',
          component:baseCharts,
          name:'baseCharts',
          meta: { title: 'tab选项卡', isTab: true  }
        },
        {
          path: '/baseTable',
          component:baseTable,
          name:'baseTable',
          meta: { title: '基础表格', isTab: true  }
        },
        {
          path: '/baseForm',
          component:baseForm,
          name:'baseForm',
          meta: { title: '基础表单', isTab: true  }
        },
        {
          path: '/theme',
          component:theme,
          name:'theme',
          meta: { title: '主题风格' }
        },
        {
          path: '/echarts',
          component:echarts,
          name:'echarts',
          meta: { title: 'echarts图表', isTab: true }
        },
        {
          path: '/drag',
          component:drag,
          name:'drag',
          meta: { title: '拖拽列表', isTab: true }
        },
        {
          path: '/403',
          component:fzthree,
          name:'403',
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component:login,
      name:'login',
      meta: { title: '登陆' }
    }
  ]
})

<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu" router>
        <template v-for="item in items">
          <template v-if="item.subs">
            <el-submenu :index="item.index"  :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template slot="title">{{subItem.title}}</template>
                  <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index"> {{ threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                  {{ subItem.title }}
                </el-menu-item>
              </template>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>

        </template>
      </el-menu>
    </div>
  </aside>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        items: [
          {
            icon: 'el-icon-info',
            index: 'home',
            title: '系统首页'
          },
          {
            icon: 'el-icon-info',
            index: 'baseTable',
            title: '基础表格'
          },
          {
            icon: 'el-icon-info',
            index: 'baseCharts',
            title: 'tab选项卡'
          },
          {
            icon: 'el-icon-info',
            index: '3',
            title: '表单相关',
            subs: [
              {
                index: 'baseForm',
                title: 'baseForm'
              },
              {
                index: '3-2',
                title: '三级菜单',
                subs: [
                  {
                    index: 'editor',
                    title: '富文本编辑器'
                  },
                  {
                    index: 'markdown',
                    title: 'markdown编辑器'
                  }
                ]
              },
              {
                index: 'upload',
                title: '文件上传'
              }
            ]
          },
          {
            icon: 'el-icon-info',
            index: 'echarts',
            title: 'echarts图表'
          },
          {
            icon: 'el-icon-info',
            index: 'drag',
            title: '拖拽列表'
          },
          {
            icon: 'el-icon-info',
            index: '6',
            title: '错误处理',
            subs: [
              {
                index: 'permission',
                title: '权限测试'
              },
              {
                index: '404',
                title: '404页面'
              }
            ]
          }
        ]

      }
    },
    computed: {
      sidebarLayoutSkin: {
        get () { return this.$store.state.common.sidebarLayoutSkin }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      },
      menuList: {
        get () { return this.$store.state.common.menuList },
        set (val) { this.$store.commit('common/updateMenuList', val) }
      },
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.common.mainTabsActiveName },
        set (val) { this.$store.commit('common/updateMainTabsActiveName', val) }
      }
    },
    watch:{/*watch监听路由变化 当路由改变时，运行routeHandle函数*/
      $route:'routeHandle'
    },
    created(){
      this.routeHandle(this.$route)
    },
    methods:{
      // 路由操作
      routeHandle(route){

        if(route.meta.isTab){
          // tab选中, 不存在先添加
          var tab = this.mainTabs.filter(item => item.name === route.name)[0];
          console.log(tab);
          if(!tab){
            tab={
              menuId:route.meta.menuId||route.name,
              name:route.name,
              title:route.meta.title
            };
            this.mainTabs=this.mainTabs.concat(tab); //concat() 方法用于连接两个或多个字符串、对象、数组。
          }
          this.menuActiveName=tab.menuId;
          this.mainTabsActiveName=tab.name

        }
      }
    }
  }
</script>



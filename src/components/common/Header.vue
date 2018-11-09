<template>
<nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
  <div class="site-navbar__header">
    <h1 class="site-navbar__brand">
      <a href="javascript:void (0)" class="site-navbar__brand-lg">jj快速开发平台</a>
      <a href="javascript:void (0)" class="site-navbar__brand-mini">jj</a>
    </h1>
  </div>
  <div class="site-navbar__body clearfix">
    <el-menu
      class="site-navbar__menu"
      mode="horizontal">
      <el-menu-item class="site-navbar__switch" index="0"  @click="sidebarFold = !sidebarFold"><i class="iconfont icon-zhedie"></i></el-menu-item>
    </el-menu>

    <el-menu
      class="site-navbar__menu site-navbar__menu--right"
      mode="horizontal">
      <el-menu-item index="1">
        <template slot="title">
          <el-badge value="new">
            <i class="iconfont icon-shezhi"></i>
          </el-badge>
        </template>
      </el-menu-item>
      <el-menu-item index="2">
        <el-badge value="hot">
          <a href="javascript:void (0)" target="_blank">官方社区</a>
        </el-badge>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">Git源码</template>
        <el-menu-item index="2-1"><a href="javascript:void (0)" target="_blank">前端</a></el-menu-item>
        <el-menu-item index="2-2"><a href="javascript:void (0)" target="_blank">后台</a></el-menu-item>
        <el-menu-item index="2-3"><a href="javascript:void (0)" target="_blank">代码生成器</a></el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            用户名<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</nav>
</template>
<script type="text/ecmascript-6">
 export default{
   data(){
     return{

     }
   },
   computed:{
     navbarLayoutType: {
       get () { return this.$store.state.common.navbarLayoutType }
     },
     sidebarFold: {
       get () { return this.$store.state.common.sidebarFold },
       set (val) { this.$store.commit('common/updateSidebarFold', val) }
     }
   },
   methods:{
     updatePasswordHandle(){

     },
     // 退出
     logoutHandle(){

     }
   }
 }
</script>
<style scoped lang="less" type="text/less">
.header{
  &_logo{
    background: green;
   }
}
</style>

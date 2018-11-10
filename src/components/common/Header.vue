<template>
<nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
  <div class="site-navbar__header">
    <h1 class="site-navbar__brand" @click="gotoHome">
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
      <el-menu-item index="1" @click="$router.push({name:'theme'})">
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
      <el-menu-item class="site-navbar__avatar" index="3">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img class="site-logo" src="../../assets/img/touxiang.jpg" alt="">
            {{username}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
  <!--弹框，修改密码-->
  <update-password v-if="updatePassowrdVisible" ref="updatePassword"></update-password>
</nav>
</template>
<script type="text/ecmascript-6">
 import UpdatePassword from '../page/NavbarUpdatePassword'
 export default{
   data(){
     return{
        name:'zjj',
        updatePassowrdVisible:false
     }
   },
   components:{
     UpdatePassword
   },
   computed:{
     navbarLayoutType: {
       get () { return this.$store.state.common.navbarLayoutType }
     },
     sidebarFold: {
       get () { return this.$store.state.common.sidebarFold },
       set (val) { this.$store.commit('common/updateSidebarFold', val) }
     },
     menuActiveName: {
       get () { return this.$store.state.common.menuActiveName },
       set (val) { this.$store.commit('common/updateMenuActiveName', val) }
     },
     updataName: {
       get () { return this.$store.state.user.updataName },
       set (val) { this.$store.commit('user/updataName', val) }
     },
     username(){
       let username=localStorage.getItem('ms_username');
       return username?username:this.name;
     }
   },
   methods:{
     // 修改密码
     updatePasswordHandle(){
       this.updatePassowrdVisible=true;
       this.$nextTick(()=>{
         this.$refs.updatePassword.init()
       })
     },

     // 退出
     logoutHandle(){
       this.$confirm('确定进行[退出]操作？','提示',{
         confirmButtonText:'确定',
         cancelButtonText:'取消',
         type: 'warning'
       }).then(() => {
         // do something ... (确认)

         localStorage.removeItem('ms_username');
         this.$router.push( '/login');
         this.mainTabs = [];
         this.menuActiveName='home';
       }).catch(() => {
         // do something ... (取消)

       });
     },
     //点击logo跳转到系统首页
     gotoHome(){
        this.$router.push({name:'home'},()=>{
          this.menuActiveName= this.$router.name;
        });
     }
   }
 }
</script>
<style scoped lang="less" type="text/less">

</style>

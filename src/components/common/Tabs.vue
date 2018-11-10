<template>
  <el-tabs
    v-model="mainTabsActiveName"
    closable
    @tab-click="selectedTabHandle"
    @tab-remove="removeTabHandle">

    <el-dropdown  class="site-tabs__tools" trigger="click">
      <span class="el-dropdown-link">
        标签选项<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <!--给普通的HTML标签监听一个事件，之后添加 .native 修饰符是不会起作用的.
        给某个组件的根元素上监听一个事件，之后添加 .native 修饰符就会起作用了-->
        <el-dropdown-item @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
        <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
        <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tab-pane v-for="(item, index) in mainTabs" :key="item.name" :label="item.title" :name="item.name">
      <el-card :body-style="siteContentViewHeight">
        <keep-alive>
          <router-view v-if="item.name===mainTabsActiveName"/>
        </keep-alive>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script  type="text/ecmascript-6">
  export default{
    data() {
      return {

      }
    },
    computed:{
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
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
      },
      siteContentViewHeight(){
        var height = this.documentClientHeight - 50 - 30 - 2;
        if (this.$route.meta.isTab) {
          height -= 40;
        }
        return { minHeight: height + 'px' }
      }
    },
    methods: {
      //选中tab
      selectedTabHandle(tab){
        tab=this.mainTabs.filter(item=>item.name===tab.name);
        if(tab.length>=1){
            this.$router.push({name:tab[0].name})
        }
      },
      //删除tab
      removeTabHandle(tabName) {
        this.mainTabs=this.mainTabs.filter(item=>item.name!==tabName);
        if(this.mainTabs.length>=1){
          //当前选中tab被删除
          if(tabName===this.mainTabsActiveName){
            this.$router.push({name:this.mainTabs[this.mainTabs.length-1].name},()=>{
              this.mainTabsActiveName=this.$router.name
            })
          }
        }else{
          this.menuActiveName='';
          this.$router.push({path:'/home'})
        }
      },
      //关闭当前tab
      tabsCloseCurrentHandle(){
        this.removeTabHandle(this.mainTabsActiveName)
      },
      //关闭其他tab
      tabsCloseOtherHandle(){
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      //关闭全部tab
      tabsCloseAllHandle(){
        this.mainTabs = [];
        this.menuActiveName='';
        this.$router.push({path:'/home'})
      },
      //刷新当前
      tabsRefreshCurrentHandle(){
        var tempTabName = this.mainTabsActiveName;
        this.removeTabHandle(tempTabName);
        /*在某个动作有可能改变DOM元素结构的时候，对DOM一系列的js操作都要放进Vue.nextTick()的回调函数中*/
        this.$nextTick(()=>{
          this.$router.push({name:tempTabName})
        })
      }
    }
  }
</script>

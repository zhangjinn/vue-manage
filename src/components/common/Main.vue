<template>
  <div class="site-wrapper" :class="{ 'site-sidebar--fold': sidebarFold }">
    <template v-if="!loading">
      <main-header></main-header>
      <main-sidebar></main-sidebar>
      <div class="site-content__wrapper" :style="{ 'min-height': documentClientHeight + 'px' }">
        <main class="site-content" :class="{ 'site-content--tabs': $route.meta.isTab }">
          <!--标签页-->
          <main-tabs v-if="$route.meta.isTab"></main-tabs>
          <el-card v-else>
            <keep-alive>
              <router-view/>
            </keep-alive>
          </el-card>
        </main>
      </div>
    </template>
  </div>
</template>

<script>
import MainHeader from './Header.vue';
import MainSidebar from './Sidebar.vue';
import MainTabs from './Tabs.vue';
  export default{
    data(){
      return{
        loading:false
      }
    },
    components:{
      MainHeader,
      MainSidebar,
      MainTabs
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      },
      sidebarFold: {
        get () { return this.$store.state.common.sidebarFold }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

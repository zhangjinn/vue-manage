<template>
  <section class="main">
    <el-alert
      title="提示："
      type="warning"
      :closable="false">
      <div slot-scope="description">
        <p class="el-alert__description">
          1.  Vue.Draggable：基于 Sortable.js 的 Vue 拖拽组件。访问地址：<a href="https://github.com/SortableJS/Vue.Draggable" target="_blank">Vue.Draggable</a>
        </p>
      </div>
    </el-alert>
    <div class="container">
      <div class="drag-box">
        <div class="drag-box-item">
          <div class="item-title">
            todo
          </div>
          <draggable v-model="todoList" :options="dragOptions"  @remove="removeHandle" @end="endHandle">
            <transition-group tag="div" id="todo" class="item-ul">
              <div v-for="(item,index) in todoList" class="drag-list" :key="index">
                  {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">
            doing
          </div>
          <draggable v-model="doingList" :options="dragOptions"  @remove="removeHandle" @end="endHandle">
            <transition-group tag="div" id="doing" class="item-ul">
              <div v-for="(item,index) in doingList" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div class="drag-box-item">
          <div class="item-title">
            done
          </div>
          <draggable v-model="doneList" :options="dragOptions" @remove="removeHandle" @end="endHandle">
            <transition-group tag="div" id="done" class="item-ul">
              <div v-for="(item,index) in doneList" class="drag-list" :key="index">
                {{item.content}}
              </div>
            </transition-group>
          </draggable>
        </div>
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>
  </section>
</template>
<script type="text/ecmascript-6">
  import draggable from 'vuedraggable'
  export default{
    name:'draglist',
    data(){
      return {
        dragOptions:  {
          animation: 120,
          scroll: true,
          group: 'sortlist',
          ghostClass: 'ghost-style'
        },
        todo: [
          {
            content: '开发图表组件'
          },
          {
            content: '开发拖拽组件'
          },
          {
            content: '开发权限测试组件'
          }
        ],
        doing: [
          {
            content: '开发登录注册页面'
          },
          {
            content: '开发头部组件'
          },
          {
            content: '开发表格相关组件'
          },
          {
            content: '开发表单相关组件'
          }
        ],
        done:[
          {
            content: '初始化项目，生成工程目录，完成相关配置'
          },
          {
            content: '开发项目整体框架'
          }
        ]
      }
    },
    components:{
      draggable
    },
    created(){
      this.updateInfo();
    },
    computed: {
      todoList: {
        get() {return this.$store.state.drafting.todo},
        set(val) {this.$store.commit('drafting/todoList', val)}
      },
      doingList: {
        get() {return this.$store.state.drafting.doing},
        set(val) {this.$store.commit('drafting/doingList', val)}

      },
      doneList: {
        get() {return this.$store.state.drafting.done},
        set(val) {this.$store.commit('drafting/doneList', val)}
      }
    },
    methods:{
      removeHandle(event){
        console.log('removed'+event);
        this.$message({
          message: `从${event.from.id}移动到${event.to.id}`,
          type: 'success'
        });
      },
      endHandle(event){
        console.log(event)
      },
      updateInfo(){
        this.todoList = this.todo;
        this.doingList = this.doing;
        this.doneList = this.done;
      }
    }
  }
</script>
<style scoped>
  .container{
    margin-top: 15px;
  }
  .drag-box{
    display: flex;
    user-select: none;
  }
  .drag-box-item {
    flex: 1;
    max-width: 330px;
    min-width: 300px;
    background-color: #eff1f5;
    margin-right: 16px;
    border-radius: 6px;
    border: 1px #e1e4e8 solid;
  }
  .item-title{
    padding: 8px 8px 8px 12px;
    font-size: 14px;
    line-height: 1.5;
    color: #24292e;
    font-weight: 600;
  }
  .item-ul{
    padding: 0 8px 8px;
    height: 500px;
    overflow-y: scroll;
  }
  .item-ul::-webkit-scrollbar{
    width: 0;
  }
  .drag-list {
    border: 1px #e1e4e8 solid;
    padding: 10px;
    margin: 5px 0 10px;
    list-style: none;
    background-color: #fff;
    border-radius: 6px;
    cursor: pointer;
    -webkit-transition: border .3s ease-in;
    transition: border .3s ease-in;
  }
  .drag-title {
    font-weight: 400;
    line-height: 25px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
  }
  .ghost-style{
    display: block;
    color: transparent;
    border-style: dashed
  }
</style>

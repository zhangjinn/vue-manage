/**
 * Created by zhangjinjin on 2018/11/14.
 */
export default{
  namespaced:true,
  state:{
   todo:[],
   doing:[],
   done:[]
  },
  mutations:{
    todoList(state,val){
      state.todo=val
    },
    doingList(state,val){
      state.doing=val
    },
    doneList(state,val){
      state.done=val
    }
  }
}

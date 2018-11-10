/**
 * Created by zhangjinjin on 2018/11/10.
 */
export default{
  namespaced:true,
  state:{
    id:0,
    name:''
  },
  mutations:{
    updataId(state,id){
      state.id=id
    },
    updataName(state,name){
      state.name=name
    }
  }
}

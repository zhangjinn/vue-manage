<template>

  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    :append-to-body="true">
    <el-form :model="dataForm" status-icon :rules="dataRule" ref="dataForm" label-width="100px" @keyup.enter.native="dataFormSubmit()" class="demo-ruleForm">
      <el-form-item label="账号">
        <span>{{username}}</span>
      </el-form-item>
      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model.number="dataForm.password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="dataForm.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="dataForm.confirmPassword"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确 定</el-button>
    </span>
  </el-dialog>

</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      var validateConfirmPassword = (rule, value, callback) => {
        if (this.dataForm.newPassword !== value) {
          callback(new Error('确认密码与新密码不一致'))
        } else {
          callback()
        }
      };
      return {
        dialogVisible: false,
        dataForm: {
          password: '',
          newPassword: '',
          confirmPassword: ''
        },
        dataRule: {
          password: [
            { required: true, message: '原密码不能为空', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: validateConfirmPassword, trigger: 'blur' }
          ]
        }
      };
    },
    computed:{
      menuActiveName: {
        get () { return this.$store.state.common.menuActiveName },
        set (val) { this.$store.commit('common/updateMenuActiveName', val) }
      },
      mainTabs: {
        get () { return this.$store.state.common.mainTabs },
        set (val) { this.$store.commit('common/updateMainTabs', val) }
      },
      username(){
        let username=localStorage.getItem('ms_username');
        return username?username:this.name;
      }
    },
    methods: {
      //初始化
      init(){
        this.dialogVisible=true;
        this.$nextTick(()=>{
          this.$refs['dataForm'].resetFields();
        })
      },
      dataFormSubmit(){
        this.$refs['dataForm'].validate((valid)=>{
          if(valid){
            this.dialogVisible=false;
            this.$router.replace({ name: 'login' });
            this.mainTabs = [];
            this.menuActiveName='home';
          }else{
            console.log('error submit!!');
            return false;
          }

        })
      }
    }
  }
</script>
<style>

</style>

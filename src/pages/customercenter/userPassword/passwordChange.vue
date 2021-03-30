<template>
  <div class="user-password-change">
    <div class="password-form">
      <ul>
        <li>
          <span>原密码：</span>
          <span style="color:#AE0807;position:absolute;margin:2px 0 0 4px;">*</span>
          <el-input style="width:250px;" type="password" v-model="oldPsd" size="mini" placeholder="请输入姓名"></el-input>
        </li>
        <li>
          <span>新密码：</span>
          <span style="color:#AE0807;position:absolute;margin:2px 0 0 4px;">*</span>
          <el-input style="width:250px;" type="password" v-model="newPsd" size="mini" placeholder="请输入姓名"></el-input>
        </li>
        <li>
          <span>确认密码：</span>
          <span style="color:#AE0807;position:absolute;margin:2px 0 0 4px;">*</span>
          <el-input style="width:250px;" type="password" v-model="okPsd" size="mini" placeholder="请输入姓名"></el-input>
        </li>
        <li>
          <el-button
            type="primary"
            style="width:100px;margin-left:85px;background-color: #000;border-color: #000;"
            size="small"
            @click="handleConfirm"
          >确认修改</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPsd: '',
      newPsd: '',
      okPsd: ''
    };
  },
  methods: {
    handleConfirm() {
      if(!this.oldPsd || !this.newPsd || !this.okPsd){
        this.$message.error('密码不能为空')
        return
      }
      if(this.newPsd != this.okPsd){
        this.$message.error('新密码与确认密码不同，请重新输入')
        return
      }
      const url = '/api/customer/password/update'
      this.$http.post(url,{oldPassword:this.oldPsd,newPassword:this.newPsd})
      .then(res=>{
        if(res.data.errno === 0){
          this.$message({
            message: '修改成功，请重新登录',
            type: 'success',
          });
          this.$router.push('/')
        }else {
          this.$message({
          message: res.data.message,
          type: 'error'
        });
        }
      })
    } 
  }
};
</script>

<style lang="stylus" scoped>
.user-password-change {
  background: #fff;
  border-radius: 8px;

  .password-form {
    padding: 50px 50px;

    ul li {
      display: flex;
      align-items: center;
      margin-bottom: 25px;

      span:first-child {
        display: inline-block;
        width: 80px;
        line-height: 28px;
        text-align: right;
        margin-right: 5px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.45);
      }
    }
  }
}
</style>
<template>
  <div class="wrapper">
    <img class="line" src="@/assets/images/line.png" alt />
    <div class="banner">
      <div class="banner-contain">
        <img class="rocket" src="@/assets/images/rocket.png" alt />
        <ul class="content-wrapper">
          <li class="left">
            <p class="title">某某信息平台管理系统</p>
            <div>
              <img class="logo" src="@/assets/images/logo.png" alt />
            </div>
          </li>
          <li class="right">
            <!-- 登录页 -->
            <div class="form-wrapper" v-if="show">
              <p class="title">
                账户登录
                <img class="arrow" src="@/assets/images/arrow.png" alt />
              </p>
              <div class="userInput">
                <img class="author" src="@/assets/images/author.png" alt />
                <input
                  v-model="username"
                  maxlength="11"
                  class="username"
                  type="text"
                  placeholder="账号/邮箱"
                />
              </div>
              <div class="userPsd">
                <img class="lock" src="@/assets/images/lock.png" alt />
                <input
                  v-model="password"
                  class="password"
                  type="text"
                  placeholder="密码"
                  maxlength="20"
                />
              </div>
              <div class="userOther">
                <div class="regist" @click="handleRegistClick">免费注册</div>
                <div class="forgetpsd">忘记密码?</div>
              </div>
              <div class="userButton">
                <div class="login" @click="handleLogin">登录</div>
              </div>
            </div>
            <!-- 注册页 -->
            <div class="form-wrapper" v-else>
              <p class="title">
                账户注册
                <img class="arrow" src="@/assets/images/arrow.png" alt />
                <span class="back-login" @click="handleBackLoginClick">返回登录</span>
              </p>
              <div class="userInputRegist">
                <img class="author" src="@/assets/images/author.png" alt />
                <input
                  v-model="username"
                  maxlength="11"
                  class="username"
                  type="text"
                  placeholder="输入邮箱/手机号"
                />
              </div>
              <div class="userPsd">
                <img class="lock" src="@/assets/images/lock.png" alt />
                <input
                  v-model="password"
                  maxlength="20"
                  class="password"
                  type="text"
                  placeholder="请输入密码"
                />
              </div>
              <div class="check">
                <input class="code" type="text" name id placeholder="请输入验证码" />
                <div class="count" @click="handleTimeClick">
                  <span v-show="showCount">获取验证码</span>
                  <span v-show="!showCount">{{count}} s</span>
                </div>
              </div>
              <div class="userButton">
                <div class="login" @click="handleRegist">注册</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { updateRouter } from '@/permission.js' // 加载路由

export default {
  name: "Logic",
  data() {
    return {
      show: true,
      showCount: true,
      username: "",
      password: "",
      count: "",
      timer: null
    };
  },
  methods: {
    handleRegistClick() {
      this.show = false;
    },
    handleBackLoginClick() {
      this.show = true;
    },
    phoneCheck() {
      var phone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.username != "") {
        if (phone.test(this.username)) {
          return true;
        } else {
          this.$message.error("账号错误，请重新输入");
          return false;
        }
      } else {
        this.$message.error("账号不能为空");
        return false;
      }
    },
    handleLogin() {
      if (this.phoneCheck()) {
        if (this.password == "") {
          this.$message.error("密码不能为空");
          return;
        }
        const url = `/api/users/login?phone=${this.username}&password=${this.password}`;
        this.$http
          .post(url, {})
          .then(res => {
            if (res.data.errno === 0) {
              const token = res.data.data.token;
              localStorage.setItem("token", token);
              // 加载路由
              updateRouter()
              this.$router.push("/homepage");
              const name = res.data.data.name;
              const photo = res.data.data.photo;
              localStorage.setItem('name', name)
              localStorage.setItem('photo', photo)
              this.$store.commit('changeInfo', {name,photo})
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error.meaasge);
          });
      }
    },
    handleRegist() {
      if (this.phoneCheck()) {
        if (this.password == "") {
          this.$message.error("密码不能为空");
          return;
        }
        this.$http.post("/api/users/regist", {
            phone: this.username,
            password: this.password
          })
          .then(res => {
            if (res.data.errno === 0) {
              this.$message.error("注册成功,请前往登录");
              this.password = "";
              this.show = true;
            } else {
              this.$message.error(res.data.message);
            }
          })
          .catch(error => {
            this.$message.error(error.meaasge);
          });
      }
    },
    handleTimeClick() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showCount = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showCount = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    }
  },
  mounted() {
    localStorage.clear();
  }
};
</script>

<style lang="stylus" scoped>
.wrapper {
  min-width: 1100px;
  min-height: 620px;
  height: 100vh;
  background: rgb(250, 241, 232);

  .line {
    width: 1100px;
    height: 620px;
    position: absolute;
    left: 50%;
    margin-left: -550px;
    top: 50%;
    margin-top: -310px;
  }

  .banner {
    width: 980px;
    height: 376px;
    position: absolute;
    left: 50%;
    margin-left: -490px;
    top: 50%;
    margin-top: -188px;

    .banner-contain {
      width: 100%;
      height: 100%;
      position: relative;

      .rocket {
        position: absolute;
        right: -60px;
        top: -40px;
      }

      .content-wrapper {
        width: 100%;
        height: 100%;
        display: flex;

        .left {
          flex: 1;
          background: url('~@/assets/images/banner-left.png');
          background-size: cover;
          text-align: center;

          .title {
            margin-top: 60px;
            color: #fff;
            text-align: center;
            font-size: 35px;
            letter-spacing: 2px;
            font-weight: bolder;
          }

          .logo {
            width: 200px;
            height: 200px;
            margin-top: 30px;
          }
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
          background: #fff;

          .form-wrapper {
            width: 350px;
            height: 300px;
            padding: 20px;

            .title {
              color: #ffc333;
              font-weight: 700;

              .arrow {
                width: 16px;
                height: 16px;
                position: absolute;
                margin-left: 6px;
              }

              .back-login {
                margin-left: 30px;
                cursor: pointer;
                color: #ccc;
                font-size: 12px;
              }

              .back-login:hover {
                color: #ffc333;
              }
            }

            .userInput {
              display: flex;
              align-items: center;
              margin-top: 64px;
              width: 310px;
              height: 32px;
              border-bottom: 1px solid #e8e8e8;

              .author {
                width: 24px;
                height: 24px;
                margin-right: 10px;
              }

              .username {
                flex: 1;
                height: 30px;
                outline: none;
                border: 0;
              }

              .username::placeholder {
                color: #e8e8e8;
              }
            }

            .userInputRegist {
              display: flex;
              align-items: center;
              margin-top: 25px;
              width: 310px;
              height: 32px;
              border-bottom: 1px solid #e8e8e8;

              .author {
                width: 24px;
                height: 24px;
                margin-right: 10px;
              }

              .username {
                flex: 1;
                height: 30px;
                outline: none;
                border: 0;
              }

              .username::placeholder {
                color: #e8e8e8;
              }
            }

            .userPsd {
              display: flex;
              align-items: center;
              margin-top: 30px;
              width: 310px;
              height: 32px;
              border-bottom: 1px solid #e8e8e8;

              .lock {
                width: 28px;
                height: 24px;
                margin-right: 10px;
              }

              .password {
                flex: 1;
                height: 30px;
                outline: none;
                border: 0;
              }

              .password::placeholder {
                color: #e8e8e8;
              }
            }

            .check {
              display: flex;
              margin-top: 20px;

              .code {
                width: 150px;
                height: 30px;
                padding-left: 15px;
                outline: none;
                border: 0;
                border-bottom: 1px solid #e8e8e8;
              }

              .code::placeholder {
                color: #e8e8e8;
              }

              .count {
                position: absolute;
                margin-left: 180px;
                margin-top: -3px;
                width: 120px;
                height: 35px;
                background: #ffc333;
                border-radius: 3px;
                text-align: center;
                line-height: 35px;
                color: #fff;
                cursor: pointer;
              }
            }

            .userOther {
              overflow: hidden;
              padding-top: 8px;

              .regist {
                float: left;
                color: rgb(255, 190, 34);
                font-size: 12px;
                cursor: pointer;
              }

              .regist:hover {
                color: rgb(255, 200, 23);
              }

              .forgetpsd {
                float: right;
                font-size: 12px;
                color: #ccc;
                cursor: pointer;
              }

              .forgetpsd:hover {
                color: rgb(255, 200, 23);
              }
            }

            .userButton {
              margin-top: 35px;
              width: 100%;
              height: 40px;
              background: rgb(255, 190, 34);

              .login {
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                color: #fff;
                font-weight: 600;
                border-radius: 3px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>
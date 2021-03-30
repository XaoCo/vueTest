<template>
  <div class="user-info-detail">
    <div class="user-contain">
      <ul>
        <li>
          <span
            style="position: absolute;margin-left: -43px;color: #ae0807;font-size: 12px;margin-top: 3px;"
          >*</span>
          <span>姓名：</span>
          <el-input
            style="width:250px;"
            maxlength="10"
            v-model="name"
            size="mini"
            placeholder="请输入姓名"
          ></el-input>
        </li>
        <li>
          <span>真实姓名：</span>
          <el-input
            style="width:250px;"
            maxlength="10"
            v-model="realName"
            size="mini"
            placeholder="请输入真实姓名"
          ></el-input>
        </li>
        <li>
          <span>注册账号：</span>
          <p>{{phone}}</p>
        </li>
        <li>
          <span>性别：</span>
          <el-radio v-model="sexRadio" label="1">男</el-radio>
          <el-radio v-model="sexRadio" label="2">女</el-radio>
          <el-radio v-model="sexRadio" label="3">保密</el-radio>
        </li>
        <li>
          <span>照片：</span>
          <!-- action 华北地区客户端上传地址 -->
          <el-upload
            action="https://upload-z1.qiniup.com"
            :http-request="upqiniu"
            list-type="picture-card"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :limit="1"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </li>
        <li>
          <span>分组信息：</span>
          <p>{{group}}</p>
        </li>
        <li>
          <el-button
            type="primary"
            style="width:100px;margin-left:85px;background-color: #000;border-color: #000;"
            size="small"
            @click="handleDetailUpdate"
          >保存修改</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "@/utils/index";
export default {
  data() {
    return {
      name: "",
      realName: "",
      sexRadio: "1",
      phone: "",
      group: "",
      uploadUrl: "",
      fileList: []
    };
  },
  methods: {
    handleRemove() {
      this.uploadUrl = "";
    },
    // 上传文件到七牛云
    upqiniu(req) {
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else if (req.file.type === "image/jpeg") {
        filetype = "jpg";
      }
      // 重命名要上传的文件
      const keyname =
        "rd-" +
        formatDate(new Date(), "y-m-d h:i:s") +
        "-" +
        Math.floor(Math.random() * 100) +
        "." +
        filetype;
      // 从后端获取上传凭证token
      this.$http.get("/api/load/qntoken", {}).then(res => {
        const formdata = new FormData();
        formdata.append("file", req.file);
        formdata.append("token", res.data.data.uploadToken);
        formdata.append("key", keyname);
        // 获取到凭证之后再将文件上传到七牛云空间
        axios({
          method: "post",
          url: `https://upload-z1.qiniup.com`,
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
          this.uploadUrl =
            "http://q7tz42e1h.bkt.clouddn.com" + "/" + res.data.key;
        });
      });
    },
    // 验证文件合法性
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleDetailUpdate() {
      if (!this.name) {
        this.$message.error("姓名不能为空");
        return;
      }
      const url = "/api/customer/detail/update";
      this.$http
        .post(url, {
          name: this.name,
          realName: this.realName,
          sex: this.sexRadio,
          image: this.uploadUrl
        })
        .then(res => {
          if (res.data.errno === 0) {
            this.$message({
              message: "信息修改成功",
              type: "success"
            });
            const name = this.name;
            const photo = this.uploadUrl;
            localStorage.setItem("name", name);
            this.$store.commit("changeInfo", { name });
            if (this.uploadUrl) {
              localStorage.setItem("photo", photo);
              this.$store.commit("changeInfo", { photo });
            }
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        });
    }
  },
  created() {
    const url = "/api/customer/getInfo";
    this.$http.get(url, {}).then(res => {
      if (res.data.errno === 0) {
        const data = res.data.data;
        this.name = data.name;
        this.realName = data.realName;
        this.phone = data.phone;
        this.group = data.group;
        this.sexRadio = data.sex.toString();
        this.fileList.push({ url: data.image });
        this.uploadUrl = data.image;
      } else {
        this.$message({
          message: res.data.message,
          type: "error"
        });
      }
    });
  }
};
</script>
<style lang="stylus">
.user-info-detail {
}
</style>
<style lang="stylus" scoped>
.user-info-detail {
  background: #fff;
  border-radius: 8px;

  .user-contain {
    padding: 24px 50px;

    ul li {
      display: flex;
      // justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      span {
        display: inline-block;
        width: 80px;
        line-height: 28px;
        text-align: right;
        margin-right: 5px;
        font-size: 12px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.45);
      }

      p {
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
      }
    }
  }
}
</style>
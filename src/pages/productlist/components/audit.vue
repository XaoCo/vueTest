<template>
  <div class="user-audit-dialog">
    <el-button size="mini" v-if="showView===1" @click="dialogVisible=true">查看</el-button>
    <el-button size="mini" v-else @click="dialogVisible=true">审核</el-button>
    <el-dialog
      :title="showView===1 ?'审核专题查看' : '新增审核专题'"
      :visible.sync="dialogVisible"
      custom-class="audit-dialog"
      width="100%"
      :before-close="handleClose"
      @open="handleinfoOpen"
    >
      <!-- dialog 信息展示 -->
      <div class="audit-info">
        <el-collapse v-model="activeNames">
          <el-collapse-item title="基本信息" name="1">
            <div class="baseinfo">
              <ul>
                <li>
                  <p>统一社会信用代码</p>
                  <p>{{ customerDetail.code }}</p>
                </li>
                <li>
                  <p>客户类型</p>
                  <p>{{ customerDetail.customerType }}</p>
                </li>
                <li>
                  <p>客户分类</p>
                  <p>{{customerDetail.approveType==="add"?"A级客户":"B级客户"}}</p>
                </li>
                <li>
                  <p>客户简称</p>
                  <p>{{customerDetail.id}}</p>
                </li>
                <li>
                  <p>客户全称</p>
                  <p>北京市普京信息科技有限公司</p>
                </li>
                <li>
                  <p>区域</p>
                  <p>上海</p>
                </li>
                <li>
                  <p>第一大股东</p>
                  <p>私募股权投资基金</p>
                </li>
                <li>
                  <p>业务进度</p>
                  <p>潜在客户</p>
                </li>
                <li />
                <li>
                  <p>券商联系人</p>
                  <p>潜在客户</p>
                </li>
                <li>
                  <p>券商联系人座机</p>
                  <p>908-78656765</p>
                </li>
                <li>
                  <p>券商联系人手机</p>
                  <p>13345674563</p>
                </li>
              </ul>
            </div>
          </el-collapse-item>
          <el-collapse-item title="扩展信息" name="2">
            <div class="extendinfo">
              <ul>
                <li>
                  <p>英文简称</p>
                  <p>贝瑞和康</p>
                </li>
                <li>
                  <p>到期日期</p>
                  <p>私募股权投资基金</p>
                </li>
                <li>
                  <p>邮编</p>
                  <p>潜在客户</p>
                </li>
                <li style="width:100%">
                  <p>客户注册地址</p>
                  <p>贝瑞和康私募基金私募基金私募基金私募基金私募基金</p>
                </li>
                <li style="width:100%">
                  <p>办公地址</p>
                  <p>上海上海市普陀区衡山胡同593号，湖南省邵阳市新宁县自强路443号，天津天津市津南区仁爱大道329号</p>
                </li>
                <li>
                  <p>传真</p>
                  <p>2398-271236</p>
                </li>
                <li>
                  <p>传真</p>
                  <p>987-09876</p>
                </li>
                <li style="width:100%">
                  <p>派点制度</p>
                  <p>这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详这里是派点制度详细描述，这里是派点制度详</p>
                </li>
                <li style="width:100%">
                  <p>备注</p>
                  <p>这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备这里是备注信息，这里是备注信息，这里是备</p>
                </li>
              </ul>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="Auditinfo">
          <p class="basename">审核信息</p>
          <ul>
            <li>
              <p>提交人</p>
              <p>{{customerDetail.customerName}}</p>
            </li>
            <li>
              <p>提交时间</p>
              <p>{{formatToDate(customerDetail.createdAt)}}</p>
            </li>
            <li style="width:100%">
              <p>最近审核意见</p>
              <p>沈小心 审核于 2019-12-12 ：沈小心 审核于 2019-12-12 ：沈小心 审核于 2019-12-12 ：</p>
              <p>沈小心 审核于 2019-12-12 ：沈小心 审核于 2019-12-12 ：沈小心 审核于 2019-12-12 ：</p>
            </li>
            <li style="width:100%" v-if="showView ===1">
              <p>最终审核意见</p>
              <p>{{customerDetail.note}}</p>
            </li>
            <li style="width:100%" v-else>
              <p>本次审核意见（当审核不通过时为必填）</p>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="textarea"
                resize="none"
                placeholder="请输入"
                style="font-size:12px;margin-top:10px"
              ></el-input>
            </li>
          </ul>
          <p style="margin-top: 15px; border-bottom: 1px solid #e8e8e8;" />
        </div>
      </div>
      <div class="audit-footer" v-if="showView === 1 ? false : true">
        <span slot="footer" class="dialog-footer">
          <el-button  @click="handleFailAudit">审核不通过</el-button>
          <el-button type="primary" @click="handlePassAudit">审核通过</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/index.js";
export default {
  data() {
    return {
      dialogVisible: false,
      activeNames: ["1", "2"],
      textarea: "",
      customerDetail: {}
    };
  },
  props: {
    // detailinfo:{
    //   type:Object,
    //   default: function(){
    //     return {}
    //   }
    // },
    rowId: {
      type: Number,
      default: 0
    },
    showView: {
      type: Number,
      default: 0
    }
  },
  // watch: {
  //   immediate: true,
  //   detailinfo: {
  //     handler(val) {
  //       // this.handleinfoclick(val)
  //       console.log(val)
  //     }
  //   }
  // },
  // created() {
  //   this.handleinfoclick();
  // },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    handleinfoOpen() {
      const url = "/api/todo/customerAudit/detail";
      this.$http.get(url, { id: this.rowId }).then(res => {
        if (res.data.errno === 0) {
          this.customerDetail = res.data.data;
          // console.log(this.customerDetail.id)
          // console.log(this.customerDetail);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    formatToDate(time, type) {
      return formatDate(time, type);
    },
    handleFailAudit() {
      if (this.textarea == "") {
        this.$message.error("请输入审批意见");
        return;
      }
      this.dialogVisible = false;
      const url = "/api/todo/customerAudit/no";
      this.$http.get(url, { id: this.rowId,note: this.textarea }).then(res => {
        if (res.data.errno === 0) {
          this.$emit('getAduitList')
          this.textarea = ''  
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handlePassAudit() {
      this.dialogVisible = false;
      const url = "/api/todo/customerAudit/yes";
      this.$http.get(url, { id: this.rowId,note: this.textarea }).then(res => {
        if (res.data.errno === 0) {
          this.$emit('getAduitList') 
          this.textarea = ''  
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="stylus">
.user-audit-dialog {
  .audit-dialog {
    background: rgba(255, 255, 255, 0.8);
    padding-left: 168px;
  }

  .el-dialog {
    margin-top: 0px !important;
    margin-bottom: 0px;
    height: 100%;
    overflow-y: scroll;
  }

  .el-dialog__header {
    background: #fff;
    padding: 44px 168px 0px 10px;

    .el-dialog__title {
      display: block;
      border-bottom: 1px solid red;
      padding-bottom: 15px;
      font-size: 18px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      border-bottom: 1px solid #e8e8e8;
      width: 720px;
      margin: 0 auto;
    }

    .el-dialog__headerbtn {
      position: absolute;
      top: 32px;
      right: 60px;

      .el-dialog__close {
        width: 46px;
        height: 46px;
        line-height: 46px;
        background: rgba(0, 0, 0, 0.09);
        border-radius: 50%;
        font-size: 36px;
        color: #fff;
      }
    }
  }

  .el-dialog__body {
    background: #fff;
    padding: 0px 168px 0px 10px;
    min-height: calc(100% - 84px);

    // not hover
    .el-collapse-item__header.focusing:focus:not(:hover) {
      color: rgba(0, 0, 0, 0.85);
    }

    .el-collapse-item__header {
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      height: 48px;
      line-height: 48px;
      border: 0px;
    }

    .el-collapse-item__arrow {
      margin: 0 0 0 15px;
    }

    .el-textarea__inner:hover {
      border-color: rgba(0, 0, 0, 0.85);
    }

    .el-textarea__inner:focus {
      border-color: rgba(0, 0, 0, 0.85);
    }

    .audit-footer {
      padding: 15px 0 48px;
      width: 720px;
      margin: 0 auto;

      .el-dialog__footer {
        background: #fff;
      }
    }

    .el-button {
      width: 348px;
      height: 28px;
      padding: 0px 0px;
    }

    .el-button--primary {
      background-color: #0a0b0e;
      border-color: #0a0b0e;
      color: #fff;
      margin-left: 24px;
    }
  }
}
</style>
<style lang="stylus" scoped>
.audit-info {
  width: 720px;
  margin: 0 auto;

  .baseinfo {
    ul {
      flex-wrap: wrap;
      display: flex;

      li {
        width: 33.33%;
        margin-bottom: 16px;

        p {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.45);
        }

        p:nth-child(2) {
          color: rgba(0, 0, 0, 0.85);
          font-weight: 400;
        }
      }
    }
  }

  .extendinfo {
    ul {
      flex-wrap: wrap;
      display: flex;

      li {
        width: 33.33%;
        margin-bottom: 16px;

        p {
          font-size: 12px;
          font-weight: 500;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.45);
        }

        p:nth-child(2) {
          color: rgba(0, 0, 0, 0.85);
          font-weight: 400;
        }
      }
    }
  }

  .Auditinfo {
    margin-top: 15px;

    ul {
      padding-top: 15px;
      display: flex;
      flex-flow: wrap;

      li {
        width: 50%;
        margin-bottom: 15px;

        p {
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
          line-height: 17px;
        }

        p:first-child {
          font-weight: 500;
          color: rgba(0, 0, 0, 0.45);
        }
      }
    }

    .basename {
      font-size: 14px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      line-height: 20px;
    }
  }
}
</style>
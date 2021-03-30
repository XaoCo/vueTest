<template>
  <div class="special-audit-dialog">
    <div class="preview-dialog">
      <el-dialog
        :title="pdfname"
        :visible.sync="isViewPdf20"
        @close="isViewPdf20 = false"
      >
        <iframe
          :src="pdfsrc"
          frameborder="0"
          style="width:100%;height:80vh"
        />
      </el-dialog>
    </div>
    <el-button
      v-if="showAudit===1"
      size="mini"
      @click="getAuditInfo"
    >审核</el-button>
    <el-button
      v-else
      size="mini"
      @click="getApprovedInfo"
    >查看</el-button>
    <div class="add-dialog">
      <el-dialog
        :title="showAudit==1?'新增专题审核':'专题审核查看'"
        :visible.sync="dialogTableVisible"
      >
        <div class="professionalInfo">
          <p class="basename">专题信息</p>
          <div class="content">
            <ul>
              <li>
                <span>专题名称</span>
                <p>{{this.dialogData.titleName}}</p>
              </li>
              <li>
                <span>专题介绍</span>
                <p>{{this.dialogData.titleRecommended}}</p>
              </li>
              <li>
                <span>专题图片</span>
                <div class="special-img">
                  <img
                    style="width:100%;height:100%"
                    :src="this.dialogData.titleImage"
                    alt
                  />
                </div>
              </li>
            </ul>
          </div>
          <p class="reported-info">专题研报</p>
          <!-- 研报信息查询 条件框  -->
          <div class="reported-table">
            <!-- 研报查询 table 列表-->
            <el-table
              :data="tableData"
              stripe
            >
              <el-table-column
                prop="reportTitle"
                label="研报名称"
              ></el-table-column>
              <el-table-column
                prop="author"
                label="作者"
              ></el-table-column>
              <el-table-column
                prop="createDate"
                label="创建时间"
              >
                <template slot-scope="scope">
                  {{formatTimeToDate(scope.row.createDate,"y-m-d h:i:s")}}
                </template>
              </el-table-column>
              <el-table-column
                prop="industryName"
                label="所属行业"
              >
                <!-- <template slot-scope> -->
                <!-- <span>{{ scope.row.aa }}</span> -->
                <!-- <i class="el-icon-edit"></i> -->
                <!-- </template> -->
              </el-table-column>
              <el-table-column
                prop="sharesName"
                label="股票简称"
              ></el-table-column>
              <el-table-column
                prop="sharesCode"
                label="股票代码"
              ></el-table-column>
              <el-table-column
                prop
                label
                min-width="120"
              >
                <template slot-scope="scope">

                  <div class="column-tags">
                    <svg-icon
                      icon-class="pdf"
                      style="width:16px;height:16px;"
                    ></svg-icon>
                    <span
                      class="file"
                      style="position:relative;top:1px;color:#AE0807;margin-right:4px;"
                    ></span>
                    <span
                      @click="showPdf(scope.row.fileUrl,scope.row.fileName)"
                      style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); cursor: pointer;"
                    >预览</span>
                    <a
                      @click="downloadFile(scope.row.fileUrl,scope.row.fileName)"
                      style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); margin-left: 16px; cursor: pointer;"
                    >下载</a>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <p class="reported-info">审核信息</p>
          <div class="audit-info">
            <ul>
              <li>
                <p>提交人</p>
                <p>{{this.dialogData.createUserName}}</p>
              </li>
              <li>
                <p>提交时间</p>
                <p>{{formatTimeToDate(this.dialogData.createDate)}}</p>
              </li>
              <li>
                <p>审核流程</p>
                <p v-if="this.dialogData.approveStatus==='DOING'">待审核</p>
                <p v-if="this.dialogData.approveStatus==='FINISH'">审核通过</p>
                <p v-if="this.dialogData.approveStatus==='REFUSE'">审核不通过</p>
              </li>
              <li style="width:100%" >
                <p>最近审核意见</p>
                <p>{{this.dialogData.note}}</p>
              </li>
              <li style="width:100%" v-if="showAudit===1">
                <p> 本次审核意见（当审核不通过时为必填</p>
                <el-input
                  v-model="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  resize="none"
                  type="textarea"
                ></el-input>
              </li>
            </ul>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
          style="height: 28px"
        >
          <el-button
            v-if="showAudit===1"
            size="mini"
            @click="failedAudit"
          >审核不通过</el-button>
          <el-button
            v-if="showAudit===1"
            type="primary"
            size="mini"
            @click="passAudit"
          >审核通过</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/index";
export default {
  props: {
    auditId: {
      type: [String, Number],
      default: ''
    },
    approvedId: {
      type: [String, Number],
      default: ''
    },
    showAudit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      textarea: "",
      tableData: [],
      dialogData: {}, //专题审核信息
      pdfname: '',
      pdfsrc: '',
      isViewPdf20: false
    };
  },
  methods: {
    // 审核通过
    passAudit() {
      const url = "/api/todoProject/projectAudit/yes"
      this.$http
        .post(url, { id: this.auditId, note: this.textarea })
        .then(res => {
          if (res.data.errno === 0) {
            this.dialogTableVisible = false
            this.$emit('refreshSpecialList')
          } else {
            this.$message.error(res.data.message)
          }
        });
    },
    // 审核不通过
    failedAudit() {
      if (!this.textarea) {
        this.$message.error('审核意见不能为空')
        return
      }
      const url = "/api/todoProject/projectAudit/no"
      this.$http
        .post(url, { id: this.auditId, note: this.textarea })
        .then(res => {
          if (res.data.errno === 0) {
            this.dialogTableVisible = false
            this.$emit('refreshSpecialList')
          } else {
            this.$message.error(res.data.message)
          }
        });
    },
    // 审核信息
    getAuditInfo() {
      this.dialogTableVisible = true
      const url = "/api/todoProject/projectAudit/detail";
      this.$http
        .get(url, { id: this.auditId })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.tableData = data.info
            this.dialogData = data
          } else {
            this.$message.error(res.data.message)
          }
        });
    },
    // 审核通过 - 查看
    getApprovedInfo() {
      this.dialogTableVisible = true
      const url = "/api/todoProject/projectApproved/detail";
      this.$http
        .get(url, { id: this.approvedId })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.tableData = data.info
            this.dialogData = data
          } else {
            this.$message.error(res.data.message)
          }
        });
    },
    // 跨域下载
    downloadFile(url, fileName) {
      const x = new XMLHttpRequest();
      x.open("GET", url, true);
      x.responseType = 'blob';
      x.onload = function () {
        const url = window.URL.createObjectURL(x.response)
        const a = document.createElement('a');
        a.href = url
        a.download = fileName;
        a.click()
      }
      x.send();
    },
    // 预览
    showPdf(url, name) {
      this.isViewPdf20 = true
      this.pdfsrc = url
      this.pdfname = name
    },
    // 时间转换
    formatTimeToDate(time, type) {
      return formatDate(time, type);
    }
  }
};
</script>
<style lang="stylus">
.special-audit-dialog {
  .add-dialog {
    .el-dialog {
      width: 100%;
      margin-top: 0 !important;
      margin-bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      height: 100%;
      overflow-y: auto;
      padding-left: 168px;
      display: flex;
      flex-direction: column;

      .el-dialog__header {
        background: #fff;
        padding: 44px 168px 0px 10px;

        .el-dialog__title {
          display: block;
          padding-bottom: 15px;
          font-size: 18px;
          font-weight: 500;
          line-height: 25px;
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
        flex: 1;
        padding: 0px 168px 0px 10px;

        .professionalInfo {
          width: 720px;
          margin: 0 auto;
        }
      }

      .el-dialog__footer {
        background: #fff;
        padding: 15px 168px 48px 10px;
        text-align: left;

        .dialog-footer {
          display: flex;
          width: 720px;
          margin: 0 auto;

          .el-button {
            width: 348px;
          }

          .el-button+.el-button {
            margin-left: 24px;
          }
        }

        .el-button--primary {
          color: #FFF;
          background-color: rgba(0, 0, 0, 0.85);
          border-color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }

  .table-input {
    display: flex;

    .el-form-item--mini {
      margin-right: 23px;
    }

    .el-input {
      width: 208px;
    }

    .el-select {
      width: 208px;
    }

    .el-date-editor {
      width: 208px;

      .el-range-separator {
        padding: 0px;
        width: 8%;
      }
    }
  }

  .preview-dialog {
    .el-dialog {
      width: 100%;
      height: 100vh;
      margin-top: 0px !important;
      margin: 0px;
    }

    .el-dialog__header {
      text-align: center;
    }
  }
}
</style>
<style lang="stylus" scoped>
.special-audit-dialog {
  .add-dialog {
    .professionalInfo {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 15px;

      .basename {
        margin-top: 15px;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
      }

      .content {
        li {
          margin-top: 8px;

          p {
            color: rgba(0, 0, 0, 0.85);
            margin-bottom: 4px;
            font-size: 12px;
            line-height: 20px;
          }

          span {
            font-size: 12px;
            height: 17px;
            font-size: 12px;
            font-weight: 500;
            line-height: 17px;
            color: rgba(0, 0, 0, 0.45);
          }
        }

        .special-img {
          width: 208px;
          height: 116px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
      }

      .reported-info {
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid #e8e8e8;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 20px;
        box-sizing: content-box;
      }

      .reported-table {
        margin-top: 15px;
        width: 100%;
        border-left: 1px solid #EBEEF5;
        border-right: 1px solid #EBEEF5;

        .p-title {
          margin-top: 15px;
          padding: 16px 0px;
          border-top: 1px solid #e8e8e8;
          height: 17px;
          font-size: 12px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.85);
          line-height: 17px;
          box-sizing: content-box;
        }
      }

      .audit-info {
        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 33.33%;
            margin-top: 16px;

            p {
              font-size: 12px;
              color: rgba(0, 0, 0, 0.85);
              height: 20px;
              line-height: 20px;
            }

            p:first-child {
              font-size: 12px;
              color: rgba(0, 0, 0, 0.45);
              height: 20px;
              line-height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
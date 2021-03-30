<template>
  <div class="add-professional">
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
    <i
      class="el-icon-edit revise-icon"
      v-if="showDialog===1"
      @click="updateProfessional"
    ></i>
    <el-button
      size="mini"
      v-else
      @click="addProfessional"
    >新增</el-button>
    <div class="add-dialog">
      <el-dialog
        title="新增专题"
        :visible.sync="dialogTableVisible"
        :before-close="handleClose"
      >
        <div class="professionalInfo">
          <p class="basename">基本信息</p>
          <div class="content">
            <ul>
              <li>
                <p>
                  <span style="color:#AE0807">*</span>
                  <span>专题名称：</span>
                </p>
                <el-input
                  size="mini"
                  style="width:464px;"
                  v-model="topicName"
                  placeholder="请输入内容"
                ></el-input>
              </li>
              <li>
                <p>
                  <span style="color:#AE0807">*</span>
                  <span>专题海报：</span>
                </p>

                <el-upload
                  action="https://upload-z1.qiniup.com"
                  :http-request="upqiniu"
                  list-type="picture-card"
                  :before-upload="beforeUpload"
                  :on-remove="handleRemove"
                  :limit="1"
                  :file-list="fileList"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
              </li>
              <li>
                <p>
                  <span style="color:#AE0807">*</span>
                  <span>主题介绍：</span>
                </p>
                <el-input
                  resize="none"
                  type="textarea"
                  v-model="topicTheme"
                  placeholder="请输入内容"
                ></el-input>
              </li>
            </ul>
          </div>
          <p class="reported-info">研报信息</p>
          <!-- 研报信息查询 条件框  -->
          <div class="reported-table">
            <el-form
              size="mini"
              :model="formInfo"
            >
              <div class="table-input">
                <el-form-item
                  label="股票代码/简称："
                  style="flex:1;margin-right:23px;"
                >
                  <el-input
                    v-model="formInfo.sharesCode"
                    placeholder="请输入..."
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="所属行业："
                  style="flex:1;margin-right:23px;"
                >
                  <el-select
                    :clearable="true"
                    v-model="formInfo.reportCategoryCode"
                    placeholder="请选择研报类别"
                    @change="handleSelectChange"
                  >
                    <el-option
                      v-for="item of reportCategoryList"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label
                  style="margin-top:28px;flex:1;margin-right:0px;"
                >
                  <el-select
                    v-model="formInfo.industryName"
                    :clearable="true"
                    placeholder="请选择研报行业"
                    @change="handleSelectChange"
                  >
                    <el-option
                      v-for="item of industryList"
                      :key="item.dictKey"
                      :label="item.dictValue"
                      :value="item.dictKey"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div
                class="table-input"
                style="margin-top:16px;"
              >
                <el-form-item
                  label="发布日期："
                  style="flex:1;margin-right:23px;"
                >
                  <el-date-picker
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    v-model="formInfo.createDate"
                    @change="handleDateChange($event)"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  label="作者："
                  style="flex:1;margin-right:23px;"
                >
                  <el-input
                    v-model="formInfo.author"
                    placeholder="请输入作者名称"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label
                  style="flex:1;margin-top:28px;margin-right:0px;"
                >
                  <div style="text-align:right;">
                    <el-button
                      size="mini"
                      @click="handleResetClick"
                    >重置</el-button>
                    <el-button
                      type="primary"
                      style="border-color:#000;background:#000"
                      size="mini"
                      @click="getTableList"
                    >查询</el-button>
                  </div>
                </el-form-item>
              </div>
            </el-form>
            <p class="p-title">
              <svg-icon
                class="svg-icon"
                icon-class="info_circle_fill"
              ></svg-icon>以下为查询出的研报
            </p>
            <!-- 研报查询 table 列表-->
            <el-table
              :data="tableData"
              stripe
            >
              <el-table-column
                prop="reportTitle"
                label="研报标题"
              ></el-table-column>
              <el-table-column
                prop="author"
                label="作者"
              ></el-table-column>
              <el-table-column
                prop="createDate"
                label="发布时间"
              ></el-table-column>
              <el-table-column
                prop="reportCategoryName"
                label="类别"
              >
                <!-- <template slot-scope> -->
                <!-- <span>{{ scope.row.aa }}</span> -->
                <!-- <i class="el-icon-edit"></i> -->
                <!-- </template> -->
              </el-table-column>
              <el-table-column
                prop="industryName"
                label="行业"
              ></el-table-column>
              <el-table-column
                prop="sharesName"
                label="股票简称"
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
                      style="width:16px;height:16px"
                    ></svg-icon>
                    <span
                      class="file"
                      style="position:relative;top:1px;color:#AE0807;margin-right:4px;"
                    ></span>
                    <span
                      @click="showPdf(scope.row.fileUrl,scope.row.fileName)"
                      style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); cursor: pointer;"
                    >预览</span>
                    <span
                      @click="addReported(scope.$index)"
                      style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); margin-left: 16px; cursor: pointer;"
                    >添加</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              v-if="this.total != 0"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </div>
          <!-- 添加至专题的研报 table 列表 -->
          <p class="p-title-add">
            <svg-icon
              class="svg-icon"
              icon-class="info_circle_fill3"
            ></svg-icon>以下为添加至专题的研报
          </p>
          <el-table
            :data="tableAddData"
            stripe
          >
            <el-table-column
              prop="reportTitle"
              label="研报标题"
            ></el-table-column>
            <el-table-column
              prop="author"
              label="作者"
            ></el-table-column>
            <el-table-column
              prop="createDate"
              label="发布时间"
            ></el-table-column>
            <el-table-column
              prop="reportCategoryName"
              label="类别"
            >
              <!-- <template slot-scope> -->
              <!-- <span>{{ scope.row.aa }}</span> -->
              <!-- <i class="el-icon-edit"></i> -->
              <!-- </template> -->
            </el-table-column>
            <el-table-column
              prop="industryName"
              label="行业"
            ></el-table-column>
            <el-table-column
              prop="sharesName"
              label="股票简称"
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
                    style="width:16px;height:16px"
                  ></svg-icon>
                  <span
                    class="file"
                    style="position:relative;top:1px;color:#AE0807;margin-right:4px;"
                  ></span>
                  <span
                    @click="showPdf(scope.row.fileUrl,scope.row.fileName)"
                    style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); cursor: pointer;"
                  >预览</span>
                  <span
                    @click="removeClick(scope.$index)"
                    style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); margin-left: 16px; cursor: pointer;"
                  >移除</span>
                  <div style="margin-left:8px;">
                    <p
                      @click="setUp(scope.$index)"
                      v-if="scope.$index !== 0 "
                      class="up-arrow"
                    ></p>
                    <p
                      @click="setDown(scope.$index)"
                      v-if="scope.$index !==  tableAddData.length-1"
                      class="down-arrow"
                    ></p>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="saveDraft"
          >保存草稿</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="submitAudit"
          >提交审核</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { formatDate } from "@/utils/index";
export default {
  props: {
    showDialog: {
      type: Number,
      default: 0
    },
    reportCategoryList: {
      type: Array,
      default: function () {
        return []
      }
    },
    industryList: {
      type: Array,
      default: function () {
        return []
      }
    },
    auditId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogTableVisible: false,
      topicName: "", // 专题名称
      topicTheme: "", // 主题介绍
      formInfo: {
        sharesCode: "", // 股票代码/简称
        industryName: "", // 研报行业
        reportCategoryCode: "", // 研报类别
        createDate: "", // 发布日期
        author: "" // 作者
      },
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      tableAddData: [], // 添加专题研报列表
      uploadUrl: "",
      fileList: [],
      pdfname: '',
      pdfsrc: '',
      isViewPdf20: false

    };
  },
  methods: {
    handleRemove() {
      this.uploadUrl = "";
    },
    beforeUpload(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true; const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取图片上传地址
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
    // 点击 X 关闭dialog
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => { });
    },

    // table 分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
    },
    // 修改专题
    updateProfessional() {
      this.addProfessional()
      // this.dialogTableVisible = true
      const url = "/api/project/detail"
      this.$http.get(url, {
        id: this.auditId
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.topicName = data.titleName
            this.topicTheme = data.titleRecommended
            this.fileList.push({ url: data.titleImage })
            this.tableAddData = data.info
            this.uploadUrl = data.titleImage
          }
        })

    },
    // 新增专题
    addProfessional() {
      this.tableAddData = []
      this.tableData = []
      this.topicName = ''
      this.topicTheme = ''
      this.uploadUrl = ''
      this.total = 0
      this.fileList = []
      this.dialogTableVisible = true
      this.formInfo.sharesCode = ""
      this.formInfo.reportCategoryCode = ""
      this.formInfo.industryName = ""
      this.formInfo.createDate = []
      this.formInfo.author = ""
    },
    // 更改所属行业 研报类别或研报行业
    handleSelectChange() {
      this.getTableList()
    },
    // 重置
    handleResetClick() {
      this.currentPage = 1
      this.pageSize = 10
      this.formInfo.sharesCode = ""
      this.formInfo.reportCategoryCode = ""
      this.formInfo.industryName = ""
      this.formInfo.createDate = []
      this.formInfo.author = ""
      this.getTableList()
    },
    // 日期更改
    handleDateChange(val) {
      if (val) {
        const arr = val.map(e => {
          return new Date(e).getTime()
        })
        this.formInfo.createDate = arr
      }
      this.getTableList()
    },
    // 添加研报
    addReported(index) {
      // if(this.tableAddData.length<10){
      this.tableAddData.push(this.tableData[index])
      this.tableData.splice(index, 1)
      // }
      // else {
      //   this.$message.error("专题研报列表添加不能超过10条")
      // }
    },
    // 删除研报
    removeClick(index) {
      this.tableData.push(this.tableAddData[index])
      this.tableAddData.splice(index, 1)
    },
    // 研报顺序上移
    setUp(index) {
      this.tableAddData.splice(index - 1, 0, this.tableAddData[index])
      this.tableAddData.splice(index + 1, 1)
    },
    // 研报顺序下移
    setDown(index) {
      this.tableAddData.splice(index + 2, 0, this.tableAddData[index])
      this.tableAddData.splice(index, 1)
    },
    // 获取 table 数据
    getTableList() {
      const url = "/api/reported/getInfo"
      this.$http.get(url, {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        sharesCode: this.formInfo.sharesCode, // 股票代码/简称
        reportCategoryCode: this.formInfo.reportCategoryCode, // 研报分类
        industryId: this.formInfo.industryName, // 研报行业
        createDate: this.formInfo.createDate // 创建日期
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.total = data.count
            let arr = data.rows
            for (let i = 0; i < arr.length; i++) {
              for (let j = 0; j < this.tableAddData.length; j++) {
                if (arr[i] && arr[i].id === this.tableAddData[j].id && this.tableAddData[j]) {
                  arr.splice(i, 1)
                }
              }
            }
            this.tableData = arr
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    // 保存草稿
    saveDraft() {
      const url = "/api/project/saveDraft"
      this.$http.post(url, {
        id: this.auditId,
        titleImage: this.uploadUrl,
        titleName: this.topicName,
        titleRecommended: this.topicTheme,
        info: this.tableAddData
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.dialogTableVisible = false
            this.$emit("getSpecialInfo")
          }
        })
    },
    // 提交审核
    submitAudit() {
      let url = "/api/project/save"
      if (this.showDialog === 1) {
        url = "/api/project/update"
      }
      this.$http.post(url, {
        id: this.auditId,
        titleImage: this.uploadUrl,
        titleName: this.topicName,
        titleRecommended: this.topicTheme,
        info: this.tableAddData
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.dialogTableVisible = false
            this.$emit("getSpecialInfo")
          }
        })

    },
    // 预览
    showPdf(url, name) {
      this.isViewPdf20 = true
      this.pdfsrc = url
      this.pdfname = name
    },
  }
};
</script>
<style lang="stylus">
.add-professional {
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
.add-professional {
  .revise-icon {
    position: absolute;
    margin-top: -5px;
    font-size: 14px;
  }

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
          margin-top: 16px;

          p {
            margin-bottom: 4px;

            span {
              font-size: 12px;
              height: 17px;
              font-size: 12px;
              font-weight: 500;
              line-height: 17px;
              color: rgba(0, 0, 0, 0.45);
            }

            span:first-child {
              color: rgb(174, 8, 7);
              font-size: 12px;
              margin-right: 2px;
            }
          }
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
        width: 720px;
        min-height: 526px;
        background: rgba(250, 250, 250, 1);
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.15);
        padding: 16px 24px;

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

          .svg-icon {
            position: relative;
            top: 1px;
            width: 16px;
            height: 16px;
            margin-right: 8px;
          }
        }
      }

      .p-title-add {
        margin-top: 15px;
        padding: 16px 0px;
        border-top: 1px solid #e8e8e8;
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.85);
        line-height: 17px;
        box-sizing: content-box;

        .svg-icon {
          position: relative;
          top: 1px;
          width: 16px;
          height: 16px;
          margin-right: 8px;
        }
      }

      .p-title-add::before {
        content: '';
        vertical-align: middle;
        position: relative;
        top: 0px;
        margin-right: 9px;
      }

      .column-tags {
        display: flex;
        align-items: center;

        .up-arrow {
          border-bottom: 6px solid rgb(2, 125, 218);
          width: 0px;
          height: 0px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          margin-bottom: 4px;
        }

        .down-arrow {
          border-top: 6px solid rgb(2, 125, 218);
          width: 0px;
          height: 0px;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
        }
      }
    }
  }
}
</style>
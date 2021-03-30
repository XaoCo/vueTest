<template>
  <div class="professional-reported">
    <div class="reported-form">
      <el-form
        :model="formInfo"
        :inline="true"
        size="mini"
        label-width="62px"
      >
        <div
          style="display: flex"
          class="row-one"
        >
          <el-form-item
            label="名称查询："
            style="flex:1"
          >
            <div style="display:flex">
              <el-input
                v-model="formInfo.reportTitle"
                placeholder="请输入名称"
              ></el-input>
              <el-button
                size="mini"
                @click="onSubmit"
              >搜索</el-button>
            </div>
          </el-form-item>
          <el-form-item
            label="标的查询："
            style="flex:1"
          >
            <div style="display:flex">
              <el-input
                v-model="formInfo.sharesCode"
                placeholder="请输入名称"
              ></el-input>
              <el-button
                size="mini"
                @click="onSubmit"
              >搜索</el-button>
            </div>
          </el-form-item>
          <el-form-item
            label="发布日期："
            style="flex:1"
          >
            <el-date-picker
              v-model="formInfo.createDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange($event)"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div
          style="display:flex"
          class="row-two"
        >
          <el-form-item
            label="研报类别："
            style="flex:1"
          >
            <el-select
              :clearable="true"
              v-model="formInfo.reportCategoryCode"
              placeholder="请选择"
              @change="handleSelectChange"
            >
              <el-option
                v-for="item of reportCategoryList"
                :key="item.id"
                :label="item.dictValue"
                :value="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="研报行业："
            style="flex:1"
          >
            <el-select
              :clearable="true"
              v-model="formInfo.industryName"
              placeholder="请选择"
              @change="handleSelectChange"
            >
              <el-option
                v-for="item of industryList"
                :key="item.id"
                :label="item.dictValue"
                :value="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label
            style="flex:1;"
          >
            <div style="display:flex;justify-content: center;align-items: center; height: 28px;">
              <el-checkbox
                v-model="formInfo.noIndustry"
                label="只看无行业研报"
                name="type"
                @change="handleSelectChange"
              ></el-checkbox>
              <el-button
                style="margin-left:152px"
                size="mini"
                @click="ResetClick"
              >重置</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="reported-table">
      <div class="tableinfo-title">
        <span class="span-line"></span>
        <span class="span-lable">研报总览</span>
        <span class="small-title">
          （共
          <span style="color: rgba(0, 0, 0, 0.85)">{{this.total}}</span> 篇研报）
        </span>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column
          prop="reportTitle"
          label="研报标题"
          width="180px"
        ></el-table-column>
        <el-table-column
          prop="author"
          label="作者"
        ></el-table-column>
        <el-table-column
          prop=""
          label="发布时间"
          width="130px"
        >
          <template slot-scope="scope">
            {{formatDateTo(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reportCategoryName"
          label="类别"
        >
        </el-table-column>
        <el-table-column
          prop="industryName"
          label="行业"
        ></el-table-column>
        <el-table-column
          prop="sinitekType"
          label="携宁对应分类"
        ></el-table-column>
        <el-table-column
          prop="sharesCode"
          label="股票代码"
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
              <a
                @click="downloadFile(scope.row.fileUrl,scope.row.fileName)"
                style="font-size: 12px; font-weight: 400; color: rgb(2, 125, 218); margin-left: 16px; cursor: pointer;"
              >下载</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/utils/index.js'
import { downloadFile } from '@/utils/download'

export default {
  data() {
    return {
      pdfname: '',
      pdfsrc: '',
      formInfo: {
        reportTitle: "", // 研报标题
        sharesCode: "", //  股票代码
        reportCategoryCode: "", // 研报类别
        industryName: "", // 研报行业
        createDate: [], // 发布日期
        noIndustry: false // 是否只看无研报行业
      },
      currentPage: 1, //  页码
      pageSize: 10, // 每页条数
      total: 0,
      tableData: [],
      loading: true,
      reportCategoryList: [],
      industryList: [],
      isViewPdf20: false
    };
  },
  methods: {
    // 重置
    ResetClick() {
      this.currentPage = 1
      this.pageSize = 10
      this.formInfo.reportTitle = ""
      this.formInfo.sharesCode = ""
      this.formInfo.reportCategoryCode = ""
      this.formInfo.industryName = ""
      this.formInfo.noIndustry = false
      this.formInfo.createDate = []
      this.getTableList()
    },
    onSubmit() {
      this.getTableList()
    },
    handleSelectChange() {
      this.onSubmit()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableList()
    },
    // 改变日期刷新列表
    handleDateChange(val) {
      if (val) {
        const arr = val.map(e => {
          return new Date(e).getTime()
        })
        this.formInfo.createDate = arr
        // console.log(arr)
      }
      this.getTableList()

    },
    // 初始化 table 列表
    getTableList() {
      const url = "/api/reported/getInfo"
      this.$http.get(url, {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        reportTitle: this.formInfo.reportTitle,
        sharesCode: this.formInfo.sharesCode,
        reportCategoryCode: this.formInfo.reportCategoryCode,
        industryId: this.formInfo.industryName,
        noIndustry: this.formInfo.noIndustry === false ? 1 : 0,
        createDate: this.formInfo.createDate
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.total = data.count
            this.tableData = data.rows
            this.loading = false
            // console.log(data)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    // 初始化研报类别
    reportCategory() {
      const url = "/api/dict/item/list-page"
      this.$http.get(url, {
        dictId: 'reportCategory'
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.reportCategoryList = data
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    // 初始化研报行业
    industry() {
      const url = "/api/dict/item/list-page"
      this.$http.get(url, {
        dictId: 'industry'
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.industryList = data
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    formatDateTo(date, type) {
      return formatDate(date, type)
    },
    // 跨域下载
    downloadFile (url, fileName) {
      downloadFile(url, {}, fileName)
      // const x = new XMLHttpRequest();
      // x.open("GET", url, true);
      // x.responseType = 'blob';
      // x.onload = function () {
      //   const url = window.URL.createObjectURL(x.response)
      //   const a = document.createElement('a');
      //   a.href = url
      //   a.download = fileName;
      //   a.click()
      // }
      // x.send();
    },
    // 预览
    showPdf(url, name) {
      this.isViewPdf20 = true
      this.pdfsrc = url
      this.pdfname = name
    }
  },
  created() {
    this.getTableList()
    this.reportCategory()
    this.industry()
  }
};
</script>
<style lang="stylus">
.professional-reported {
  .el-dialog {
    width: 100%;
    height: 100vh;
    margin-top: 0px !important;
    margin: 0px;
  }

  .el-dialog__header {
    text-align: center;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }

  .el-form-item__label {
    text-align: left;
    font-size: 12px;
    padding: 0px;
  }

  .row-one {
    .el-date-editor .el-range-separator {
      padding: 0px;
    }

    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
      width: 268px;
    }

    .el-input--mini {
      width: 200px;
      margin-right: 12px;
    }

    .el-select--mini {
      width: 268px;
    }
  }

  .row-two {
    margin-top: 16px;

    .el-select--mini {
      width: 268px;
    }
  }
}
</style>
<style lang="stylus" scoped>
.professional-reported {
  .reported-form {
    background: #fff;
    width: 100%;
    padding: 22px 24px;
    border-radius: 8px;
  }

  .reported-table {
    margin-top: 16px;
    background: #fff;
    border-radius: 8px;

    .tableinfo-title {
      padding: 14px 0;
      display: flex;
      align-items: center;

      .span-line {
        margin-right: 4px;
        width: 4px;
        height: 16px;
        background: -webkit-gradient(linear, right top, left top, from(#d82b09), to(#c20607));
        background: linear-gradient(270deg, #d82b09 0%, #c20607 100%);
      }

      .span-lable {
        padding-left: 16px;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
      }

      .small-title {
        font-size: 12px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.45);
        margin-left: 6px;
        line-height: 20px;
      }

      .column-tags {
        height: 24px;
        line-height: 24px;
        display: flex;
      }
    }
  }
}
</style>
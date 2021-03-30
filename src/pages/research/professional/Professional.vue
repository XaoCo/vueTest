<template>
  <div class="professional-contain">
    <div class="special-form">
      <!-- 条件搜索 -->
      <el-form
        :model="formLabelAlign"
        :inline="true"
        size="mini"
        label-width="80px"
      >
        <div style="margin-bottom: 16px;">
          <el-form-item label="专题名称：">
            <el-input
              style="width:226px;margin-right:12px"
              v-model="formLabelAlign.specialName"
              placeholder="请输入专题名称"
            ></el-input>
            <el-button
              size="mini"
              @click="handleSearch"
            >搜索</el-button>
          </el-form-item>
        </div>
        <div style="display:flex">
          <el-form-item label="创建人：">
            <el-select
              :clearable="true"
              v-model="formLabelAlign.creater"
              placeholder="请选择"
              @change="handleSearch"
            >
              <el-option
                v-for="item of userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专题状态：">
            <el-select
              :clearable="true"
              v-model="formLabelAlign.thematicState"
              placeholder="请选择"
              @change="handleSearch"
            >
              <el-option
                v-for="item of statusList"
                :key="item.id"
                :label="item.dictValue"
                :value="item.dictKey"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label>
            <el-checkbox-group v-model="formLabelAlign.checked">
              <el-checkbox
                label="只看小程序上发布"
                @change="handleCheckboxChange"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- table 列表展示 -->
    <div class="special-table">
      <div class="tableinfo">
        <div class="table-title">
          <span class="span-line"></span>
          <span class="span-lable">专题</span>
          <span class="small-title">
            (共
            <span style="color: rgba(0, 0, 0, 0.85)">{{this.total}}</span>个专题)
          </span>
          <div style="display:flex;position:absolute;right:24px;top:12px">
            <el-button
              size="mini"
              style="margin-right:16px"
              @click="leadOutClick"
            >导出</el-button>
            <!-- 新增专题 -->
            <addProfessional
              @getSpecialInfo="getSpecialInfo"
              :reportCategoryList="reportCategoryList"
              :industryList="industryList"
            ></addProfessional>
          </div>
        </div>
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="topFlag"
            width="80"
            align="center"
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.topFlag ===1"
                class="stick"
              >
                <span style="font-weight:600;color:rgb(255,255,255)">顶</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="titleImage"
            width="90"
            align="center"
          >
            <template slot-scope="scope">
              <img
                style="width:48px;height:48px"
                :src="scope.row.titleImage"
                alt
              />
            </template>
          </el-table-column>
          <el-table-column
            prop="titleName"
            label="专题名称"
          ></el-table-column>
          <el-table-column
            prop="titleRecommended"
            label="专题介绍"
          ></el-table-column>
          <el-table-column
            prop="createUserName"
            label="创建人"
          ></el-table-column>
          <el-table-column
            prop="createDate"
            label="创建时间"
          >
            <template slot-scope="scope">
              {{formatDateToTime(scope.row.createDate)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="titleStatus"
            label="专题状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.titleStatus === 0">草稿</span>
              <span v-if="scope.row.titleStatus === 1">新建审核</span>
              <span v-if="scope.row.titleStatus === 2">修改审核</span>
              <span v-if="scope.row.titleStatus === 3">已发布</span>
            </template>
          </el-table-column>
          <el-table-column
            prop
            label
            min-width="120"
          >
            <template slot-scope="scope">
              <div class="column-tags">
                <!-- 专题修改 -->
                <addProfessional
                  v-if="scope.row.titleStatus === 0"
                  :showDialog="1"
                  :reportCategoryList="reportCategoryList"
                  :industryList="industryList"
                  :auditId="scope.row.id"
                ></addProfessional>
                <el-button
                  v-if="scope.row.validFlag === 1"
                  size="mini"
                  @click="setDisable(scope.row.id)"
                >禁用</el-button>
                <el-button
                  v-else
                  size="mini"
                >启用</el-button>
                <el-button
                  v-if="scope.row.topFlag===0"
                  size="mini"
                  @click="setTop(0,scope.row.id)"
                >置顶</el-button>
                <el-button
                  v-else
                  size="mini"
                  @click="setTop(1,scope.row.id)"
                >取消置顶</el-button>
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
  </div>
</template>

<script>
import addProfessional from "./components/addProfessional";
import { formatDate } from '@/utils/index.js'
import exportExcel from '@/utils/download'
export default {
  components: {
    addProfessional
  },
  data() {
    return {
      formLabelAlign: {
        specialName: "",
        creater: "",
        thematicState: "",
        checked: false
      },
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      userList: [],
      statusList: [],
      checkgroup: '',
      loading: true,
      reportCategoryList: [], // 研报类别列表
      industryList: [] // 研报行业列表
    };
  },
  created() {
    this.getSpecialInfo()
    this.getUsers()
    this.getSpecialStatus()
    this.reportCategory()
    this.industry()
  },
  methods: {
    // 搜索
    handleSearch() {
      this.getSpecialInfo()
    },
    handleCheckboxChange() {
      this.checkgroup = this.formLabelAlign.checked === false ? '' : '1'
      this.getSpecialInfo()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSpecialInfo()
    },
    // 加载table列表项
    getSpecialInfo() {
      const url = '/api/project/getInfo'
      this.$http.get(url, {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        titleName: this.formLabelAlign.specialName,
        createBy: this.formLabelAlign.creater,
        titleStatus: this.formLabelAlign.thematicState,
        publishedApplet: this.checkgroup
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.total = data.count
            this.tableData = data.rows
            this.loading = false
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    // 导出专题
    leadOutClick() {
      exportExcel('/api/download/downloadProject', {}, '活动资料1', false)
    },
    // 加载创建人
    getUsers() {
      const url = '/api/project/getUsers'
      this.$http.get(url, {})
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.userList = data
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    // 加载专题状态列表
    getSpecialStatus() {
      const url = '/api/dict/item/list-page'
      this.$http.get(url, {
        dictId: 'zhuantizhuangtai',
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.statusList = data
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
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
            this.$message({
              message: res.data.message,
              type: 'error',
            })
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
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    setTop(val, id) {
      let url = '/api/project/set-top'
      if (val === 1) {
        url = '/api/project/cancel-top'
      }
      this.$http.post(url, {
        id: id
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.getSpecialInfo()
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    setDisable(id) {
      let url = '/api/project/disable'
      this.$http.post(url, {
        id: id
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.getSpecialInfo()
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
            })
          }
        })
    },
    formatDateToTime(time, type) {
      return formatDate(time, type)
    }
  },

};
</script>
<style lang="stylus">
.professional-contain {
  .el-form-item__label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.45);
    line-height: 17px;
  }

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin-bottom: 0px;
    margin-right: 47px;
  }

  .el-select {
    width: 294px;
  }

  .el-icon-edit {
    margin-right: 1px;
  }

  .column-tags .el-button {
    margin-left: 30px;
  }
}
</style>
<style lang="stylus" scoped>
.professional-contain {
  .special-form {
    width: 100%;
    background: rgb(255, 255, 255);
    padding: 22px 24px;
    border-radius: 8px;
  }

  .special-table {
    margin-top: 15px;

    .tableinfo {
      width: 100%;
      border-radius: 8px;
      background: #fff;

      .table-title {
        position: relative;
        color: rgba(0, 0, 0, 0.85);
        padding: 16px 0;
        display: flex;

        .span-line {
          width: 4px;
          height: 16px;
          background: linear-gradient(270deg, #d82b09 0%, #c20607 100%);
          margin: 2px 4px 0px 0px;
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
      }

      .stick {
        background: rgb(174, 8, 7);
        width: 16px;
        height: 16px;
        text-align: center;
        line-height: 16px;
        display: inline-block;
        border-radius: 3px;
      }

      .column-tags {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
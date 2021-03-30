<template>
  <div class="base-info">
    <div class="base-info-search">
      <!-- 客户信息搜索 -->
      <div class="input-info">
        <span class="base-title">客户信息：</span>
        <div class="input-margin">

          <el-input
            v-model="customerName"
            size="mini"
            placeholder="请输入客户名称查询"
          ></el-input>
        </div>
        <el-button size="mini">搜索</el-button>
      </div>
      <!-- 客户类型 客户分级 -->
      <div class="select-info">
        <div class="customer-content">
          <span class="base-title">客户类型：</span>
          <div class="select-width">
            <el-select
              :clearable="true"
              v-model="customerType"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                label="公募基金"
                value="0"
              >
              </el-option>
              <el-option
                label="私募基金"
                value="1"
              >
              </el-option>
              <el-option
                label="合格投资者"
                value="2"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div
          class="customer-content"
          style="flex:2"
        >
          <span class="base-title">客户分级：</span>
          <div class="select-width">

            <el-select
              :clearable="true"
              v-model="customerDivide"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                label="A级"
                value="0"
              >
              </el-option>
              <el-option
                label="B级"
                value="1"
              >
              </el-option>
              <el-option
                label="C级"
                value="2"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 业务进度 区域 客户经理 -->
      <div class="select-info">
        <div class="customer-content">
          <span class="base-title">业务进度：</span>
          <div class="select-width">
            <el-select
              :clearable="true"
              v-model="customerProgress"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                label="潜在客户"
                value="0"
              >
              </el-option>
              <el-option
                label="拟签约客户"
                value="1"
              >
              </el-option>
              <el-option
                label="签约客户"
                value="2"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="customer-content">
          <span class="base-title">区域：</span>
          <div class="select-width">

            <el-select
              :clearable="true"
              v-model="area"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                label="北京"
                value="0"
              >
              </el-option>
              <el-option
                label="上海"
                value="1"
              >
              </el-option>
              <el-option
                label="深圳"
                value="2"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="customer-content">
          <span class="base-title">客户经理：</span>
          <div class="select-width">

            <el-select
              :clearable="true"
              v-model="customerManager"
              placeholder="请选择"
              size="mini"
            >
              <el-option
                label="人物一"
                value="0"
              >
              </el-option>
              <el-option
                label="人物二"
                value="1"
              >
              </el-option>
              <el-option
                label="人物三"
                value="2"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <div class="base-info-table">
      <div class="tableinfo-title">
        <span class="span-line"></span>
        <span class="span-lable">客户基本信息</span>
        <span class="small-title">
          （共
          <span style="color: rgba(0, 0, 0, 0.85)">134</span>个客户）
        </span>
        <div class="tableinfo-btn">
          <div style="margin-right:16px;">
            <el-button size="mini">导出</el-button>
          </div>
          <!-- 新增客户信息 -->
          <updateCustomer></updateCustomer>
        </div>
      </div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
      >
        <el-table-column
          prop="code"
          label="社会统一信用代码"
        ></el-table-column>
        <el-table-column
          prop="customerType"
          label="客户类型"
        ></el-table-column>
        <el-table-column
          prop="customerName"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          prop="shortName"
          label="客户简称"
        ></el-table-column>
        <el-table-column
          prop="customerCategory"
          label="客户分级"
        ></el-table-column>

        <el-table-column
          prop="progress"
          label="业务进度"
        ></el-table-column>
        <el-table-column
          prop="region"
          label="区域"
        ></el-table-column>
        <el-table-column
          prop="customerManager"
          label="客户经理"
        ></el-table-column>
        <el-table-column
          width="180"
        >
          <template slot-scope="">
            <!-- <span>{{ scope.row.aa }}</span> -->
            <div class="column-tag">
              <i class="el-icon-edit"></i>
              <div style="margin-left:16px;">
                <!-- 设置客户经理 dialog -->
                <setManager></setManager>
              </div>
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
import setManager from "./components/setManager"
import updateCustomer from './components/updateCustomer'
export default {
  components: {
    setManager,
    updateCustomer
  },
  data() {
    return {
      customerName: '',
      customerType: '',
      customerDivide: '',
      customerProgress: '',
      area: '',
      customerManager: '',
      currentPage: 1,
      pageSize: 10,
      total: 100,
      tableData: []
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCustomerList()
    },
    getCustomerList(){
      const url = '/api/todo/customerList'
      this.$http.get(url,{
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        customerName: '',
        customerTypeCode: '',
        customerCategoryCode: '',
        progressCode: '',
        regionCode:'',
        customerManagerCode:''
      })
      .then(res=>{
        if(res.data.errno === 0 ){
          const data = res.data.data
          this.total = data.count
          this.tableData = data.rows
        }
      })
    }
  },
  created () {
    this.getCustomerList()
  }
}
</script>
<style lang="stylus">
.base-info {
  .select-width {
    .el-select {
      width: 248px;
    }
  }
}
</style>
<style lang="stylus" scoped>
.base-info {
  .base-info-search {
    width: 100%;
    background: #fff;
    padding: 16px 24px;
    box-shadow: 0px 0px 20px 4px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
  }

  .input-info {
    display: flex;
    align-items: center;

    .base-title {
      width: 64px;
      font-size: 12px;
      font-weight: 600;
      line-height: 17px;
      color: rgba(0, 0, 0, 0.45);
    }

    .input-margin {
      margin-right: 16px;
      width: 248px;
    }
  }

  .select-info {
    display: flex;

    .customer-content {
      flex: 1;
      margin-top: 16px;
      display: flex;
      align-items: center;

      .base-title {
        width: 64px;
        font-size: 12px;
        font-weight: 600;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.45);
      }

      .select-width {
        width: 248px;
      }
    }
  }

  .base-info-table {
    position: relative;
    margin-top: 16px;
    background: #fff;
    border-radius: 8px;

    .tableinfo-title {
      position: relative;
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

      .tableinfo-btn {
        display: flex;
        position: absolute;
        right: 24px;
      }
    }

    .column-tag {
      display: flex;
      align-items: center;
    }
  }
}
</style>
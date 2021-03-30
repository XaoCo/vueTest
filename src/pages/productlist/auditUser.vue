<template>
  <div class="audit-user">
    <div class="tableinfo">
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="code" label="统一社会代码" min-width="120"></el-table-column>
        <el-table-column prop="customerType" label="客户类型"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" width="150"></el-table-column>
        <el-table-column prop="approveStatus" label="审核状态">
          <template slot-scope="scope">
            <span v-if="scope.row.approveStatus === 'DOING'">
              <i class="signcustorms" :style="{'background':bgcolors[0]}"></i>
              待审核
            </span>
            <span v-if="scope.row.approveStatus === 'REFUSE'">
              <i class="signcustorms" :style="{'background':bgcolors[2]}"></i>
              审核不通过
            </span>
            <span v-if="scope.row.approveStatus === 'FINISH'">
              <i class="signcustorms" :style="{'background':bgcolors[1]}"></i>
              审核通过
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="approveType" label="提交类型">
          <template slot-scope="scope">
            <span v-if="scope.row.approveType === 'edit'" class="signfontcolor">客户分级</span>
            <span v-if="scope.row.approveType === 'add'" class="signfontcolortwo">新增客户</span>
          </template>
        </el-table-column>
        <el-table-column prop="createByName" label="提交人"></el-table-column>
        <el-table-column prop="createDate" label="提交时间">
          <template slot-scope="scope">
            <span>{{formatTimeToDate(scope.row.createDate)}}</span>
          </template>
        </el-table-column>
        <el-table-column label>
          <template slot-scope="scope">
            <audit :rowId="scope.row.id" @getAduitList="handleAduitList" ></audit>
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
import { formatDate } from "@/utils/index";
import audit from "./components/audit";
export default {
  components: {
    audit
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      bgcolors: ["#F7B500", "#6DD400", "#AE0807aa", "#3C97FD"],
      detailinfo: {},
      loading: true
    };
  },
  created() {
    this.getAduitList();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAduitList();
    },
    getAduitList() {
      const url = "/api/todo/customerAudit";
      this.$http
        .get(url, { pageNum: this.currentPage, pageSize: this.pageSize })
        .then(res => {
          if (res.data.errno === 0) {
            this.loading = false
            const data = res.data.data;
            this.tableData = data.rows;
            this.total = data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    formatTimeToDate(time, type) {
      return formatDate(time, type);
    },
    handleAduitList() {
      this.getAduitList()
    }
    // clickinfo(row, column) {
    //   if (column.label === "") {
    //     this.detailinfo = row
    //   }
    // }
  }
};
</script>

<style lang="stylus">
.audit-user {
  .el-table th.is-leaf {
    border-top: 1px solid #EBEEF5;
    background: rgba(250, 250, 250, 1);
  }

  .el-table .cell {
    font-size: 12px;
  }
}
</style>

<style lang="stylus" scoped>
.tableinfo {
  background: #fff;
  border-radius: 8px;

  .signcustorms {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: rgba(247, 181, 0, 1);
    margin-right: 8px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .signfontcolor {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(255, 249, 230, 1);
    color: rgba(255, 152, 0, 1);
    border-radius: 4px;
    font-size: 10px;
    font-weight: 400;
    padding: 0 8px;
  }

  .signfontcolortwo {
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: rgba(230, 248, 255, 1);
    color: rgba(2, 125, 218, 1);
    border-radius: 4px;
    font-size: 10px;
    font-weight: 400;
    padding: 0 8px;
  }
}
</style>
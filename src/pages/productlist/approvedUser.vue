<template>
  <div class="approved-user">
    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="code" label="客户编号" min-width="120"></el-table-column>
      <el-table-column prop="customerType" label="客户类型"></el-table-column>
      <el-table-column prop="customerName" label="客户简称"></el-table-column>
      <el-table-column prop="approveStatus" label="审核状态">
        <template slot-scope="scope">
          <span v-if="scope.row.approveStatus === 'REFUSE'">
            <i class="audit-state" :style="{background:bgColor[0]}"></i>审核不通过
          </span>
          <span v-if="scope.row.approveStatus === 'FINISH'">
            <i class="audit-state" :style="{background:bgColor[1]}"></i>审核通过
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="approveType" label="审核类型">
        <template slot-scope="scope">
          <span v-if="scope.row.approveType === 'edit'" class="approve-type-one">客户分级</span>
          <span v-if="scope.row.approveType === 'add'" class="approve-type-two">新增客户</span>
        </template>
      </el-table-column>
      <el-table-column prop="approveByName" label="提交人"></el-table-column>
      <el-table-column prop="approveDate" label="提交时间">
        <template slot-scope="scope">
          <span>{{formatToDate(scope.row.approveDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="审核意见"></el-table-column>
      <el-table-column label>
        <template slot-scope="scope">
          <audit :rowId = 'scope.row.id' :showView="1"></audit>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSizes"
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import audit from "./components/audit";
import { formatDate } from "@/utils/index";
export default {
  components: {
    audit
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSizes: 10,
      bgColor: ["#AE0807aa", "#3C97FD"],
      loading:true
    };
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getApproveList();
    },
    getApproveList() {
      const url = "/api/todo/customerApproved";
      this.$http
        .get(url, { pageNum: this.currentPage, pageSize: this.pageSize })
        .then(res => {
          if (res.data.errno === 0) {
            this.loading = false
            const data = res.data.data;
            // console.log(data);
            this.tableData = data.rows;
            this.total = data.count;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    formatToDate(time, type) {
      return formatDate(time, type);
    }
  },
  created() {
    this.getApproveList();
  }
};
</script>
<style lang="stylus">
.approved-user {
  .el-table th {
    border-top: 1px solid #ebeef5;
    background: #fafafa;
  }

  .el-table td .cell {
    font-size: 12px;
  }

  .el-table th .cell {
    font-size: 12px;
  }
}
</style>
<style lang="stylus" scoped>
.approved-user {
  .audit-state {
    display: inline-block;
    width: 6px;
    height: 6px;
    background: rgba(247, 181, 0, 1);
    margin-right: 8px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .approve-type-one {
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

  .approve-type-two {
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
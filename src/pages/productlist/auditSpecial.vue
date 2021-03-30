<template>
  <div class="audit-special">
    <div class="tableinfo">
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop
          label="专题名称"
          width="220"
        >
          <template slot-scope="scope">
            <div class="img-contain">
              <div class="img"><img style="width:100%;height:100%" :src="scope.row.titleImage" alt=""></div>
              <span>{{scope.row.titleName}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="titleRecommended"
          label="专题介绍"
        ></el-table-column>
        <el-table-column
          prop
          label="审核类型"
        >
          <template slot-scope="scope">
            <span
              v-if="scope.row.approveType === 'edit'"
              class="modify-tag"
            >修改提交</span>
            <span
              v-else
              class="increase-tag"
            >新增提交</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="审核状态"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.approveStatus === 'DOING'">
              <i
                class="small-dot"
                :style="{background:bgColor[0]}"
              ></i>
              待审核
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="提交人"
        ></el-table-column>
        <el-table-column
          label="提交时间"
        >
          <template slot-scope="scope">
            {{formatTimeToDate(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column
          prop
          label="审核按钮"
        >
          <!-- 专题审核 -->
          <template slot-scope="scope">
            <Special :auditId="scope.row.id" :showAudit="1" @refreshSpecialList="getSpecialList"></Special>
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
import Special from './components/Special'
import { formatDate } from "@/utils/index";
export default {
  components: {
    Special
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      bgColor: ['#ff9800', '#027dda'],
      loading: true
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSpecialList()
    },
    // 获取专题待审核列表
    getSpecialList() {      
      const url = "/api/todoProject/projectAudit";
      this.$http
        .get(url, { pageNum: this.currentPage, pageSize: this.pageSize })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.tableData = data.rows
            this.total = data.count
            this.loading = false
          } else {
            this.$message.error(res.data.message)
          }
        });

    },
    // 时间转换
    formatTimeToDate(time, type) {
      return formatDate(time, type);
    },
  },
  created() {
    this.getSpecialList()
  }
};
</script>

<style lang="stylus" scoped>
.audit-special {
  .tableinfo {
    .img-contain {
      display: flex;
      align-items: center;

      .img {
        min-width: 48px;
        max-width: 48px;
        height: 32px;
        margin-right: 16px;
        border-radius: 4px;
        background: #e8e8e8;
      }
    }

    .modify-tag {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #e6f8ff;
      color: #027dda;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 400;
      padding: 0 8px;
    }

    .increase-tag {
      display: inline-block;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #fff9e6;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 400;
      color: #ff9800;
      padding: 0 8px;
    }

    .small-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: rgba(247, 181, 0, 1);
      border-radius: 50%;
      vertical-align: middle;
      margin-right: 8px;
    }
  }
}
</style>
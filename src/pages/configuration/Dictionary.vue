<template>
  <div class="dictionary-item">
    <div class="item-search">
      <span>字典查找：</span>
      <el-input
        size="mini"
        v-model="dictId"
        placeholder="请输入字典编号或字典名称..."
      ></el-input>
      <el-button
        size="mini"
        @click="getDictList"
      >搜索</el-button>
    </div>
    <div class="item-content">
      <!-- 字典索引管理 -->
      <div class="item item-index">
        <div class="item-title-content">
          <div class="item-title">
            <span></span>
            <span>字典索引管理</span>
          </div>
          <div class="item-btn">
            <addIndex @RefreshList="RefreshList"></addIndex>
          </div>
        </div>
        <div class="item-table-wrapper">
          <el-table
            :data="tableIndexData"
            style="width: 100%"
          >
            <el-table-column
              width="65"
              label=""
            >
              <template slot-scope="scope">
                <el-radio
                  v-model="radio"
                  :label="scope.$index"
                  @change.native="getCurrentRow(scope.$index,scope.row)"
                >
                  {{` `}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column
              prop="dictCode"
              label="字典编号"
            >
            </el-table-column>
            <el-table-column
              prop="dictName"
              label="字典名称"
            >
            </el-table-column>
            <el-table-column
              prop=""
              label=""
            >
              <template slot-scope="scope">
                <addIndex
                  @RefreshList="RefreshList"
                  :dictRowDate="scope.row"
                  :showIndexBtn="1"
                ></addIndex>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :pager-count="5"
          layout="prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <!-- 字典项管理 -->
      <div class="item item-manages">
        <div class="item-title-content">
          <div class="item-title">
            <span></span>
            <span>字典项管理</span>
          </div>
          <div class="item-btn">
            <addWord
              @updateItemList="updateItemList"
              :rowData="row"
              :dictIndex="dictIndex"
            ></addWord>
          </div>
        </div>
        <div class="item-table-wrapper">
          <el-table
            :data="tableWordData"
            style="width: 100%"
          >
            <el-table-column
              prop="dictId"
              label="字典编号"
              width="150"
            >
            </el-table-column>
            <el-table-column
              prop="sort"
              label="字典排序"
            >
            </el-table-column>
            <el-table-column
              prop="dictKey"
              label="键值编码"
            >
            </el-table-column>
            <el-table-column
              prop="dictValue"
              label="字典名称"
            >
            </el-table-column>
            <el-table-column
              prop="note"
              label="备注"
            >
            </el-table-column>
            <el-table-column
              prop=""
              label=""
            >
              <template slot-scope="scope">
                <addWord :updateRow="scope.row" :showWordBtn="1" @updateItemList="updateItemList"></addWord>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          @current-change="handleItemCurrentChange"
          :current-page.sync="currentPageItem"
          :page-size="pageSizeItem"
          :pager-count="5"
          layout="prev, pager, next, jumper"
          :total="totalItem"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import addIndex from './components/addIndex'
import addWord from './components/addWord'
export default {
  components: {
    addIndex,
    addWord
  },
  data() {
    return {
      radio: -1,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      currentPageItem: 1, // item 项的当前页
      pageSizeItem: 10, // item 项的每页条数
      totalItem: 0,
      dictId: '',
      dictIndex: '',
      row: {},
      tableIndexData: [],
      tableWordData: []
    }
  },
  methods: {
    // 字典项页数切换
    handleCurrentChange(val) {
      this.currentPage = val
      this.getDictionaryList()
    },
    // item 项页数切换
    handleItemCurrentChange(val) {
      this.currentPageItem = val
      this.getCurrentRow(this.dictIndex, this.row)
    },
    // 搜索字典项
    getDictList() {
      this.radio = -1
      this.dictIndex = ''
      this.tableWordData = [ ]
      this.getDictionaryList()
    },
    // 子组件触发刷新字典项
    RefreshList() {
      this.getDictionaryList()
    },
    // 获取字典项数据
    getDictionaryList() {
      const url = '/api/dict/list-page'
      this.$http.get(url, {
        dictCode: this.dictId,
        pageNum: this.currentPage,
        pageSize: this.pageSize

      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.tableIndexData = data.rows
            this.total = data.count
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    // item 子组件刷新列表
    updateItemList() {
      this.getCurrentRow(this.dictIndex, this.row)
    },
    // 获取 item 项数据
    getCurrentRow(index, row) {
      this.dictIndex = index
      this.row = row
      const url = '/api/dict/item/list-page'
      this.$http.get(url, {
        dictId: row.dictCode,
        pageNum: this.currentPageItem,
        pageSize: this.pageSizeItem
      })
        .then(res => {
          if (res.data.errno === 0) {
            const data = res.data.data
            this.tableWordData = data.rows
            this.totalItem = data.count
          }
        })
    }
  },
  created() {
    this.getDictionaryList()
  }
}
</script>

<style lang="stylus">
.dictionary-item {
  .item-search {
    .el-input {
      width: 286px;
      margin-right: 10px;
    }
  }

  .item-table-wrapper {
    height: calc(100% - 103px);
    border-bottom: 1px solid #EBEEF5;
  }
}
</style>

<style lang="stylus" scoped>
.dictionary-item {
  .item-search {
    background: #fff;
    border-radius: 8px;
    padding: 16px 24px;

    span {
      font-size: 12px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.45);
      margin-right: 4px;
    }
  }

  .item-content {
    margin-top: 15px;
    border-radius: 8px;
    display: flex;

    .item {
      background: #fff;
      border-radius: 8px;
      min-height: 600px;

      .item-title-content {
        padding: 15px 0;
        position: relative;

        .item-title {
          span:first-child {
            position: relative;
            top: 2px;
            display: inline-block;
            width: 4px;
            height: 16px;
            background: #AE0807;
          }

          span:last-child {
            height: 20px;
            font-size: 14px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.85);
            line-height: 20px;
            padding-left: 24px;
          }
        }

        .item-btn {
          position: absolute;
          top: 12px;
          right: 24px;
        }
      }
    }

    .item-index {
      margin-right: 16px;
    }

    .item-manages {
      flex: 1;
      min-width: 600px;
    }
  }
}
</style>
<template>
  <div class="add-word">
    <i
      v-if="showWordBtn===1"
      class="el-icon-edit"
      @click="showOpen"
    ></i>
    <el-button
      v-if="showWordBtn!=1 && dictIndex !== ''"
      size="mini"
      type="primary"
      @click="showOpen"
    >新增</el-button>

    <div class="index-dialog">
      <el-dialog
        :title="showWordBtn===1?'编辑字典项':'新增字典项'"
        :visible.sync="dialogVisible"
        width="30%"
        :close-on-click-modal="false"
      >
        <div class="dictionary-list">
          <ul>
            <li>
              <span>*</span>
              <span>字典编号：</span>
              <el-input
                :disabled="true"
                v-model="dictId"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="padding-left:24px;">
              <span>*</span>
              <span>键值编码：</span>
              <el-input
                :disabled="showWordBtn===1"
                v-model="dictKey"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li>
              <span>*</span>
              <span>键值名称：</span>
              <el-input
                v-model="dictName"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="padding-left:24px;">
              <span>*</span>
              <span>排序：</span>
              <el-input
                v-model="sort"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="margin-bottom:0px;width:100%">
              <p>备注</p>
              <el-input
                type="textarea"
                v-model="remarks"
                size="mini"
                resize="none"
                placeholder="请输入..."
              ></el-input>
            </li>
          </ul>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="handleEsc"
          >取 消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="handleItemtSave"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showWordBtn: {
      type: Number,
      default: 0
    },
    dictIndex: {
      type: [Number, String],
      default: ''
    },
    rowData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    updateRow: { // item 更新行数据
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      dictId: '', // 字典编号
      dictKey: '', // 键值编码
      dictName: '', // 键值名称
      sort: '', // 排序
      remarks: '', // 备注
      id: ''
    }
  },
  methods: {
    showOpen() {
      if (this.showWordBtn === 1) {
        this.id = this.updateRow.id
        this.dictId = this.updateRow.dictId
        this.dictKey = this.updateRow.dictKey
        this.dictName = this.updateRow.dictValue
        this.sort = this.updateRow.sort
        this.remarks = this.updateRow.note
      } else {
        this.dictId = this.rowData.dictCode
      }
      this.dialogVisible = true
    },
    handleItemtSave() {
      let url = '/api/dict/item/save'
      if (this.showWordBtn === 1) {
        url = '/api/dict/item/update'
      }
      if (this.dictKey === "" || this.dictName === "" ||this.sort === "") {
        this.$message.error("保存失败！请完善填写信息！")
        return
      }
      this.$http.post(url, {
        dictId: this.dictId,
        dictKey: this.dictKey,
        dictValue: this.dictName,
        sort: this.sort,
        note: this.remarks,
        id: this.id
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.dictId = ''
            this.dictKey = ''
            this.dictName = ''
            this.sort = ''
            this.remarks = ''
            this.dialogVisible = false
            this.$emit('updateItemList')
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    handleEsc() {
      if (this.showWordBtn != 1) {
        this.dictKey = ''
        this.dictName = ''
        this.sort = ''
        this.remarks = ''
      }
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="stylus">
.add-word {
  .index-dialog {
    .el-dialog {
      width: 552px !important;
    }

    .el-dialog__header {
      padding: 14px 0px;
      border-bottom: 1px solid #e8e8e8;
      font-size: 12px;

      .el-dialog__title {
        line-height: 20px;
        padding-left: 24px;
        border-left: 4px solid #AE0807;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
      }
    }

    .el-dialog__body {
      padding: 16px 24px;
      border-bottom: 1px solid #e8e8e8;

      .el-input {
        width: 228px;
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.add-word {
  .index-dialog {
    .dictionary-list {
      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 50%;
          margin-bottom: 16px;

          p {
            font-size: 12px;
            font-weight: 500;
            line-height: 20px;
          }

          span {
            font-size: 12px;
            font-weight: 500;
            line-height: 20px;
          }

          span:first-child {
            color: #AE0807;
            margin-right: 2px;
          }
        }
      }
    }
  }
}
</style>
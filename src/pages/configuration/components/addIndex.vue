<template>
  <div class="add-index">
    <i
      v-if="showIndexBtn===1"
      class="el-icon-edit"
      @click="handleDictUpdate"
    ></i>
    <el-button
      v-else
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >新增</el-button>

    <div class="index-dialog">
      <el-dialog
        :title="showIndexBtn===1?'编辑索引项':'新增索引项'"
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
                :disabled="showIndexBtn===1"
                v-model="dictionaryCode"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="padding-left:24px;">
              <span>*</span>
              <span>字典名称：</span>
              <el-input
                v-model="dictionaryName"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="margin-top:16px;width:100%">
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
            @click="handleDictSave"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showIndexBtn: {
      type: Number,
      default: 0
    },
    dictRowDate: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      dictionaryCode: '',
      dictionaryName: '',
      remarks: '',
      rowId: ''
    };
  },
  methods: {
    // 字典项保存
    handleDictSave() {
      let url = '/api/dict/save'
      if (this.showIndexBtn === 1) {
        url = '/api/dict/update'
      }
      if (this.dictionaryCode === "" || this.dictionaryName === "") {
        this.$message.error("保存失败！请完善填写信息！")
        return
      }
      this.$http.post(url, {
        dictCode: this.dictionaryCode,
        dictName: this.dictionaryName,
        note: this.remarks,
        id: this.rowId
      })
        .then(res => {
          if (res.data.errno === 0) {
            this.dictionaryCode = ''
            this.dictionaryName = ''
            this.remarks = ''
            this.$emit('RefreshList')
            this.dialogVisible = false
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    handleEsc() {
      if (this.showIndexBtn != 1) {
        this.dictionaryCode = ''
        this.dictionaryName = ''
        this.remarks = ''
      }
      this.dialogVisible = false
    },
    // 字典项数据更新加载
    handleDictUpdate() {
      this.dialogVisible = true
      this.dictionaryCode = this.dictRowDate.dictCode
      this.dictionaryName = this.dictRowDate.dictName
      this.rowId = this.dictRowDate.id
      this.remarks = this.dictRowDate.note
    }
  }
}
</script>
<style lang="stylus">
.add-index {
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
.add-index {
  .index-dialog {
    .dictionary-list {
      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          width: 50%;

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
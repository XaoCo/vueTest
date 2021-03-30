<template>
  <div class="set-manager">
    <el-button
      size="mini"
      @click="dialogVisible = true"
    >设置客户经理</el-button>
    <div class="set-dialog">
      <el-dialog
        title="修改客户经理"
        :visible.sync="dialogVisible"
        width="30%"
      >
        <div class="set-list">
          <ul>
            <li>
              <span></span>
              <span>客户全称：</span>
              <el-input
                disabled
                v-model="dictionaryCode"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="padding-left:24px;">
              <span></span>
              <span>客户简称：</span>
              <el-input
                v-model="dictionaryName"
                size="mini"
                placeholder="请输入..."
              ></el-input>
            </li>
            <li style="margin-top:16px;">
              <span>*</span>
              <span>客户经理 (A)：</span>
              <el-select
                :clearable="true"
                v-model="dictionaryName"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  label="公募基金"
                  value="0"
                >
                </el-option>
              </el-select>
            </li>
            <li style="padding-left:24px;margin-top:16px;">
              <span></span>
              <span>客户经理 (B)：</span>
              <el-select
                :clearable="true"
                v-model="dictionaryName"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  label="公募基金"
                  value="0"
                >
                </el-option>
              </el-select>
            </li>
          </ul>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            size="mini"
            @click="dialogVisible=false"
          >取 消</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="dialogVisible=false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      dictionaryCode: '',
      dictionaryName: '',
      remarks: '',
    }
  }
}
</script>
<style lang="stylus">
.set-manager {
  .set-dialog {
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
.set-manager {
  .set-dialog {
    .set-list {
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

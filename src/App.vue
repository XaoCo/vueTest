<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "App"
};
</script>

<style lang="stylus">
// button hover 状态
#app {
  .el-button:focus, .el-button:hover {
      color: #606266;
      background: #fff;
      background-color: #fff;
      border-color:1px solid rgb(220, 223, 230);
  }
  
  .el-button:hover {
    background: #0a0b0e;
    color: #fff;
    border-color: 1px solid rgb(220, 223, 230);
  }
  .el-button:active {
    color: #606266;
    background: #fff;
    outline: 0;
    border-color: 1px solid rgb(220, 223, 230);
  }
  .el-button+.el-button {
    margin-left: 16px;
}
.el-button--primary {
  background:#000;
  border: 1px solid #000;
}
}

// input 样式
#app {
  .el-input__inner {
    color: #606266;
  }

  .el-input__inner:hover, .el-input__inner:focus {
    border-color: #0a0b0e;
  }

  .el-select .el-input.is-focus .el-input__inner {
    border-color: #0a0b0e;
  }

  .el-input__inner::placeholder {
    color: rgba(0, 0, 0, 0.15);
  }

  .el-textarea__inner:hover {
    border-color: rgba(0, 0, 0, 0.8);
  }

  .el-textarea__inner:focus {
    outline: 0;
    border-color: rgba(0, 0, 0, 0.8);
  }

  .el-textarea__inner {
    padding: 6px 15px;
  }
}

// select 样式
.el-scrollbar__view {
  .el-select-dropdown__item.selected {
    color: #606266;
    font-weight: normal;
  }

  .el-select-dropdown__item {
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    color: #606266;
    padding: 0 12px;
  }
}

// checkbox 样式
#app {
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #606266;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ae0807;
    border-color: #ae0807;
  }

  .el-checkbox__input.is-focus .el-checkbox__inner {
    border: 1px solid #DCDFE6;
  }

  .el-checkbox__inner:hover {
    border-color: #ae0807;
  }
}

// table cell 首行缩进 24px header
#app .el-table {
  th:first-child, td:first-child {
    .cell {
      padding-left: 24px;
    }
  }

  th.is-leaf {
    border-top: 1px solid #EBEEF5;
    background: rgba(250, 250, 250, 1);
  }

  .cell {
    font-size: 12px;
  }
}

// 分页样式
#app .el-pagination {
  padding: 12px 24px;
  text-align: right;

  .el-pagination__jump .el-input__inner {
    width: 32px;
    height: 24px;
    background: rgba(255, 255, 255, 1);
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.09);
  }

  .el-pager li {
    font-size: 13px;
    min-width: 24px;
    height: 24px;
    line-height: 22px;
    box-sizing: content-box;
    text-align: center;
    margin: 0 4px;
    padding: 0px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    color: rgba(0, 0, 0, 0.45);
  }

  .el-pager li.active {
    color: rgba(10, 11, 14, 1);
    border: 1px solid rgba(10, 11, 14, 1);
  }

  .el-pager li:hover {
    color: rgba(10, 11, 14, 1);
  }

  .btn-prev {
    width: 24px;
    height: 24px;
    box-sizing: content-box;
    min-width: 24px;
    padding: 0px !important;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    margin-right: 8px;
  }

  .btn-next {
    width: 24px;
    box-sizing: content-box;
    height: 24px;
    padding: 0px !important;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.09);
    min-width: 24px;
    margin-left: 8px;
  }
}

// radio 样式
#app {
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #AE0807;
    background: #AE0807;
  }

  .el-radio__input.is-checked+.el-radio__label {
    color: #606266;
  }

  .el-radio__inner:hover {
    border-color: #AE0807;
  }
}

// upload 图片上传
#app {
  .user-info-detail .avatar-uploader .el-upload:hover {
    border-color: rgba(0, 0, 0, 0.85);
  }

  .el-upload--picture-card {
    background-color: #fff;
    border-color: rgba(0, 0, 0, 0.35);
  }

  .el-upload--picture-card:hover, .el-upload:focus {
    border-color: rgba(0, 0, 0, 0.85);
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>



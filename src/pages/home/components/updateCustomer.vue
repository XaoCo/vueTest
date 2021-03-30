<template>
  <div class="update-customer">
    <el-button
      size="mini"
      type="primary"
      @click="dialogTableVisible = true"
    >新增客户</el-button>
    <div class="customer-dialog">
      <el-dialog
        title="新增客户"
        :visible.sync="dialogTableVisible"
      >
        <div class="customer-info">
          <div class="base-info">
            <p class="basetitle">基本信息</p>
            <ul>
              <li>
                <p>
                  <span>*</span>
                  统一社会信用代码：
                </p>
                <el-input
                  v-model="creditCode"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  <span>*</span>
                  客户类型：
                </p>
                <el-select
                  :clearable="true"
                  v-model="customerType"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    label="A级"
                    value="0"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <p>
                  <span>*</span>
                  客户分级：
                </p>
                <el-select
                  :clearable="true"
                  v-model="customerDivide"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    label="A级"
                    value="0"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <p>
                  <span>*</span>
                  客户简称：
                </p>
                <el-input
                  v-model="customerShortName"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  <span>*</span>
                  客户全称：
                </p>
                <el-input
                  v-model="customerWholetName"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  <span>*</span>
                  区域：
                </p>
                <el-select
                  :clearable="true"
                  v-model="area"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    label="A级"
                    value="0"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <p>
                  <span>*</span>
                  第一大股东：
                </p>
                <el-input
                  v-model="shareholder"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  <span>*</span>
                  业务进度：
                </p>
                <el-select
                  :clearable="true"
                  v-model="progressCode"
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    label="A级"
                    value="0"
                  ></el-option>
                </el-select>
              </li>
              <li>
                <p></p>
              </li>
              <li>
                <p>
                  <span>*</span>
                  券商联系人姓名：
                </p>
                <el-input
                  v-model="brokerName"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  <span>*</span>
                  券商联系人座机：
                </p>
                <el-input
                  v-model="brokerTel"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  <span>*</span>
                  券商联系人手机：
                </p>
                <el-input
                  v-model="brokerMobile"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
            </ul>
            <p class="basetitle">扩展信息</p>
            <ul>
              <li>
                <p>
                  英文名称：
                </p>
                <el-input
                  v-model="ename"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  到期日期：
                </p>
                <el-date-picker
                  size="mini"
                  v-model="expireDate"
                  placeholder="选择日期"
                />
              </li>
              <li>
                <p>
                  邮编：
                </p>
                <el-input
                  v-model="postalCode"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li style="width:64.4%">
                <p>
                  注册地址：
                </p>
                <el-input
                  v-model="registerAdd"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li style="width:64.4%">
                <p>
                  <span>*</span>
                  办公地址1：
                </p>
                <el-input
                  v-model="officeAdd"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li style="width:64.4%">
                <p>
                  办公地址2：
                </p>
                <el-input
                  v-model="officeAdd"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li style="width:64.4%">
                <p>
                  办公地址3：
                </p>
                <el-input
                  v-model="officeAdd"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li><p></p></li>
              <li>
                <p>
                  公司网站：
                </p>
                <el-input
                  v-model="web"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  公司总机：
                </p>
                <el-input
                  v-model="tel"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li>
                <p>
                  传真：
                </p>
                <el-input
                  v-model="fax"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li style="width:64.4%">
                <p>
                  派点制度：
                </p>
                <el-input
                  resize="none"
                  type="textarea"
                  v-model="appraise"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
              <li style="width:64.4%">
                <p>
                  备注：
                </p>
                <el-input
                  resize="none"
                  type="textarea"
                  v-model="note"
                  size="mini"
                  placeholder="请输入"
                ></el-input>
              </li>
            </ul>
          </div>
        </div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            size="mini"
            @click="dialogTableVisible=false"
          >提交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      creditCode: '', // 信用代码
      customerType: '', // 客户类型
      customerDivide: '', // 客户分级
      customerShortName: '', //客户简称
      customerWholetName: '', // 客户全称
      area: '',// 区域
      shareholder: '', // 第一大股东
      progressCode: '', // 业务进度
      brokerName: '', //券商联系人姓名
      brokerTel: '', //券商联系人座机
      brokerMobile: '', //券商联系人手机
      ename: '', // 英文名称
      expireDate: '', // 到期日期
      postalCode: '', // 邮编
      registerAdd: '', // 注册地址
      officeAdd: '', // 办公地址1
      officeAdd2: '', // 办公地址2
      officeAdd3: '', // 办公地址3
      web: '', // 公司网站
      tel: '', // 公司总机
      fax: '', // 传真
      appraise: '', // 派点制度
      note: '', // 备注
    }
  },
  methods: {

  }
};
</script>
<style lang="stylus">
.update-customer {
  .customer-dialog {
    .customer-info {
      .base-info {
        .el-input {
          width: 100%;
        }
        .el-select {
          width: 100%;
        }
      }
    }
  }

  .el-dialog {
    width: 100%;
    margin-top: 0 !important;
    margin-bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    height: 100%;
    overflow-y: auto;
    padding-left: 168px;
    display: flex;
    flex-direction: column;

    .el-dialog__header {
      background: #fff;
      padding: 44px 168px 0px 10px;

      .el-dialog__title {
        display: block;
        padding-bottom: 15px;
        font-size: 18px;
        font-weight: 500;
        line-height: 25px;
        color: rgba(0, 0, 0, 0.85);
        border-bottom: 1px solid #e8e8e8;
        width: 720px;
        margin: 0 auto;
      }

      .el-dialog__headerbtn {
        position: absolute;
        top: 32px;
        right: 60px;

        .el-dialog__close {
          width: 46px;
          height: 46px;
          line-height: 46px;
          background: rgba(0, 0, 0, 0.09);
          border-radius: 50%;
          font-size: 36px;
          color: #fff;
        }
      }
    }

    .el-dialog__body {
      background: #fff;
      flex: 1;
      padding: 0px 168px 0px 10px;

      .customer-info {
        width: 720px;
        margin: 0 auto;
      }
    }

    .el-dialog__footer {
      background: #fff;
      padding: 15px 168px 48px 10px;
      text-align: left;

      .dialog-footer {
        display: flex;
        width: 720px;
        margin: 0 auto;

        .el-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
<style lang="stylus" scoped>
.update-customer {
  .customer-dialog {
    .customer-info {
      // border-bottom: 1px solid #e8e8e8;
      // padding-bottom: 15px;
      .base-info {
        .basetitle {
          font-weight: 600;
          margin-top: 15px;
          height: 20px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
          line-height: 20px;
        }

        ul {
          width: 720px;
          display: flex;
          padding-bottom: 16px;
          border-bottom: 1px solid #e0e0e0;
          flex-wrap: wrap;
          justify-content: space-between;

          li {
            margin-top: 16px;
            width: 208px;

            p {
              line-height: 20px;
              margin-bottom: 4px;
              font-size: 12px;
              font-weight: 600;
              color: rgba(0, 0, 0, 0.45);

              span {
                color: #AE0807;
              }
            }
          }
        }
      }
    }
  }
}
</style>
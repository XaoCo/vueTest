<template>
  <div class="todo-container">
    <ul class="tablist">
      <li
        v-for="item of tablist"
        :key="item.value"
        :class="item.value==tabindex?'active':''"
        @click="changetab(item.value)"
      >{{item.name}}</li>
    </ul>
    <div style="background: #fff; margin-top: 16px; border-radius: 8px 8px 0px 0px;">
      <div class="title">
        <p @click="changestatus(0)">
          待审核
          <span :class="statusindex===0?'red-line':''"></span>
        </p>
        <p @click="changestatus(1)">
          已审核
          <span :class="statusindex===1?'red-line':''"></span>
        </p>
      </div>
    </div>
    <div style="margin-top: 0px">
      <auditUser v-if="tabindex===0 && statusindex===0"></auditUser>
      <approvedUser v-if="tabindex===0 && statusindex===1"></approvedUser>
      <auditSpecial v-if="tabindex===1 && statusindex===0"></auditSpecial>
      <approvedSpecial v-if="tabindex===1 && statusindex===1"></approvedSpecial>
    </div>
  </div>
</template>

<script>
import auditUser from "./auditUser";
import approvedUser from "./approvedUser";
import auditSpecial from "./auditSpecial";
import approvedSpecial from "./approvedSpecial";
export default {
  components: {
    auditUser,
    approvedUser,
    auditSpecial,
    approvedSpecial
  },
  data() {
    return {
      tablist: [
        { name: "客户信息", value: 0 },
        { name: "专题", value: 1 },
        { name: "活动", value: 2 },
        { name: "活动资料", value: 3 },
        // { name: "月度荐股", value: 4 },
        // { name: "十大金股", value: 5 }
      ],
      active: "",
      tabindex: 0, //tab类别-0-1-2-3-4-5
      statusindex: 0 // 审核状态 - 0(待审核) - 1(已审核)
    };
  },
  methods: {
    changetab(index) {
      this.tabindex = index;
      this.statusindex = 0;
    },
    changestatus(index) {
      this.statusindex = index;
    }
  }
};
</script>

<style lang="stylus" scoped>
.todo-container {
  .tablist {
    display: flex;
    text-align: center;
    justify-content: center;
    
    li {
      width: 152px;
      height: 28px;
      line-height: 26px;
      font-size: 12px;
      cursor: pointer;
      background: #fff;
      border: 1px solid rgb(217, 217, 217);
    }

    li:first-child {
      border-top-left-radius:100px;
      border-bottom-left-radius:100px;
    }

    li:last-child {
      border-top-right-radius:100px;
      border-bottom-right-radius:100px;
      margin-left: -1px;
    }

    li.active {
      background: #000;
      color: #fff;
    }
  }

  .title {
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;

    p {
      height: 17px;
      line-height: 17px;
      font-size: 12px;
      cursor: pointer;
      margin: 0 24px;
      font-weight: 500;
      position: relative;

      .red-line {
        border-bottom: 4px solid #ae0807;
        width: 36px;
        position: absolute;
        bottom: -11px;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
}
</style>


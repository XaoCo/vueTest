<template>
  <a-layout class="container">
    <a-layout-header class="header">
      <div class="logo" />
      <div class="operat">
        <img class="bell-icon" src="@/assets/images/bell.png" alt />
        <div class="picture">
          <img class="phone-img" :src="url" alt />
        </div>
        <span class="opreator">{{name}}</span>
        <span>|</span>
        <router-link to="/" tag="span" class="esc">退出</router-link>
      </div>
    </a-layout-header>
    <a-layout class="main">
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="defaultSelectedKeys"
          :defaultOpenKeys="defaultOpenKeys"
          :openKeys="openKeys"
          @openChange="onOpenChange"
        >
          <template v-for="item of list">
            <template v-if="item.titleId !=''">
              <a-sub-menu :key="item.titleId">
                <span slot="title">
                  <a-icon :type="item.type" />
                  {{item.title}}
                </span>
                <a-menu-item
                  v-for="items of item.child"
                  :key="items.titleId"
                  @click="handleMenuClick(item.titleId,items.titleId,items.url)"
                >{{items.title}}</a-menu-item>
              </a-sub-menu>
            </template>
            <template v-else>
              <a-menu-item
                v-for="items of item.child"
                :key="items.titleId"
                @click="handleMenuClick(item.titleId,items.titleId,items.url)"
              >
                <a-icon :type="item.type" />
                <span>{{items.title}}</span>
              </a-menu-item>
            </template>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 12px">
        <a-layout-content
          :style="{ background: '#f0f2f5', padding: '0px', margin: 0, minHeight: '280px' }"
        >
          <slot></slot>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Layout",
  data() {
    return {
      collapsed: false,
      rootSubmenuKeys: ["sub1", "sub2", "sub3","sub4"],
      defaultSelectedKeys: [""],
      openKeys: [""],
      defaultOpenKeys: [""]
    };
  },
  created() {
    this.handleMemuInfo();
    let sub = localStorage.getItem("sub") || "";
    let keyword = localStorage.getItem("keyword") || "1";
    this.defaultOpenKeys = [sub];
    this.defaultSelectedKeys = [keyword];
    this.openKeys = [sub];
  },
  computed: {
    ...mapState(["list", "name", "url"])

    // list(){
    //   return this.$store.state.count
    // }
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    handleMenuClick(id1, id2, url) {
      this.$router.push(url);
      localStorage.setItem("sub", id1);
      localStorage.setItem("keyword", id2);
    },
    // ...mapActions(['updateLoopImg']),
    handleMemuInfo() {
      //判断是否存在 vuex
      if (!this.$store.state.list) {
        this.$store.dispatch("updateLoopImg");
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.container {
  min-width: 1100px;

  .header {
    background: rgb(255, 255, 255);

    .logo {
      width: 120px;
      height: 31px;
      background: url('~@/assets/images/ybjlogo.png') no-repeat;
      background-size: contain;
      margin: 16px 28px 16px 0;
      float: left;
    }

    .operat {
      float: right;
      display: flex;
      align-items: center;

      .bell-icon {
        width: 18px;
        height: 18px;
        margin-right: 20px;
      }

      .picture {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        align-items: center;

        .phone-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .opreator {
        color: rgba(0, 0, 0, 0.5);
        margin-right: 15px;
      }

      .esc {
        color: #fe9090;
        opacity:0.8
        margin-left: 20px;
        cursor: pointer;
      }
      .esc:hover {
        opacity:1;
      }
    }
  }

  .main {
    margin-top: 10px;
  }
}
</style>
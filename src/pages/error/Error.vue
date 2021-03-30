<template>
  <div class="wrapper">
    <div class="error-img">
      <img class="img" src="@/assets/images/error_kxc.png" alt />
    </div>
    <div class="title">
      <span>系统开了小差，请重新登录</span>
    </div>
		<router-link tag="div" to="/" class="button">
			<p class="back-home">返回登录页</p>
		</router-link>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>

<style lang="stylus" scoped>
.wrapper {
  height: 100vh;

  .error-img {
    width: 660px;
    margin: 0 auto;

    .img {
      margin-top: 50px;
    }
  }

  .title {
		margin-top 18px;
    margin 0 auto
		width 216px;
    height: 25px;
    font-size: 18px;
		font-family:PingFangSC-Regular,PingFang SC;
		color rgba(0,0,0,0.45);
		line-height 25px;
		font-weight 400;
  }
	.button {
		margin 0 auto 
		margin-top 18px
		width 92px
		height 28px
		border-radius 4px
		border 1px solid rgba(224,224,224,1)
		padding 5px 15px
		box-sizing border-box
		cursor pointer
		.back-home {
			font-size 12px
			font-weight 500
			color rgba(0,0,0,0.45)
			line-height 17px
		}
	}
}
</style>
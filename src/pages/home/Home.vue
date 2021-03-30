<template>
    <div>
        <Layout>
          <baseInfo></baseInfo>
        </Layout>
    </div>
</template>

<script>
import Layout from '@/pages/common/Layout.vue'
import baseInfo from './baseInfo'
export default {
    name:'Home',
    components:{
        Layout,
        baseInfo
    }
}
</script>

<style lang="stylus" scoped>

</style>
<template>
  <div class="ds_world_excel_wrapper">
    <header>header</header>
    <div class="content" id="aa">
      <!-- word 转 PDF 尝试 -->
      <!-- <iframe :src='pdf365' :width='width' height="100%" frameborder='0'> -->
        <!-- This is an embedded 
        <a target='_blank' href='http://office.com'>Microsoft Office</a>
        document, powered by 
        <a target='_blank' href='http://office.com/webapps'>Office Online</a>. -->
      <!-- </iframe> -->

      <!-- 最终版本 tydoc mack down-->
      <!-- <iframe :src='file'  ref="ccc"  id="bb" :width='width' height="100%" frameborder='0'>
      </iframe> -->

      <object :data="file" :width='width' height="100%">
      </object>
    </div>
    <footer @click="footerClick">footer</footer> 
  </div>
</template>

<script>

export default {
  name: 'WordExcel',
  components: {
  },
  data() {
    return {
      file: 'file:///E:/a/index.html',
      html: 'http://172.18.0.204:8888/relation/manage',

      doc365: 'http://ow365.cn/?i=23164&furl=http://mczaiyun.top/ht/3.docx',
      pdf365: 'http://ow365.cn/?i=10826&furl=http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
      // xlsx365: 'http://ow365.cn/?i=1&furl=http://static.runoob.com/download/sites.xlsx',
      ppt365: 'http://ow365.cn/?i=10037&furl=http%3a%2f%2fvideo.ch9.ms%2fbuild%2f2011%2fslides%2fTOOL-532T_Sutter.pptx',

      width: `${document.body.offsetWidth}px`,
      officDoc: 'https://view.officeapps.live.com/op/embed.aspx?src=http://mczaiyun.top/ht/3.docx',
      
      // url:"http://image.cache.timepack.cn/nodejs.pdf",
      url:"http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf",
      numPages: null, // pdf 总页数
    }
  },
  mounted() {
    // this.$nextTick(function() {
    //   console.log(this.$refs.ccc.contentWindow)
    //   console.log(this.$refs.ccc.contentWindow.document)
    //   console.log(this.$refs.ccc.contentWindow.document.documentElement.scrollHeight)
    //   // console.log(this.$refs.ccc.contentWindow.document.body.getElementById('p0'))
    // })
  },
  methods: {
    footerClick() {
      window.location.href = 'file:///E:/a/index.html'
    }
  }
}
</script>

<style lang="scss" scoped>
.ds_world_excel_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  width: 100vw;
  height: 100vh;
  .content {
    width: 100%;
    flex: 1;
  }

  header {
    width: 100%;
    height: 50px;
    background: pink;
  }
  footer {
    width: 100%;
    height: 50px;
    background: cadetblue;
  }
}
</style>
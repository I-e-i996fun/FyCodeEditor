<template>
  <monaco :theme="theme" :language="language" @codeChange="codeChange" @mounted="codeMounted"></monaco>
</template>

<script>
import Monaco from '@/components/Monaco/Monaco'
import { mapGetters } from 'vuex'
export default {
  name: 'TestEditor',
  components: {
    Monaco
  },
  computed: {
    ...mapGetters({
      'theme': 'getTheme'
    })
  },
  watch: {
    theme () {
      this.caculHeight()
    }
  },
  data () {
    return {
      routeTab: {
        title: '无标题',
        isUnSave: false
      },
      language: 'javascript', // 语言
      height: '' // 编辑器高度
    }
  },
  created () {
    console.log('测试 编辑器')
    // this.routeTab = {
    //   title: `无标题`,
    //   icon: 'el-icon-goods',
    //   tips: '提示什么呢',
    //   isUnSave: true
    // }
  },
  mounted () {
    this.caculHeight()
    // console.log(this.$route)
    if (this.$route.query) {
      if (this.$route.query.lan) {
        this.language = this.$route.query.lan // 设置编辑器语言
      }
      if (this.$route.query.fileName) {
        // 设置当前标签页头部信息
        this.changeTabInfo({
          title: this.$route.query.fileName,
          isUnSave: false
        })
      }
    }
    // 监听窗口变化，重新渲染编辑器
    window.onresize = () => {
      // this.caculHeight()
    }
  },
  destroyed () {
  },
  methods: {
    // 计算编辑器高度
    caculHeight () {
      let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight // 浏览器高度
      this.height = h - 40
      console.log('caculHeight---   height=', this.height)
    },
    // 设置当前标签页头部信息
    changeTabInfo (params) {
      this.routeTab = params
    },
    codeChange (editor) {
      console.log('codeChange---  editor=', editor)
      // 设置当前标签页头部信息
      this.changeTabInfo({
        title: this.$route.query.fileName,
        isUnSave: true
      })
    },
    codeMounted (editor) {
      console.log('codeMounted---  editor=', editor)
      // console.log(window.monaco.editor)
    }
  }
}
</script>

<style lang="scss" scoped>
.code-editor {
  height: 100%;
  text-align: left;
}
</style>

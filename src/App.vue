<template>
  <div id="app" :class="theme">
    <div class="leftMenu">
      <div class="menu-hd">
        <span>PROJECT NAME</span>
        <div class="box-theme">
          <span>切换主题</span>
          <ul class="sel-theme">
            <li v-for="(item, index) in themes" v-bind:key="index" @click="switchTheme(index)">{{item}}</li>
          </ul>
        </div>
      </div>
      <vue-tree :nodes="nodes" @setNodes="setNodes"></vue-tree>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <a
        href="javascript: void(0)"
        class="hightLight"
        @click="
          $routerTab.openIframe(
            'https://bhuh12.github.io/vue-router-tab/',
            'RouterTab'
          )
        "
      >
        RouterTab
      </a>
      <router-link to="/TestEditor">TestEditor</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<script>
import '@/assets/css/theme/vs.scss'
import '@/assets/css/theme/vs-dark.scss'
import '@/assets/css/theme/hc-black.scss'
import VueTree from '@/components/Tree/VueTree'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    'vue-tree': VueTree
  },
  computed: {
    ...mapGetters({
      'theme': 'getTheme'
    })
  },
  data () {
    return {
      nodes: [], // 节点数据
      themes: ['vs', 'vs-dark', 'hc-black'] // 可选主题 'quiet-light'
    }
  },
  created () {
    // 模拟数据
    this.nodes = [
      {
        title: 'src',
        isExpanded: true,
        data: {
          id: 51
        },
        children: [
          { title: 'index.ejs', isLeaf: true, data: { id: 10, type: 'EJS' } },
          {
            title: 'main',
            isExpanded: true,
            data: {
              id: 11
            },
            children: [
              { title: 'index.dev.js', isLeaf: true, data: { id: 21, type: 'application/javascript' } },
              { title: 'index.js', isLeaf: true, data: { id: 22, type: 'application/javascript' } }
            ]
          },
          {
            title: 'render',
            isExpanded: true,
            data: {
              id: 31
            },
            children: [
              { title: 'App.vue', isLeaf: true, data: { id: 41, type: 'VUEJS' } },
              {
                title: 'assets',
                isExpanded: true,
                data: {
                  id: 42
                },
                children: [
                  { title: '.gitkeep', isLeaf: true, data: { id: 51 } },
                  { title: 'logo.png', isLeaf: true, data: { id: 52, type: 'IMAGE' } }
                ]
              },
              {
                title: 'components',
                isExpanded: true,
                data: {
                  id: 43
                },
                children: [
                  { title: 'FileBrowserMain.vue', isLeaf: true, data: { id: 53, type: 'VUEJS' } },
                  { title: 'FileBrowserTree.vue', isLeaf: true, data: { id: 54, type: 'VUEJS' } }
                ]
              },
              { title: 'main.js', isLeaf: true, data: { id: 44, type: 'application/javascript' } },
              {
                title: 'router',
                isExpanded: true,
                data: {
                  id: 45
                },
                children: [
                  { title: 'index.js', isLeaf: true, data: { id: 55, type: 'application/javascript' } }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  mounted () {
    // console.log('获取当前主题： theme=', this.theme)
  },
  methods: {
    // 设置主题
    switchTheme (index) {
      // console.log(this.themes[index]);
      this.$store.dispatch('updateTheme', this.themes[index]).then(() => {
        console.log('设置主题成功：')
        console.log(this.theme)
        this.$routerTab.refreshAll()
      })
    },

    // 修改nodes数据
    setNodes (nodes) {
      console.log('setNodes---  nodes', nodes)
      this.nodes = JSON.parse(JSON.stringify(nodes))
    }
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.router-tab {
  flex: 1 1 0;
}
</style>

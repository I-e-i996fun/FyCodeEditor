// 空对象和数组
const emptyObj = Object.create(null)

// 右键菜单
export default {
  data () {
    return {
      // 右键菜单
      contextmenu: {
        id: null,
        index: -1,
        left: 0,
        top: 0,
        display: 'block',
        node: null // 节点数据
      }
    }
  },

  computed: {
    // 当前点击是否是叶子节点
    isNowLeaf () {
      return !!this.contextmenu.node.isLeaf
    }
  },

  watch: {
    // 路由切换隐藏右键菜单
    $route ($route) {
      this.hideContextmenu()
    },

    // 监听右键菜单显示关闭
    'contextmenu.id' (val, old) {
      // console.log('watch contextmenu.id ---')
      // console.log(val, old)
      if (!old && val) {
        // 显示右键菜单，绑定点击关闭事件
        document.addEventListener('click', this.onClick = (e) => {
          if (e.target !== this.$el.querySelector('.vue-tree-contextmenu')) {
            this.hideContextmenu()
            // 设置所有节点不显示右键样式
            this.$refs.slvuetree.ergodicNodes(this.storeNodes)
          }
        })
      } else if (old && !val) {
        // 隐藏右键菜单，移除点击关闭事件
        document.removeEventListener('click', this.onClick)
      }
    }
  },

  methods: {
    // 显示页签右键菜单
    showContextmenu (e, node, index) {
      let { clientY: top, clientX: left } = e || emptyObj // 菜单定位
      Object.assign(this.contextmenu, { id: null, index: -1, top, left, display: 'none', node: null }) // 隐藏右键菜单，为了去掉平移效果
      setTimeout(() => {
        if (node && node.data) {
          Object.assign(this.contextmenu, { id: node.data.id, index, top, left, display: 'block', node }) // 显示
        }
      }, 100)
    },

    // 关闭页签右键菜单
    hideContextmenu () {
      this.showContextmenu(null, -1)
    },

    // 遍历节点，设置isClickContextMenu的值
    ergodicNodes (nodes) {
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].children || !nodes[i].children.length) {
          this.updateNode(nodes[i].path, { isClickContextMenu: false })
        } else {
          this.updateNode(nodes[i].path, { isClickContextMenu: false })
          this.ergodicNodes(nodes[i].children)
        }
      }
    },

    // 触发父组件事件
    transContextMenuData (type, node) {
      this.handleSetNode({type, node})
      // this.$emit('nodeClickContextMenu', {type, data})
    }
  }
}

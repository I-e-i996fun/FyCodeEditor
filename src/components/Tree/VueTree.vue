<template>
    <div class="vue-tree">
        <sl-vue-tree ref="slvuetree" v-model="newNodes" :allowMultiselect="false" @nodeclick="nodeClick" @nodedblclick="nodeDoubleClick" @select="nodeSelect" @toggle="nodeToggle" @drop="nodeDrop" @nodecontextmenu="nodeContextMenu" @externaldrop.prevent="onExternalDropHandler">
            <template slot="toggle" slot-scope="{ node }">
                <span v-if="!node.isLeaf">
                    <font-awesome-icon icon="caret-right" v-if="!node.isExpanded"></font-awesome-icon>
                    <font-awesome-icon icon="caret-down" v-else-if="node.isExpanded"></font-awesome-icon>
                </span>
                <span style="margin-left:5px;" v-if="!node.isLeaf">
                    <font-awesome-icon :icon="[ 'fa', 'folder' ]" color="#dcb67a" v-if="!node.isExpanded"></font-awesome-icon>
                    <font-awesome-icon :icon="[ 'fa', 'folder-open' ]" color="#dcb67a" v-else></font-awesome-icon>
                </span>
            </template>
            <template slot="title" slot-scope="{ node }">
                <font-awesome-icon :icon="[ 'fab', 'js' ]" color="#fbc02d" v-if='node.data.type === "application/javascript"'></font-awesome-icon>
                <font-awesome-icon icon="table" v-else-if='node.data.type === "application/json"'></font-awesome-icon>
                <font-awesome-icon icon="image" color="#2dcc9f" v-else-if='node.data.type === "IMAGE"'></font-awesome-icon>
                <font-awesome-icon icon="code" color="#89a139" v-else-if='node.data.type === "EJS"'></font-awesome-icon>
                <font-awesome-icon :icon="[ 'fab', 'vuejs' ]" v-else-if='node.data.type === "VUEJS"' color="#41b883"></font-awesome-icon>
                <font-awesome-icon :icon="[ 'fab', 'css-alt' ]" v-else-if='node.data.type === "css"' color="#41b883"></font-awesome-icon>
                <font-awesome-icon icon="file" color="#e8e8e8" v-else-if="node.isLeaf"></font-awesome-icon>
                <span class="sl-vue-tree-title-text">{{ node.title }}</span>
            </template>
            <template slot="sidebar" slot-scope="{ node }">
                <font-awesome-icon icon="circle" v-if="node.data.isModified"></font-awesome-icon>
            </template>
        </sl-vue-tree>
        <!-- <aside class="menu vue-file-tree-contextmenu" ref="contextmenu" v-show="contextMenuIsVisible">
        <slot name="context-menu"></slot> -->
    <!-- </aside> -->
    <!-- 右键菜单 -->
    <!-- <transition name="router-tab-zoom"> -->
      <div
        v-if="contextmenu.id"
        class="router-tab-contextmenu vue-tree-contextmenu"
        :style="`left: ${contextmenu.left}px; top: ${contextmenu.top}px;display: ${contextmenu.display};`"
      >
        <a class="contextmenu-item" @click="transContextMenuData('createFile', contextmenu.node)" v-if="!isNowLeaf">新建文件</a>
        <a class="contextmenu-item contextmenu-item-spilter" @click="transContextMenuData('createFolder', contextmenu.node)" v-if="!isNowLeaf">新建文件夹</a>
        <a class="contextmenu-item contextmenu-item-spilter" @click="isNowLeaf && transContextMenuData('openFile', contextmenu.node)" v-if="isNowLeaf">打开</a>
        <a class="contextmenu-item" @click="transContextMenuData('resetFileName', contextmenu.node)">重命名</a>
        <a class="contextmenu-item" @click="transContextMenuData('deleteFile', contextmenu.node)">删除</a>
      </div>
    <!-- </transition> -->
      <!-- 对话框 -->
      <v-dialog :params="dialogParams" @saveNext="saveDialogNext" ref="vDialog">
        <template slot="edit">
          <div class="dialog-item">
            <span class="dialog-name">名称：</span>
            <input type="text" class="dialog-input" v-model="dialogData.name"/>
          </div>
        </template>
      </v-dialog>
    </div>
</template>

<script>
// 功能模块混入
import contextmenu from './contextmenu' // 右键菜单
import './scss/vue-tree.scss'
import '@/assets/css/other.scss'
import util from 'util'
import slVueTree from '@/components/SlVueTree/sl-vue-tree'
import Dialog from '@/components/Dialog/Dialog'
// import slVueTree from 'sl-vue-tree'
// import 'sl-vue-tree/dist/sl-vue-tree-dark.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { mapGetters } from 'vuex'
import Bean from '@/common/bean'
import {
  faCaretRight,
  faCaretDown,
  faTable,
  faImage,
  faFile,
  faCircle,
  faCode,
  faFolder,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { faJs, faVuejs } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faJs,
  faVuejs,
  faCaretRight,
  faCaretDown,
  faTable,
  faImage,
  faFile,
  faCircle,
  faCode,
  faFolder,
  faFolderOpen
)

export default {
  name: 'VueTree',
  mixins: [ contextmenu ],
  components: {
    'sl-vue-tree': slVueTree,
    'font-awesome-icon': FontAwesomeIcon,
    'v-dialog': Dialog
  },
  props: {
    // 节点数据
    nodes: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    ...mapGetters({
      'storeNodes': 'getNodes'
    }),
    // 新节点数据
    newNodes: {
      get () {
        return this.nodes
      },
      set (nodes) {
        return nodes
      }
    }
  },
  data () {
    return {
      contextMenuIsVisible: false,
      isShowDialog: false, // 是否显示对话框
      dialogParams: {}, // 对话框参数
      dialogData: {
        name: '' // 名称
      }, // 对话框数据
      transHandleMethos: {
        createFile: '',
        createFolder: '',
        openFile: '',
        resetFileName: '',
        deleteFile: ''
      } // 每个操作对应的处理方法
    }
  },
  created () {},
  methods: {
    // 更新store树形节点数据
    updateNodes () {
      this.$store.dispatch('updateNodes', this.nodes)
    },
    // 点击节点
    nodeClick (node, event) {
      this.$emit('nodeClick', event, node)
    },
    // 双击节点
    nodeDoubleClick (node, event) {
      console.log(
        `nodeDoubleClick ${node.title} ${node.data.type} isLeaf ${
          node.isLeaf
        } ${util.inspect(node)}`
      )
      if (!node.isLeaf) {
        this.$refs.slvuetree.onToggleHandler(event, node)
        return
      }
      console.log('nodeDoubleClick----')
      // this.$emit('nodeDoubleClick', node)
    },
    // 选择节点
    nodeSelect (node) {
      // console.log(Bean.supportLan)
      // console.log('nodeSelect---  node', node)
      if (node[0].isLeaf) {
        let re = /[^.]\w*$/i
        let resultArr = re.exec(node[0].title)
        console.log(resultArr)
        if (resultArr[0]) { // 存在文件后缀名
          if (Bean.supportLan[resultArr[0]]) { // 支持语言
            if (resultArr[0] === 'js') {
              resultArr[0] = 'javascript'
            }
            // 打开页面
            this.$router.push(
              { path: `/TestEditor/${node[0].data.id}`,
                query: {
                  lan: resultArr[0],
                  fileName: resultArr.input
                }
              }
            )
          } else {
            console.log('不支持语言')
          }
        }
      }
    },
    // 节点打开关闭
    nodeToggle (node) {
      console.log(`nodeToggle ${util.inspect(node)}`)
    },
    // 移动节点
    nodeDrop (node) {
      console.log(`nodeDrop ${util.inspect(node)}`)
      // this.$emit('nodeDrop', node)
    },
    nodeContextMenu (node, index, event) {
      this.showContextmenu(event, node, index)
    },
    // 处理对node的操作
    handleSetNode (params) {
      console.log('handleSetNode----   params=', params)
      if (params.type === 'openFile') { // 打开文件
        this.nodeSelect([params.node])
        return
      }
      this.dialogData.name = ''
      let dialogParams = {}
      dialogParams.id = params.node.data.id
      switch (params.type) {
        case 'createFile': // 新建文件
          dialogParams.title = '新建文件'
          break
        case 'createFolder': // 新建文件夹
          dialogParams.title = '新建文件夹'
          break
        case 'resetFileName': // 重命名
          dialogParams.title = '重命名'
          this.dialogData.name = params.node.title
          break
        case 'deleteFile': // 删除
          dialogParams.title = '删除'
          dialogParams.type = 'tips'
          dialogParams.tipsText = '确定要删除吗？'
          break
        default:
      }
      dialogParams.saveFn = 'saveNext'
      dialogParams.clickType = params.type
      this.$refs.vDialog.setDialogStatus(true)
      // this.isShowDialog = true
      this.dialogParams = dialogParams
      console.log(dialogParams)
    },

    // 点击对话框按钮后的回调
    saveDialogNext (datas) {
      console.log('saveDialogNext---   datas=', datas)
      // 获取名称后缀
      let re = /[^.]\w*$/i
      let typeStr = ''
      if (datas.data.clickType === 'createFile' || datas.data.clickType === 'resetFileName') { // 不是创建文件夹
        let resultArr = re.exec(this.dialogData.name)
        typeStr = Bean.suffixTransType[resultArr[0]]
      }
      // console.log('typeStr=', typeStr)
      this.updateNodeValue(this.nodes, datas.data.id, datas.data.clickType, typeStr)
      // console.log('hahaNodes=', this.nodes)
      this.$emit('setNodes', JSON.parse(JSON.stringify(this.nodes)))
      this.$refs.vDialog.setDialogStatus(false)
      this.dialogData.name = ''
      this.updateNodes() // 更新store树形节点数据
    },

    // 更新节点数据
    updateNodeValue (nodes, id, type, suffix) {
      let node = {}
      this.ergodicNodesItem((nodeModel, nodeModels, index) => {
        if (nodeModel.data.id === id) {
          switch (type) {
            case 'createFile': // 新建文件
              node = { title: this.dialogData.name, isLeaf: true, data: { type: suffix } }
              if (nodeModel.children && nodeModel.children.length) {
                node.data.id = nodeModel.children[nodeModel.children.length - 1].data.id + 1
              } else {
                node.data.id = nodeModel.data.id + 10
                nodeModel.children = []
              }
              console.log('createFile*******  node=', node)
              nodeModel.children.push(node)
              break
            case 'createFolder': // 新建文件夹
              node = { title: this.dialogData.name, isExpanded: true, data: { id: nodeModel.data.id + 200 } }
              console.log('createFolder*******  node=', node)
              nodeModel.children.push(node)
              break
            case 'openFile': // 打开文件
              console.log('打开文件*****')
              break
            case 'resetFileName': // 重命名
              nodeModel.title = this.dialogData.name
              console.log('resetFileName*******  node=', node)
              break
            case 'deleteFile': // 删除
              console.log('deleteFile*******')
              nodeModels.splice(index, 1)
              break
            default:
          }
        }
      }, nodes)
    },

    // 遍历节点每项数据
    ergodicNodesItem (cb, nodeModels) {
      let i = nodeModels.length
      while (i--) {
        const nodeModel = nodeModels[i]
        if (nodeModel && nodeModel.children) {
          this.ergodicNodesItem(cb, nodeModel.children)
        }
        cb(nodeModel, nodeModels, i)
      }
      return nodeModels
    }
  }
}
</script>

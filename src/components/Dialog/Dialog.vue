<template>
    <div class="box-dialog-out" v-if="isShowDialog">
        <div class="box-dialog-bg"></div>
        <div class="box-dialog">
            <!-- 对话框头部 -->
            <div class="dialogh-header">
                <span class="header-title">{{newParams.title}}</span>
                <i class="icon-close" @click="setDialogStatus(false)"></i>
            </div>
            <!-- 新建文件 -->
            <slot name="edit" v-if="newParams.type === 'edit'"></slot>
            <!-- <div class="dialog-item" v-if="newParams.type === 'edit'">
                <span class="dialog-name"></span>
                <input type="text" class="dialog-input"/>
            </div> -->
            <!-- 提示性文案 -->
            <p class="dialog-tips" :style="newParams.type === 'edit'?'':'padding:40px 0 10px;'" v-if="newParams.tipsText">{{newParams.tipsText}}</p>
            <!-- 操作按钮 -->
            <div class="dialog-btns" v-if="newParams.btns&&newParams.btns.length">
                <button type="button" :class="`dialog-btn ${btn.isSave?'btn-save':''}`" v-for="(btn, index) in newParams.btns" v-bind:key="index" @click="clickButton(index)">{{btn.name}}</button>
                <!-- <button type="button" class="dialog-btn">取消</button>
                <button type="button" class="dialog-btn btn-save">确定</button> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    params: { // 父组件设置参数
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // 合并后的新参数
    newParams () {
      console.log('computed----   params=', this.params)
      let temp = Object.assign({}, this.defaultParams, this.params)
      console.log('newParams=', temp)
      return temp
    }
  },
  data () {
    return {
      defaultParams: {
        title: '标题', // 标题名称
        type: 'edit', // 类型(edit:编辑，tips:提示性文案)，默认提示性文案
        tipsText: '', // 提示文案
        btns: [
          { name: '取消', isClose: true },
          { name: '确定', isSave: true }
        ],
        closeFn: '', // 取消按钮回调
        saveFn: '' // 确定按钮回调
      }, // 默认参数
      isShowDialog: false // 是否显示对话框
      // newParams: {}
    }
  },
  methods: {
    // 关闭对话框
    setDialogStatus (value) {
      this.isShowDialog = value
    },
    // 点击按钮
    clickButton (index) {
      let btn = this.newParams.btns[index]
      if (btn.isSave) { // 点击确定按钮，调用父组件接口
        if (this.newParams.saveFn) { // 父组件有设置回调函数
          this.$emit(this.newParams.saveFn, {type: 'save', data: this.params})
        } else {
          this.setDialogStatus(false)
        }
      } else if (btn.isClose) { // 点击取消按钮
        if (this.newParams.closeFn) { // 父组件有设置回调函数
          this.$emit(this.newParams.closeFn, {type: 'close', data: this.params})
        } else {
          this.setDialogStatus(false)
        }
        // this.closeDialog()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .box-dialog-out {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  z-index: 99999;
  .box-dialog-bg {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2)
  }
  .box-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -200px;
    margin-top: -100px;
    min-width: 400px;
    min-height: 200px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    padding: 0 20px;
    color: #333333;
    .dialogh-header {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      .header-title {
        font-size: 14px;
      }
      .icon-close {
        display: block;
        width: 10px;
        height: 10px;
        cursor: pointer;
        border: none;
        background: url('~@/assets/icons/closed.png') 0 0 no-repeat;
        background-size: cover;
      }
    }
    .dialog-tips {
        display: block;
        margin: 0;
        padding: 0;
        font-size: 14px;
        text-align: center;
        line-height: 20px;
    }
    .dialog-btns {
      padding-top: 20px;
      padding-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      .dialog-btn {
        display: block;
        margin: 0 5px;
        padding: 0;
        width: 60px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #606266;
        background: #fff;
        border: 1px solid #dcdfe6;
      }
      .btn-save {
        color: #fff;
        background: #2f2f2f;
        &::after {
          border: none;
        }
      }
    }
  }
 }
</style>

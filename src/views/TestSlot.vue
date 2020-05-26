<template>
    <div>
        <div>11111111111111</div>
        <!-- 对话框 -->
        <dialog :params="dialogParams">
            <template slot="edit">
                <div class="dialog-item">
                <span class="dialog-name"></span>
                <input type="text" class="dialog-input"/>
                </div>
            </template>
        </dialog>
    </div>
</template>

<script>
import Dialog from '@/components/Dialog/Dialog'
export default {
  name: 'TestSlot',
  components: {
    dialog: Dialog
  },
  data () {
    return {
      isShowDialog: false, // 是否显示对话框
      dialogParams: {} // 对话框参数
    }
  },
  created () {},
  mounted () {},
  methods () {}
}
</script>

<style lang="scss" scoped>
</style>

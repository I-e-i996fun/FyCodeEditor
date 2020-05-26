<template>
  <router-link
    tag="li"
    :class="{
      'router-tab-item': true,
      [tabClass || '']: true,
      actived: Tab.activeTabId === id,
      'is-closable': closable,
      'is-contextmenu': Tab.contextmenu.id === id
    }"
    :to="to"
  >
    <slot v-bind="this">
      <i v-if="icon" class="tab-icon" :class="icon" />
      <span class="tab-title" :title="tips">{{ title }}</span>
      <i v-if="isUnSave" :class="unSaveClass" @mouseover="setUnSaveIcon(1)" @mouseout="setUnSaveIcon(2)" @click.prevent="unSaveClose"/>
      <i v-else-if="closable" class="tab-close" @click.prevent="close" />
      <i v-else></i>
    </slot>
  </router-link>
</template>

<script>
// 从 data 的字段直接生成 computed
const mapDataComputed = (...keys) => {
  const map = {}
  keys.forEach(key => {
    map[key] = function () {
      return this.data[key]
    }
  })
  return map
}

// 页签项
export default {
  name: 'TabItem',
  inject: ['Tab'],
  props: {
    // 页签原始数据，方便 slot 插槽自定义数据
    data: {
      type: Object,
      required: true
    },

    // 页签项索引
    index: Number
  },

  computed: {
    // 直接从 data 中获取值
    ...mapDataComputed('id', 'to', 'icon', 'tabClass', 'target', 'href', 'isUnSave'),

    // 国际化
    i18nText () {
      return this.Tab.i18nText
    },

    // 未命名页签
    untitled () {
      return this.Tab.lang.tab.untitled
    },

    // 页签标题
    title () {
      return this.i18nText(this.data.title) || this.untitled
    },

    // 页签提示
    tips () {
      return this.i18nText(this.data.tips || this.data.title) || this.untitled
    },

    // 是否可关闭
    closable () {
      const { keepLastTab, items } = this.Tab
      return this.data.closable && !(keepLastTab && items.length < 2)
    }
  },

  data () {
    return {
      unSaveClass: 'tab-unsave'
    }
  },

  methods: {
    // 关闭当前页签
    close () {
      this.Tab.closeTab(this.id)
    },
    // 鼠标划过未保存图标
    setUnSaveIcon (type) {
      this.unSaveClass = type === 1 ? 'tab-close-single' : 'tab-unsave'
    },
    // 未保存点击关闭
    unSaveClose () {
      if (this.isUnSave && this.unSaveClass === 'tab-close-single') {
        // console.log('确定不保存关闭吗')
        this.close()
      }
    }
  }
}
</script>

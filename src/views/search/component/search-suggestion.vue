<template>
  <div class="search-suggestion">
    <van-cell
    icon="search"
    v-for="(item, index) in suggestionList"
    :key="index"
    @click="$emit('search',item)"
    >

    <template #title>
      <div v-html="highlight(item)">
      </div>
    </template>

    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestionList: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {

      // debounce函数(用于防抖)
      // 参数1： 一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 500),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (value) {
      try {
        const { data: res } = await getSearchSuggestions(value)
        this.suggestionList = res.data.options
      } catch (err) {
        this.$toast('获取搜索联想建议失败，请稍后重试')
      }
    },
    highlight (item) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      // RegExp 正则表达式构造函数
      //     参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //     参数2：匹配成功，写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return item.replace(reg, highlightStr)
    }

  }
}
</script>

<style scoped lang="less">
.search-suggestion {
 /deep/ span.active {
    color: #3296fa;
  }
}
</style>

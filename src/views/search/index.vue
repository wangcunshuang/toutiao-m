<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏 -->
    <!-- 搜索结果 -->
    <search-result
    v-if="isResultShow"
    :search-text = "searchText"
    />
    <!-- 联想建议 -->
    <search-suggestion
    v-else-if="searchText"
    :search-text = "searchText"
    @search='onSearch'
     />
    <!-- 搜索历史 -->
    <search-history v-else/>
  </div>
</template>

<script>
import SearchHistory from './component/search-history.vue'
import SearchSuggestion from './component/search-suggestion.vue'
import SearchResult from './component/search-result.vue'
export default {
  name: 'SearchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false
    }
  },
  methods: {
    onSearch (val) {
      this.searchText = val
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  },
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  }

}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
 /deep/ .van-search__action {
   color: #fff;
 }
}
</style>

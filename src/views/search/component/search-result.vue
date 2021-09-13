<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
      v-for="(item,index) in list"
      :key="index"
      :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search.js'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.loadSearchResults()
  },
  methods: {
    async loadSearchResults () {
      try {
        const { data: res } = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.searchText
        })

        if (Math.random() > 0.5) {
          JSON.parse('dfaiofhj')
        }

        const { results } = res.data
        this.list.push(...results)

        this.loading = false

        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        // 展示加载失败的提示状态
        this.error = true

        this.loading = false
      }
    }
  }

}
</script>

<style>

</style>

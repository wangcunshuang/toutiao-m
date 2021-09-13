<template>
  <div class="article-list">
    <van-pull-refresh
    :success-duration="1000"
    :success-text="reFreshSuccessText"
    v-model="isreFreshLoading"
    @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      v-model:error="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <article-item
      v-for="(item,index) in list"
      :key="index"
      :article="item"
      />
    </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 控制列表获取失败状态的提示
      isreFreshLoading: false,
      reFreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = res.data
        // 数组的展开操作符
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getArticles({
          channel_id: this.channel.id,
          // 下拉刷新数据，每次请求获取最新数据，所以使用当前时间戳
          timestamp: Date.now(),
          with_top: 1
        })

        const { results } = res.data
        this.list.unshift(...results)
        this.isreFreshLoading = false
        this.reFreshSuccessText = `刷新成功,更新了 ${results.length}条数据`
      } catch (err) {
        this.isreFreshLoading = false
        this.reFreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 80vh;
  overflow-y: auto;
}
</style>

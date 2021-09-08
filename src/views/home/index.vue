<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <template v-slot:title>
        <van-button
        class="search-btn"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button>
      </template>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>

      <van-tab
        :title="item.name"
        v-for="item in channels"
        :key="item.id"
        >
        <article-list :channel="item"/>
        </van-tab>

      <template v-slot:nav-right>
        <div class="placeholder"></div>
        <i class="toutiao toutiao-gengduo hamburger-btn"></i>
      </template>
    </van-tabs>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  props: {},
  data () {
    return {
      active: 3,
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {},
  methods: {
    async loadChannels () {
      try {
        const { data: res } = await getUserChannels()
        this.channels = res.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
 /deep/ .channel-tabs {
   .van-tabs__wrap {
     position: fixed;
     top: 92px;
     z-index: 1;
     left: 0;
     right: 0;
     height: 82px;
   }
    .van-tab {
      min-width: 200px;
      border-right:1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__nav--line {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      min-width: 66px;
      height: 82px;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
    }
    .toutiao {
      font-size: 33px;
    }
    // &:before {
    //   content: "";
    //   position: absolute;
    //   left: 0;
    //   width: 5px;
    //   height: 100%;
    //   background-image: url(~@/assets/gradient-gray-line.png);
    //   background-size: contain;
    // }
  }
}

</style>

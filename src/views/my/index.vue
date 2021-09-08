<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
  <div class="base-info">
    <div class="left">
      <van-image
      class="avatar"
      :src="userInfo.photo"
      round
      fit="cover"
      />
      <span class="name"> {{userInfo.name}} </span>
    </div>
    <div class="right">
      <van-button round size="mini">编辑资料</van-button>
    </div>
  </div>
  <div class="data-stats">
    <div class="data-item">
      <span class="count"> {{userInfo.art_count }} </span>
      <span class="text">头条</span>
    </div>
    <div class="data-item">
      <span class="count"> {{userInfo.follow_count}} </span>
      <span class="text">关注</span>
    </div>
    <div class="data-item">
      <span class="count"> {{userInfo.fans_count}} </span>
      <span class="text">粉丝</span>
    </div>
    <div class="data-item">
      <span class="count"> {{userInfo.like_count}} </span>
      <span class="text">获赞</span>
    </div>
  </div>
    </div>

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid column-num="2" clickable>
      <van-grid-item to="" icon="user-o" text="收藏" />
      <van-grid-item to="" icon="photo-o" text="历史" />
    </van-grid>

    <van-cell title="消息通知" is-link/>
    <van-cell class="mb-9" title="小智同学" is-link/>
    <van-cell
     v-if="user"
     class="logout-cell"
     title="退出登录"
     @click="onLogout"
     clickable
     />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      // 退出提示
      this.$dialog.confirm({
        title: '确认退出？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
          // this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
      // 确认退出：清楚登录状态
    },
    async loadUserInfo () {
      try {
        const { data: res } = await getUserInfo()
        console.log(res)
        this.userInfo = res.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
        font-size: 30px;
        color: #fff;
        }
      }
    }
    .data-stats{
      display: flex;
      .data-item {
        height: 130px;
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
}
</style>

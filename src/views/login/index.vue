<template>
<div class="login-container">
  <!-- 导航栏 -->
<van-nav-bar
class="page-nav-bar"
title="登录"
@click-left="$router.go(-1)"
>
  <template #left>
    <van-icon name="arrow-left" size="18" />
  </template>
</van-nav-bar>
<!-- 登录表单 -->
<van-form ref="loginForm" @submit="onSubmit">
  <van-field
  v-model="user.mobile"
    name="mobile"
    type="number"
    maxlength="11"
    placeholder="请输入手机号"
    :rules="userFormRules.mobile"
    left-icon="smile-o"
  />

  <van-field
  v-model="user.code"
    name="code"
    type="number"
    maxlength="6"
    placeholder="请输入验证码"
    :rules="userFormRules.code"
    left-icon="smile-o"
  >
  <template #button>
    <van-count-down
    v-if="isCountDownShow"
    :time="1000*6"
    format="ss s"
    @finish="isCountDownShow = false"
    />
    <van-button
    v-else
    native-type="button"
    class="send-sms-btn"
    round
    size="small"
    type="default"
    @click="onSentSms"
    >发送验证码</van-button>
  </template>
  </van-field>
  <div style="margin: 16px;">
    <van-button class="page-nav-bar" block type="info" native-type="submit">
      登录
    </van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '请填写手机号'
        }, {
          pattern: /^1[3|5|7|8|9]\d{9}$/,
          message: '手机号码格式错误'
        }],
        code: [{
          required: true,
          message: '请填写验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 3.提交表单请求登录
      try {
        const { data: res } = await login(user)
        this.$store.commit('setUser', res.data)
        this.$toast.success('登录成功！')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误！')
        } else {
          this.$toast.fail('登录失败,请稍后再试！')
        }
      }

      // 4.根据请求响应结果处理后续操作
    },
    async onSentSms () {
      // 1.校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('验证码发送成功,请注意查收')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast.fail('获取验证码过于频繁，请稍后重试')
        } else {
          this.$toast('获取验证码失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>

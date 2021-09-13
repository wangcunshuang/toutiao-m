<template>
  <div class="channel-edit">
    <van-cell :border="false" >
      <template #title>
        <div class="title-text">我的频道</div>
      </template>
      <van-button
      class="edit-btn"
      type="danger"
      plain
      round
      size="mini"
      @click="isEdit = !isEdit"
      >
      {{ isEdit? '完成' : '编辑'}}
      </van-button>
    </van-cell>

    <van-grid class="my-grid" :gutter="10">
      <van-grid-item
      class="grid-item"
      v-for="(item, index) in myChannels"
      :key="index"
      @click="onMyChannelClick(item, index)"
      >
      <template #text>
        <van-icon
        name="clear"
        v-if="isEdit && !fixedChannels.includes(item.id) "
        ></van-icon>
        <span
        class="text"
        :class="{active: index === active}"
        >{{item.name}}
        </span>
      </template>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false" >
     <template #title>
       <div class="title-text">频道推荐</div>
     </template>
    </van-cell>

    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
      class="grid-item"
      v-for="(item, index) in recommendChannels"
      :key="index"
      icon="plus"
      :text="item.name"
      @click="onAddChannel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel.js'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage.js'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0]
    }
  },
  computed: {
    ...mapState(),
    recommendChannels () {
      return this.allChannels.filter(channel => {
        return !this.myChannels.find(item => {
          return item.id === channel.id
        })
      })
    }
  },
  props: {
    myChannels: {
      typeof: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },

    async onAddChannel (item) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(item)

      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: item.id,
            seq: this.myChannels.length
          })
        } catch (err) {
          this.$toast('获取频道列表失败')
        }
      } else {
      // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    onMyChannelClick (item, index) {
      if (this.isEdit) {
        // 1.如果是固定频道，则不删除
        if (this.fixedChannels.includes(item.id)) {
          return
        }

        // 2.删除频道项
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(index, 1)

        // 3.如果删除激活频道之前的频道，则更新激活频道项
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        // 4. 处理持久化
        this.deletChannel(item)
      } else {
      // 如果是非编辑状态，执行切换频道
        this.$emit('update-active', index, false)
      }
    },

    async deletChannel (item) {
      try {
        if (this.user) {
          // 已登录，则将数据更新到线上
          await deleteUserChannel(item.id)
        } else {
          // 未登录，将数据更新到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #F85959;
    border: 1px solid #F85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,.text {
        color: #222;
        .van-grid-item__text {
          margin-top: 0;
        }
        .active {
          color: red;
        }
      }
    }
  }

  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

 /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
           margin-right: 6px;
        }
      }
    }
  }
}

</style>

<template>
  <van-cell
  is-link
  class="article-item"
  :to="{
    name:'article',
    params: {
      articleId:article.art_id
    },
  }"
  >
      <template #title>
        <span class="title van-multi-ellipsis--l2"> {{article.title}}</span>
      </template>

      <template #label>
        <div v-if="article.cover.type===3" class="cover-wrap">
         <div
         class="cover-item"
         v-for="(cover,index) in article.cover.images"
         :key="index">
         >
           <van-image
           class="cover-item-img"
             fit="cover"
             :src="img"
           />
         </div>
        </div>
       <div class="label-info-wrap">
         <span> {{article.aut_name}} </span>
         <span> {{article.comm_count}}评论 </span>
         <span> {{article.pubdate}} </span>
       </div>
      </template>

      <template #value>
        <van-image
        v-if="article.cover.type === 1"
          class="right-cover"
          fit="cover"
          :src="article.cover.images[0]"
        />
      </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-cover {
   width: 232px;
   height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
    }
  }
}
</style>

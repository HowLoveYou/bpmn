<template>
  <div>
    this is a login page!
    <van-row>
      <van-col :span="8">1</van-col>
      <van-col :span="8">2</van-col>
      <van-col :span="8">{{token}}</van-col>
    </van-row>
    <van-button type="primary" @click="mockdata">登录</van-button>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import service from './service';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['token'])
  },
  created() {},
  mounted() {
    this.getToken('123');
  },
  methods: {
    ...mapMutations({ setToken: 'SET_TOKEN' }),
    ...mapActions(['getToken']),
    //测试mock
    async mockdata() {
      let params = {
        username: 'zhangsan',
        password: '123456'
      };
      let res = await service.login(params);
      console.log(res);
    }
  }
};
</script>

<style lang='scss' scoped>
</style>

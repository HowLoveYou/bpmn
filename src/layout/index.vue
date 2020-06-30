<template>
  <el-container direction="vertical">
    <layout-head></layout-head>
    <el-container>
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import layoutHead from './components/layoutHead';
import sidebar from './components/sidebar';

export default {
  data() {
    return {};
  },
  components: {
    layoutHead,
    sidebar
  }
};
</script>

<style lang='scss' scoped>
.el-container {
  height: 100%;
}
</style>

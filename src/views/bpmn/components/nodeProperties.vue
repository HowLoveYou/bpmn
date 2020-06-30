<template>
  <div class="node-properties">
    <el-row>
      <el-col align="center">节点属性</el-col>
    </el-row>
    <el-form :model="form" class="form-area">
      <el-form-item label="节点名称：" label-width="100px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="节点类型：" label-width="100px">
        <el-input v-model="form.name1"></el-input>
      </el-form-item>
      <el-form-item label="处理期限：" label-width="100px">
        <el-input v-model="form.name2"></el-input>
      </el-form-item>
      <el-form-item label="处理界面：" label-width="100px">
        <el-input v-model="form.name3"></el-input>
      </el-form-item>
      <el-form-item label="派工规则:" label-width="100px">
        <el-input v-model="form.name4"></el-input>
      </el-form-item>
      <el-form-item label="执行人:" label-width="100px">
        <el-input v-model="form.name5"></el-input>
      </el-form-item>
      <el-form-item label="执行人变量:" label-width="100px">
        <el-input v-model="form.name6"></el-input>
      </el-form-item>
    </el-form>
    <el-row style="margin-top:10px" type="flex" justify="end">
      <el-button type="primary" @click="submit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    element: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    element: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  data() {
    return {
      form: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      let { name, name1, name2, name3, name4, name5, name6 } = this.element;
      this.form = { name, name1, name2, name3, name4, name5, name6 };
    },
    //提交
    submit() {
      this.$emit('changeProperties', this.form);
    },
    cancel() {
      this.form = {};
    }
  }
};
</script>

<style lang='scss' scoped>
.node-properties {
  display: flex;
  flex-direction: column;
  width: 320px;
}
.form-area {
  background: #fff;
  border: 1px solid #ccc;
  padding: 20px 10px;
  margin-top: 10px;
}
</style>

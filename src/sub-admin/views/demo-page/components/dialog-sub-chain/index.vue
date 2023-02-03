<template>
  <TwiceDialog class="reset-twice-dialog-input dialog-sub-chain" v-model="visible" title="新增子链" width="342px">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="SERCETID：">
        <el-input disabled />
      </el-form-item>
      <el-form-item label="SERCETKEY：">
        <el-input />
      </el-form-item>
      <el-form-item prop="url">
        <template #label>
          <div class="label">
            <span>接口地址：</span>
            <span class="check">校验<i>icon</i></span>
          </div>
        </template>
        <template #error><span></span></template>
        <el-input v-model="form.url" />
        <p class="tips">
          <i>icon</i>请输入存证系统后台地址
        </p>
      </el-form-item>
      <el-form-item label="子链标签：">
        <el-input />
      </el-form-item>
    </el-form>

    <div style="text-align: center;">
      <el-button type="info" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="createSubChain">创建</el-button>
    </div>
  </TwiceDialog>
</template>

<script lang="ts">
import TwiceDialog from '@/common/components/twice/dialog';
import { ElFormItem } from 'element-plus';
import setup from './setup';

export default {
  components: {
    TwiceDialog,
  },
  emits: [
    'success',  // 提交成功后，刷新数据
  ],
  setup,
}
</script>

<style lang="scss" scoped>
.dialog-sub-chain{
  .label{
    display: inline-block;
    width: calc(100% - 11px);
    .check{
      float: right;
      color: #147070;
    }
  }
  .tips{
    width: 100%;
    line-height: 22px;
    text-align: right;
    color: var(--main-color-font-gray);
  }
  .is-error{
    .tips{
      color: var(--main-color-font-error);
    }
  }
}
</style>
<template>
  <TwiceDialog class="reset-twice-dialog-input dialog-send-reading" v-model="visible" width="342px">
    <template #header>
      <i class='iconfont'>&#xe002;</i>
      <span>发送交易</span>
    </template>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="接受ID">
        <el-input v-model="form.recChainId" disabled />
      </el-form-item>
      <el-form-item label="发送ID" prop="sendChainId">
        <el-select  v-model="form.sendChainId">
          <el-option v-for="(item, index) in receiveIDList" :key="index" :label="item.chainId" :value="item.chainId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="交易内容" prop="tag">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
    </el-form>

    <div style="text-align: center;">
      <el-button type="info" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="createSubChain">发送</el-button>
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
  props: {
    need: {
      type: Object,
      default: () => ({
        chainId: ''
      })
    }
  },
  setup,
}
</script>

<style lang="scss" scoped>
.dialog-sub-chain{
  .label{
    display: inline-block;
    width: calc(100% - 11px);
  }
}
</style>
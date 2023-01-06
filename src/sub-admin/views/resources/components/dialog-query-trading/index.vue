<template>
  <TwiceDialog class="dialog-send-reading" v-model="visible" width="650px">
    <template #header>
      <i class='iconfont'>&#xe00e;</i>
      <span>查询交易</span>
    </template>
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="交易HASH" prop="tradeHash">
        <el-input v-model="form.tradeHash" />
      </el-form-item>
    </el-form>

    <div>
      <p>
        <strong>区块高度：</strong>
        <span>{{ tradingData.blockHeight }}</span>
      </p>
      <p>
        <strong>交易哈希：</strong>
        <span>{{ tradingData.tradeHash }}</span>
      </p>
      <p>
        <strong>交易时间：</strong>
        <span v-if="tradingData.tradeTime">{{ dateFormater(tradingData.tradeTime * 1000) }}</span>
      </p>
      <p>
        <strong>区块哈希：</strong>
        <span>{{ tradingData.blockHash }}</span>
      </p>
      <p>
        <strong>发送地址：</strong>
        <span>{{ tradingData.accountFrom }}</span>
      </p>
    </div>

    <div style="text-align: center;">
      <el-button type="info" @click="visible = false">取消</el-button>
      <el-button type="primary" @click="queryTrading">查询</el-button>
    </div>
  </TwiceDialog>
</template>

<script lang="ts">
import TwiceDialog from '@/common/components/twice/dialog';
import { ElFormItem } from 'element-plus';
import { dateFormater } from '@/common/utils/date';
import setup from './setup';

export default {
  components: {
    TwiceDialog,
  },
  setup: () => ({
    dateFormater,
    ...setup(),
  })
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
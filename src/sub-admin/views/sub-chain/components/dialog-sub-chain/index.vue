<template>
  <TwiceDialog class="reset-twice-dialog-input dialog-sub-chain" v-model="visible" :title="type ? '修改子链' : '新增子链'" width="342px">
    <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
      <el-form-item label="SERCETID：" prop="secretId">
        <el-input ref="secretIdRef" v-model="form.secretId" :disabled="need.status === '已公开'" />
      </el-form-item>
      <el-form-item label="SERCETKEY：" prop="secretKey">
        <el-input ref="secretKeyRef" v-model="form.secretKey" :disabled="need.status === '已公开'" />
      </el-form-item>
      <el-form-item prop="address">
        <template #label>
          <div class="label">
            <span>接口地址：</span>
            <span class="check" @click="manualOutOfFocus">校验
              <i v-if="checkStatus" class="iconfont">&#xe019;</i>
              <i v-else class="iconfont">&#xe018;</i>
            </span>
          </div>
        </template>
        <template #error>
          <p class="address-error">
            <i>icon</i>请输入存证系统后台地址
          </p>
        </template>
        <el-input ref="addressRef" v-model="form.address" :disabled="need.status === '已公开'" />
      </el-form-item>
      <el-form-item label="子链名称：" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="子链标签：" prop="tag">
        <el-input v-model="form.tag" />
      </el-form-item>
      <!-- <el-form-item label="子链状态：" prop="tag">
        <el-select v-model="form.status">
          <el-option lable="已公开" value="已公开"></el-option>
          <el-option lable="未公开" value="未公开"></el-option>
        </el-select>
      </el-form-item> -->
    </el-form>

    <div style="text-align: center;">
      <el-button type="info" @click="visible = false">取消</el-button>
      <el-button v-if="type === 0" type="primary" @click="createSubChain">创建</el-button>
      <el-button v-else type="primary" @click="editSubChain">修改</el-button>
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
    type: {
      type: Number,
      default: 0,  // 0 新增，1 修改
    },
    need: {
      type: Object,
      default: () => ({})
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

  .address-error{
    width: 100%;
    line-height: 16px;
    text-align: right;
    font-size: 12px;
    color: var(--el-color-danger);
  }
}
</style>
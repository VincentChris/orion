<template>
  <ElContainer class="h-screen">
    <ElHeader>
      <ElRow
        class="h-full font-size-8 font-semibold"
        justify="center"
        align="middle"
      >
        icon font
      </ElRow>
    </ElHeader>
    <ElMain>
      <ElRow justify="center">
        <el-upload
          class="avatar-uploader"
          accept=".svg"
          action="http://localhost:3001/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </ElRow>
    </ElMain>
  </ElContainer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const imageUrl = ref('');

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  imageUrl.value = `data:image/svg+xml;utf8,${encodeURIComponent(
    response.file,
  )}`;
};

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile);
  if (rawFile.type !== 'image/svg+xml') {
    ElMessage.error('Avatar picture must be SVG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

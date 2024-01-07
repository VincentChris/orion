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
          :action="`${API_PREFIX}/api/upload`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </ElRow>
      <ElRow justify="center" class="font-size-8 font-semibold mt-20 mb-10">
        所有图片
      </ElRow>
      <ElRow justify="center">
        <img
          v-for="item in imageList"
          :src="item"
          :key="item"
          class="w-8 mr-6"
        />
      </ElRow>
      <ElRow justify="center" class="mt-20 mb-10">
        <ElButton type="primary" @click="onGenerateClick"
          >生成字体文件</ElButton
        >
      </ElRow>
      <component is="style">
        {{
          `
                @font-face {
                font-family: 'MyWebFont';
                src:
                  url(${fontUrl}) format('woff'),
              }
          `
        }}
      </component>
      <span>{{ fontUrl }}</span>
      <span class="iconfont home"></span>
    </ElMain>
  </ElContainer>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const imageUrl = ref('');
const imageList = ref([]);
const fontUrl = ref('');
const { API_PREFIX } = useAppConfig();
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  imageUrl.value = `${API_PREFIX}${response.file}`;
  getAllSvgs();
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
const getAllSvgs = () => {
  fetch(`${API_PREFIX}/api/allSvgs`, { method: 'GET' })
    .then((response) => response.json())
    .then((res) => {
      imageList.value = res.map((item: string) => `${API_PREFIX}${item}`);
      console.log('vicnent res', res);
    });
};
const generateIconFont = () => {
  fetch(`${API_PREFIX}/api/generateFont`, { method: 'GET' })
    .then((response) => response.json())
    .then((res) => {
      const url = `${API_PREFIX}${res.url}`;
      console.log('vincent font', fontUrl);
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(
        document.createTextNode(
          `@font-face {font-family: 'MyFont'; src: url(${url}) format('woff');}`,
        ),
      );
      document.head.appendChild(style);
    });
};

const onGenerateClick = () => {
  generateIconFont();
};
onMounted(() => {
  getAllSvgs();
});
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

<!--
 * @Author: 关振俊
 * @Date: 2022-10-17 10:41:57
 * @LastEditors: 关振俊
 * @LastEditTime: 2022-11-02 17:59:50
 * @Description: 文件上传+进度条
-->
<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="#"
      multiple
      :auto-upload="true"
      :show-file-list="false"
      :http-request="uploadFile"
      :on-change="handleUploadFile"
    >
      <el-button type="primary">点击上传</el-button>
    </el-upload>
    <ul class="file-list">
      <li class="file-item" v-for="(item, index) in fileList" :key="index">
        <div class="file-info">
          {{ item.name }}
        </div>
        <div class="file-progress">
          <el-progress
            :percentage="item.percentage"
            :status="
              item.status === 'success'
                ? 'success'
                : item.status === 'fail'
                ? 'exception'
                : ''
            "
          />
          <div class="btn-list">
            <el-button
              style="font-size: 16px"
              type="primary"
              round
              link
              :icon="Search"
              v-if="item.status === 'success'"
              @click="handlePreview(item)"
            ></el-button>
            <el-button
              style="font-size: 16px"
              type="primary"
              round
              link
              :icon="Close"
              v-if="item.status === 'success'"
              @click="handleRemove(item)"
            ></el-button>
            <el-button
              style="font-size: 16px"
              type="primary"
              round
              link
              v-if="item.status === 'uploading' || item.status === 'ready'"
              :icon="item.isPause ? VideoPlay : VideoPause"
              @click="handleUploadStatus(item, !item.isPause)"
            >
            </el-button>
          </div>
        </div>
      </li>
    </ul>

    <el-image-viewer
      v-if="dialogVisible"
      :url-list="[dialogImageUrl]"
      @close="dialogVisible = false"
    ></el-image-viewer>
  </div>
</template>
<script lang="ts" setup>
import { ComponentInternalInstance, getCurrentInstance, ref } from "vue";
import { ElMessage, ElMessageBox, UploadRequestOptions } from "element-plus";
import { Search, Close, VideoPause, VideoPlay } from "@element-plus/icons-vue";
import axios from "axios";
const { appContext } = getCurrentInstance() as ComponentInternalInstance;
const api = appContext.config.globalProperties.$api;

const fileList = ref<any[]>([]);

const dialogVisible = ref<boolean>(false);
const dialogImageUrl = ref<string>("");

const requestUpload = new Map();

const uploadFile = (options: any) => {
  const fileName = options.file.name;
  api.post("/initUpload", { fileName }).then((res: any) => {
    if (res.fileId) {
      const idx = fileList.value.findIndex(
        (p) => p.raw.uid === options.file.uid
      );
      fileList.value[idx].isPause = false;
      fileList.value[idx].fileId = res.fileId;
      fileList.value[idx].startProgress = 0;
      const fileInfo = {
        fileId: res.fileId,
        fileName,
        startProgress: 0,
        fileSize: options.file.size,
        file: options.file,
        isPause: false,
        uid: options.file.uid,
      };
      uploadFileChunks(fileInfo);
    }
  });
};
const uploadFileChunks = (fileInfo: any) => {
  const chunk = fileInfo.file.slice(fileInfo.startProgress);
  console.log(chunk);
  const headers = {
    "Content-Range": `bytes=${fileInfo.startProgress}-${
      fileInfo.startProgress + chunk.size
    }/${fileInfo.fileSize}`,
    "X-File-Id": fileInfo.fileId,
  };
  const currentUploadIndex = fileList.value.findIndex(
    (p) => p.fileId === fileInfo.fileId
  );
  const fd = new FormData();
  fd.append("chunk", chunk, fileInfo.fileName);
  fd.append("fileId", fileInfo.fileId);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  requestUpload.set(fileInfo.uid, source);
  const request = axios({
    url: "/api/upload",
    method: "post",
    data: fd,
    headers,
    cancelToken: source.token,
    onUploadProgress: function (e) {
      const total = e.total > fileInfo.fileSize ? e.total : fileInfo.fileSize;
      const currentProgress = Math.floor(
        ((fileInfo.startProgress + e.loaded) / total) * 100
      );
      fileList.value[currentUploadIndex].percentage = currentProgress;
      fileList.value[currentUploadIndex].status = "uploading";
      if (currentProgress >= 100) {
        setTimeout(() => {
          fileList.value[currentUploadIndex].status = "success";
        }, 100);
      }
    },
  })
    .then((res: any) => {
      console.log(res);
      ElMessage({
        message: res.data.message,
        type: "success",
      });
      console.log(fileList.value[currentUploadIndex]);
    })
    .catch((e) => {
      console.log(e);
      // ElMessage({
      //   message: e.response.data,
      //   type: "error",
      // });
      // fileList.value[currentUploadIndex].status === "error";
    });
  requestUpload.set(fileInfo.fileId, request);
};
/**上传前初始化文件 */
const handleUploadFile = (file: any, files: any) => {
  // api.post("/initUpload", { fileName: file.name }).then((res: any) => {
  //   if (res.fileId) {
  //     const idx = fileList.value.findIndex((p) => p.raw.uid === file.raw.uid);
  //     fileList.value[idx].isPause = true;
  //     fileList.value[idx].fileId = res.fileId;
  //     fileList.value[idx].startProgress = 0;
  //   }
  // });
};
const handleRemove = (file: any) => {
  const uid = file.raw.uid;
  const i = fileList.value.findIndex((p) => p.raw.uid === uid);
  fileList.value.splice(i, 1);
};
/**预览 */
const handlePreview = (fileData: any) => {
  const file: any = fileData.raw;
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e: any) {
    const blob = e.target.result;
    dialogImageUrl.value = blob;
    dialogVisible.value = true;
  };
};
/**启动和暂停上传 */
const handleUploadStatus = (item: any, isPause: boolean) => {
  const fileIdx = fileList.value.findIndex((p) => p.fileId === item.fileId);

  /**暂停 */
  if (isPause) {
    fileList.value[fileIdx].isPause = isPause;
    const request = requestUpload.get(item.uid);
    request.cancel();
  } else {
    // 启动
    interface IstatusResponse {
      fileId: string;
      fileName: string;
      fileSize: string;
    }
    api
      .get(`/uploadStatus?fileName=${item.name}&fileId=${item.fileId}`)
      .then((res: IstatusResponse) => {
        const fileOption = Object.assign({}, item, {
          fileName: res.fileName,
          fileId: res.fileId,
          startProgress: res.fileSize,
          file: item.raw,
          fileSize: item.size,
        });
        fileList.value[fileIdx].isPause = isPause;
        uploadFileChunks(fileOption);
      });
  }
};
</script>
<style scoped lang="scss">
.file-list {
  .file-item {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .file-info {
      width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .file-progress {
      .el-progress {
        width: 500px;
      }
      display: flex;
      margin-left: 10px;
      .btn-list {
        // margin-left: -26px;
      }
    }
  }
}
</style>
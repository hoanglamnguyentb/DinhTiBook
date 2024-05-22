<template>
  <div class="">
    
    <a-upload 
      :file-list="fileList" 
      :before-upload="beforeUpload" 
      @remove="handleRemove"
      @preview="handlePreview"
      list-type="picture-card">
      <!-- <a-button>
        <upload-outlined></upload-outlined>
        Select File
      </a-button> -->
      <div v-if="fileList.length < 6">
        <plus-outlined />
        <div style="margin-top: 8px">Tải ảnh lên</div>
      </div>
    </a-upload>

    <!-- <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>-->
    

    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="ví dụ" style="width: 100%" :src="previewImage" />
    </a-modal> 
  </div>


  
</template>

<script>
import APIService from "@/helpers/ApiService";

export default {
  props:{
    parentId :'',
 
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      uploading: false,
      
    };
  },
  methods: {
    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },
    handleCancel() {
      this.previewVisible = false;
      this.previewTitle = '';
    },
    async handlePreview(file) {
      console.log('preview', file)
      if (!file.url && !file.preview) {
        this.getBase64(file.file, (preview) => {
          file.preview = preview;
          this.previewImage = file.file.url || file.file.preview;
          this.previewVisible = true;
          this.previewTitle = file.file.name || file.file.url.substring(file.url.lastIndexOf('/') + 1);
        });
      } else {
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
        this.previewTitle = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
      }
    },
    
    async beforeUpload(file){
      
      // this.fileList = [...(this.fileList || []), file];
      file.url = URL.createObjectURL(file);
      file.status = 'done';
      this.fileList.push(file);
   
      
      console.log('file11', this.fileList)
    },

    async handleUpload(newProductId){
      console.log('Đã nhận được newProductId: ', newProductId);
      const formData = new FormData();
      // this.fileList.forEach(file => {
      //   formData.append('Files[]', file);
      // });
      // formData.append('Files', this.fileList)

      this.fileList.forEach(file => {
        formData.append('Files', file);
      });

      this.uploading = true;
      // APIService.post(`/FileManager/Upload1?ParentID=${this.parentId}`, formData)
      APIService.post(`/FileManager/Upload1?ParentID=${newProductId}`, formData)
        .then(() => {
          // fileList.value = [];
          // this.uploading = false;
  
          // this.$message.success('Cập nhật thành công')
          this.fileList = [];
          console.log('thanhf cong')
        })
        .catch(() => {
          this. uploading = false;
          // message.error('upload failed.');
          // this.$message.error('Cập nhật lỗi')
        });
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      this.fileList.splice(index, 1);
      console.log('xóa', this.fileList)
    },

  }
};
</script>

<style scoped>
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>




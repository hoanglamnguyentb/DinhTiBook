<template>
  <div class="">
    
    <a-upload 
      :file-list="fileList" 
      :before-upload="beforeUpload" 
      @remove="handleRemove"
      @preview="handlePreview"
      list-type="picture-card">

      <div v-if="fileList.length < 6">
        <plus-outlined />
        <div style="margin-top: 8px">Tải ảnh lên</div>
      </div>
    </a-upload>
    

    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" :width="1000" @cancel="handleCancel">
      <div v-if="previewVisible">
      <h3>{{ previewTitle }}</h3>
      <div v-if="previewType === 'image'">
        <img :src="previewImage" alt="preview" style="width: 100%" />
      </div>
      <div v-if="previewType === 'pdf'">
        <iframe :src="previewImage" width="100%" height="600px"></iframe>
      </div>
      <button @click="handleCancel">Đóng</button>
    </div>

      <!-- <img alt="ví dụ" style="width: 100%" :src="previewImage" /> -->
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
      this.previewImage = '';
      this.previewType = '';
    },
    async handlePreview(file) {
      console.log('preview', file)

       // Hàm lấy phần mở rộng của tệp
      const getFileExtension = (filename) => {
        return filename.split('.').pop().toLowerCase();
      };

      const fileExtension = getFileExtension(file.name || file.url);
      console.log('k', fileExtension)

      if (fileExtension === 'pdf') {
        // Xử lý xem trước PDF
        this.previewImage = file.url || URL.createObjectURL(file.file);
        this.previewVisible = true;
        this.previewType = 'pdf';
        this.previewTitle = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
      }
      else{

      if (!file.url && !file.preview) {
        this.getBase64(file.file, (preview) => {
          file.preview = preview;
          this.previewImage = file.file.url || file.file.preview;
          this.previewVisible = true;
          this.previewType = 'image';
          this.previewTitle = file.file.name || file.file.url.substring(file.url.lastIndexOf('/') + 1);
        });
      } else {
        this.previewImage = file.url || file.preview;
        this.previewVisible = true;
        this.previewType = 'image';
        this.previewTitle = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
      }
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

      this.fileList.forEach(file => {
        formData.append('Files', file);
      });

      this.uploading = true;

      APIService.post(`/FileManager/Upload1?ParentID=${newProductId}`, formData)
        .then(() => {

          this.fileList = [];
          console.log('thanhf cong')
        })
        .catch(() => {
          this. uploading = false;
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




<template>
  <div class="">
    
    <a-upload 
      :file-list="fileList" 
      :before-upload="beforeUpload" 
      @remove="handleRemove"
      @preview="handlePreview"
      list-type="picture-card">
  
      <div v-if="fileList.length < SoLanHienThi">
        <plus-outlined />
        <div style="margin-top: 8px">Tải ảnh lên</div>
      </div>
    </a-upload>

    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="ví dụ" style="width: 100%" :src="previewImage" />
    </a-modal> 
  </div>


  
</template>

<script>
import APIService from "@/helpers/ApiService";

export default {
  props:{
      SoLanHienThi: 0,
    },
  data() {
    
    return {
      
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
      uploading: false,
      

      // IdCha: '53402d4a-c87a-4043-98cc-08dc7d931773',
      FileLayVe:'',
      URL: 'http://localhost:44301/',
      IdFile: '',
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
      APIService.delete("/FileManager/delete?IDItem="+ this.IdFile)
      .then(response =>{
        const index = this.fileList.indexOf(file);
        if (index !== -1) {
          this.fileList.splice(index, 1);
          console.log('Đã xóa file:', file);
          console.log('fie da xoa', response)
        }
      })
      .catch(error=>{
        console.log('loi roi', error)
      })
    },
    getFile(idCha){
      console.log('Đã nhận được idCha: '+idCha);
      APIService.get("FileManager/getbyParentID?parentid="+ idCha)
      .then(response => {
        
        this.IdFile = response.data.data[0].id
        console.log('idfile', this.IdFile)
        for(var i=0; i<response.data.data.length; i++){
          let file = {
            url: this.URL + response.data.data[i].path,
            status: 'done'
          };
        this.fileList.push(file);
        
        }
        
        console.log('filelist',this.fileList)
      })
      
    }
  },
  mounted(){
    
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




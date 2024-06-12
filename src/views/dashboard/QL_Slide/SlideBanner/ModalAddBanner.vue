<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="'Thêm banner'"
      @ok="handleUpload"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="banner"  layout="vertical"  :rules="rules">
        <a-form-item ref="tenBanner" label="Tên banner" name="tenBanner">
          <a-input v-model:value="banner.TenBanner" />
        </a-form-item>
       
       
        <a-form-item label="Ảnh banner">
          <a-upload 
            :file-list="fileList" 
            :before-upload="beforeUpload" 
            @remove="handleRemove"
            @preview="handlePreview"
            list-type="picture-card">
        
            <div v-if="fileList.length < 1">
              <plus-outlined />
              <div style="margin-top: 8px">Tải ảnh lên</div>
            </div>
          </a-upload>
          <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
            <img alt="ví dụ" style="width: 100%" :src="previewImage" />
          </a-modal> 
            </a-form-item>
        
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import APIService from "@/helpers/ApiService"
export default {
    data() {
    return {
      open: false,
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      id: undefined,
      
      rules:{
        TenBanner:{
          required: true, message: 'Mã không được để trống', trigger: 'change'
        },
       
        
      },
      banner:{
        TenBanner: '',
      },
      fileList: [],
    };
  },
  methods:{
    async showModal(id) {
      this.open = true
      
    },
    closeModal() {
      this.open = false
      this.id = undefined
      this.resetForm()
    },
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

    async handleUpload(){
      const formData = new FormData();
      this.fileList.forEach(file => {
        formData.append('Files', file);
      });

      this.uploading = true;
      APIService.post(`/QLSlide/Upload?Type=BANNER&TenBanner=`+this.banner.TenBanner, formData)
        .then(() => {
          this.fileList = [];
          this.$message.success('Thêm thành công')
          this.banner =''
          this.closeModal()
          this.$emit('addSuccess')
        })
        .catch(() => {
          this. uploading = false;
        });
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      this.fileList.splice(index, 1);
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  }
}
</script>

<style>

</style>
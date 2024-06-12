<template>
  <div>
    <a-modal
      v-model:open="open"
      title="Thêm slide tác giả"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="slide"  layout="vertical"  :rules="rules">
        <a-form-item ref="thongTin1" label="Tên tác giả" name="thongTin1">
          <a-input v-model:value="slide.thongTin1" />
        </a-form-item>
        <a-form-item ref="thongTin2" label="Mô tả" name="thongTin2">
          <a-textarea
                v-model:value="slide.thongTin2"
                placeholder="Nhập mô tả"
                allow-clear
                :rows="5"
              />
        </a-form-item>
       
        <a-form-item label="Ảnh tác giả">
              <FileManager
                    ref="childRef"
     :parentId="newId"
                    :SoLanHienThi="1"
                  />
            </a-form-item>
        
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import FileManager from "../../../../components/FileManager/File_Manager.vue";
import APIService from "@/helpers/ApiService"
export default {
  components:{
    FileManager,
  },
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
      slide: {
        thongTin1: '',
        thongTin2:'',     
      },
      newId: '',
      rules:{
        thongTin1:{
          required: true, message: 'Tên tác giả không được để trống', trigger: 'change'
        },
        thongTin2:{
          required: true, message: 'Mô tả không được để trống', trigger: 'change'
        },
       
        
      },
      
    };
  },
  methods:{
    async showModal() {
      this.open = true
      
    },
    closeModal() {
      this.open = false
      this.id = undefined
      this.resetForm()
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
        const data ={
          thongTin1 : this.slide.thongTin1,
          thongTin2: this.slide.thongTin2,
          type: "TACGIA"
        }
        await APIService.post("TTSlide/Create",data)
        .then(response =>{
          this.$message.success('Thêm thành công')
        this.newId = response.data.data.id;
        this.closeModal()
        this.$emit('addSuccess')
        })
        .catch(e =>{
          console.log(e)
        })
        
      }).catch(error => {
        console.log('error', error);
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  },
  watch:{
    newId: function(newVal, oldVal) {
      if (newVal) {
        // Gọi hàm uploadFiles của FileManager khi newProductId thay đổi
        this.$refs.childRef.handleUpload(newVal);
        console.log('đã ')
      }
    }
  },
}
</script>

<style>

</style>
<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="id ? 'Cập nhật chuyên mục' : 'Thêm chuyên mục'"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="chuyenmuc"  layout="vertical"  :rules="rules">
        <a-form-item ref="maDanhMuc" label="Mã chuyên mục" name="maDanhMuc">
          <a-input v-model:value="chuyenmuc.maDanhMuc" />
        </a-form-item>
        <a-form-item ref="tenDanhMuc" label="Tên chuyên mục" name="tenDanhMuc">
          <a-input v-model:value="chuyenmuc.tenDanhMuc" />
        </a-form-item>
        
        
        
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import APIService from "@/helpers/ApiService";
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
      chuyenmuc: {
        tenDanhMuc: '',
        maDanhMuc:'',
    
      },
      rules:{
        maDanhMuc:{
          required: true, message: 'Mã chuyên mục không được để trống', trigger: 'change'
        },
        tenDanhMuc:{
          required: true, message: 'Tên chuyên mục không được để trống', trigger: 'change'
        }
        
          // {
          //   type: 'number', message: 'Số thứ tự phải là kiểu số', trigger: 'blur'
          // }
        
      },
      
    };
  },
  methods:{
    async showModal(id) {
      this.open = true
      if(id) {
        var res = await APIService.get(`/DanhMucTinTuc/${id}`)
        this.id = id
        this.chuyenmuc = res.data.data
      }
    },
    closeModal() {
      this.open = false
      this.id = undefined
      this.resetForm()
    },
    // checkThuTu(value){
    //   if (!value) {
    //     throw new Error('Please input the age');
    //   }
    //   if (!Number.isInteger(value)) {
    //     throw new Error('Please input digits');
    //   } else {
    //     if (value < 18) {
    //       throw new Error('Age must be greater than 18');
    //     }
    //   }
    // },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
      
        if (this.id) {
          await APIService.put(`/DanhMucTinTuc/edit/${this.id}`,this.chuyenmuc) 
          this.closeModal()
          this.$message.success("Thành công")  
          this.$emit('addSuccess')
        }
        else {
          await APIService.post("/DanhMucTinTuc/create",this.chuyenmuc)   
          this.$message.success("Thành công")    
        this.closeModal()
        this.$emit('addSuccess')
        }
      })
      
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  }
};
</script>

<style>
</style>
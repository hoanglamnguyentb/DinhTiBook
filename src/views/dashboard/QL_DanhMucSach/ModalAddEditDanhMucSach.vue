<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="id ? 'Cập nhật danh mục' : 'Thêm mới danh mục'"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="Category"  layout="vertical"  :rules="rules">
        <a-form-item ref="maCategory" label="Mã danh mục" name="maCategory">
          <a-input v-model:value="Category.maCategory" />
        </a-form-item>
        <a-form-item ref="categoryName" label="Tên danh mục" name="categoryName">
          <a-input v-model:value="Category.categoryName" />
        </a-form-item>
        <a-form-item ref="moTa" label="Mô tả" name="moTa">
          <a-input v-model:value="Category.moTa" />
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
      Category: {
        maCategory: '',
        categoryName:'',    
        moTa: '' 
      },
      rules:{
        maCategory:{
          required: true, message: 'Thông tin không được để trống', trigger: 'change'
        },
        categoryName:{
          categoryName: true, message: 'Thông tin không được để trống', trigger: 'change'
        },
       
        
      },
      
    };
  },
  methods:{
    async showModal(id) {
      this.open = true
      if(id) {
        var res = await APIService.get(`/DanhMuc/${id}`)
        this.id = id
        this.Category = res.data.data
      }
    },
    closeModal() {
      this.open = false
      this.id = undefined
      this.resetForm()
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
        
        if (this.id) {
          await APIService.put(`/DanhMuc/edit/${this.id}`,this.Category) 
          this.$message.success('Cập nhật thông tin thành công')
        }
        else {
          await APIService.post("DanhMuc/Create",this.Category)
          this.$message.success('Thêm thành công')
        }
        this.closeModal()
        this.$emit('addSuccess')
      }).catch(error => {
        console.log('error', error);
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  }
}
</script>

<style>

</style>
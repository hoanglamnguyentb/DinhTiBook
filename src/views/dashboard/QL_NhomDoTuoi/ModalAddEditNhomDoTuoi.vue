<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="id ? 'Cập nhật nhóm độ tuổi' : 'Thêm mới nhóm độ tuổi'"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="NhomDoTuoi"  layout="vertical"  :rules="rules">
        <a-form-item ref="maNhomDoTuoi" label="Mã nhóm độ tuổi" name="maNhomDoTuoi">
          <a-input v-model:value="NhomDoTuoi.maNhomDoTuoi" />
        </a-form-item>
        <a-form-item ref="tenNhom" label="Tên nhóm độ tuổi" name="tenNhom">
          <a-input v-model:value="NhomDoTuoi.tenNhom" />
        </a-form-item>
        <a-form-item ref="moTaDoTuoi" label="Mô tả" name="moTaDoTuoi">
          <a-input v-model:value="NhomDoTuoi.moTaDoTuoi" />
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
      NhomDoTuoi: {
        maNhomDoTuoi: '',
        tenNhom:'',    
        moTaDoTuoi: '' 
      },
      rules:{
        maNhomDoTuoi:{
          required: true, message: 'Thông tin này không được để trống', trigger: 'change'
        },
        tenNhom:{
          required: true, message: 'Thông tin này không được để trống', trigger: 'change'
        },
       
        
      },
      
    };
  },
  methods:{
    async showModal(id) {
      this.open = true
      if(id) {
        var res = await APIService.get(`/NhomDoTuoi/${id}`)
        this.id = id
        this.NhomDoTuoi = res.data.data
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
          await APIService.put(`/NhomDoTuoi/edit/${this.id}`,this.NhomDoTuoi) 
          this.$message.success('Cập nhật thông tin thành công')
        }
        else {
          await APIService.post("NhomDoTuoi/Create",this.NhomDoTuoi)
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
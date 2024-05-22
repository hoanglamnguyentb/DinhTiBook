<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="id ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản'"
      @ok="handleOk"
      @cancel="closeModal"
    >
      <a-form ref="formRef" :model="nxb"  layout="vertical"  :rules="rules">
        <a-form-item ref="maNXB" label="Mã NXB" name="maNXB">
          <a-input v-model:value="nxb.maNXB" />
        </a-form-item>
        <a-form-item ref="tenNXB" label="Tên NXB" name="tenNXB">
          <a-input v-model:value="nxb.tenNXB" />
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
      nxb: {
        maNXB: '',
        tenNXB:'',     
      },
      rules:{
        maNXB:{
          required: true, message: 'Mã không được để trống', trigger: 'change'
        },
        tenNXB:{
          required: true, message: 'Tên không được để trống', trigger: 'change'
        },
       
        
      },
      
    };
  },
  methods:{
    async showModal(id) {
      this.open = true
      if(id) {
        var res = await APIService.get(`/NhaXuatBan/${id}`)
        this.id = id
        this.nxb = res.data.data
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
          await APIService.put(`/NhaXuatBan/edit/${this.id}`,this.nxb) 
          this.$message.success('Cập nhật thông tin thành công')
        }
        else {
          await APIService.post("NhaXuatBan/Create",this.nxb)
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
<template>
  <div>
    <a-modal
      v-model:open="open"
      :title="id ? 'Cập nhật nhà xuất bản' : 'Thêm nhà xuất bản'"
      @ok="handleOk"
      @cancel="closeModal"
      width="100%"
      wrap-class-name="full-modal"
    >
      <a-form ref="formRef" :model="sanpham"  layout="vertical"  :rules="rules">
        <a-form-item ref="maNXB" label="Mã NXB" name="maNXB">
          <a-input v-model:value="sanpham.tenSach" />
        </a-form-item>
        <a-form-item ref="tenTacGia" label="Tên NXB" name="tenTacGia">
          <a-input v-model:value="sanpham.tenTacGia" />
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
      id: undefined,
      sanpham: {
        tenSach: '',
        tenTacGia:'', 

      },
    }
  },
  methods:{
    async showModal(id) {
      this.open = true
      if(id) {
        var res = await APIService.get(`/SanPham/${id}`)
        this.id = id
        this.nxb = res.data.data
      }
    },
    closeModal() {
      this.open = false
      this.id = undefined
      this.resetForm()
    },
  }
}
</script>

<style>

</style>
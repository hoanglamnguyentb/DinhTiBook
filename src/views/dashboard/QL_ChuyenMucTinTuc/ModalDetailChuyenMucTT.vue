<template>
    <div>
      <a-modal v-model:open="open" title="Thông tin chuyên mục" :footer="null">
        <a-form 
          ref="formRef" 
          :model="chuyenmuc" 
          :rules="rules" 
          layout="vertical">
          <a-form-item ref="maThongTin" label="Mã chuyên mục" name="maThongTin">
            <div>{{ chuyenmuc.maThongTin}}</div>
          </a-form-item>
          <a-form-item ref="giaTri" label="Tên chuyên mục" name="giaTri">
            <div>{{  chuyenmuc.giaTri}}</div>
          </a-form-item>
          <a-form-item ref="ghiChu" label="Ghi chú" name="ghiChu">
            <div>{{  chuyenmuc.ghiChu}}</div>
          </a-form-item>
          <a-form-item ref="thuTuHienThi" label="Thứ tự hiển thị" name="thuTuHienThi">
            <div>{{  chuyenmuc.thuTuHienThi}}</div>
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
        id: undefined,
        chuyenmuc: {
        },
      };
    },
    methods: {
      async showModal(id) {
        this.open = true
        if(id) {
          var res = await APIService.get(`/ThongTinDanhMuc/${id}`)
          this.id = id
          this.chuyenmuc = res.data.data
        }
      },
    }
  }
  
  </script>
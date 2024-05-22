<template>
    <div>
      
      <a-modal v-model:open="open" title="Thông tin danh mục" :footer="null">
        <a-form 
          ref="formRef" 
          :model="thongTinDanhMuc" 
          :rules="rules" 
          layout="vertical">
          <a-form-item ref="maThongTin" label="Mã thông tin" name="maThongTin">
            <div>{{ thongTinDanhMuc.maThongTin}}</div>
          </a-form-item>
          <a-form-item ref="maDanhMuc" label="Mã Danh mục" name="maDM">
            <div>{{ thongTinDanhMuc.maDanhMuc}}</div>
          </a-form-item>
          <a-form-item ref="tenDanhMuc" label="Tên Danh mục" name="tenDanhMuc">
            <div>{{  thongTinDanhMuc.tenDanhMuc}}</div>
          </a-form-item>
          <a-form-item ref="thuTuHienThi" label="Thứ tự hiển thị" name="thuTuHienThi">
            <div>{{  thongTinDanhMuc.thuTuHienThi}}</div>
          </a-form-item>
          <a-form-item ref="ghiChu" label="Ghi chú" name="ghiChu">
            <div>{{  thongTinDanhMuc.ghiChu}}</div>
          </a-form-item>
          <a-form-item ref="tepDinhKem" label="Tệp đính kèm" name="tepDinhKem">
            <div>{{  thongTinDanhMuc.tepDinhKem}}</div>
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
        thongTinDanhMuc: {
        },
      };
    },
    methods: {
      async showModal(id) {
        this.open = true
        if(id) {
          var res = await APIService.get(`/ThongTinDanhMuc/${id}`)
          this.id = id
          this.thongTinDanhMuc = res.data.data
        }
      },
    }
  }
  
  </script>
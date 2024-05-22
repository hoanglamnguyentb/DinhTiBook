<template>
    <div>
      <a-modal v-model:open="open" title="Thông danh mục" :footer="null">
        <a-form 
          ref="formRef" 
          :model="danhMuc" 
          :rules="rules" 
          layout="vertical">
          <a-form-item ref="maDanhMuc" label="Mã Danh mục" name="maDM">
            <div>{{ danhMuc.maDM}}</div>
          </a-form-item>
          <a-form-item ref="tenDanhMuc" label="Tên Danh mục" name="tenDanhMuc">
            <div>{{  danhMuc.tenDanhMuc}}</div>
          </a-form-item>
          <a-form-item ref="thuTuHienThi" label="Thứ tự hiển thị" name="thuTuHienThi">
            <div>{{  danhMuc.thuTuHienThi}}</div>
          </a-form-item>
          <a-form-item ref="ghiChu" label="Ghi chú" name="ghiChu">
            <div>{{  danhMuc.ghiChu}}</div>
          </a-form-item>
          <a-form-item ref="tepDinhKem" label="Tệp đính kèm" name="tepDinhKem">
            <div>{{  danhMuc.tepDinhKem}}</div>
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
        danhMuc: {
        },
      };
    },
    methods: {
      async showModal(id) {
        this.open = true
        if(id) {
          var res = await APIService.get(`/DanhMuc/${id}`)
          this.id = id
          this.danhMuc = res.data.data
        }
      },
    }
  }
  
  </script>
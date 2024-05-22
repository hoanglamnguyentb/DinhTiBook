<template>
  <div>
    <a-modal v-model:open="open" :title="id ? 'Cập nhật danh mục' : 'Thêm danh mục'" @ok="handleOk" @cancel="closeModal"
      :confirm-loading="isLoading">
      <a-form ref="formRef" :model="danhMuc" :rules="rules" layout="vertical">
        <a-form-item ref="ten" label="Tên danh mục" name="tenDanhMuc">
          <a-input v-model:value="danhMuc.tenDanhMuc" />
        </a-form-item>
        <a-form-item ref="thutu" label="Thứ tự hiển thị" name="thuTuHienThi">
          <a-input-number v-model:value="danhMuc.thuTuHienThi" />
        </a-form-item>
        <a-form-item ref="ma" label="Mã danh mục" name="maDM">
          <a-input v-model:value="danhMuc.maDM" />
        </a-form-item>

        <a-form-item ref="ghiChu" label="Ghi chú" name="ghiChu">
          <a-textarea v-model:value="danhMuc.ghiChu" />
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
      isLoading: false,
      open: false,
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
      id: undefined,
      danhMuc: {
        tenDanhMuc: '',
        thuTuHienThi: '',
        maDM: '',
        ghiChu: '',
        tepDinhKem: '',
      },
      rules: {
        tenDanhMuc: [
          {
            required: true,
            message: 'Tên danh mục là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 50,
            message: 'Độ dài từ 3-50',
            trigger: 'blur',
          },
        ],
        maDM: [
          {
            required: true,
            message: 'Mã danh mục là bắt buộc',
            trigger: 'change',
          },
          {
            min: 1,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
        thuTuHienThi: [

          {
            type: 'integer',
            message: 'Thứ tự hiển thị phải là một số nguyên',
            trigger: 'blur',
          }
        ],
        ghiChu: [
          { required: false }
        ]

      },
    };
  },
  methods: {
    async showModal(id) {
      this.open = true
      if (id) {
        var res = await APIService.get(`/DanhMuc/${id}`)
        this.id = id
        this.danhMuc = res.data.data
      }
    },
    closeModal() {
      this.open = false
      this.id = undefined
      this.resetForm()
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {

        var duplicateCategory = false
        var duplicateOrder = false
        if (this.id) {
          this.isLoading = true;
          var response = await APIService.put(`/DanhMuc/edit/${this.id}`, this.danhMuc)

          duplicateCategory = response.data.message == "Mã bị trùng" ? true : false;
          duplicateOrder = response.data.message == "Thứ tự hiển thị bị trùng" ? true : false;


        } else {
          this.isLoading = true;
          var response = await APIService.post("/DanhMuc/create", this.danhMuc)
          duplicateCategory = response.data.message == "Mã bị trùng" ? true : false;
          duplicateOrder = response.data.message == "Thứ tự hiển thị bị trùng" ? true : false;


        }
        if (duplicateCategory == false && duplicateOrder == false) {
          
          this.closeModal()
          this.$message.success("Thành công")  
          this.$emit('addSuccess')
         
        } else if (duplicateCategory) {
          this.isLoading = false
          this.$message.error("Trùng mã danh mục")
        } else {
          this.isLoading = false
          this.$message.error("Trùng thứ tự hiển thị")
        }



      }).catch(error => {
        console.log('error', error);
      }).finally(() => {
        this.isLoading = false;
      })
    },
    resetForm() {
      this.$refs.formRef.resetFields();
    },
  }
}

</script>
<template>
  <div>
    <a-modal v-model:open="open" :title="id ? 'Cập nhật chức năng': 'Thêm chức năng'" @ok="handleOk" @cancel="closeModal">
      <a-form 
        ref="formChucNang" 
        :model="chucNang" 
        :rules="rules" 
        :label-col="labelCol" 
        :wrapper-col="wrapperCol"
        >
        <a-form-item ref="tenChucNang" label="Tên chức năng" name="tenChucNang">
          <a-input v-model:value="chucNang.tenChucNang" />
        </a-form-item>
        <a-form-item ref="maChucNang" label="Mã chức năng" name="maChucNang">
          <a-input v-model:value="chucNang.maChucNang" />
        </a-form-item>
        <a-form-item ref="thuTu" label="Thứ tự" name="thuTu">
          <a-input-number style="width: 100%;" v-model:value="chucNang.thuTu" />
        </a-form-item>
        <a-form-item ref="trangThai" label="Trạng thái" name="trangThai">
          <a-radio-group v-model:value="chucNang.trangThai">
            <a-radio value="HIENTHI">Hiển thị</a-radio>
            <a-radio value="KHONGHIENTHI">Không hiển thị</a-radio>
          </a-radio-group>
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
      labelCol : {
        style: {
          width: '150px',
        },
      },
      wrapperCol : {
        span: 14,
      },
      id: undefined,
      chucNang: {
        icon: '',
      },
      rules: {
        tenChucNang: [
          {
            required: true,
            message: 'Tên chức năng là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
        maChucNang: [
          {
            required: true,
            message: 'Mã chức năng là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    async showModal(record) {
      this.open = true
      if(record) {
        this.chucNang = {...record}
        this.id = this.chucNang.id
      }
    },
    closeModal() {
      this.resetForm()
      this.id = undefined
      this.chucNang= {
        icon: '',
      }
    },
    handleOk() {
      this.$refs.formChucNang.validate().then(async () => {
        this.open = false
        if (this.id) {
          console.log(this.chucNang)
          await APIService.put(`/ChucNang/${this.id}`,this.chucNang) 
          this.$message.success('Cập nhật thành công')
        }
        else {
           await APIService.post("/ChucNang",this.chucNang)
           this.$message.success('Thêm chức năng thành công')
        }
        this.closeModal()
        this.$emit('addSuccess')
      }).catch(error => {
        console.log('error', error);
      });
    },
    resetForm() {
      this.$refs.formChucNang.resetFields();
    },
  }
}

</script>
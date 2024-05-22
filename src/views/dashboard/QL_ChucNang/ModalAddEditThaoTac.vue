<template>
  <div>
    <a-modal v-model:open="open" :title="id ? 'Cập nhật thao tác': 'Thêm thao tác'" @ok="handleOk" @cancel="closeModal">
      <a-form 
        ref="formRef" 
        :model="thaoTac" 
        :rules="rules" 
        :label-col="labelCol" 
        :wrapper-col="wrapperCol"
        >
        <a-form-item ref="tenThaoTac" label="Tên thao tác" name="tenThaoTac">
          <a-input v-model:value="thaoTac.tenThaoTac" />
        </a-form-item>
        <a-form-item ref="maThaoTac" label="Mã thao tác" name="maThaoTac">
          <a-input v-model:value="thaoTac.maThaoTac" />
        </a-form-item>
        <a-form-item ref="duongDan" label="Đường dẫn" name="duongDan">
          <a-input v-model:value="thaoTac.duongDan" />
        </a-form-item>
        <a-form-item ref="thuTu" label="Thứ tự" name="thuTu">
          <a-input-number style="width: 100%;" v-model:value="thaoTac.thuTu" />
        </a-form-item>
        <a-form-item ref="trangThai" label="Trạng thái" name="trangThai">
          <a-radio-group v-model:value="thaoTac.trangThai">
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
      thaoTac: {
        icon: '',
        chucNangId: this.$route.params.chucNangId
      },
      rules: {
        tenThaoTac: [
          {
            required: true,
            message: 'Tên thao tác là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
        maThaoTac: [
          {
            required: true,
            message: 'Mã thao tác là bắt buộc',
            trigger: 'change',
          },
          {
            min: 3,
            max: 20,
            message: 'Độ dài từ 3-20',
            trigger: 'blur',
          },
        ],
        duongDan: [
          {
            required: true,
            message: 'Đường dẫn là bắt buộc',
            trigger: 'change',
          },
        ],
      },
    };
  },
  methods: {
    async showModal(record) {
      this.open = true
      if(record) {
        this.thaoTac = {...record}
        this.id = this.thaoTac.id
      }
    },
    closeModal() {
      this.resetForm()
      this.id = undefined
      this.thaoTac= {
        icon: '',
        chucNangId: this.$route.params.chucNangId
      }
    },
    handleOk() {
      this.$refs.formRef.validate().then(async () => {
        this.open = false
        if (this.id) {
          console.log(this.thaoTac)
          await APIService.put(`/ThaoTac/${this.id}`,this.thaoTac) 
          this.$message.success('Cập nhật thành công')
        }
        else {
           await APIService.post("/ThaoTac",this.thaoTac)
           this.$message.success('Thêm thao tác thành công')
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
<template>
    <div>
        <a-modal v-model:open="open" :title="id ? 'Cập nhật thông tin' : `Thêm thông tin`" @ok="handleOk" :okeText="Lưu"
            @cancel="closeModal" :cancelText="Hủy" :confirm-loading="isLoading">
            <a-form ref="formRef" :model="thongTinDanhMuc" :rules="rules" layout="vertical">
                <!-- <a-form-item ref="ten"  label="Tên danh mục" :rules="rules.selectedDanhMuc">
                    <a-select style="width: 200px;" v-model:value="thongTinDanhMuc.maDanhMuc" autoClearSearchValue=true @change="handleChangeSelect">
                        <a-select-option v-for="item in lstDanhMuc" :key="item.maDM" :value="item.maDM">{{
            item.tenDanhMuc }}</a-select-option>
                    </a-select>
                </a-form-item> -->
                <div>
                    <a-form-item ref="ma" label="Mã thông tin" name="maThongTin">
                        <a-input v-model:value="thongTinDanhMuc.maThongTin" />
                    </a-form-item>
                    <a-form-item ref="thutu" label="Thứ tự hiển thị" name="thuTuHienThi">
                        <a-input-number v-model:value="thongTinDanhMuc.thuTuHienThi" />
                    </a-form-item>

                </div>

                <a-form-item ref="giaTri" label="Giá trị" name="giaTri">
                    <a-textarea v-model:value="thongTinDanhMuc.giaTri" />
                </a-form-item>
                <a-form-item ref="ghiChu" label="Ghi chú" name="ghiChu">
                    <a-textarea v-model:value="thongTinDanhMuc.ghiChu" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import APIService from "@/helpers/ApiService"
import ThongTinDanhMuc from "./ThongTinDanhMuc.vue";

export default {
    // created() {
    //     this.getListDropdownDM()
    // },

    data() {
        return {

            defaultDM: '',
            lstDanhMuc: [],
            // selectedDanhMuc: null,
            isLoading: false,
            open: false,
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 14,
            },
            id: undefined,
            thongTinDanhMuc: {
                maThongTin: '',
                maDanhMuc: this.defaultDM,
                tenDanhMuc: '',
                thuTuHienThi: '',
                giaTri: '',
                ghiChu: '',
                tepDinhKem: '',
            },
            rules: {
                // selectedDanhMuc: [

                //     { required: true, message: 'Vui lòng chọn một danh mục', trigger: 'change' },
                // ],
                maThongTin: [
                    {
                        required: true,
                        message: 'Mã thông tin danh mục là bắt buộc',
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
        async showModal(maDanhMuc, id) {
            this.open = true
            if (id) {
                console.log(this.id)
                var res = await APIService.get(`/ThongTinDanhMuc/${id}`)
                this.id = id
                console.log(this.id)
                this.thongTinDanhMuc = res.data.data
            }
            if (maDanhMuc) {
                this.defaultDM = maDanhMuc
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
                    var response = await APIService.put(`/ThongTinDanhMuc/edit/${this.id}`, this.thongTinDanhMuc)

                    duplicateCategory = response.data.message == "Mã bị trùng" ? true : false;
                    duplicateOrder = response.data.message == "Thứ tự hiển thị bị trùng" ? true : false;


                } else {
                    this.thongTinDanhMuc.maDanhMuc = this.defaultDM
                    this.isLoading = true;
                    var response = await APIService.post("/ThongTinDanhMuc/create", this.thongTinDanhMuc)
                    duplicateCategory = response.data.message == "Mã bị trùng" ? true : false;
                    duplicateOrder = response.data.message == "Thứ tự hiển thị bị trùng" ? true : false;


                }
                if (duplicateCategory == false && duplicateOrder == false) {

                    this.closeModal()
                    this.$message.success("Thành công")
                    this.$emit('addSuccess')

                } else if (duplicateCategory) {
                    this.isLoading = false
                    this.$message.error("Trùng mã thông tin danh mục")
                } else {
                    this.isLoading = false
                    this.$message.error("Trùng thứ tự hiển thị")
                }
                // this.$emit('select-DanhMuc', this.thongTinDanhMuc.maDanhMuc)
                // console.log('Danh mục vừa được chọn: ', this.thongTinDanhMuc.maDanhMuc)
            }).catch(error => {
                console.log('error', error);
            }).finally(() => {
                this.isLoading = false;
            })
        },
        resetForm() {
            this.$refs.formRef.resetFields();
            this.thongTinDanhMuc = {
                maThongTin: '',
                maDanhMuc: '',
                tenDanhMuc: '',
                thuTuHienThi: '',
                giaTri: '',
                ghiChu: '',
                tepDinhKem: '',
            }
        },
        // async getListDropdownDM() {
        //     try {
        //         // Gọi API để lấy danh sách các danh mục từ cơ sở dữ liệu
        //         const response = (await APIService.get('/DanhMuc/GetDataByPage')).data;
        //         this.lstDanhMuc = response.data.items
        //     } catch (error) {
        //         console.error('Error fetching categories:', error);
        //     }
        // }
    },

}

</script>
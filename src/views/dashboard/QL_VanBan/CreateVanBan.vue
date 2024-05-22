<template>
    <PageHeader :title="title" :items="items"/>
    <a-card style="padding: 0;">
    <a-form layout="vertical"
      :model="post"
      name="basic"
      ref="formRef"
      :rules ="rules">
     <h3>1.THÔNG TIN VĂN BẢN</h3>
          <a-row :gutter="[24]">
            <a-col :span="12">
              <a-form-item ref="title" label="Thứ tự văn bản" name="thutu">
                <a-input v-model:value="post.tt"></a-input>
                
              </a-form-item>
              <a-form-item label="Tên văn bản" name="tenvanban">
                <a-input v-model:value="post.nameText"></a-input>
              </a-form-item>
              <a-form-item ref="title" label="Số hiệu văn bản" name="sohieu">
                <a-input v-model:value="post.number"></a-input>
              </a-form-item>
              <div>
                <label for="datepicker-publish-input" class="form-label">Ngày có hiệu lực</label>
                <flat-pickr v-model:value="post.effectiveDate" :config="datetimeConfig" placeholder="Chọn ngày có hiệu lực" class="form-control"></flat-pickr>
              </div>
              <a-form-item style="margin-top: 20px;" ref="title" label="Ban hanh bởi" name="banhanh">
                <a-input v-model:value="post.agencyIssued"></a-input>
              </a-form-item>  
            </a-col>
            <a-col :span="12">
              <a-form-item name="trangthai">
              <label for="TieuDe">Trạng thái:</label>
              <a-select
                
                v-model:value="post.status"
                placeholder="Chọn trạng thái"

                :options="[
                { value: 'Bản nháp', label: 'bản nháp' },
                { value: 'Xuất bản', label: 'Xuất bản' },
                { value: 'Gỡ bỏ', label: 'Gỡ bỏ' },
              ]"
              >
              </a-select>
            </a-form-item>
              <a-form-item name="loaivanban">
              <label for="TieuDe">Loại văn bản:</label>
              <a-select
                v-model:value="post.documentType"
                placeholder="Chọn loại văn bản"
                :options="[
                { value: 'Nghị quyết', label: 'Nghị quyết' },
                { value: 'Thông tư', label: 'Thông tư' },
                { value: 'Công điện', label: 'Công điện' },
                { value: 'Quyết định', label: 'Quyết định' },
                { value: 'Nghị định', label: 'Nghị định' },
              ]"
              >
              </a-select>
            </a-form-item>
              <div style="margin-top: 15px;">
              <label for="datepicker-publish-input" class="form-label">Ngày ban hành</label>
              <flat-pickr v-model:value="post.publicDate" :config="datetimeConfig" placeholder="Chọn ngày có hiệu lực" class="form-control"></flat-pickr>
            </div>
            <a-form-item label="Tài liệu" style="margin-top: 20px;">
              <FileManager
                :active="showFileManager"
                :showButton="true"
                :showPreview="true"
                :closable="false"
                :maxCount="1"
                :multiple="false"
                :accept="acceptType"
                @select-file="handleSelectFile_DinhKem"
              />
            </a-form-item>
              
            </a-col>
          </a-row>
       
        <h3 style="margin-top: 30px">2.NỘI DUNG & TRÍCH DẪN VĂN BẢN</h3>
        <a-card-body>
          <a-col>
            <div class="mt-2">
              <label>Trích dẫn</label>
              <a-textarea class="form-control" v-model:value="post.trichDan" placeholder="" rows="3"></a-textarea>
            </div>
            <a-form-item >
              <label>Nội dung văn bản</label>
              <QuillEditor 
                style="height: 300px;"
                theme="snow" 
                :options="editorOptions"
                v-model:content="post.content"
                content-type="html" />
              </a-form-item>
          </a-col>
        </a-card-body>
    </a-form>
    <a-row style="margin: 50px 0px">
    <a-col :span="24">
      <a-flex justify="center">
        <a-button @click="handleOk" size="large" type="success">Hoàn thành</a-button>
      </a-flex>
    </a-col>
  </a-row>
  </a-card>

  </template>
  
  <script>
  import { ref } from "vue";
  import Multiselect from "@vueform/multiselect";
  import "@vueform/multiselect/themes/default.css";
  import DropZone from "@/components/widgets/dropZone";
  import useVuelidate from "@vuelidate/core";
  import { required, helpers } from '@vuelidate/validators';
  import flatPickr from "vue-flatpickr-component";
  import "flatpickr/dist/flatpickr.css";
  import appConfig from "../../../../app.config";
  import PageHeader from "@/components/page-header";
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import FileManager from "@/components/FileManager";
  import APIService from "@/helpers/ApiService";
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';
  
  export default {
    name: 'YourComponentName',
    components: {
      DropZone,
      PageHeader,
      Multiselect,
      flatPickr,
      QuillEditor,
      FileManager
    },
    data(){
      return{
        //   rules:{
        //     tenvanban:{
        //       required: true, message: 'Tên văn bản không được để trống', trigger: 'change'
        //     },
        //     sohieu:{
        //       required: true, message: 'Số hiệu không được để trống', trigger: 'change'
        //     },
        //     banhanh:{
        //       required: true, message: 'Cơ quan ban hành không được để trống', trigger: 'change'
        //     },
        //     trangthai:{
        //       required: true, message: 'Trạng thái không được để trống', trigger: 'change'
        //     },
        //     loaivanban:{
        //       required: true, message: 'Loại văn bản không được để trống', trigger: 'change'
        //     },
        //     thutu:{
        //       required: true, message: 'Thứ tự văn bản không được để trống', trigger: 'change'
        //     }

        // }
        post: {
          nameText: "",
          number: "",
          effectiveDate: new Date(),
          agencyIssued: "",
          publicDate: new Date(),
          status: undefined,
          documentType: "",
          document: "",
          trichDan: "",
          content: "",
          fileDinhKem:"",
        },
      }
      
      
      
    },
    setup() {
      return {
        v$: useVuelidate(),
        title: "Thêm mới văn bản",
        items: [
          { text: "Văn Bản", href: "/Van-ban" },
          { text: "thêm mới văn bản", active: true }
        ],
        editorOptions: {
          modules: {
            toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], // toggled buttons
              ["blockquote", "code-block"],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // superscript/subscript
              [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
              [{ direction: "rtl" }], // text direction

              [{ size: ["small", false, "large", "huge"] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],
              ["link", "fileManager"],
              ["clean"], // remove formatting button
            ],
            handlers: {
              fileManager: function (e) {
                console.log(e, 'sadsa')
                
                
              },
            },
          },
          },
          placeholder: 'Nhập nội dung văn bản...',
          theme: 'snow'
        },
        datetimeConfig: {
          dateFormat: "d/m/Y",
        },
       
        submitted: false,
        showFileManager: false,
        errMessage: null,
        isLoading: false,
        acceptType: ['image/png', 'image/jpg', 'image/jpeg']
      };
    },
    methods: {
      async onSubmit() {
        
        // this.v$.$touch();
        // const result = await this.v$.$validate();
        // if (!result) {
        //   this.isLoading = false;
        //   return;
        // }
        try {
          await APIService.post("VanBan/create", this.post);
          toast.success("Thêm văn bản thành công", { theme: "colored", autoClose: 2000 });
        } catch (e) {
          this.submitted = false;
          this.isLoading = false;
          if (e.status == 401) {
            toast.error("Bạn không có quyền truy cập.", { theme: "colored", autoClose: 2000 });
          } else {
            if (e.data && e.data.Message) {
              this.errMessage = e.data.Message;
              toast.error(e.data.Message, { theme: "colored", autoClose: 2000 });
            } else {
              toast.error("Thêm mới văn bản thất bại. Vui lòng thử lại sau.", { theme: "colored", autoClose: 2000 });
            }
          }
        }
       
      },
      handleSelectFile_DinhKem(data){
      this.post.fileDinhKem = data.name;
      console.log('file',this.post.fileDinhKem);
    },
      handleOk(){
        this.$refs.formRef.validate().then(async () => {
          try {
          await APIService.post("VanBan/create", this.post);
          toast.success("Thêm văn bản thành công", { theme: "colored", autoClose: 2000 });
        } catch (e) {
          this.submitted = false;
          this.isLoading = false;
          if (e.status == 401) {
            toast.error("Bạn không có quyền truy cập.", { theme: "colored", autoClose: 2000 });
          } else {
            if (e.data && e.data.Message) {
              this.errMessage = e.data.Message;
              toast.error(e.data.Message, { theme: "colored", autoClose: 2000 });
            } else {
              toast.error("Thêm mới văn bản thất bại. Vui lòng thử lại sau.", { theme: "colored", autoClose: 2000 });
            }
          }
        }
      });
        }
    },
    validations() {
      return {
        post: {
          nameText: {
            required: helpers.withMessage("Tên văn bản không được để trống", required),
          },
          number: {
            required: helpers.withMessage("Số hiệu không được để trống", required),
          },
          effectiveDate: {
            required: helpers.withMessage("Ngày có hiệu lực không được để trống", required),
          },
          agencyIssued: {
            required: helpers.withMessage("cơ quan ban hành không được để trống", required),
          },
          publicDate: {
            required: helpers.withMessage("vui lòng chọn ngày ban hành", required),
          },
          status: {
            required: helpers.withMessage("vui lòng chọn trạng thái", required),
          },
          documentType:{
            required: helpers.withMessage("vui lòng chọn loại tài liệu", required),
          },
          Document:{
            required: helpers.withMessage("không để trống tài liệu", required),
          },
          content:{
            required: helpers.withMessage("không để trống nội dung", required),
          },
          trichDan:{
            required: helpers.withMessage("không để trống trích dẫn", required),
          },
          fileDinhKem:{
            required: helpers.withMessage("không để trống file", required),
          },

        }
      }
    }
  }
  </script>
  
  <style>

  </style>
  
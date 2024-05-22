<script>
import { ref, watch } from 'vue';
import appConfig from "../../../../app.config"
import PageHeader from "@/components/page-header"
import Layout from "../../../layouts/main.vue";
import APIService from '../../../helpers/ApiService';
import DropZone from "@/components/widgets/dropZone";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
    export default {
        page: {
            title: "Import tin tức",
            meta: [
                {
                    name: "Import tin tức",
                    content: appConfig.description
                }
            ]
        },
        setup() {
            let configImport = ref({})
            let files = ref([]);
            let dropzoneFile = ref("");
            const drop = (e) => {
                dropzoneFile.value = e.dataTransfer.files[0];
                files.value[0] = dropzoneFile.value;
            };
            const selectedFile = (e) => {
                dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
                files.value[0] = e.target.files[0];
            };
            watch(
                () => [...files.value],
                (currentValue) => {
                    return currentValue;
                }
            );
            return {
                configImport,
                drop,
                selectedFile,
                files
            }
        },
        data() {
            return {
                title: "Import tin tức",
                items: [{
                    text: "Tin tức",
                    href: "/tin-tuc",
                },
                {
                    text: "Import tin tức",
                    active: true,
                },],
            }
        },
        beforeMount() {
            APIService.get('/tinh/import')
            .then(rs => {
                this.configImport.value = rs.data.data.config
            })
            .catch(err => {
                console.log(err);
            });
        },
        methods: {
           
            deleteRecord(ele) {
                ele.target.parentElement.parentElement.parentElement.remove();
            },
            async OnSubmit() {
                let formData = new FormData();
                formData.append('fileImport', this.files[0]);
                APIService.post('/TinTuc/importv1', formData)
                    .then(response => {
                        if(response.status == 200) {
                            this.files.shift()

                            toast.success("Import thành công",{
                                "theme": "colored",
                                autoClose: 2000
                            });
                        } else {
                            toast.error("Lỗi xử lý",{
                                "theme": "colored",
                                autoClose: 2000
                            });
                        }
                    })
                    .catch(error => {
                        toast.success("Có lỗi" + error,{
                                "theme": "colored",
                                autoClose: 2000
                        });
                    });
                
            }
        },
        

        components: {
            PageHeader,
            Layout,
            DropZone,
            
        }
    }
</script>

<template>
   <Layout>
    <PageHeader :title="title" :items="items" />
    <form @submit.prevent="OnSubmit" enctype="multipart/form-data">
        <!-- <div class="row mb-3" v-for="(item, index) in configImport.value" :key="index">
            <div class="col-lg-3">
                <label for="{{ item.nameprop }}" class="form-label">{{ item.displayname }}</label>
            </div>
            <div class="col-lg-9">
                <input type="text" class="form-control" :value="item.column" id="nameInput" placeholder="Chọn cột cấu hình">
            </div>
        </div> -->

        <!-- <div class="row mb-3">
            <div class="col-lg-3">
                <label for="startRow" class="form-label">Dòng bắt đầu</label>
            </div>
            <div class="col-lg-3">
                <input type="number" class="form-control" id="startRow" placeholder="Nhập dòng bắt đầu">
            </div>
        </div> -->
        <b-card-body>
              <div class="vstack gap-2">
                <DropZone @drop.prevent="drop" @change="selectedFile" />

                <div class="border rounded" v-for="(file, index) of files" :key="index">
                  <div class="d-flex align-items-center p-2">
                    <div class="flex-grow-1">
                      <div class="pt-1">
                        <h5 class="fs-14 mb-1" data-dz-name="">
                          {{ file.name }}
                        </h5>
                        <p class="fs-13 text-muted mb-0" data-dz-size="">
                          <strong>{{ (file.size / 1024).toFixed() }}</strong> KB
                        </p>
                        <strong class="error text-danger" data-dz-errormessage=""></strong>
                      </div>
                    </div>
                    <!-- <div class="flex-shrink-0 ms-3">
                      <b-button data-dz-remove="" variant="danger" size="sm" @click="deleteRecord">
                        <i class="bx bx-trash" />
                      </b-button>
                    </div> -->
                  </div>
                </div>

              </div>
            </b-card-body>
            
        <div class="text-end">
            <button type="submit" class="btn btn-primary">Import</button>
        </div>
    </form>
  </Layout>
</template>
<style lang="scss" scoped>

</style>








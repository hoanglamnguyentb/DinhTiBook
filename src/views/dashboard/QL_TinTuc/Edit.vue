<template></template>

<script>
import { ref, watch } from "vue";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import appConfig from "../../../../app.config";

import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import FileManager from "@/components/FileManager";
import APIService from "@/helpers/ApiService";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import PageHeader from "@/components/page-header";
export default {
  page: {
    title: "Quản lý tin tức",
    meta: [
      {
        name: "Quản lý tin tức",
        content: appConfig.description,
      },
    ],
  },
  components: {
    PageHeader,
  },
  data() {
    return {
        title: "Thêm mới tin tức",
        items: [
        {
          text: "Tin tức",
          href: "/tin-tuc",
        },
        {
          text: "Thêm mới tin tức",
          active: true,
        },
        
      ],  
      datetimeConfig: {
        dateFormat: "d/m/Y",
      },
      editorOptions: {
        modules: {
            toolbar: {
                
            }
        }
      }
    };
  },
};
</script>

<style>
</style>
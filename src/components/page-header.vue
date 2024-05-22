<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    items: {
      type: Array,
      default: () => {
        return [];
      },
    },
    backRoute: {
      type: [Object, String],
      default: undefined
    },
  },
  methods: {
    goBack () {
      if (this.backRoute) {
        if (this.backRoute === ' ') {
          this.$router.go(-1)
        } else {
          this.$router.push(this.backRoute)
        }
      } else {
        this.$router.go(-1)
      }
    }
  }
};
</script>

<template>
  <b-row>
    <b-col cols="12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">

        <div class="d-flex align-items-center">
          <b-link @click="goBack" v-if="backRoute">
          <i class="mdi mdi-arrow-left mdi-24px"></i>
          </b-link>
        <h4 class="mb-sm-0">{{ title }}</h4>

        </div>

        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item" v-for="(item, index) in items" :key="index" :class="{ active: item[0] }">
              <b-link href="javascript: void(0);">{{ item.text }}</b-link>
            </li>
          </ol>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

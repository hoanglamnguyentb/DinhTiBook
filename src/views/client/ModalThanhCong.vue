<template>
  <a-modal
    v-model:open="open" 
    @ok="handleOk"
    @cancel="closeModal">
    <h2>jii</h2>

  </a-modal>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  methods:{
    async showModal() {
      this.open = true
    },
    handleOk() {
      this.open = false
      this.$store.commit('clearCart');
      this.$router.push('/'); 
    },
  }
}
</script>

<style>

</style>
<template>
  <router-view></router-view>
  <ChatBox></ChatBox>
</template>

<script>
import ChatBox from '@/components/ChatBox';

export default {
  name: 'App',
  components: {
    ChatBox,
  },
  async mounted() {
    await this.$store.commit('initialiseStore');
  },
};
</script>

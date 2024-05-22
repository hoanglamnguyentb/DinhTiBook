<script>
import { layoutComputed } from "@/state/helpers";

import Vertical from "./vertical";
import Horizontal from "./horizontal";
import TwoColumns from "./twocolumn";

export default {
    components: {
        Vertical,
        Horizontal,
        TwoColumns
    },
    data() {
        return {};
    },
    computed: {
        ...layoutComputed,
    },
    mounted() {
        // document.querySelector("html").setAttribute('dir', 'rtl');
    }
};
</script>

<template>
    <div>
        <Vertical v-if="layoutType === 'vertical'" :layout="layoutType">
            <router-view />
        </Vertical>

        <Horizontal v-if="layoutType === 'horizontal'" :layout="layoutType">
            <router-view/>
        </Horizontal>

        <TwoColumns v-if="layoutType === 'twocolumn'" :layout="layoutType">
            <router-view/>
        </TwoColumns>
    </div>
</template>

<style>
.router-animation-enter-active {
  animation: coming 0.2s;
  animation-delay: 0.1s;
  opacity: 0;
}
.router-animation-leave-active {
  animation: going 0.2s;
}

@keyframes going {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(0, 4%, 0) scale(0.93);
    opacity: 0;
  }
}
@keyframes coming {
  from {
    transform: translate3d(0, 4%, 0) scale(0.93);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
}
@keyframes slideLeftTransition {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>

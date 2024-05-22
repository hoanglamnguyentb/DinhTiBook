import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core'

export const useFmgStore = defineStore('fmg', {
    state: () => {
        return {
            layoutType: useLocalStorage("fmgLayoutType", "grid"),
            styleType : useLocalStorage("fmgStyleType", "hinet-files-view-grid"),
        }
        // layoutType: "grid",
        // styleType : "hinet-files-view-grid"
    },
    getters: {
        getLayoutType: state => state.layoutType,
        getStyleType: state => state.styleType
    },
    
    actions: {
        changeLayoutType(layoutType) {
            this.layoutType = layoutType
        },
        changeStyleType(styleType) {
            this.styleType = styleType
        },
    }
})
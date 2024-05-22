<template>
    <div>
        <h5>HUYEN</h5>
        <GroupButton :groupButtons="options" /> 
    </div>
</template>

<script>
    import GroupButton from '@/components/Button/GroupButton.vue';
    export default {
        components:{
            GroupButton
        },
        data(){
            return {
                options: [
                    {
                    title: "Weekly",
                    },
                    {
                    title: "Monthly",
                    },
                    {
                    title: "Yearly",
                    },
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
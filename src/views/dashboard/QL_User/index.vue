<template>
    <div>
        User
    </div>
    <a-layout>
        <a-layout-content style="padding: 24px; min-height: 280px;">
          <a-card title="User Profile">
            <!-- <a-avatar :src="user.avatar" size="large" /> -->
            <a-typography.Title>11111111111</a-typography.Title>
            <a-typography.Paragraph>111111111112</a-typography.Paragraph>
          </a-card>
    
          <a-card title="Recent Posts">
            <!-- <a-list
              bordered
              dataSource="user.posts"
              renderItem="post => ()"
            /> -->
                <a-list-item>
                  <!-- <a-list-item-meta
                    title="{ post.title }"
                    description="{ post.date }"
                  /> -->
                  <a-typography.Paragraph>{ post.content }</a-typography.Paragraph>
                </a-list-item>
              
          </a-card>
        </a-layout-content>
      </a-layout>
</template>

<script>
    export default {
        data() {
    return {
      
    };
    },
}
</script>

<style lang="scss" scoped>

</style>
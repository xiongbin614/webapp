<template>
    <section class="app-main">
        <router-view  />
    </section>
</template>

<script>
    export default {
        name: "AppMain"
    }
</script>

<style scoped>
    .app-main {
        padding:20px;
        box-sizing: border-box;
    }
</style>
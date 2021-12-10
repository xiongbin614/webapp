<template>
    <div class="chart-container">
        <div class="box">
            角色
        </div>
    </div>
</template>

<script>
    export default {
        name: "role"
    }
</script>

<style scoped>
    .chart-container {
        position: relative;
        width: 100%;
        height: calc(100vh - 130px);
    }
    .box {
        width: 100%;
        height: 100%;
        background: red;
    }
</style>
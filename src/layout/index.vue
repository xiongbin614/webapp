<template>
    <div class="app-wrapper">
        <!--             <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />-->
        <!-- 左侧边栏 -->

        <Sidebar class="sidebar-container"/>
        <div class="main-container">
            <div :class="{'fixed-header':fixedHeader}">
                <!--                     头部 -->
                <navbar/>
                <!-- 导航条 -->
                <tags-view/>

            </div>
            <app-main/>
        </div>
    </div>
</template>

<script>
    import {Sidebar, navbar} from './components'
    import appMain from './components/AppMain'
    import tagsView from './components/tagsView'

    export default {
        name: "index",
        components: {
            Sidebar,
            navbar,
            appMain,
            tagsView
        },
        data() {
            return {
                fixedHeader: false,
            }
        }
    }
</script>


<style lang="scss" scoped>
   // @import "./src/styles/mixin";
    @import "./src/styles/variables.scss";

    .app-wrapper {
        display: flex;
        height: 100%;
    }

    .sidebar-container {
        height: 100%;
    }
</style>

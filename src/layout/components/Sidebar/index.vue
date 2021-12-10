<template>
    <div class="box height">
            <el-scrollbar  wrap-class="scrollbar-wrapper height">
                <el-menu
                        style="height: 100%"
                        class="el-menu-vertical-demo height"
                        :default-active="activeMenu"
                        :collapse="isCollapse"
                        :background-color="variables.menuBg"
                        :text-color="variables.menuText"
                        :unique-opened="false"
                        :active-text-color="variables.menuActiveText"
                        :collapse-transition="true"
                        mode="vertical"
                        router
                >
                   <el-menu-item index="/Home">
                       <i class="el-icon-document"></i>
                       <span slot="title">首页</span>
                   </el-menu-item>
                   <el-submenu index="/system">
                       <template slot="title">
                           <i class="el-icon-location"></i>
                           <span slot="title">系统管理</span>
                       </template>
            <el-menu-item index="/system/user">用户管理</el-menu-item>
            <el-menu-item index="/system/role">角色管理</el-menu-item>
                    </el-submenu>
                   <el-menu-item index="/about">
                       <i class="el-icon-menu"></i>
                      <span slot="title">关于</span>
                 </el-menu-item>
                    <!-- <SidebarItem v-for="(item, index) in routes" :parentUrl="item.path" :opt="item" :key="index"></SidebarItem> -->
                </el-menu>
            </el-scrollbar> 
    </div>
</template>

<script>
    import variables from '@/styles/variables.scss';
    //import SidebarItem from "./SidebarItem";
    export default {
        name: "index",
        data () {
            return {
                sidebar: {
                    opened:true
                }
            }
        },
        components: {
            // SidebarItem
        },
        computed: {
            routes () {
                return this.$router.options.routes.filter(item => !item.hidden)
            },
            variables() {
                return variables
            },
            activeMenu() {
                const route = this.$route
                var {path} = route
                return path
            },
            isCollapse() {
                return this.$store.state.app.sidebar.opened
            }
        }
    }
</script>

<style scoped >
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;

    }

    .height {
        height: 100%;
    }
    /deep/.el-scrollbar  {
        height: 100%;
    }
</style>
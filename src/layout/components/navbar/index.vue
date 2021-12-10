<template>
        <div class="navbar">
            <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" /> -->
            <i id="hamburger-container"  :class="[ active? 'el-icon-s-unfold': 'el-icon-s-fold' ]" @click="handleClick"></i>
            <div class="btn">
                <el-button  type="primary" @click="outLogin" size="mini">退出</el-button>
            </div>
        </div>
</template>

<script>
    export default {
        name: "index",
        data () {
           return {
           }
        },
        computed: {
            active () {
                return this.$store.state.app.sidebar.opened
            }
        },
        methods: {
            outLogin () {
                this.$router.push('/')
            },
            handleClick () {
                this.$store.dispatch('toggleSideBar')
            }
        },
        components:{

        }
    }
</script>

<style lang="scss" scoped>
    .navbar {
        height: 50px;
        overflow: hidden;
        position: relative;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0,21,41,.08);

        #hamburger-container {
            line-height: 46px;
            height: 100%;
            font-size: 28px;
            float: left;
            margin-left: 10px;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color:transparent;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .btn {
            float: right;
            height: 100%;
            line-height: 50px;
            margin-right: 50px;
        }
    }
</style>

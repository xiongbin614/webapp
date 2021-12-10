<template>
   <div>
       <el-submenu :index="parentUrl" v-if="opt.children.length > 1 ">
           <template slot="title" class="list">
               {{opt.meta.title}}</template>
           <div v-for="(item, index) in opt.children" :key="index">
               <el-menu-item :index="parentUrl+'/'+ item.path" >
                   <template class="list">
                       {{item.meta.title}}
                   </template>
               </el-menu-item>
           </div>
       </el-submenu>
       <el-menu-item :index="parentUrl+'/index'" v-if="opt.children.length == 1">
           <template class="list">
               {{opt.children[0].meta.title}}
           </template>
       </el-menu-item>

   </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        props: {
           opt: Object,
           parentUrl: String
        },
        created() {
            console.log(this.parentUrl);
        },
        computed: {

          },
        data() {
            return {

            }
        }
    }
</script>

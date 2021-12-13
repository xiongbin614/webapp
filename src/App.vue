<template>
  <div id="app">
    <el-button type="primary" @click="addProcess">新增流程</el-button>
    <div class="process" v-for="(k,j) in processList" :key="j">
      <div class="processOne">
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <el-input placeholder="请输入内容" v-model="k.name" />
          <el-button type="warning" style="margin-right:16px;margin-bottom:10px" slot="reference">{{k.name}}<i class="el-icon-edit"></i></el-button>
        </el-popover>
        <el-button type="danger" plain size="mini" @click="delProcess(j)">删除流程</el-button>
        <el-button type="primary" plain size="mini"  @click="addGx(k.name)">新增工序</el-button>
      </div>
      <div class="processTwo">
        <!-- <el-card :name='k.name' style="margin-right:20px; width:11%;margin-bottom:5px" v-for="(item, i) in k.list" :key="i"> -->
        <el-card :name='k.name' style="width:11%;margin-bottom:5px;height:100px" v-for="(item, i) in k.list" :key="i">
        <div slot="header">
          <div style="text-align: center;margin-bottom:5px">{{item.name}}</div>
          <div  style="text-align: center;">
            <el-popover
              placement="right"
              width="400"
              trigger="click">
              <el-input placeholder="请输入内容" v-model="item.name" />
                <i class="el-icon-edit" slot="reference"></i>
            </el-popover>
            <el-popconfirm
              title="确定删除该工序吗？"
              @onConfirm="delGx(k.list, i)"
            >
               <i  slot="reference" class="el-icon-delete" style="margin-left:8px" />
            </el-popconfirm>
          </div>
        </div>
        <div @click="clickGx(item.list)" style="text-align: center">
          <span v-if="item.list && item.list.length === 0" style="font-size: 12px; color: #ccc;">请新增员工名字</span>
          <el-tag :effect="o === name1 ? 'dark': 'plain'" size='mini' @click.stop="seledPelClick1(item, o)" v-else style="margin-right:5px" 
          v-for="o in item.list" @close="removeSledPel(item.list, o)"  :key="o">{{o}}</el-tag>
        </div>
        <!-- <draggable @click="clickGx" @end='onEnd'  :value="item.list" :class="item.name" :group='{name: "o", put: true}' style="text-align: center">
          <span v-if="item.list && item.list.length === 0" style="font-size: 12px; color: #ccc;">请将下面员工名字拖到此处</span>
          <el-tag size='mini' v-else style="margin-right:5px" v-for="o in item.list"  :key="o">{{o}}</el-tag>
        </draggable> -->
        </el-card>
      </div>
    </div>
    
    <div class="peopleflex">
      <el-card style="margin-right:16px">
        <div slot="header">
          <el-button type="primary" @click="dialogVisible = true; form.list = ''">新增人员</el-button>
        </div>
        <div @click="clickTopel">
          <span v-if="peopleList && peopleList.length === 0" style="font-size: 12px; color: #ccc;">请先点击上面新增人员按钮新增人员</span>
          <el-tag v-else @click="seledPelClick(item)" type="success" 
          @close="handleClose(item)" :disable-transitions="false" 
          :effect="item === name ? 'dark': 'plain'"
          closable style="margin-right:5px" v-for="item in peopleList" 
          :key="item">{{item}}</el-tag>
        </div>
        <!-- <draggable :value="peopleList" @end='onEnd'  class="people" :group='{name: "item", put: true}'>
          <span v-if="peopleList && peopleList.length === 0" style="font-size: 12px; color: #ccc;">请先点击上面新增人员按钮新增人员</span>
          <el-tag v-else @click="seledPelClick(item)" type="success" 
          @close="handleClose(item)" :disable-transitions="false" 
          :effect="item === name ? 'dark': 'plain'"
          closable style="margin-right:5px" v-for="item in peopleList" 
          :key="item">{{item}}</el-tag>
        </draggable> -->
      </el-card>
    </div>
    <!-- 新增流程弹窗 -->
    <el-dialog
      title="新增人员"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form label-position="right" label-width="90px" :model="form">
        <el-form-item label="人员名字">
          <template slot="label">
                    <span style="position:relative">
                        <span>人员名字</span>
                        <el-tooltip class="item" effect="dark"  placement="top">
                          <div slot="content">
                            <p>温馨提示：输入多个名字请以英文,隔开，并且所有名字不能重名</p>
                          </div>
                          <i class="el-icon-question table-msg" />
                      </el-tooltip>
                    </span>
            </template>
          <el-input type="textarea" v-model="form.list"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="suerAddPeople">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import draggable from 'vuedraggable'
export default {
  name:'app',
  data() {
    return {
      item1: {}, // 信息选中工序名字
      name: '',
      name1: '',
      dialogVisible: false,
      processList: [],
      form: {
        list: ''
      },
      peopleList:[]
    }
  },
  components: {
    // draggable
  },
  watch: {
    processList: {
      handler(v) {
        window.localStorage.setItem('processList', JSON.stringify(v))
      },
      deep: true
    },
    peopleList: {
      handler(v) {
        window.localStorage.setItem('peopleList', JSON.stringify(v))
      },
      deep: true
    }
  },
  mounted() {
    if (!window.localStorage.getItem('processList')) {
      let processList = [ {  name: '装配线1',
          list: [ {name: '工序1', list: []},
            {name: '工序2', list: []},
            {name: '工序3', list: []},
            {name: '工序4', list: []},
            {name: '工序5', list: []},
            {name: '工序6', list: []},
            {name: '工序7', list: []},
            {name: '工序8', list: []},
            {name: '工序9', list: []}]}]
      this.processList = processList
      window.localStorage.setItem('processList', JSON.stringify(processList))
    } else {
      this.processList = JSON.parse(window.localStorage.getItem('processList'))
    }
    if (window.localStorage.getItem('peopleList')) {
      this.peopleList = JSON.parse(window.localStorage.getItem('peopleList'))
    }
  },
  methods: {
    clickTopel() {
      if (this.name1) {
        this.peopleList.push(this.name1)
        this.processList.forEach(item=>{
          item.list.forEach(i=>{
            if (i.name === this.item1.name) {
              i.list.splice(i.list.indexOf(this.item1.name), 1)
              this.name1 = ''
              this.item1 = {}
            }
          })
        })
      }
    },
    seledPelClick1(item, o) {
      if (this.name1 === o) {
        this.name1 = ''
      } else {
         this.name1 = o
         this.item1 = item
      }
    },
    removeSledPel(list, name) {
      list.splice(list.findIndex(item=> item === name),1)
    },
    clickGx(list) {
      if (this.name) {
        list.push(this.name)
        this.peopleList.splice(this.peopleList.findIndex(item=> item === this.name),1)
        this.name = ''
      } else if (this.name1) {
        list.push(this.name1)
        this.processList.forEach(item=>{
          item.list.forEach(i=>{
            if (i.name === this.item1.name) {
              i.list.splice(i.list.indexOf(this.item1.name), 1)
              this.name1 = ''
              this.item1 = {}
            }
          })
        })
        this.name1 = ''
      }
    },
    seledPelClick(name) {
      if (this.name === name) {
        this.name = ''
      } else {
        this.name = name
      }
    },
    delGx(list, i) {
      if (list.length === 1) return
      list.splice(i, 1)
    },
    addGx(name) {
      this.processList.forEach(item=>{
        if (item.name === name) {
          item.list.push({
            list: [],
            name:'新增工序'
          })
        }
      })
    },
    delProcess(j) {
      if (this.processList.length === 1) return
      this.$confirm('此操作将永久删除该流程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.processList.splice(j, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    },
    // 新增人员确定
    suerAddPeople() {
      if (!this.form.list) {
        this.dialogVisible = false
        return
      } 
      let list =  this.form.list.split(',')
      let arr = []
      let flag = false
      for (let i = 0; i < list.length; i++) {
        if (this.peopleList.indexOf(list[i]) !== -1 || arr.indexOf(list[i]) !== -1) {
          flag = true
        }
        arr.push(list[i])
      }
      if (flag) {
        this.$message.error('名字不能重复！');
        return 
      }
      arr.forEach(item=> {
        this.peopleList.push(item)
      })
      console.log(this.peopleList)
      this.dialogVisible = false
    },
    addProcess() {
      let name = this.processList[this.processList.length - 1].name
      let item = {  name: name + 1,
          list: [ {name: '工序1', list: []},
            {name: '工序2', list: []},
            {name: '工序3', list: []},
            {name: '工序4', list: []},
            {name: '工序5', list: []},
            {name: '工序6', list: []},
            {name: '工序7', list: []},
            {name: '工序8', list: []},
            {name: '工序9', list: []}]}
      this.processList.push(item)
    },
    onEnd(e) {
      // 人员自己移动自己
      if (this.peopleList.indexOf(e.item.innerText) !== -1 && e.to.className === 'people') return
      // 人员拖到流程
      if (e.from.className === 'people') {
        console.log('人员拖到流程')
        let zpxName = e.to.parentNode.parentNode.getAttribute('name') // 装配线名称
        let proName = e.to.className // 拖到目标流程
        let pName = e.item.innerText // 拖到人员名字
        this.processList.forEach(item=> {
          if (item.name === zpxName) {
            item.list.forEach(i=>{
              if (i.name === proName) {
                i.list.push(pName)
              }
            })
          }
        })
        this.peopleList.splice(this.peopleList.findIndex(item=> item === pName),1)
      }
      // 流程拖到人员
      if (e.to.className === 'people') {
        let zpxName = e.from.parentNode.parentNode.getAttribute('name') // 装配线名称
        let pName = e.item.innerText // 拖到人员名字
        let proName = e.from.className // 拖到目标流程
        this.processList.forEach(item=> {
          if (item.name === zpxName) {
            item.list.forEach(i=>{
              if (i.name === proName) {
                i.list.splice(i.list.findIndex(item=> item === pName),1)
              }
            })
          }
        })
        this.peopleList.push(pName)
      }
    },
    handleClose(name) {
      this.peopleList.splice(this.peopleList.findIndex(item=> item === name),1)
    }
  }
}
</script>
<style>
.process{
  display: flex;
  margin-top: 16px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  padding: 5px 0;
  
}
#app .el-card__header {
  padding: 18px 20px;
  padding-right: 5px;
}
.processOne {
  width: 200px;
  padding: 10px;
  text-align: left;
}
.processTwo {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}
.processTwo .el-card__body {
  padding: 10px;
}
#app .processTwo  .el-card__header {
  padding: 6px 0;
  }
.processOne .el-button {
   margin-left: 0 !important;
   margin-bottom: 5px;
 }
/* .peopleflex {
  position: fixed;
  bottom: 100px;
  left: 0px;
  width: 100%;
} */
  body {
    height: 100%;
    width: 100%;
    padding: 18px;
  }
</style>

<template>
<el-container class= "homeContainer">
  <!-- 头部区域 el-header本身就是一个类选择器，也可以使用id选择器-->
  <el-header class= "homeHeader" >
    <div id="imgAndTitle">
      <img src="../assets/logo.png" id="logo"/>
      <span id="homeTitle">商品管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <!-- 二级导航及内容区域 -->
  <el-container>
    <!-- 侧边栏 一般用作二级导航 -->
    <el-aside :width="isCollapse ? '64px':'200px'" class = "secondNav">
      <div class="toggle-button" @click="collapse">|||</div>
      <el-menu background-color="#333744" text-color="#fff" :unique-opened="true" :collapse=isCollapse :collapse-transition="false">
        <!-- 一级菜单 -->
        <el-submenu :index="item.id" v-for="item in MenuList" :key="item.id">
          <!-- 一级菜单模板 -->
          <template slot="title">
            <!-- i语义标签无实际意义，所以一般用来当作icon引入图标，这里也可以使用iconfont 形式引入外部的CSS样式文件 -->
            <i :class="iconList[item.id]"></i>
            <!-- 文本 -->
            <span>{{ item.authName }}</span>
            </template>
          <el-menu-item-group>
            <!-- 二级菜单的for循环中我一开始写的是items in MenuList[item],理解错了结构，item in MenuList 提取出来的就是每一个MenuList项，取它的孩子属性(也是个数组，所以需要第二个for循环，要不然直接:index就可以了)。 -->
            <el-menu-item :index="items.id" v-for="items in item.children" :key="items.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ items.authName }}</span>
              </template>
            </el-menu-item>
        </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 主要内容选择区 根据二级导航更新内容 -->
    <el-main class= "content">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单选项数据集
      MenuList: [],
      // 使用自定义的函数 权限管理item.id:对应iconfont,完成映射。
      iconList: {
        125: 'iconfont icon-yonghu',
        103: 'iconfont icon-tijikongjian-xianxing',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-changyongtubiao-fuben-65',
        145: 'iconfont icon-baobiao'
      },
      isCollapse: false
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
      const { data: res } = await this.$http.get('/menus')
      if (res.meta.status !== 200) this.$message.error(res.meta.msg)
      console.log(res.data)
      this.MenuList = res.data
    },
    collapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.homeHeader {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items : center;
}
// CSS中通过>表示子(孙子)元素属于正常写法，可以省略掉一个class或id，比较好区分.
.homeHeader >div{
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  span {
  color: #fff;
  margin-left: 15px;
  }
  img{
    height: 100%;
  }
}
/* 但上边的div{
  span{

    }
  img{

    }
  }
  就是less的语法规则了，属于less.js的功能，需要在style标签中注明。
}
*/
.secondNav{
  background-color: #333744;
}
.content{
  background-color: #EAEDF1
}
.homeContainer{
  height: 100%;
}
// 排查发现所有子菜单右边都少了一个像素，原因就是el-menu默认样式中有个border-right:1px，去掉了不影响美观。
.el-menu{
  border-right: 0px;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4A5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor:pointer;
  // cursor默认属性，属性值较多，根据需要看文档
  // letter-spacing：设置文字内容的间距，em单位是针对当前元素的font-size的长度单位,在这里就是1em=10px.
}
</style>

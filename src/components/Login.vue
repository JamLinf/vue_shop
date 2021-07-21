<template>
  <div id="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div id="image">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 elementUi组件提供 elementui中的model属性配合子标签使用v-model将数据绑定在JS的对象上，子标签指的不是form-item,应该是button,input等有具体作用的标签
                 el-form还提供了ref=""的方式，提供给JS标签对象，调用相关方法-->
      <el-form
        class="login_form"
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
      >
        <!-- 用户名 -->
        <!-- 关于表单验证中的规则 在form-item标签中使用prop属性绑定，在对应的rules数组中定义规则 -->
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-yonghuming"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-mima"
            v-model="loginForm.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单的验证规则对象
      rules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5,
            max: 15,
            message: '密码长度在5到15个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  }, // data()
  methods: {
    // 点击重置Form表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 以下为.then().catch()的写法  axios返回的Promise对象，所以可以使用asnyc/await去掉.then()，.catch()等冗余代码，提高代码的可读性。
      // this.$refs.loginFormRef.validate(valid => { // el-form提供的对表单的预校验validate函数，就是针对我们在form预设的rules校验，返回valid，输入有效true,输入无效false
      //   if (!valid) return
      //   this.$http.post('/login', this.loginForm).then(function (successMessage) { // axios发起post请求 post(第一个参数：路径，这里是BaseURL+加上你写的，第二个参数：发送请求的数据，JSON格式组织数据，我们这的loginForm已经是JSON格式数据)
      //     console.log(successMessage.data)
      //   }).catch(function (Err) { // 没有接受服务器的响应
      //     console.log(Err)
      //   })
      // })
      // 使用asnyc/await方法，将异步处理写成类似同步处理的代码结构  await只能在async修饰下的函数中使用，在这里就是我们的箭头函数
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        // { data: res }属于解构语法，提出Promise对象中的data属性，命名为res.
        const { data: res } = await this.$http.post(
          '/login',
          this.loginForm
        )
        if (res.meta.status !== 200) {
          // 下边的写法就是立即执行函数，函数中(function(){})(参数1，参数2), 将函数用括号囊括起来，在最后加上参数()，该函数就能立即执行。
          // 注意函数中的this指向。普通函数，谁调用this就指向谁。 匿名函数是指向window对象，就找不到挂载在Vue对象上的message属性。
          // return (function () { // 如果只有一个简单的操作就直接return 表达式; 就可以立即执行。 表达式可以是console.log 也可以是1+5 等等.
          //   this.$message.error('登录失败')
          // })()
          console.log(res.meta.status)
          this.$message.error('登录失败')
        } else {
          window.sessionStorage.setItem('token', res.data.token) // sessionStorage--会话存储，顾名思义保存时间直至会话结束，符合token的使用特点。
          this.$router.push('/home')
          this.$message.success('登录成功')
        }
      })
    }
  } // methods :
}
</script>

<style lang="less" scoped>
#login_container {
  background-color: #0a77e4;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
#image {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 10px 0 10px #ddd;
  img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.btns {
  float: right;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%; //设置盒模型部分宽度（注意content-box和border-box两者的不同）
  padding: 0 10px; //padding在默认的box-sizing:content-box中是基于content内容以外进行计算，所以容易造成子元素范围超出父元素的现象
  box-sizing: border-box; //修改box-sizing:border-box就是width设置就是从border开始计算，content区域被压缩。
}
</style>

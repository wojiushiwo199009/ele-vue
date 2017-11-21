import  'element-ui/lib/theme-chalk/index.css'
import { Button, Input, Form, FormItem } from 'element-ui'

<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <div id="login">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  export default {
    data () {
      var validateName = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        ruleForm: {
          name: '',
          password: ''
        },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          name: [
            {
              validator: validateName,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/home')
          } else {
            return false
          }
        })
      },
      resetForm (formName) {
        console.log(formName)
        console.log(this)
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

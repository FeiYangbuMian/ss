<template>
  <el-card shadow="hover">
    <h4>项目人工费统计</h4>
    <el-divider></el-divider>
    <el-form :model="table3" :rules="rules" ref="table3" label-width="110px" label-position="right" >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="table3ProjectId">
            <!--<el-input v-model="table3.table3ProjectId" :readonly="true"></el-input>-->
            <el-select v-model="table3.table3ProjectId" placeholder="请选择项目名称" value="">
              <el-option
                v-for="item in projectList"
                :label="item.projectName" :key="item.id" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年份" prop="table3ProjectYear">
            <el-date-picker
              v-model="table3.table3ProjectYear"
              type="year" format="yyyy" value-format="yyyy"
              :clearable="false" :editable="false"
              placeholder="请选择年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="季度" prop="table3Quarter">
            <el-select v-model="table3.table3Quarter" placeholder="请选择季度" value="">
              <el-option
                v-for="item in options"
                :label="item.label" :key="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="工作内容明细" prop="table3WorkTypeId">
            <el-select v-model="table3.table3WorkTypeId" placeholder="请选择工作内容明细" value="">
              <el-option
                v-for="item in workList"
                :key="item.id" :label="item.bricklayer" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="班组" prop="table3Team">
            <el-input v-model="table3.table3Team" clearable ><template slot="append">班组</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位" prop="table3Unit">
            <el-input v-model="table3.table3Unit" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="合同工程量" prop="table3ContractQuantity">
            <el-input v-model.number="table3.table3ContractQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际工程量" prop="table3ActualEngineeringQuantity">
            <el-input v-model.number="table3.table3ActualEngineeringQuantity" type="number" clearable />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="责任人工单价" prop="table3ResponsibleLaborUnitPrice">
            <el-input v-model.number="table3.table3ResponsibleLaborUnitPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="责任人工费" prop="table3ResponsibleLaborFee">
            <el-input v-model.number="table3.table3ResponsibleLaborFee" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="实际人工单价" prop="table3ActualLaborUnitPrice">
            <el-input v-model.number="table3.table3ActualLaborUnitPrice" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际人工费" prop="table3ActualLaborCost">
            <el-input v-model.number="table3.table3ActualLaborCost" type="number" clearable><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="人工费差额" prop="table3LaborCostDifference">
            <el-input v-model="costDifference" :readonly="true" ><template slot="append">元</template></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item label="备注">
            <el-input v-model="table3.table3Remark" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="编制人">
            <el-input v-model="table3.table3Editor" :disabled="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="validateData('table3')"> 立即创建 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'cost-labor',
  inject: ['reload'],
  data () {
    return {
      departmentId: this.$store.getters.departmentId,
      departmentName: this.$store.getters.departmentName,
      plateId: this.$store.getters.plateId,
      table3: {
        table3ProjectId: '',
        table3ProjectYear: '',
        table3Quarter: '',
        table3WorkTypeId: '',
        table3Team: '',
        table3Unit: '',
        table3ContractQuantity: '',
        table3ActualEngineeringQuantity: '',
        table3ResponsibleLaborUnitPrice: '',
        table3ResponsibleLaborFee: '',
        table3ActualLaborUnitPrice: '',
        table3ActualLaborCost: '',
        table3LaborCostDifference: '', // 计算
        table3Remark: '',
        table3Editor: this.$store.getters.userName
      },
      rules: {
        table3ProjectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        table3ProjectYear: [{ required: true, message: '请选择年份', trigger: 'change' }],
        table3WorkTypeId: [{ required: true, message: '请选择明细', trigger: 'change' }],
        table3Quarter: [{ required: true, message: '请选择季度', trigger: 'change' }],
        table3ContractQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table3ActualEngineeringQuantity: [{ required: true, message: '不可为空', trigger: 'change' }],
        table3ResponsibleLaborUnitPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table3ResponsibleLaborFee: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table3ActualLaborUnitPrice: [{ required: true, message: '请输入金额', trigger: 'change' }],
        table3ActualLaborCost: [{ required: true, message: '请输入金额', trigger: 'change' }]
      },
      options: this.$store.getters.addType[1].children,
      projectList: [],
      workList: []
    }
  },
  created () {
    this.getProject()
    this.getWork()
  },
  computed: {
    costDifference () {
      return Math.round((this.table3.table3ResponsibleLaborFee - this.table3.table3ActualLaborCost) * 100) / 100
    }
  },
  methods: {
    getProject () {
      this.$api.project.getProjectList({
        departmentId: this.departmentId,
        plateId: this.plateId
      })
        .then(rsp => {
          this.projectList = rsp.data.list
          console.log(this.projectList)
        })
    },
    getWork () {
      this.$api.project.getWorkList()
        .then(rsp => {
          this.workList = rsp.data.list
          console.log(this.workList)
        })
    },
    addTable3 () {
      this.table3.table3LaborCostDifference = this.costDifference
      this.$api.project.addTable3(this.table3)
        .then(rsp => {
          if (rsp.data.result === 200) {
            this.$message.success('新增表单成功！')
            this.reload() // 刷新
          } else if (rsp.data.result === 500) {
            this.$message.error(rsp.data.resultText)
          } else {
            this.$message.error('新增项目失败……')
          }
          console.log(rsp.data)
        })
    },
    validateData (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 提交确认框
          this.$confirm('确认提交吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addTable3()
          }).catch(() => {
            console.log('cancel submit.')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <el-form ref="form" :model="formData" :rules="rules" label-width="100px" hide-required-asterisk>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="日期" prop="hydropowerDate">
          <el-date-picker
            v-model="formData.hydropowerDate" value-format="yyyy-MM-dd" class="width-full"
            type="date" placeholder="选择日期" :editable="false" :clearable="false"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="收款单位" prop="receivingUnit">
          <el-input v-model="formData.receivingUnit" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="项目" prop="hydropowerProject">
          <el-autocomplete v-model="formData.hydropowerProject" class="width-full" :fetch-suggestions="querySearch1" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="单位" prop="hydropowerUnit">
          <el-autocomplete v-model="formData.hydropowerUnit" class="width-full" :fetch-suggestions="querySearch" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="用量" prop="hydropowerDosage">
          <el-input v-model="formData.hydropowerDosage" />
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">含税金额</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.hydropowerAmountTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="单价" prop="hydropowerPriceTax">
          <el-input v-model="formData.hydropowerPriceTax"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <p class="text-divider">不含税金额</p>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="税率" prop="taxRate">
          <el-input v-model="formData.taxRate"><template slot="append">%</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="金额">
          <el-input v-model="formData.hydropowerAmount"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="单价">
          <el-input v-model="formData.hydropowerPrice"><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="税额">
          <el-input v-model="formData.tax" readonly><template slot="append">元</template></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item label="发票号">
          <el-input v-model="formData.receiptNumber" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item label="备注">
          <el-input v-model="formData.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button @click="handleCancel('form')">取消</el-button>
      <el-button type="primary" @click="submitForm('form')" :disabled="unClick">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RearUtilityFee',
  props: {
    baseData: Object,
    isEdit: Boolean
  },
  data () {
    return {
      formData: Object.assign({}, this.baseData),
      rules: {
        materialStatisticDate: [{ required: true, message: '不可为空' }],
        purchaseUserId: [{ required: true, message: '不可为空' }],
        material: [{ required: true, message: '不可为空' }],
        materialUnit: [{ required: true, message: '不可为空' }],
        materialQuantity: [{ required: true, message: '不可为空' }],
        materialPriceTax: [{ required: true, message: '不可为空' }],
        taxRate: [{ required: true, message: '不可为空' }],
        supplierId: [{ required: true, message: '不可为空' }]
      },
      unClick: false,
      types: [{ value: '电费' }, { value: '天然气' }, { value: '自来水' }],
      units: [{ value: '千瓦时' }, { value: '立方米' }]
    }
  },
  watch: {
    baseData: {
      handler (val, old) {
        this.formData = Object.assign({}, val)
      },
      deep: true
    },
    formData: {
      handler (val, old) {
        if (val.hydropowerDosage && val.hydropowerAmountTax) {
          this.formData.hydropowerPriceTax = this.$utils.divide(val.hydropowerAmountTax, val.hydropowerDosage).toFixed(3)
        }
        if (val.taxRate) {
          this.formData.hydropowerAmount = this.$utils.divide(this.formData.hydropowerAmountTax, this.$utils.add(1, this.$utils.divide(val.taxRate, 100))).toFixed(2)
          this.formData.tax = this.$utils.multiply(this.formData.hydropowerAmount, this.$utils.divide(val.taxRate, 100)).toFixed(2)
          this.formData.hydropowerPrice = this.$utils.divide(this.formData.hydropowerAmount, val.hydropowerDosage)
        }
      },
      deep: true
    }
  },
  methods: {
    querySearch (queryString, cb) {
      const units = this.units
      const results = queryString ? units.filter(this.createFilter(queryString)) : units
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearch1 (queryString, cb) {
      const units = this.types
      const results = queryString ? units.filter(this.createFilter(queryString)) : units
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.isEdit ? this.editItem() : this.addItem()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleCancel (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    addItem () {
      console.log('add')
      this.unClick = true
      this.$api.rear.addUtilityItem(this.formData).then(rsp => {
        console.log(rsp)
        this.unClick = false
        if (rsp.result === 200) {
          this.$message({ type: 'success', message: '新增成功!', duration: 1000 })
          this.$emit('primary')
        } else {
          this.$message({ type: 'error', message: rsp.resultText })
        }
      }).catch(err => {
        this.unClick = false
        this.$message({ type: 'error', message: err })
      })
    },
    editItem () {
      this.$emit('primary')
    }
  }
}
</script>

<style scoped>

</style>

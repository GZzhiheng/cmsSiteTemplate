<template>
  <label :for="randomId" class="choose-label2"
         :class="{'checked':value,'disabled':disabled}" style="vertical-align: middle;"
         @click="doSwitch">
    <input ref="checkbox" type="checkbox" :checked="value" :id="randomId" style="display:none" :disabled="disabled"
           @change="onChange($event)"/>
  </label>
</template>
<script>
  export default {
    name: 'switch-box',
    data() {
      return {
        randomId: ''
      }
    },
    props: {
      value: {
        default: false,
        type: Boolean
      },
      disabled: {
        default: false,
        type: Boolean
      }
    },
    created: function () {
      this.randomId = parseInt(Math.random() * 10000000000) + '_switch'
    },
    methods: {
      onChange(e) {
        this.$emit('input', e.target.checked)
      },
      doSwitch() {
        if (this.disabled) {
          return
        }
        this.$refs.checkbox.checked = !this.$refs.checkbox.checked
      }
    }
  }
</script>
<style>
  .choose-label2 {
    box-shadow: #d6d6d6 0px 0px 0px 1px;
    width: 35px;
    height: 20px;
    display: block;
    border-radius: 20px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    box-sizing: border-box;
    cursor: pointer;
  }

  .choose-label2.disabled {
    cursor: not-allowed;
    background-color: #777777!important;
    box-shadow:none!important;
  }

  .choose-label2:before {
    content: '';
    position: absolute;
    left: 1px;
    width: 20px;
    height: 20px;
    display: block;
    border-radius: 20px;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #fff;
    box-shadow: #7c7c7c 1px 1px 1px;
    z-index: 20;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }

  label.choose-label2.checked:before {
    left: 15px;
    border: 1px solid #33c0cc;
  }

  label.choose-label2.checked {
    background-color: #33c0cc;
    box-shadow: #33c0cc 0px 0px 0px 1px;
  }
</style>

<template>
  <div>
    <input type="text" readonly v-on:click="showSelect" ref="input" placeholder="请选择目录"/>
    <modal title="选择目录" width="40%" :showOk="false" @cancel="" ref="dialog" :show.sync="showDialog">
      <ul class="choiceListBox">
        <template v-for="(lists, index) in siteCategory">
          <li :class="{'in':lists.id === categoryId}" :data="categoryId" class="firstLists"
              @click="selectCategory(lists.id,lists.text)">{{ lists.text }}
          </li>
          <template v-for='(listsChild1, index) in lists.nodes' v-if="lists.nodes">
            <li :class="{'in':listsChild1.id === categoryId}" class="listsChild1"
                @click="selectCategory(listsChild1.id,listsChild1.text)">{{ listsChild1.text }}
            </li>
            <template v-for='(listsChild2, index) in listsChild1.nodes' v-if="listsChild1.nodes">
              <li :class="{'in':listsChild2.id === categoryId}" class="listsChild2"
                  @click="selectCategory(listsChild2.id,listsChild2.text)">{{ listsChild2.text }}
              </li>
            </template>
          </template>
        </template>
      </ul>
    </modal>
  </div>
</template>
<script>
  import Modal from '../../../common/Modal.vue'

  export default {
    data() {
      return {
        siteCategory: {},
        categoryId: this.value,
        showDialog: false
      }
    },
    props: ['value', 'siteId', 'editType', 'show'],
    components: {
      Modal
    },
    watch: {
      showDialog(val) {
        if (val) {
          this.$rest.get('/cms/rest/siteCategory/select', {'siteId': this.siteId}).then(response => {
              this.siteCategory = response.data
            }
          )
       }
      },
      value(val) {
        if (val && this.categoryId !== val) {
          this.updateName(val)
        }
        this.categoryId = val
      },
      show(val){
      	if(this.editType === 'create'){
      		this.$refs.input.value = ''
      	}
      }
    },
    created: function () {
      this.updateName(this.categoryId)
    },
    methods: {
      showSelect() {
        this.showDialog = true
      },
      updateName: function (cid) {
        if (cid) {
          this.$rest.get('/cms/rest/siteCategory/get', {'id': cid}).then(response => {
              this.$nextTick(() => {
                this.$refs.input.value = response.data.name
              })
            }
          )
        }
      },
      selectCategory(categoryId, categoryName) {
        this.showDialog = false
        this.categoryId = categoryId
        this.$refs.input.value = categoryName
        this.$emit('input', categoryId)
      }
    }
  }
</script>

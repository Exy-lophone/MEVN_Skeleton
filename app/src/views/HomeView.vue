<script setup>
  import Textbox from '@/components/Textbox.vue'
  import Dropdown from '@/components/Dropdown.vue'
  import { ref } from 'vue'

  const showDropdown = ref(false)
  const txtbx = {
    value: 'Catégorie',
    centerTxt: true,
    placeholder: 'Placeholder', 
    textColor: 'var(--color-accent)', 
    leftArrow: {show:false,direction:'up'}, 
    rightArrow: {show:true,direction:'down'}, 
    prefixText: {show:false,text:'Trier par:'},
    width: 10
  }

  function arrowClicked (left) {
    if(!left) showDropdown.value = true
  }
</script>

<template>
  <div class="d-flex">
    <Textbox v-bind="txtbx" @right-arrow-clicked="arrowClicked"></Textbox>
    <Dropdown v-if="showDropdown">
      <p>Item1</p>
      <p>Item2</p>
      <p>Item3</p>
      <Textbox v-bind="txtbx"></Textbox>
    </Dropdown>
  </div>
</template>


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
  
  function openDropdown() {
    showDropdown.value = true
  }
  function closeDropdown() {
    showDropdown.value = false
  }
</script>

<template>
  <div class="content d-flex">
    <Dropdown :show="showDropdown" @mouseleave="closeDropdown">
      <template #element>
        <Textbox v-bind="txtbx" @right-arrow-clicked="openDropdown"></Textbox>
      </template>
      <p>Item1</p>
      <p>Item2</p>
      <p>Item3</p>
    </Dropdown>
  </div>
</template>

<style scoped>
  .content {
    flex-direction: column;
  }
</style>


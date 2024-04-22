<script setup>
import modal from '@/components/modal.vue'
import modalMode from '@/modals.js'
import search from '@/search.js'
import textbox from '@/components/Textbox.vue'
import dropdown from '@/components/Dropdown.vue'

const categories = [
    {display:'Description',value:'description'},
    {display:'Catégorie',value:'category'},
    {display:'Quantité',value:'quantity'},
    {display:'Salle',value:'closet.room'},
    {display:'Armoire',value:'closet.name'}
]
const rooms = [
    {display:'Tout',value:'none'},
    {display:'B01',value:'B01'},
    {display:'A01',value:'A01'}
]
const closets = [
    {display:'Tout',value:'none'},
    {display:'INF-B01-ARM1',value:'INF-B01-ARM1'},
    {display:'INF-B01-ARM2',value:'INF-B01-ARM2'},
    {display:'INF-B01-ARM3',value:'INF-B01-ARM3'},
    {display:'INF-B01-ARM4',value:'INF-B01-ARM4'},
    {display:'INF-A01-ARM1',value:'INF-A01-ARM1'},
]

</script>

<template>
    <modal v-if="modalMode.modify" @background-clicked="modalMode.modify = false">
        <div class="modify-modal-header d-flex">
            <p class="font-size-h5 font-bold">Modifier</p>
        </div>
        <div class="modify-modal-items">
            <div v-for="(item, index) in search.ids.value" class="modify-modal-item d-flex">
                <p class="font-bold">{{ index + 1 }}.</p>
                <textbox :value="item.description"></textbox>
                <textbox 
                    :value="item.quantity" 
                    :width="4" 
                    :centerTxt="true"
                    :left-arrow="{show:true,direction:'left'}"
                    :right-arrow="{show:true,direction:'right'}"
                    @vmodel="x => item.quantity = x"
                    @left-arrow-clicked="item.quantity--"
                    @right-arrow-clicked="item.quantity++"
                    :key="item.quantity"
                ></textbox>
                <dropdown :items="categories" textColor="var(--color-text-darklight)"></dropdown>
                <dropdown :items="rooms" textColor="var(--color-text-darklight)"></dropdown>
                <dropdown :items="closets" textColor="var(--color-text-darklight)"></dropdown>
            </div>
        </div>
        <div class="modify-modal-footer d-flex">
            <button class="btn-lg btn-black" @click="modalMode.modify = false">Annuler</button>
            <button class="btn-lg btn-blue" @click="modalMode.modify = false">Valider</button>
        </div>
    </modal>
</template>

<style scoped>
    .modify-modal-header {
        background-color: var(--color-text);
        color: var(--color-background);
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
        padding: 1rem 0;
    }
    .modify-modal-footer {
        border-top: 1px solid var(--color-border);
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        gap: 2rem;
        padding: 1rem 0;
    }
    .modify-modal-item {
        gap: 2rem;
        padding: 1rem 2rem;
    }
</style>

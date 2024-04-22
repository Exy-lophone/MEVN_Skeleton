import { ref, reactive, readonly } from "vue";

const options = reactive({
    research: '',
    sortBy: '',
    orderBy: '',
    roomFilter: '',
    closetFilter: '',
})

const results = ref(0)

const selection = reactive({
    ids: [],
    mode: false,
    init: -1,
    start: -1,
    end: -1
})

function initSelection (index) {
    selection.mode = true
    selection.init = index
    selection.start = index
    selection.end = index
}

function stopSelection () {
    selection.mode = false
}

function clearSelection () {
    selection.mode = false
    selection.init = -1
    selection.start = -1
    selection.end = -1
    selection.ids = []
}

function handleSelection (index) {
    if(!selection.mode) return
    if(index >= selection.init) {
        selection.start = selection.init
        selection.end = index
    } else {
        selection.end = selection.init
        selection.start = index
    }
}

function isIndexSelected (index) {
    return index >= selection.start && index <=selection.end
}

function selectAll () {
    selection.init = 0
    selection.start = 0
    selection.end = results.value - 1
}

function updateIds (items) {
    // selection.ids = items.filter((x,i) => i >= selection.start && i <= selection.end).map(x => x._id)
}

export default {
    options,
    results,
    selection: readonly(selection),
    initSelection,
    stopSelection,
    clearSelection,
    handleSelection,
    isIndexSelected,
    selectAll,
    updateIds
}
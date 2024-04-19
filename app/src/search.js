import { reactive, readonly } from "vue";

const options = reactive({
    research: '',
    sortBy: '',
    orderBy: '',
    roomFilter: '',
    closetFilter: '',
    results: 0
})

const selection = reactive({
    ids: [],
    mode: false,
    init: -1,
    start: -1,
    end: -1
})

function initSelection (index, items) {
    selection.mode = true
    selection.init = index
    selection.start = index
    selection.end = index
    selection.ids = [items[index]._id]
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

function handleSelection (index, items) {
    if(!selection.mode) return
    if(index >= selection.init) {
        selection.start = selection.init
        selection.end = index
    } else {
        selection.end = selection.init
        selection.start = index
    }
    selection.ids = items.filter((x,i) => i >= selection.start && i <= selection.end).map(x => x._id)
}

function isIndexSelected (index) {
    return index >= selection.start && index <=selection.end
}

function selectAll () {
    selection.init = 0
    selection.start = 0
    selection.end = options.results - 1
}

export default {
    options,
    selection: readonly(selection),
    initSelection,
    stopSelection,
    clearSelection,
    handleSelection,
    isIndexSelected,
    selectAll
}
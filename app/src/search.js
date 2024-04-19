import { reactive } from "vue";

export const search = reactive({
    selectedIds: [],
    selection: {
        mode: false,
        init: -1,
        start: -1,
        end: -1
    },
    sortBy: 'description',
    orderBy: 'ascending',
    roomFilter: 'none',
    closetFilter: 'none',
    results: 0,
    clearSelection: function () {
        this.selectedIds = []
        this.selection.init = -1
        this.selection.start = -1
        this.selection.end = -1
    },
    selectAll: function () {
        this.selection.init = 0
        this.selection.start = 0
        this.selection.end = this.results - 1
    }
})
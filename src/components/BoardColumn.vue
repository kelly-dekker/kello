<template>
    <AppDrop
        @drop="moveTaskOrColumn"
    >
        <AppDrag
            class="column cursor-pointer"
            :transferData="{
                type: 'column',
                fromColumnIndex: columnIndex
          }"
        >
            <div class="flex justify-between items-center mb-2 font-bold">
                <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    {{ column.name }}
                </div>
                <button
                    class="text-xs text-grey outline-none  hover:text-red focus:outline-none"
                    @click="deleteColumn(columnIndex)"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
            <div class="list-reset">
                <ColumnTask
                    v-for="(task, $taskIndex) of column.tasks"
                    :key="$taskIndex"
                    :task="task"
                    :taskIndex="$taskIndex"
                    :column="column"
                    :columnIndex="columnIndex"
                    :board="board"
                />

                <input
                    type="text"
                    v-model="newTaskName"
                    class="block p-2 w-full bg-transparent outline-none"
                    placeholder="+ Enter new task"
                    @keyup.enter="createTask($event, column.tasks)"
                />
            </div>
        </AppDrag>
    </AppDrop>
</template>

<script>
import ColumnTask from './ColumnTask'
import AppDrag from './AppDrag'
import AppDrop from './AppDrop'
import movingTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin'

export default {
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  data () {
    return {
      newTaskName: ''
    }
  },
  mixins: [movingTasksAndColumnsMixin],
  methods: {
    pickUpColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    },
    createTask (e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: this.newTaskName
      })

      this.newTaskName = ''
    },
    deleteColumn (columnIndex) {
      this.$swal
        .fire({
          title: 'Je staat op het punt om deze kolom te verwijderen. Weet je het zeker?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Annuleren',
          confirmButtonColor: 'green',
          confirmButtonText: 'Ja, verwijderen!'
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$store.commit('DELETE_COLUMN', {
              columnIndex
            })
          }
        })
    }
  }
}
</script>

<style scoped>
    .column {
        @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
        min-width: 350px;
    }
</style>

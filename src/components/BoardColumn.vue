<template>
    <AppDrop
        @drop="moveTaskOrColumn"
    >
        <AppDrag
            class="column"
            :transferData="{
                type: 'column',
                fromColumnIndex: columnIndex
          }"
        >
            <div class="flex items-center mb-2 font-bold">
                {{ column.name }}
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

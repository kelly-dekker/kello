import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { saveStatePlugin, uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    },
    getColumnName (state, { id }) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return column
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: ''
      })
    },
    UPDATE_TASK (state, { task, key, value }) {
      Vue.set(task, key, value)
    },
    DELETE_TASK (state, { taskIndex }) {
      for (const column of state.board.columns) {
        for (const task of column.tasks) {
          if (task.id === taskIndex) {
            column.tasks.splice(taskIndex, 1)
          }
        }
      }
    },
    MOVE_TASK (state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
      toTasks.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    },
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    DELETE_COLUMN (state, { columnIndex }) {
      state.board.columns.splice(columnIndex, 1)
    }
  }
})

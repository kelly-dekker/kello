<template>
  <div class="board bg-teal-dark dark:bg-gray-800">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          class="p-2 mr-2 flex-grow outline-none bg-grey-light rounded"
          placeholder="New Column Name"
          type="text"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        >
      </div>

    </div><!-- /.end columns -->

    <div
      class="task-bg"
      v-if="isTaskOpen"
      @click.self="close"
    >
      <router-view/>
    </div>

  </div><!-- /.board -->
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'

export default {
  components: {
    BoardColumn
  },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen () {
      return this.$route.name === 'task'
    }
  },
  methods: {
    close () {
      this.$router.push({ name: 'board' })
    },
    createColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })

      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">
.board {
  @apply p-4  h-full overflow-auto;
}

.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>

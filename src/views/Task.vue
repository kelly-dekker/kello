<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
        class="p-2 w-full mr-2 flex-grow text-xl font-bold outline-none"
        type="text"
        :value="task.name"
        @change="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      />

      <textarea
        class="relative bg-transparent px-2 border mt-2 h-64 border-none outline-none w-full"
        :value="task.description"
        @change="updateTaskProperty($event, 'description')"
        @keyup.enter="updateTaskProperty($event, 'description')"
      />

      <div class="flex w-full justify-end pt-5">
        <button
                class="text-xs flex items-center text-grey outline-none  hover:text-red focus:outline-none"
                @click="deleteTask(task.id)"
        >
          Verwijderen
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    deleteTask (taskIndex) {
      this.$swal
        .fire({
          title: 'Je staat op het punt om deze taak te verwijderen. Weet je het zeker?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          cancelButtonText: 'Annuleren',
          confirmButtonColor: 'green',
          confirmButtonText: 'Ja, verwijderen!'
        })
        .then(result => {
          if (result.isConfirmed) {
            this.$store.commit('DELETE_TASK', {
              taskIndex: taskIndex
            })
            // redirect to board since task is deleted
            this.$router.push({ name: 'board' })
          }
        })
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>

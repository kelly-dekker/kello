<template>
    <div>
        <button @click="changeColorTheme">
            {{ theme }}
        </button>
    </div>
</template>

<script>
export default {
  data () {
    return {
      theme: ''
    }
  },
  mounted () {
    this.theme = localStorage.getItem('theme')
  },
  methods: {
    changeColorTheme () {
      const el = document.querySelector('html')
      if (localStorage.theme === 'light') {
        this.switchTheme('dark')
        el.classList.add('dark')
      } else {
        this.switchTheme('light')
        el.classList.remove('dark')
      }
    },
    switchTheme (themeName) {
      this.theme = themeName
      localStorage.setItem('theme', themeName)
    }
  }
}
</script>

<style scoped>

</style>

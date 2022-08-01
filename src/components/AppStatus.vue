<template>
  <span class="badge" :class="classColor[type]">{{ className[type] }}</span>
</template>

<script>
export default {
  props: ['type'],
  data() {
    return {
      classColor: {
        'active': 'primary',
        'done': 'primary',
        'cancelled': 'danger',
        'pending': 'warning'
      },
      className: {
        'active': 'Активна',
        'done': 'Завершена',
        'cancelled': 'Отменена',
        'pending': 'Выполняется'
      }
    }
  }
}
</script>

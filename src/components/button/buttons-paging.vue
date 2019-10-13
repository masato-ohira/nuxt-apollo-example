<template lang='pug'>
.c-buttons-paging
  .buttons.is-centered(v-if="pageInfo")
      a.button(
        @click="goPrev()"
        v-if="pageInfo.hasPreviousPage") Prev
      a.button(
        @click="goNext()"
        v-if="pageInfo.hasNextPage") Next
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('repository', [
      'pageInfo',
      'limit',
    ]),
  },
  methods: {
    ...mapActions('repository', [
      'getRepositories'
    ]),
    goPrev() {
      this.getRepositories({
        first: null,
        last: this.limit,
        before: this.pageInfo.startCursor,
      })
    },
    goNext() {
      this.getRepositories({
        first: this.limit,
        last: null,
        after: this.pageInfo.endCursor,
      })
    },
  }
}
</script>
<style lang='sass' scoped></style>

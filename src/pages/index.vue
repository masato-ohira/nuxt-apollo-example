<template lang='pug'>
.v-index
  .container
    .columns
      .column.is-4
        input.input(
          @keyup.enter="getRepositories()"
          v-model="queryWord")

    template(v-if="loading")
      div loading...
    template(v-else-if="!loading")
      .title.is-4 {{ resultTitle }}

      table.table.is-fullwidth(v-if="repositoryCount > 0")
        colgroup
          col
          col
          col
          col(width="200")
        thead
          th name
          th owner
          th description
          th star
          tr(v-for="i in edges")
            td
              a(:href="i.node.url" target="_blank") {{ i.node.name }}
            td {{ i.node.owner.login }}
            td
              .elps-text {{ i.node.description }}
            td(nowrap)
              ButtonStar(:node="i.node")
              //- | ★{{ i.node.stargazers.totalCount }}

      ButtonsPaging
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    ButtonsPaging: () => import('@c/button/buttons-paging.vue'),
    ButtonStar   : () => import('@c/button/button-star.vue'),
  },
  mounted() {
    this.getRepositories()
  },
  computed: {
    ...mapGetters('repository', [
      'resultTitle'
    ]),
    ...mapState('repository', [
      'edges',
      'query',
      'repositoryCount',
      'loading',
    ]),
    queryWord: {
      get() {
        return this.query
      },
      set(q) {
        this.setQuery(q)
        this.getRepositories()
      }
    }
  },
  methods: {
    ...mapMutations('repository', [
      'setQuery'
    ]),
    ...mapActions('repository', [
      'getRepositories'
    ]),
  }
}
</script>
<style lang='sass' scoped>
.v-index
  padding: 20px

  .table
    th, td
      +rem(1.4)
      vertical-align: middle
      padding: 5px 10px

      .elps-text
        +elps(1)
        max-width: 500px
</style>

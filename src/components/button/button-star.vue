<template lang='pug'>
.c-button-star
  .button.is-small(
    :class="loading"
    v-if="!isStared"
    @click="checkStar('add')")
    .icon
      i.material-icons.is-size-7 star_border
    div {{ node.stargazers.totalCount }}

  .button.is-small.is-warning(
    :class="loading"
    v-if="isStared"
    @click="checkStar('remove')")
    .icon
      i.material-icons.is-size-7 star
    div {{ node.stargazers.totalCount }}
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    node: null,
  },
  computed: {
    isStared() {
      try {
        if ( this.node.viewerHasStarred ) {
          return 'is-warning'
        } else {
          return false
        }
      } catch (error) {
        return false
      }
    },
  },
  methods: {
    ...mapActions('repository', [
      'addStar',
      'removeStar',
    ]),
    async checkStar(type) {
      this.loading = 'is-loading'
      if ( type == 'add' ) {
        await this.addStar(this.node.id)
      } else {
        await this.removeStar(this.node.id)
      }
      this.loading = false
    }
  }
}
</script>
<style lang='sass' scoped>
.c-button-star
  dl
    display: flex
    flex-wrap: wrap
    dt
      &:after
        content: ':'
        display: inline-block
        padding: 0 5px
</style>

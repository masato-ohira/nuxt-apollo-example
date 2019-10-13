<template>
  <div>
    <nuxt />
  </div>
</template>

<style lang='sass'>
// 共通フレームワークとしてbulmaを利用する
@import '~bulma/bulma.sass'

// transitionを有効にする
// npmからもインストールできるが
// 独自にカスタムしやすいようにsrcに取り込んでおく
@import '~@/assets/sass/libs/vue2-animate/index'

html, body
  +noto

</style>

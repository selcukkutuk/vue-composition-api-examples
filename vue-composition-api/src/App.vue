<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-12 text-center">
        <router-link class="mr-1" to="/">Options Api</router-link>|
        <router-link class="mr-1" to="/composition-api">Composition Api</router-link>|
        <router-link to="/reusable-composition-api">Reusable Composition Api</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

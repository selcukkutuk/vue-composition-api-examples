<template>
  <div class="row mt-5">
    <div class="col-md-12 text-center">
      Hareketsiz kalınan süre
      <span class="badge badge-pill badge-warning">{{idleTime}}</span> saniye
    </div>
    <div class="col-md-12 text-right mb-2">
      <button class="btn btn-info mr-1" @click="toggleState">
        Ürün Listesini Göster/Gizle
        <span class="badge badge-pill badge-dark">{{productCount}}</span>
      </button>
      <button class="btn btn-success" @click="addProduct">Ürün Ekle</button>
    </div>
    <div class="col-md-12" v-if="state">
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th>No</th>
            <th>Adı</th>
            <th>Fiyatı</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{product.id}}</td>
            <td>{{product.name}}</td>
            <td>
              <i class="fas fa-lira-sign"></i>
              {{product.price}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from '@vue/composition-api'
export default {
  setup() {
    const { state, toggleState } = useActivePassive()
    const { products, productCount, addProduct } = useProduct()
    const { idleTime } = useActivityTracker()
    return {
      state,
      toggleState,
      products,
      productCount,
      addProduct,
      idleTime
    }
  }
}

function useActivePassive(def = true) {
  const state = ref(def)
  const toggleState = () => {
    state.value = !state.value
  }
  return { state, toggleState }
}

function useProduct() {
  const products = ref([])
  const productCount = computed(() => products.value.length)

  const addProduct = () => {
    products.value.push({
      id: products.value.length + 1,
      name: 'Ürün ' + (products.value.length + 1).toString(),
      price: Math.ceil(Math.random() * 100).toFixed(2)
    })
  }
  onMounted(() => {
    products.value.push({ id: 1, name: 'Ürün 1', price: (10).toFixed(2) })
  })
  return { products, productCount, addProduct }
}

function useActivityTracker() {
  let intervalIdleTime = null
  const idleTime = ref(0)
  const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
  function activity() {
    idleTime.value = 0
  }
  intervalIdleTime = setInterval(() => idleTime.value++, 1000)
  onMounted(() => {
    activityEvents.forEach(eventName => {
      document.addEventListener(eventName, activity, true)
    })
  })
  onUnmounted(() => {
    activityEvents.forEach(eventName => {
      document.removeEventListener(eventName, activity, true)
    })
    clearInterval(intervalIdleTime)
  })
  return {
    idleTime
  }
}
</script>

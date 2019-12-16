<template>
  <div class="row mt-5">
    <div class="col-md-12 text-center">
      Hareketsiz kalınan süre
      <span class="badge badge-pill badge-warning">{{idleTime}}</span> saniye
    </div>
    <div class="col-md-12 text-right mb-2">
      <button class="btn btn-info mr-1" @click="toggleShow">
        Ürün Listesini Göster/Gizle
        <span class="badge badge-pill badge-dark">{{productCount}}</span>
      </button>
      <button class="btn btn-success" @click="addProduct">Ürün Ekle</button>
    </div>
    <div class="col-md-12" v-if="show">
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
export default {
  created() {
    this.products.push({ id: 1, name: 'Ürün 1', price: (10).toFixed(2) })
    this.intervalIdleTime = setInterval(() => this.idleTime++, 1000)
    this.activityEvents.forEach(eventName => {
      document.addEventListener(eventName, this.activity, true)
    })
  },
  destroyed() {
    this.activityEvents.forEach(eventName => {
      document.removeEventListener(eventName, this.activity, true)
    })
    clearInterval(this.intervalIdleTime)
  },
  data() {
    return {
      activityEvents: ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'],
      show: true,
      products: [],
      idleTime: 0,
      intervalIdleTime: null
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    addProduct() {
      this.products.push({
        id: this.products.length + 1,
        name: 'Ürün ' + (this.products.length + 1).toString(),
        price: Math.ceil(Math.random() * 100).toFixed(2)
      })
    },
    activity() {
      this.idleTime = 0
    }
  },
  computed: {
    productCount() {
      return this.products.length
    }
  }
}
</script>

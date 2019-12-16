<template>
  <div class="container">
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
  </div>
</template>

<script lang="ts">
import { createComponent, ref, Ref } from "@vue/composition-api";
import { reactive, toRefs, onMounted, computed } from "@vue/composition-api";
import { useActivePassive } from "./composable/active-passive";
import { useActivityTracker } from "./composable/activity-tracker";

export default createComponent({
  setup() {
    const { state, toggleState } = useActivePassive();
    const { products, productCount, addProduct } = useProduct();
    const { idleTime } = useActivityTracker();
    return {
      state,
      toggleState,
      products,
      productCount,
      addProduct,
      idleTime
    };
  }
});
function useProduct() {
  const products: Ref<Product[]> = ref<Product[]>([]);
  const productCount = computed<number>(() => products.value.length);

  function addProduct() {
    products.value.push({
      id: products.value.length + 1,
      name: "Ürün " + (products.value.length + 1).toString(),
      price: Math.ceil(Math.random() * 100).toFixed(2)
    });
  }
  onMounted(() => {
    products.value.push({ id: 1, name: "Ürün 1", price: (10).toFixed(2) });
  });
  return { products, productCount, addProduct };
}
interface Product {
  id: number;
  name: string;
  price: string;
}
</script>

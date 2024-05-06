<template>
    <section id="topStatistics" >
        <b-container>
            <div>
                <b-tabs content-class="mt-3" fill>
                  <b-tab title="category" active> <TopCategory/></b-tab>
                  <b-tab title="Product"><TopProduct/></b-tab>
                  <b-tab title="City"><TopCity/></b-tab>
              
                </b-tabs>
            </div>
        </b-container>
    </section>
</template>

<script>

import TopCategory from '@/views/top/TopCategory.vue'
import TopCity from '@/views/top/TopCity.vue'
import TopProduct from '@/views/top/TopProduct.vue'

export default{
    name:'TopStatistics',
    components:{
        TopCategory,
        TopCity,
        TopProduct
    }
}
</script>
<template>
    <section class="allproduts">
        <b-container>
            <div class="row">
                <h1 class="col text-center fw-bolder">All products</h1>
            </div>
            <div class="d-flex justify-content-between mt-5">
                <!----- SEARCH INPUT ----->
                <SearchTable />
                <!----- add prduct ----->
                <AddProduct ref="componentAddprd" />
            </div>
            <div class="d-flex gap-4 mb-2">
                <p class="mb-0 mt-5 cursor" @click="deleteprdselectd" id="deleteProduct" >
                    <b-icon icon="trash"></b-icon> Delete ({{NbrPrdDelete}})
                </p>
                <p class="mb-0 mt-5" id="totalProduct" >
                    <b-icon icon="basket"></b-icon> Total products ({{rows}})
                </p>
            </div>

            <!----- TABLE PRODUCT ----->
            <b-table  responsive striped hover :items="items" :fields="fields" class="mt-2" sort-icon-left id="my-table"
                :per-page="perPage" :current-page="currentPage" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">

                <template #cell(Checked)="dataSelected">
                    <b-form-checkbox id="checkbox-1" name="checkbox-1" value="accepted" unchecked-value="not_accepted"
                        @change="selectBox($event,dataSelected.item,dataSelected.index)">
                    </b-form-checkbox>
                </template>
                <template #cell(Action)="data">
                    <select class="form-select" aria-label="Select an action" v-model="Choose"
                        @change="handleActionChange($event,data.item)">
                        <option selected>Choose...</option>
                        <option value="edit">Edit</option>
                        <option value="delete">Delete</option>
                    </select>
                </template>
            </b-table>

            <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table">
            </b-pagination>

        </b-container>

    </section>
</template>

<script>
    import AddProduct from '../views/products/AddProducts.vue'
    import SearchTable from '../components/SearchTable.vue'
    import {
        mapState,
        mapActions
    } from 'vuex'

    export default {
        name: 'AllProducts',
        components: {
            AddProduct,
            SearchTable
        },
        data() {
            return {
                sortBy: 'Date',
                sortDesc: true,
                fields: [{
                        key: 'Checked',
                        sortable: false
                    },
                    {
                        key: 'Name',
                        sortable: false
                    },
                    {
                        key: 'Price',
                        sortable: true
                    },
                    {
                        key: 'Category',
                        sortable: false
                    },

                    {
                        key: 'Quantity',
                        sortable: false
                    },

                    {
                        key: 'Date',
                        sortable: true
                    },
                    {
                        key: 'Action',
                        sortable: false
                    },

                ],
                Choose: 'Choose...',
                nameInput: '',
                perPage: 10,
                currentPage: 1,
                NbrPrdDelete: 0,
                allPrdDelete: [],
            }
        },

        computed: {
            ...mapState('ProductsModule', {
                productModuleStates: state => state
            }),

            items() {
                let products = []
                for (const category in this.productModuleStates) {
                    this.productModuleStates[category].forEach(product => {
                        let ObjectProduct = {
                            Name: product.name,
                            Price: product.price,
                            Category: category,
                            Quantity: product.quantity,
                            Date: product.date
                        }
                        products.push(ObjectProduct)
                    })
                }
                return products.sort((prdA,prdB)=>prdB-prdA)

            },

            rows() {
                return this.items.length
            }

        },

        methods: {
            ...mapActions('ProductsModule', ['ac_addproduct', 'ac_Removeproduct','ac_fetchProduct']),
          

            handleActionChange(event, item) {

                if (event.target.value === 'delete') {
                    let textConirmation = 'Are you sure you want to delete this product ?'
                    if (confirm(textConirmation) === true) {
                        this.ac_Removeproduct({
                            category: item.Category,
                            date: item.Date
                        })
                        
                    }
                    this.Choose = 'Choose...'

                } else if (event.target.value === 'edit') {
                    this.$bvModal.show('modalAddproduct')
                    this.productModuleStates[item.Category].forEach((prd, index) => {
                        if (item.Date===prd.date) {
                            this.$refs.componentAddprd.editeProduct(prd,item.Category,index)
                            this.Choose = 'Choose...'
                        }
                    })
                }
            },

            selectBox(event, item) {

                if (event === 'accepted') {
                    this.NbrPrdDelete = this.NbrPrdDelete + 1
                    this.allPrdDelete.push(item)
                } else if (event === 'not_accepted') {
                    this.NbrPrdDelete = this.NbrPrdDelete - 1
                    this.allPrdDelete = this.allPrdDelete.filter(product => {
                        return product.Date !== item.Date
                    })
                }
            },

            deleteprdselectd() {
                // array ==> objrct index and category ==> 
                let textConirmation = this.NbrPrdDelete === 1 ? 'Are you sure you want to delete this product ?' :
                    'Are you sure you want to delete these products ?'

                if (confirm(textConirmation) === true) {
                    this.allPrdDelete.forEach(item => {
                        this.ac_Removeproduct({
                            category: item.Category,
                            date: item.Date
                        })
                    })
                }

                // RESTE ALL CHECKBOX
                let allSelectBox = Array.from(this.$el.querySelectorAll('#checkbox-1'))
                allSelectBox.forEach(selc => {
                    selc.checked = false
                })
                // RESTE NUMBERS PRDOCUT SELECTED IN 0
                this.NbrPrdDelete = 0
            },
        },

        mounted(){
            this.ac_fetchProduct()
        }


    }
</script>


<style>
    .allproduts {
        margin-top: 23px;
    }

    #btn-addprd {
        width: 18%;
        height: 37px;
        color: white;
        border: none;
        border-radius: 6px;
        width: 16%;
        height: 37px;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .cursor {
        cursor: pointer;
    }

    thead tr th span {
        display: none;
    }

    /** PHONE */
    @media screen and (max-width: 768px){
        #deleteProduct{
            font-size: 14px;
        }

        #totalProduct{
            font-size: 14px;
        }
    }
</style>
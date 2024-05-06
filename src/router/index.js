import Vue from "vue";
import VueRouter from "vue-router";
import DashBord from '../views/DashBord.vue'
import NewOrders from '../views/NewOrders.vue'
import ConfirmedOredrs from '../views/ConfirmedOrders.vue'
import ShippedOrder from '../views/ShippedOrder.vue'
import DeliVerd from '../views/DeliVerd.vue'
import ReTurn from '../views/ReTurn.vue'
import CanCeld from '../views/CanCeld.vue'
import InProgress from '../views/InProgress.vue'
import LoginUser from '../views/LoginUser.vue'
import SignUp from '../views/SignUp.vue'
import AllProducts from '../views/AllProduct.vue'
import StockProduct from '../views/StockProduct.vue'
import TopStatistics from '../views/TopStatistics.vue'
import WorstStatistics from '../views/WorstStatistics.vue'
import AddOrder from '../views/AddOrder.vue'
import AddCustomer from "../views/customers/AddCustomers.vue"
import TopCustomer from '../views/customers/TopCustomer.vue'
import ProfilUser from '../views/ProfilUser.vue'
import ProfitAbility from '../views/ProfitAbility'
import PageStore from '../views/PageStore.vue'

Vue.use(VueRouter);

const routes = [
  
  { path: '/', component: SignUp },
  { path: '/appEcommerce', component: SignUp , alias: ['/appEcommerce/']},
  { path: '/DashBord', component: DashBord },
  { path: '/Orders/NewOrders', component: NewOrders },
  { path: '/Orders/Confirmed', component: ConfirmedOredrs},
  { path: '/Orders/Shipped', component: ShippedOrder},
  { path: '/Orders/Deliverd', component: DeliVerd},
  { path: '/Orders/Return', component: ReTurn},
  { path: '/Orders/Canceld', component: CanCeld},
  { path: '/Orders/InProgress', component: InProgress},
  { path: '/Login', component: LoginUser},
  { path: '/Products', component: AllProducts},
  { path: '/Stock', component: StockProduct},
  { path: '/Statistics/Top', component: TopStatistics},
  { path: '/Statistics/Worst', component: WorstStatistics},
  { path: '/Orders/Addorder', component: AddOrder},
  { path: '/Customers/AddCustomer', component: AddCustomer},
  { path: '/Customers/TopCustomer', component: TopCustomer},
  { path: '/Profil', component: ProfilUser},
  { path: '/Profitability', component: ProfitAbility},
  { path: '/MyStore', component: PageStore},

];

const router = new VueRouter({
  routes,
});

export default router;

<template>
  <div class="aside" :class="{'showSide':showSideBar}">
    <div class="nav-aside">
      <div class="logobrand  d-none d-sm-block ">
        <a href="http://localhost:8080/MyStore" target="_blank" rel="noopener noreferrer"><img src="https://demo.plainadmin.com/assets/images/logo/logo-white.svg" alt=""></a>
      </div>
      <div class="links ">
        <ul>

          <router-link v-for="(item,index) in links" :key="item.id" :to="item.path?item.path:actualPath" tag="li">
            <a href="" v-b-toggle="item.collapseId" @click="toggleaActive(index)" :class="{'active':ActiveIndex===index}">
              <i :class='item.iconLink'></i> 
              <span id="link-page">{{ item.text }}</span> 
              <i  :ref="`icon-arrow${index}`"   class='bx bxs-chevron-up' v-show="item.arrowCollapse" ></i>
            </a>

            <b-collapse :id="item.collapseId" class="mt-3 mb-3">
              <router-link v-for="(itemCopls,indexChild) in item.childPath" :key="itemCopls.id" :to="itemCopls.path"
                tag="li">
                <a href="" @click="toggleaActiveChild((indexChild+ 1).toString().padStart(3, `${0}${index}`))"
                  id="linkdrop"
                  :class="{'active':ActiveIndex===(indexChild+1).toString().padStart(3,`${0}${index}`)}">{{ itemCopls.text }}
                </a>
              </router-link>
            </b-collapse>

          </router-link>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
  // clic ==> this.activeINdex === number different ==> 
  export default {

    name: 'SideBar',
    props: ['visibleSide', 'showSideBar'],
    data() {
      return {
        links: [{
            path: '/DashBord',
            text: 'DashBord',
            iconLink: 'bx bxs-pie-chart-alt'

          },
          {
            text: 'Orders',
            iconLink: 'bx bxs-cart-alt',
            collapseId: 'collapseOrders',
            arrowCollapse: true,
            childPath: [{
                path: '/Orders/Addorder',
                text: 'Add Order'
              },
              {
                path: '/Orders/NewOrders',
                text: 'New Orders'
              },
              {
                path: '/Orders/Confirmed',
                text: 'Confirmed'
              },
              {
                path: '/Orders/Shipped',
                text: 'Shipped'
              },
              {
                path: '/Orders/Deliverd',
                text: 'Deliverd'
              },
              {
                path: '/Orders/InProgress',
                text: 'In Progress'
              },
              {
                path: '/Orders/Return',
                text: 'Return'
              },
              {
                path: '/Orders/Canceld',
                text: 'Canceld'
              },
             
            ]

          },
          {
            path: '/Products',
            text: 'Products',
            iconLink: 'bx bxs-shopping-bag-alt',
          },

          {
            text: 'Customers',
            iconLink: 'bx bx-user',
            collapseId: 'collapseCustomers',
            arrowCollapse: true,
            childPath: [{
                path: '/Customers/AddCustomer',
                text: 'Add Customer'
              },
              {
                path: '/Customers/TopCustomer',
                text: 'Top Customer'
              },
            ]

          },

          {
            path: '/Stock',
            text: 'Stock',
            iconLink: 'bx bxs-doughnut-chart'

          },

          {
            text: 'Statistics',
            iconLink: 'bx bxs-bar-chart-alt-2',
            collapseId: 'collapseStatistics',
            arrowCollapse: true,
            childPath: [{
                path: '/Statistics/Top',
                text: 'Top'
              },
              {
                path: '/Statistics/Worst',
                text: 'Worst'
              },
            ]

          },

          {
            path: '/Profitability',
            text: 'Profitability',
            iconLink: 'bx bxs-dollar-circle'
          },


        ],
        ActiveIndex: '',

      }
    },

    computed: {
      actualPath() {
        let path = this.$route.path
        return path
      },

    },

    methods: {
      toggleaActive(index) {
        this.ActiveIndex = index
        // rotate arrow icon
        this.$refs[`icon-arrow${index}`][0].classList.toggle('rotate-arrow')
  
      },

      toggleaActiveChild(index) {
        this.ActiveIndex = index
      },

      activeLinkMounted() {
        let actualPath = this.$route.path;
        this.links.forEach((link, index) => {
          if (link.path) {
            link.path === actualPath ? this.ActiveIndex = index : ''
          } else {
            link.childPath.forEach((ele, idxChild) => {
              ele.path === actualPath ? this.ActiveIndex = (idxChild + 1).toString().padStart(3,
                `${0}${index}`) : ''
            })
          }
        });
      }
    },

    mounted() {
      this.activeLinkMounted()

    }

  }
</script>

<style lang="scss">
  .aside {
    background: var(--couleur-primaire-1);
    width: 14%;
    height: 100vh;
    transition: left 0.5s;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    /* Transition animée de la propriété left */

    .nav-aside {
      margin-top: 30px;

      .logobrand {
        margin-bottom: 96px;
        padding: 0px 25px;
      }

      .links ul {
        list-style: none;
        padding-left: 1rem;

        li {
          margin-bottom: 11px;
          padding: 0px 25px;

          a {
            text-decoration: none;
            color: var(--couleur-primaire-2);
            text-wrap: nowrap;
            display: flex;
            align-items: center;

            .bx {
              margin-right: 13px;
              transition: 0.3s;

            }

            #iDrop {
              float: right;
              margin-top: 6px;
            }

            #icArrow-statist {
              float: right;
              margin-top: 6px;
              margin-right: 0px;
            }

          }

          a:hover,
          .active {
            color: var(--couleur-primaire-3);
          }

          a:hover .bx,
          .active .bx {
            color: var(--couleur-primaire-4);
          }

          a:hover #iDrop,
          .active #iDrop {
            color: var(--couleur-primaire-3);
          }

        }

      }
    }
  }

  .rotate-arrow {
    transform: rotate(180deg);
    transition: 0.3s;
  }
  .showSide {
    left: -189px;
    transition: left 0.3s;
  }

  #linkdrop {
    font-size: 13px;
  }

  /** PHONE */
  @media screen and (max-width: 768px) {
    .aside {
      width: 54%;
      position: fixed;
      top: 0;
      right: 0;
      left: -275px;
      transition: left 0.5s;
      z-index: 10;
      border-radius: 0px 16px 16px 10px;

    }

    .showSide {
      left: 0;
      transition: left 0.8s;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }

    .aside .nav-aside .links ul {
      list-style: none;
      padding-left: 0rem;
    }

    .links {
      margin-top: 126px;
    }

    #link-page {
      margin-right: 4px;
    }

  }
</style>


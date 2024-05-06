<template>
    <div id="header">
        <div class="container d-flex justify-content-between align-items-center py-2 py-sm-3">
            <!------ BTN TOGGLE ------->
            <b-button id="btn-toggle" class="d-flex align-items-center h-50" :class="{'hideSidPhone':hideSidPhone}" @click="toggle">
                <b-icon icon="list" aria-hidden="true"></b-icon> <span class="d-none d-sm-block">Menu</span>
            </b-button>
            <!------ SEARCH ------->
            <!-- <b-nav-form class="d-sm-block d-none " id="search"> -->
            <b-form-input size="sm" class="mr-sm-2 ml-2 d-none d-sm-block " placeholder="Search Page" id="search">
            </b-form-input>

            <div class="logobrand d-sm-none">
               <a href="http://localhost:8080/MyStore" target="_blank" rel="noopener noreferrer"></a>  <img src="https://demo.plainadmin.com/assets/images/logo/logo-white.svg" alt="">
            </div>
            <!------ PROFILE MENU ------->
            <div id="cont-profil">
                <b-dropdown size="lg" variant="link" toggle-class="text-decoration-none" no-caret>
                    <template #button-content>
                        <b-avatar variant="info" :src="imageSrc" @click="toggleDropdown" id="badge" >
                            <template #badge>
                            </template>
                        </b-avatar>
                    </template>

                    <b-dropdown-item href="#">Hello <strong>{{ userConnected.fullName }}</strong> </b-dropdown-item>
                    <b-dropdown-item href="#"> Notification</b-dropdown-item>
                    <b-dropdown-divider></b-dropdown-divider>
                    <b-dropdown-item href="#" @click="logout">Log out <b-icon icon="box-arrow-in-right" variant="dark"></b-icon>
                    </b-dropdown-item>
                </b-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        mapActions,
        mapState
    } from 'vuex';


    export default {
        name: 'HeaDer',
        props: ['hideSidPhone'],
        data() {
            return {
                imageSrc: require('@/assets/man.png'),
                listProfil: true,
                dropdownVisible: false,
                emailCurrentUser: '',
            }
        },



        computed: {

            ...mapState('UsersModule', {
                users: 'users',
            }),

            ...mapState('UsersModule', {
                userConnected: state => state.userConnected[0]
            }),

            nameUser() {
                let user = this.userConnected[0]
                return user.fullName
            },

        },

        methods: {
            ...mapActions('UsersModule', ['ac_logOutUser','ac_FetchusersConnected']),

            toggle() {
                this.$emit('toggel-header')
            },

            toggleDropdown() {
                this.dropdownVisible = !this.dropdownVisible;
            },

            logout() {
                this.ac_logOutUser(this.userConnected.id)
                this.$router.push('/Login')
            },

        },

        mounted(){
            this.ac_FetchusersConnected()
            console.log(this.userConnected)
        }

    }
</script>

<style lang="scss">
    #header {
        background-color: var(--couleur-primaire-1);

        .navbar {
            height: 77px;
        }
    }

    #btn-toggle {
        background-color: var(--couleur-primaire-4);
        border: none;
        gap: 10px;
    }

    #search {
        height: 43px;
        width: 256px;
        background-color: transparent;
        padding-left: 14px;
        border: 1px solid var(--couleur-primaire-2);
        color: var(--couleur-primaire-3);
    }

    #search::placeholder {
        color: var(--couleur-primaire-2);
    }

    #btn-search {
        height: 45px;
        width: 81px;
    }

    .prof {
        font-size: 12px;
        margin: 0px;
    }

    #img-profil {
        object-fit: cover;
       
    }

    #badge{
        border: 2px solid;
    }

    #cont-profil .dropdown .btn {
        padding: 0px;
    }



    /** PHONE */
    @media screen and (max-width: 768px) {
        #header{
            border-radius: 0 0 14px 14px;
        }
        #btn-toggle {
            background-color: transparent;
        }

        .hideSidPhone {
            z-index: 1030;
            position: relative;
            // top: 20px;
        }
    }
</style>
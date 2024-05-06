<template>
   <section >
    <b-row>
        <b-col cols="12" > 
            <div class="text-center" > <img  src="@/assets/pageInProgress.png" alt="" id="img"  > </div>
        </b-col>
        <b-col cols="12">
            <h4 class="mx-sm-auto text-sm-center mb-3" id="title" > <strong>Page under construction and development</strong> </h4>
        </b-col>
        <b-col cols="12">
            <p class="text-sm-center mx-auto  mb-5" id="para" >
                We are actively working on this page to provide you with the best possible experience. Please accept our
                apologies for this temporary inconvenience.
            </p>
        </b-col>
        <b-col cols="12" class="text-sm-center">
            <b-button id="btn-Return" @click="toDashboard()"  > Return to Dashboard <b-icon  icon="arrow-right" aria-hidden="true"></b-icon></b-button>
        </b-col>

    </b-row>
   </section>
</template>

<script>
    export default {
        name: 'WorstStatistics',
        methods:{
            toDashboard(){
                this.$router.push('/Dashbord')
            }
        }

    }
</script>

<style scoped >

section{
    margin: 38px 73px;
}

img{
    width: 25%;
}

#title{
    width: 50%;
}

#para{
    width: 62%;
}

#btn-Return{
    background-color:var(--couleur-primaire-4);
    border: none;
}

#btn-Return:hover{
    background-color: #2246d6;
    border: none;
}
#para{
    color:var(--couleur-primaire-2);
    /* width: 67%; */
}

@media screen and (max-width: 768px){
    section{
    margin: 38px 37px;
}
img{
    width: 80%;
}

#title{
    width: 100%;
}

#para{
    width: 100%;
}
}
</style>
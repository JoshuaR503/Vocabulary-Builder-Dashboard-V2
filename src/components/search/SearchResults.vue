<template>
    <div class="container pt-4 pb-4">

        <h3 class="pt-4 pb-4"> 
            <Back/>
            Searching: {{keyWord}}
        </h3>

        <div class="row">
            <div class="col-md-12">
                <form @submit.prevent="initSearch" class="pt-2">
                  <div class="form-group">
                    <label for="search">Search Antyhing</label>
                    <input v-model="keyWord" type="text" class="form-control" placeholder="Search">
                  </div>
                </form>
            </div>

            <div v-if="searchResults.words.length > 0" class="col-md-6 col-sm-12">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th>Word</th>
                            <th>Translation</th>
                            <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="word in searchResults.words" :key="word._id">
                            <td>{{word.word}}</td>
                            <td>{{word.wordTranslation}}</td>
                            <td>
                                <button @click="redirect('word', word._id)" class="btn btn-warning mr-1">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-if="searchResults.users.length > 0" class="col-md-6 col-sm-12">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in searchResults.users" :key="user._id">
                            <td>{{user.name}}</td>
                            <td>{{user.email}}</td>
                            <td>
                                <button @click="redirect('user', user._id)" class="btn btn-warning mr-1">
                                    <i class="fas fa-arrow-right"></i>
                                </button>
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="col-md-12" v-else-if="
                searchResults.words.length === 0 && 
                searchResults.users.length === 0" >
                <div class="content">
                    <Empty
                    title="Nothing to see here" 
                    message="Try using different keywords"/>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Back, Empty, Spinner } from '../../layout/index';
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'SearchResults',
    components: { Empty, Back, Spinner },
    methods: {
        ...mapGetters(['query', 'isSearchLoading']),
        ...mapActions(['search']),

        redirect(where, id) {
            this.$router.push(`/${where}/${id}`);
        },
        replaceRouterParams(param) {
            this.$router
            .replace({params: {query: param}})
            .catch(() => null);
        },
        dispatchSearch(search) {
            this.$store
            .dispatch('search', search)
            .then((response) => {
                this.keyWord = response.query;
                this.searchResults = response.data;
            });
        },
        initSearch() {
            const key = this.keyWord;
            const query = this.$route.params.query;
            const search = key ? key : query;

            this.dispatchSearch(search);
            this.replaceRouterParams(search);
        }
    },
    created() {
        this.initSearch();
    },
    data: () => ({
        keyWord: null,
        searchResults: {
            words: [],
            users: []
        }
    })
}
</script>

<style scoped>
  .fa-arrow-right {
    color: white;
  }
</style>
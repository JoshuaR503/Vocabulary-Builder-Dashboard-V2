<template>
  <div class="page_content">

    <div class="d-flex pt-4 pb-4">
      <div class="mr-auto">
        <h3>Registered Users: {{usersCount}}</h3>
      </div>
    
      <Add component="user" param="new"/>
    </div>

    <div class="form-group">
      <input v-model="query" @keyup="searchUsers(query)" class="form-control" placeholder="Word Search">
    </div>

    <div v-if="usersIsLoading">
      <Spinner/>
    </div>

    <div v-else-if="users.length > 0" class="fadeIn content">
      <div class="page_container">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role === 'UpperPermission' ? 'Admin' : 'Editor'}}</td>
                <td>
                  <Edit component="user" :param="user._id" />
                </td>
                <td>
                  <button @click="deleteUser(user._id)" type="button" class="btn btn-danger ml-1">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <nav v-if="!query" aria-label="Page navigation example pt-2">
        <ul class="pagination justify-content-center">
          
          <li  class="page-item" v-bind:class="{ disabled: usersSkip === 0 }" >
            <button class="page-link" @click="prev">Previous</button>
          </li>

          <li class="page-item" v-bind:class="{ disabled: users.length > usersSkip  }">
            <button class="page-link" @click="next">Next</button>
          </li>
        </ul>
      </nav>

    </div>

    <div v-else-if="query && !usersIsLoading" class="fadeIn content">
      <Empty 
        title="Could not find any results" 
        message="Try using different keywords."/>
    </div>

    <div v-else-if="query.length === 0" class="content fadeIn">
      <Empty 
        title="Nothing to see here" 
        message="Start by adding new users."/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Spinner, Empty, Add, Edit } from '../../layout/index';

export default {
  name: 'UserTable',
  components: {  Empty,  Spinner, Add, Edit },
  computed: mapGetters(['users', 'usersCount', 'usersIsLoading', 'usersSkip']),
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser', 'searchUsers', 'setUserSkip']),

    next() {
      this.updateSkip(NEXT);
      this.fetchUsers();
    },

    prev() {
      this.updateSkip(PREV);
      this.fetchUsers();
    },
  },
  created() {
    this.fetchUsers();    
  },
  data: () => ({
    query: ''
  })
}
</script>

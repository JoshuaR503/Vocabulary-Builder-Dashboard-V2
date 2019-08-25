<template>
  <div class="page_content">

    <div v-if="usersIsLoading">
      <Spinner/>
    </div>

    <div v-else-if="users.length > 0" class="content">
      <div class="row pt-4 pb-4">
        <div class="col-sm-6">
          <div class="text-left">
            <h3>Registered Users: {{usersCount}}</h3>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="text-right">
            <button @click="add" class="btn btn-primary">
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </div>

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
                  <button @click="edit(user._id)" type="button" class="btn btn-warning mr-1">
                    <i class="fas fa-pen"></i>
                  </button>
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
    </div>

    <div v-else class="content">
      <Empty 
        title="Nothing to see here" 
        message="Start by adding new users."/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { 
  Spinner,
  Empty
} from '../../layout/index';

export default {
  name: 'UserTable',
  components: { Empty, Spinner },
  computed: mapGetters(['users', 'usersCount', 'usersIsLoading']),
  methods: {
    // Actions from Vuex.
    ...mapActions(['fetchUsers', 'deleteUser']),
    
    // Edit an user.
    edit(id) {
      this.$router.push(`/user/${id}`);
    },

    // Add a user.
    add() {
      this.$router.push('/user/new');
    }
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style scoped>
  i {
    color: white;
  }
</style>
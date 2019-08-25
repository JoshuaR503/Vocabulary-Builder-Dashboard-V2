<template>
  <div class="page_content">

    <div v-if="usersIsLoading">
      <Spinner/>
    </div>

    <div v-else-if="users.length > 0" class="content">
      <div class="page_container">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user._id">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role === 'UpperPermission' ? 'Admin' : 'Editor'}}</td>
                <td>
                  <button type="button" class="btn btn-warning mr-1">
                    <i @click="edit(user._id)" class="fas fa-pen"></i>
                  </button>
                </td>
                <td>
                  <button type="button" class="btn btn-danger ml-1">
                    <i @click="deleteUser(user._id)" class="fas fa-trash"></i>
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
  computed: mapGetters(['users', 'usersIsLoading']),
  methods: {
    ...mapActions(['fetchUsers', 'deleteUser']),
    
    edit(id) {
      this.$router.push(`/user/${id}`);
    },
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
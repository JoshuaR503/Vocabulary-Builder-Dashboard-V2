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
          <Add component="user" param="new"/>
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
    </div>

    <div v-else class="content">
      <Add component="user" param="new"/>

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
  computed: mapGetters(['users', 'usersCount', 'usersIsLoading']),
  methods: mapActions(['fetchUsers', 'deleteUser']),
  created() {
    this.fetchUsers();
  }
}
</script>

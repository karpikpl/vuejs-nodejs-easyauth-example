<template>
  <div class="hello">
    <Header />
    <div class="container mrgnbtm">
          <div class="row">
            <div class="col-md-4">
                <DisplayBoard :numberOfUsers="numberOfUsers" @getAllUsers="getAllUsers()" />
            </div>
          </div>
    </div>
    <div class="row mrgnbtm">
        <Users v-if="users.length > 0" :users="users" />
    </div>
    <div class="row mrgnbtm">
        <UserInfo />
    </div>
  </div>
</template>

<script>
import Header from './Header.vue'
import DisplayBoard from './DisplayBoard.vue'
import Users from './Users.vue'
import UserInfo from './UserInfo.vue'
import { getAllUsers } from '../services/UserService'

export default {
  name: 'Ping',
  components: {
    Header,
    DisplayBoard,
    Users,
    UserInfo
  },
  data() {
      return {
          users: [],
          numberOfUsers: 0
      }
  },
  methods: {
    getAllUsers() {
      getAllUsers().then(response => {
        console.log(response)
        this.users = response
        this.numberOfUsers = this.users.length
      }).catch(error => {
        console.log("Error fetching all user data", error)
      })
    }
  },
  mounted () {
    this.getAllUsers();
  }
}
</script>
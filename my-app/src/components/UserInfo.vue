<template>
    <div class="container">
        <div class="header">
            User Roles
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userRoles" :key="item.val">
                    <td>{{ item.val }}</td>
                </tr>
            </tbody>
        </table>
        <div class="header">
            All claims
        </div>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Claim</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in userClaims" :key="item.name">
                    <td>{{ item.typ }}</td>
                    <td>{{ item.val }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getUserInfo } from '../services/UserInfoService'

export default {
    name: 'UserInfo',
    data() {
        return {
            userClaims: [],
            userRoles: []
        }
    },
    methods: {
        getUserInfo() {
            console.log("I am in getUserInfo!!!")

            getUserInfo().then(response => {
                console.log(response)
                this.userClaims = response[0].user_claims;
                this.userRoles = response[0].user_claims.filter(x => x.typ === "roles");
            })
        }
    },
    mounted() {
        this.getUserInfo();
    }
}
</script>
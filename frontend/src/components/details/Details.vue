<template>
  <div class="exec-details">
    <h1>Execution Details</h1>

    <div v-if="errors.length > 0">
      Error calling API! Errors are:
      <div v-for="error in errors">
        <ul>
          <li>
           Http Response code: <span class="error" v-html="error.response.status"></span>
          </li>
        </ul>
      </div>
    </div>
    <table v-else>
      <tbody>
      <tr>
        <td colspan="4">

        </td>
      </tr>
      <tr>

      </tr>
      <tr>

      </tr>
      <tr>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { AXIOS } from '../../util/http-common'

  export default {
    name: 'details',

    data() {
      return {
        errors: [],
        response: null
      }
    },

    created() {
      this.retrieveExecutionDetails()
    },

    watch: {
      '$route': 'retrieveExecutionDetails'
    },

    methods: {
      // Fetches execution details when the component is created.
      retrieveExecutionDetails() {
        console.info(this.$route.params.id);
        AXIOS.get(`jobs/${this.$route.params.id}`) // TODO: get UUID from url
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .error {
    color: red;
  }
</style>

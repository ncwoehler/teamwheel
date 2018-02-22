<template>
  <div>
    <h1>Welcome to</h1>
    <img src="./../assets/Faustus.png">
    <div>
      <h3>Execution details page</h3>
      <table>
        <tbody>
        <tr>
          <td>1. Enter token:</td>
          <td><input v-model="token"/></td>
        </tr>
        <tr>
          <td>2. Enter executions ID:</td>
          <td><input v-model="execId"/></td>
        </tr>
        <tr>
          <td>3. Open page:</td>
          <td v-if="enableLink"><a :href="url" target="_blank">Show details</a></td>
          <td v-else>Enter token and ID first to obtain the link</td>
        </tr>
        </tbody>
      </table>
      <p>

      </p>
      <p>

      </p>

    </div>
    <p style="padding-top: 20px;">
      <b>OR</b> go to <a href="/#/questions/" target="_blank">Question Master</a>
    </p>
    <p>
      <b>OR</b> go to <a href="/#/bootstrap/" target="_blank">Bootstrap</a>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'index',

    data() {
      return {
        execId: null,
        token: null
      }
    },
    computed: {
      url: function () {
        return `/#/details/${this.execId}`;
      },
      enableLink: function () {
        return this.token && this.execId;
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>

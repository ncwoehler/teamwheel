<template>
  <div id="watch-example">
    <img src="./../assets/Faustus.png">
    <p>
      Ask a yes/no question:
      <input v-model="question">
    </p>
    <p :class="{ error: hasError }">{{ answer }}</p>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'service',

  data: () => {
    return {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!',
      hasError: false
    }
  },
  watch: {
    // whenever question changes, this function will run
    question: function (val, oldVal) {
      this.hasError = false;
      this.answer = 'Waiting for you to stop typing...';
      this.getAnswer();
    }
  },
  methods: {
    // _.debounce is a function provided by lodash to limit how
    // often a particularly expensive operation can be run.
    // In this case, we want to limit how often we access
    // yesno.wtf/api, waiting until the user has completely
    // finished typing before making the ajax request. To learn
    // more about the _.debounce function (and its cousin
    // _.throttle), visit: https://lodash.com/docs#debounce
    getAnswer: _.debounce(
      function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)';
          return;
        }

        const client = axios.create({
          baseURL: `https://yesno.wtf/`,
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        });
        this.answer = 'Thinking...';
        const vm = this;
        client.get('/api')
        .then((response) => {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch((error) => {
          vm.answer = 'Error! Could not reach the API. ' + error
          vm.hasError = true;
        })
      },
      // This is the number of milliseconds we wait for the
      // user to stop typing.
      500
    )

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

  .error {
    color: red;
  }
</style>

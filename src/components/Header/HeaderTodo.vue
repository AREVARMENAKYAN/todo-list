<template>
  <div id="app">
    <nav class="fixed-nav">
      <ul>
        <li><router-link to="/"><img class="todo-logo" src="../../assets/images/todo-logo.png"></router-link></li>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        <li><router-link to="/contact">Contact Us</router-link></li>
      </ul>
    </nav>
  </div>
</template>

<script src="./header.js"></script>

<style scoped>
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 7%;
  background-color: #707c83;
  z-index: 900;
}

.fixed-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.fixed-nav li {
  margin-right: 100px;
  font-size: 30px;
}

.fixed-nav li:last-child {
  margin-right: 0;
}

.fixed-nav a {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
}

.fixed-nav a:hover {
  background-color: #555;
}

.todo-logo {
  width: 50px;
  height: 50px;
}
</style>

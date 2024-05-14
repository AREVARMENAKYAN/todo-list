<template>
    <h1>404 Page not found!</h1>
    <p>Sorry, the page you are looking for does not exist</p>
    <RouterLink to="/"><span>Go Home page</span></RouterLink>
    <div>
        <img src="../../../assets/images/404-error.AVIF" alt="404 Error">
    </div>
</template>

<style scoped>
h1 {
    margin-top: 100px;
}

div {
    display: flex;
    justify-content: center
}

img {
    width: 500px;
    height: 500px;
}

p {
    font-size: 30px;
    font-style: oblique;
    display: flex;
    justify-content: center
}

h1 {
    font-size: 80px;
    display: flex;
    justify-content: center
}

span {
    font-size: 30px;
    color: red;
    display: flex;
    justify-content: center
}
</style>
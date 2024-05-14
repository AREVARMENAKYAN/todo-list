<template>
    <footer class="footer">
        <div class="footer-content">
            <p>&copy; 2024 A.Armenakyan. All rights reserved.</p>
            <nav>
                <ul>
                    <li>
                        <router-link to="/"><img class="todo-imgs" src="../../assets/images/todo-logo.png" />
                        </router-link>
                    </li>
                    <li>
                        <a href="https://www.facebook.com/" target="_blank">
                            <img class="todo-imgs" src="../../assets/images/fb-logo.png">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/" target="_blank">
                            <img class="todo-imgs" src="../../assets/images/insta-logo.jpeg">
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/arevik-armenakyan-756417249/" target="_blank">
                            <img class="todo-imgs" src="../../assets/images/linkdin.png">
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/AREVARMENAKYAN" target="_blank">
                            <img class="todo-imgs" src="../../assets/images/github.png">
                        </a>
                    </li>

                </ul>
            </nav>
        </div>
    </footer>

</template>

<script src="./footer.js"></script>

<style scoped>
.todo-imgs {
    width: 30px;
    height: 30px;
}

.footer {
    width: 100%;
    background-color: #333;
    color: #fff;
    text-align: center;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-content p {
    margin: 0;
}

ul {
    list-style-type: none;
    color: white;
    margin-right: 250px;
    display: inline-block
}
</style>
<template>
    <div class = "homepage">
        <h1 class ="Title">BeeBox</h1>
        <p class="intro">Welcome to the beebox online monitor</p>
        <div class="container">
            <button class="button">
                <router-link to="/device">
                    <h2 class="button-text">Go To device</h2>
                </router-link>
            </button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

.homepage {
    text-align: center;
    margin-top: 20px;
}
.intro {
    font-size: 20px;
    color: #000000;
    margin-top: 20px;
}
.Title {
    font-size: 50px;
    color: #4CAF50; 
}
.container {
    margin-top: 50px;
}
.button {
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, box-shadow 0.2s;
}
.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
.button-text {
    font-size: 20px;
    font-weight: bold;
    color: #4CAF50;
}
</style>
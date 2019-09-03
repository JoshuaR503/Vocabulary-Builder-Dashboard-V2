<template>
    <div class="container mt-4 pt-4">
        <h1 class="text-center">{{title}}</h1>
        <p class="p-2 text-center">{{message}}</p>
    </div>
</template>

<script>
export default {
    name: 'Empty',
    props: ['title', 'message']
}
</script>
<template>
    <div style="max-width: 300px; display: flex; align-items: center">
        <span>
            {{field.data === null ? 'EMPTY' : field.data}} 
        </span>
    </div>
</template>

<script>
export default {
    props: ['field', 'item', 'is_title_field']
}
</script>

<style scoped lang="scss">

</style>
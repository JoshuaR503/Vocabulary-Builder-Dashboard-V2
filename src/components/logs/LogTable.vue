
<template>
    <div class="page_content">
        <Empty 
        title="Nothing to see here" 
        message="Start by adding new users."/>
    </div>
</template>

<script>
import { 
  Spinner,
  Empty
} from '../../layout/index';

export default {
    name: 'LogTable',
    components: { Empty, Spinner }
}
</script>
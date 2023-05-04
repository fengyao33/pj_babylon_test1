<template>
  <div>
  <h3>Babylon</h3>
  <canvas></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { BasicScene } from '@/Babylon/BabylonScence'
// import { StandardMaterials } from '@/Babylon/StandardMaterials'
import { PBR } from '@/Babylon/PBR'

export default defineComponent({
  name: 'BabylonExamples',
  mounted(){
    const canvas = document.querySelector("canvas")!;
    // new BasicScene(canvas);
    new PBR(canvas);
  }
});
</script>

<style scoped>
canvas{
  width: 70%;
  height: 70%;
}

</style>

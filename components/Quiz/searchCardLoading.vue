<template>
        <div class="card bg-image mb-6">
        </div>
</template>

<script setup lang="ts">
</script>

<style scoped>

@media only screen and (max-width: 520px) {
.card{
    border-radius: 24px;
}
.bg-image{
    width: 100%;
    position: relative;
    border-radius: 24px;
    height: 150px;
    background: linear-gradient(27.47deg, rgba(0, 0, 0, 0.77) 31.09%, rgba(0, 0, 0, 0) 79.45%);
}
.details{
    position: absolute;
    bottom: 16px;
    margin-left: 16px;
    margin-right: 16px;
}
.title{
color:white;
font-weight: 500;
font-size: 16px;
line-height: 27px;
}

.des {
  color:white;
  font-weight: 300;
font-size: 12px;
line-height: 22px;
}
.vl {
  border-left: 1px solid white;
  margin-top: 3px;
  margin-bottom: 3px;
}
}


@media only screen and (min-width: 520px) {
    .card{
        border-radius: 24px;
        margin-top: 12px;
    }
    .bg-image{
        width: 100%;
        position: relative;
        border-radius: 24px;
        height: 270px;
        background: linear-gradient(27.47deg, rgba(0, 0, 0, 0.77) 31.09%, rgba(0, 0, 0, 0) 79.45%);
    }
    .details{
        position: absolute;
        bottom: 20px;
        margin-left: 12px;
        margin-right: 12px;
    }
    .title{
    color:white;
    }
    
    .des {
      font-weight: 500;
      font-size: 12px;
    }
    .vl {
      border-left: 1px solid whitey;
      margin-top: 3px;
      margin-bottom: 3px;
    }
    }
</style>
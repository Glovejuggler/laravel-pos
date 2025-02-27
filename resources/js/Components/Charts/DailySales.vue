<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    fetch: String
})

const loading = ref(true)
const chart = ref(null)
onMounted(async () => {
  const response = await axios.get(props.fetch)
  const { labels, net, cost } = response.data

  const footer = (tooltipItems) => {
    let sum = 0;

    tooltipItems.forEach(function(tooltipItem) {
      sum += tooltipItem.parsed.y;
    });
    return 'Gross: ' + sum.toFixed(2).toLocaleString('en-US');
  };

  new Chart(chart.value, {
    type: 'bar', 
    data: {
      labels: labels, 
      datasets: [{
        data: net,
        label: 'Net',
        borderColor: 'rgb(22, 101, 52)',
        backgroundColor: 'rgba(22, 101, 52, 0.5)',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
      {
        data: cost,
        label: 'Cost',
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            footer: footer,
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    },
  })

  loading.value = false
})
</script>

<template>
  <section v-if="loading" class="animate-pulse flex flex-col h-full">
    <div class="flex items-center space-x-2">
        <i class="aspect-square p-6 bg-slate-200 dark:bg-zinc-900 rounded-full"></i>
        <span class="bg-zinc-700 text-zinc-700 rounded-2xl">Sales</span>
    </div>
    <div class="w-full flex-1 dark:bg-zinc-700 rounded-2xl mt-4"></div>
  </section>

  <section :class="{'hidden': loading}">
    <div class="flex items-center space-x-2">
        <i class="bx bx-bar-chart aspect-square p-4 bg-slate-200 dark:bg-zinc-900 rounded-full"></i>
        <span>Sales</span>
    </div>
    <canvas ref="chart"></canvas>
  </section>
</template>
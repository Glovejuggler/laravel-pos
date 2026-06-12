<script setup>
import { onMounted, ref, nextTick } from 'vue';
import Chart from 'chart.js/auto';

const props = defineProps({
    fetch: String,
})

const loading = ref(true)
const chart = ref(null)

let chartData = null

onMounted(async () => {
    const response = await axios.get(props.fetch)
    chartData = response.data

    loading.value = false

    await nextTick()
    initChart()
})

const initChart = () => {
    if (!chart.value) return

    const { labels, net, cost } = chartData

    const footer = (tooltipItems) => {
        let sum = 0
        tooltipItems.forEach((t) => (sum += t.parsed.y))
        return 'Gross: ' + sum.toFixed(2)
    }

    new Chart(chart.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
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
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: '#a1a1aa' },
                },
                y: {
                    stacked: true,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#a1a1aa' },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 10,
                        boxHeight: 10,
                        borderRadius: 3,
                        usePointStyle: true,
                        color: '#d4d4d8',
                    },
                },
                tooltip: {
                    callbacks: { footer },
                    backgroundColor: 'rgba(24,24,27,0.9)',
                    titleColor: '#f4f4f5',
                    bodyColor: '#d4d4d8',
                    footerColor: '#a1a1aa',
                    borderColor: 'rgba(63,63,70,0.5)',
                    borderWidth: 1,
                    padding: 10,
                    cornerRadius: 8,
                },
            },
            interaction: { intersect: false, mode: 'index' },
        },
    })
}
</script>

<template>
    <!-- Loading skeleton -->
    <div v-if="loading" class="h-full flex flex-col animate-pulse">
        <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-700"></div>
            <div class="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700"></div>
        </div>
        <div class="flex-1 rounded-xl bg-zinc-200 dark:bg-zinc-700/50"></div>
    </div>

    <!-- Chart -->
    <div v-else class="h-full flex flex-col">
        <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
                <i class="bx bx-bar-chart text-sm text-emerald-600 dark:text-emerald-400"></i>
            </div>
            <span class="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">Daily Sales</span>
        </div>
        <div class="flex-1 min-h-0">
            <canvas ref="chart"></canvas>
        </div>
    </div>
</template>

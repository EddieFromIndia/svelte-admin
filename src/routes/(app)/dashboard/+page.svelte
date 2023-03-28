<script>
//@ts-nocheck
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import { Bar } from 'svelte-chartjs';
    import 'chart.js/auto';

    let chartData = {
        labels: [],
        datasets: [
            {
                label: 'Sales Data',
                data: [],
                backgroundColor: 'rgba(98, 182, 239, 1)',
            }
        ],
    };

    onMount(async () => {
        
        try {
            const { data } = await axios.get('chart');

            chartData.labels = data.map(item => item.date);
            chartData.datasets[0].data = data.map(item => item.sum);
        }
        catch {
            await goto('/login');
        }
    });
</script>

<h2>Daily Sales</h2>
<Bar data={chartData} />
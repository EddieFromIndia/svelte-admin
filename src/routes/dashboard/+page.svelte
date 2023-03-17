<script>
// @ts-nocheck
    
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import axios from 'axios';
    import c3 from 'c3'
    import Menu from '$lib/components/menu.svelte';

    let chart;

    onMount(async () => {
        
        try {
            const columns = [['x'], ['Sales']];
            chart = c3.generate({
                bindto: '#chart',
                data: {
                x: 'x',
                columns,
                types: {
                    Sales: 'bar'
                }
                },
                axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                    format: '%Y-%m-%d'
                    }
                }
                }
            });

            updateChart();
        }
        catch {
            await goto('/login');
        }
    });

    async function updateChart() {
        const { data } = await axios.get('http://localhost:8000/api/chart', {withCredentials: true});

        chart.load({
            columns: [
                ['x', ...data.map(d => d.date)],
                ['Sales', ...data.map(d => d.sum)],
            ]
            });
    }
</script>

<div class="container-fluid">
    <div class="row">
        <Menu />
    
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <h2>Daily Sales</h2>
        <div id="chart"></div>
        </main>
    </div>
</div>
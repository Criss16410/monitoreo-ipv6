const socket = io();
const ctx = document.getElementById('grafico').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            { label: 'Temp (°C)', borderColor: 'red', data: [], fill: false },
            { label: 'Hum (%)', borderColor: 'blue', data: [], fill: false }
        ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

socket.on('historial', (datos) => datos.forEach(d => agregar(d)));
socket.on('nuevoDato', (dato) => agregar(dato));

function agregar(d) {
    chart.data.labels.push(new Date(d.fecha).toLocaleTimeString());
    chart.data.datasets[0].data.push(d.temperatura);
    chart.data.datasets[1].data.push(d.humedad);

    // Limitar el número de datos a 20 para evitar que crezca mucho
    if (chart.data.labels.length > 20) {
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
        chart.data.datasets[1].data.shift();
    }

    chart.update();
}

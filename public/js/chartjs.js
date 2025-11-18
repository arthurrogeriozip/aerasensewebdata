Chart.register(window["chartjs-plugin-annotation"]);

const ctx1 = document.getElementById("compararAlertas");

new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Setor A", "Setor B", "Setor C", "Setor D"],
    datasets: [
      {
        label: "Quantidade de alertas totais",
        data: [10, 6, 13, 8],
        backgroundColor: "#36A2EB",
        borderWidth: 1,
      },
      {
        label: "Quantidade de alertas críticos (>= 1,9%)",
        data: [4, 1, 2, 3],
        backgroundColor: "#FF6384",
        borderWidth: 1,
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        labels: {
          font: {},
        },
      },
      title: {
        display: true,
        text: "Alertas por setor",
        position: "top",
        align: "center",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Quantidade de alertas",
          color: "#555",
          font: { size: 12, weight: "600" },
          padding: { bottom: 8 },
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Setores",
          color: "#555",
          font: { size: 12, weight: "600" },
          padding: { bottom: 8 },
        },
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },
  },
});

//   grafico 2
// plugin para linha fixa de limite de explosividade



const ctx3 = document.getElementById("qtdSensores");

new Chart(ctx3, {
  type: 'doughnut',
  data: {
    labels: [
      'Setor A',
      'Setor B',
      'Setor C',
      'Setor D'
    ],
    datasets: [{
      label: 'Quantidade de sensores',
      data: [25, 18, 13, 15],
      backgroundColor: [
        'rgba(80, 160, 22, 1)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgba(117, 12, 203, 1)'
      ],
      hoverOffset: 4,
    }]
  },
  options: {
    plugins: {
      legend: {
        position: "right"
      },
      title: {
        display: true,
        text: "Quantidade total de sensores por setor",
        position: "top",
        align: "start",
        font: {
          size: 20,
        },
      }
    }
  }
});

/*Gráficos Indivíduais dos sensores*/


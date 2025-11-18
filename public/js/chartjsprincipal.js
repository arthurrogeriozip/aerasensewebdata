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

const ctx2 = document.getElementById("mediaSetor");
const limiteExplosividade = 1.9;

new Chart(ctx2, {
  type: "line",
  data: {
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    datasets: [
      {
        label: "Setor A",
        data: [
          0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.13, 0.15, 0.16, 0.17, 0.18,
          0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.29, 0.3,
        ],
        backgroundColor: "#1f77b4",
        borderWidth: 3,
        borderColor: "#1f77b4",
      },
      {
        label: "Setor B",
        data: [
          0.12, 0.12, 0.13, 0.13, 0.14, 0.14, 0.14, 0.13, 0.13, 0.14, 0.15,
          0.15, 0.15, 0.16, 0.16, 0.16, 0.17, 0.17, 0.17, 0.18, 0.18, 0.19,
          0.18, 0.18,
        ],
        backgroundColor: "#17becf",
        borderWidth: 3,
        borderColor: "#17becf",
      },
      {
        label: "Setor C",
        data: [
          0.3, 0.31, 0.33, 0.34, 0.36, 0.37, 0.39, 0.4, 0.42, 0.43, 0.45, 0.47,
          0.49, 0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, 0.64, 0.66, 0.68, 0.7,
        ],
        backgroundColor: "#2ca02c",
        borderWidth: 3,
        borderColor: "#2ca02c",
      },
      {
        label: "Setor D",
        data: [
          0.3, 0.34, 0.38, 0.43, 0.48, 0.54, 0.6, 0.67, 0.74, 0.82, 0.9, 0.99,
          1.08, 1.18, 1.28, 1.39, 1.51, 1.63, 1.76, 1.9, 2.04, 2.19, 2.3, 2.4,
        ],
        backgroundColor: "#9467bd",
        borderWidth: 3,
        borderColor: "#9467bd",
      },
    ],
  },
  options: {
    scales: {
      y: {
        title: {
          display: true,
          text: "Concentração de GLP (%)",
          color: "#555",
          font: { size: 12, weight: "600" },
          padding: { bottom: 8 },
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Hora do dia (0–23)",
          color: "#555",
          font: { size: 12, weight: "600" },
          padding: { top: 8 },
        },
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },

    plugins: {
      annotation: {
        drawtime: "afterdraw",
        annotations: {
          linhaLimite: {
            type: "line",
            yMin: limiteExplosividade,
            yMax: limiteExplosividade,
            borderWidth: 3,
            borderColor: "#ff0000",
            borderDash: [8, 4],
            label: {
              display: false,
              content: "Valor limítrofe de explosividade",
              position: "end",
              backgroundColor: "rgba(255,0,0,0.65)",
              color: "white",
              padding: 6,
              borderRadius: 6,
              font: {
                weight: "bold",
              },
            },
            enter: function (ctx2, event) {
              ctx2.element.label.options.display = true;
              ctx2.chart.draw(); //aparece a box na linha fixa
            },
            leave: function (ctx2, event) {
              ctx2.element.label.options.display = false;
              ctx2.chart.draw(); //some a box da linha fixa
            },
          },
        },
      },
      legend: {
        labels: {
          font: {},
        },
      },
      title: {
        display: true,
        text: "Concentração média por setor",
        position: "top",
        align: "start",
        font: {
          size: 20,
        },
      },
    },
  },
});


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
    data: [8, 7, 4, 3],
    backgroundColor: [
      'rgba(80, 160, 22, 1)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgba(216, 36, 168, 1)'
    ],
    hoverOffset: 4,
  }]
}, 
 options: {
        plugins: {
          legend:{
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

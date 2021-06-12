<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js"></script>
<script src="https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js"></script>
<script>
  import { Line } from 'vue-chartjs'
  export default {
    extends: Line,
    props: {
      chartData: {
        type: Array,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: true
              }
            }]
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: true
        }
      }
    },
    mounted () {
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            borderColor: '#76C6D1',
            pointBackgroundColor: '#DDF1F3',
            borderWidth: 1,
            pointBorderColor: '#76C6D1',
            backgroundColor: '#DDF1F3',
            data: this.chartData
          }
        ]
      }, this.options)
    },
    watch: {
      chartData: function () {
        // this.renderChart(this.chartData, this.options)
        this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'patients',
            borderColor: '#76C6D1',
            pointBackgroundColor: '#DDF1F3',
            borderWidth: 1,
            pointBorderColor: '#76C6D1',
            backgroundColor: '#DDF1F3',
            data: this.chartData
          }
        ]
      }, this.options)
      }
    }
  }
</script>

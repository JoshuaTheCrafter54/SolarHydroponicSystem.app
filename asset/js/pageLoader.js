// PAGE LOADER
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        // Remove active style from all tabs
        document.querySelectorAll('.nav-tab').forEach(t => {
            t.classList.remove('active-bg');
            t.classList.remove('text-white');
        });

        // Add active style to clicked tab
        this.classList.add('active-bg');

        // Hide all page sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.add('d-none');
        });

        // Show the target page section
        const pageId = 'page-' + this.dataset.page;
        document.getElementById(pageId).classList.remove('d-none');
    });
});

// TOGGLE EDITOR

function toggleEditor() {
      document.getElementById('editor').classList.toggle('open');
    }
    function cancelEdit() {
      document.getElementById('editor').classList.remove('open');
    }
    function applyEdit() {
      const dateVal = document.getElementById('date-input').value;
      const timeVal = document.getElementById('time-input').value;

      if (dateVal) {
        const d = new Date(dateVal + 'T00:00:00');
        const formatted = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        document.getElementById('date-pill').textContent = formatted;
      }

      if (timeVal) {
        const [h, m] = timeVal.split(':').map(Number);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour = h % 12 || 12;
        const min = String(m).padStart(2, '0');
        document.getElementById('time-pill').textContent = `${hour}:${min} ${ampm}`;
      }

     document.getElementById('editor').classList.remove('open');
}

// Sample data for datalog UI

    /* ── Shared chart factory ── */
    const BLUE   = '#1ab8e8';
    const GOLD   = '#f5c400';
    const LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep'];
 
    function makeColors(data) {
      return data.map((_, i) => (i === data.length - 1 ? GOLD : BLUE));
    }
 
    function buildChart(id, data) {
      const ctx = document.getElementById(id).getContext('2d');
      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: LABELS,
          datasets: [{
            data,
            backgroundColor: makeColors(data),
            borderRadius: 3,
            borderSkipped: false,
            barPercentage: 0.65,
            categoryPercentage: 0.75,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 800, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1a1a2e',
              titleColor: '#f5c400',
              bodyColor: '#fff',
              cornerRadius: 6,
              padding: 8,
            },
            /* value labels on top of bars */
            datalabels: false,
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: {
                color: '#555',
                font: { family: 'Space Grotesk', size: 9 },
              },
              border: { display: false }
            },
            y: {
              display: false,
              grid: { display: false },
            }
          },
          layout: { padding: { top: 20 } }
        },
        plugins: [{
          /* Draw value labels above each bar */
          id: 'topLabels',
          afterDatasetsDraw(chart) {
            const { ctx, data } = chart;
            ctx.save();
            chart.getDatasetMeta(0).data.forEach((bar, i) => {
              const value = data.datasets[0].data[i];
              ctx.fillStyle = '#333';
              ctx.font = `bold 9px 'Space Grotesk', sans-serif`;
              ctx.textAlign = 'center';
              ctx.fillText(value, bar.x, bar.y - 4);
            });
            ctx.restore();
          }
        }]
      });
    }
 
    /* ── Dataset values (matching approximate bar heights in the image) ── */
    buildChart('chartTemp',  [3.8, 2.4, 3.1, 2.2, 3.0, 2.8, 4.2, 3.9, 5.0]);
    buildChart('chartHumid', [4.0, 2.6, 3.3, 2.1, 3.2, 3.0, 4.5, 4.1, 5.0]);
    buildChart('chartWater', [3.5, 2.2, 2.9, 2.0, 2.8, 2.6, 4.0, 3.7, 5.0]);
    buildChart('chartLight', [3.7, 2.5, 3.0, 2.3, 3.1, 2.9, 4.3, 4.0, 5.0]);
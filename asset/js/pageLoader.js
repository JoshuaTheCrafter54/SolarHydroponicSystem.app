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
// ==UserScript==
// @name         Moodle Grade Dashboard
// @match        https://moodle.lsu.edu/*
// ==/UserScript==

(function () {
const styles = `

body {
  background: #f0f4f8; 
}
.grade-dashboard-button {
  position: fixed;
  top: 90px;
  right: 24px;
  z-index: 2147483647;
  background: #461D7C;
  color: white;
}

#myra-dashboard {
  font-family: 'Roboto', sans-serif;
}

.dashboard-shell {
  width: 390px;
  margin: 30px auto;
  background: #ffffff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(0,0,0,.16);
}

.dashboard-header {
  background: #0d6682;
  color: white;
  padding: 18px 20px 14px;
  text-align: center;
}

.dashboard-title {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
}

.dashboard-subtitle {
  font-size: 14px;
  font-weight: 300;
  opacity: .8;
  margin-top: 4px;
}

.semester-tabs {
  background: #0d6682;
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 10px 0 12px;
  border-top: 1px solid rgba(255,255,255,.12);
}

.semester-tabs span {
  opacity: .75;
}

.semester-tabs .active-tab {
  opacity: 1;
  background: rgba(255,255,255,.15);
  padding: 4px 16px;
  border-radius: 6px;
  font-weight: 500;
}

.class-row {
  display: grid;
  grid-template-columns: 1fr auto 18px;
  align-items: center;
  min-height: 92px;
  padding: 14px 18px;
  border-bottom: 1px solid #e5e5e5;
  background: white;
}

.class-name {
  font-size: 24px;
  font-weight: 500;
  color: #222;
  line-height: 1.15;
}

.class-label {
  font-size: 16px;
  color: #8a8a8a;
  margin-top: 6px;
}

.class-grade {
  text-align: right;
  margin-right: 12px;
  font-size: 24px;
  font-weight: 500;
  color: #222;
  line-height: 1;
}

.class-arrow {
  color: #c6c6c6;
  font-size: 30px;
  font-weight: 300;
}
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

  const gradesPage = "https://moodle.lsu.edu/grade/report/overview/index.php";

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";
  document.head.appendChild(link);

  function makeButton() {
    const btn = document.createElement("button");
    btn.textContent = "Grade Dashboard ⋆｡°✩";
    btn.className = "grade-dashboard-button";
    btn.onclick = () => window.location.href = gradesPage;
    document.body.appendChild(btn);
  }

  function buildDashboard() {
    if (!location.href.includes("/grade/report/overview/index.php")) return;

    const tables = [...document.querySelectorAll("table")];
    const rows = tables.flatMap(table => [...table.querySelectorAll("tr")]);

    const classes = rows.map(row => {
      const cells = [...row.querySelectorAll("td")].map(c => c.innerText.trim());
      return cells;
    }).filter(cells => {
      const course = cells[0];
      const grade = cells[cells.length - 1];

      return (
        cells.length >= 2 &&
        course &&
        course.toLowerCase() !== "course name" &&
        grade &&
        grade.toLowerCase() !== "grade"
      );
    });

    const dashboard = document.createElement("div");
    dashboard.id = "myra-dashboard";

    dashboard.innerHTML = `
      <div class="dashboard-shell">
        <div class="dashboard-header">
          <div class="dashboard-title">Classes</div>
          <div class="dashboard-subtitle">for Myra Murray</div>
        </div>

        <div class="semester-tabs">
          <span class="active-tab">Summer 2026</span>
        </div>

        <div id="myra-grade-cards"></div>
      </div>
    `;

    const cardArea = dashboard.querySelector("#myra-grade-cards");

    classes.forEach(cells => {
      const course = cells[0] || "course";
      const grade = cells[cells.length - 1] || "not posted";

      const card = document.createElement("div");
      card.className = "class-row";

      card.innerHTML = `
        <div class="class-info">
          <div class="class-name">${course}</div>
        </div>

        <div class="class-grade">${grade}</div>

        <div class="class-arrow">›</div>
      `;

      cardArea.appendChild(card);
    });

    document.body.prepend(dashboard);
  }

  makeButton();
  buildDashboard();
})();
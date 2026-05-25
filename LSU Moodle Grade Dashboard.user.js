// ==UserScript==
// @name         LSU Moodle Grade Dashboard
// @match        https://moodle.lsu.edu/*
// @grant        none
// ==/UserScript==

(function () {
  const gradesPage = "https://moodle.lsu.edu/grade/report/overview/index.php";

   /*Roboto Font Stylesheet*/
  const link = document.createElement("link");
   link.rel = "stylesheet";
   link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";
   document.head.appendChild(link);


    /*Make Button to Access Grades*/
  function makeButton() {
    const btn = document.createElement("button");
    btn.textContent = "grade dashboard";

    btn.style.cssText = `
      position: fixed;
      top: 90px;
      right: 24px;
      z-index: 2147483647;
      background: #461D7C;
      color: white;
      padding: 14px 20px;
      border: none;
      border-radius: 14px;
      font: 700 15px 'Roboto', sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,.25);
      cursor: pointer;
    `;

    btn.onclick = () => window.location.href = gradesPage;
    document.body.appendChild(btn);
  }

  function buildDashboard() {
    if (!location.href.includes("/grade/report/overview/index.php")) return;

    const tables = [...document.querySelectorAll("table")];
    const rows = tables.flatMap(table => [...table.querySelectorAll("tr")]);

    const classes = rows.map(row => {
      const cells = [...row.querySelectorAll("td, th")].map(c => c.innerText.trim());
      return cells;
    }).filter(cells => cells.length >= 2);

    const dashboard = document.createElement("div");

      dashboard.innerHTML = `
  <div style="
    width: 390px;
    margin: 30px auto;
    background: #ffffff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 12px 35px rgba(0,0,0,.16);
    font-family: 'Roboto', sans-serif;
  ">
    <div style="
      background: #0d6682;
      color: white;
      padding: 18px 20px 14px;
      text-align: center;
    ">
      <div style="font-size: 22px; font-weight: 700; line-height: 1;">
        classes
      </div>
      <div style="font-size: 14px; font-weight: 300; opacity: .8; margin-top: 4px;">
        current semester
      </div>
    </div>

    <div style="
      background: #0d6682;
      color: white;
      display: flex;
      justify-content: space-around;
      padding: 10px 0 12px;
      border-top: 1px solid rgba(255,255,255,.12);
    ">
      <span style="opacity:.75;">q1</span>
      <span style="opacity:.75;">q2</span>
      <span style="opacity:.75;">q3</span>
      <span style="
        background: rgba(255,255,255,.15);
        padding: 4px 16px;
        border-radius: 6px;
        font-weight: 500;
      ">s2</span>
    </div>

    <div id="myra-grade-cards"></div>
  </div>
`;

const cardArea = dashboard.querySelector("#myra-grade-cards");

classes.slice(0, 4).forEach(cells => {
  const course = cells[0] || "course";
  const grade = cells[cells.length - 1] || "not posted";

  const card = document.createElement("div");

  card.innerHTML = `
    <div style="
      display: grid;
      grid-template-columns: 1fr auto 18px;
      align-items: center;
      min-height: 92px;
      padding: 14px 18px;
      border-bottom: 1px solid #e5e5e5;
      background: white;
    ">
      <div>
        <div style="
          font-size: 24px;
          font-weight: 500;
          color: #222;
          line-height: 1.15;
        ">
          ${course}
        </div>

        <div style="
          font-size: 16px;
          color: #8a8a8a;
          margin-top: 6px;
        ">
          current semester grade
        </div>
      </div>

      <div style="
        text-align: right;
        margin-right: 12px;
      ">
        <div style="
          font-size: 24px;
          font-weight: 500;
          color: #222;
          line-height: 1;
        ">
          ${grade}
        </div>
      </div>

      <div style="
        color: #c6c6c6;
        font-size: 30px;
        font-weight: 300;
      ">
        ›
      </div>
    </div>
  `;

  cardArea.appendChild(card);

        /*Cards that show my grade*/
      card.innerHTML = `
  <div style="
    background: #fff;
    border: 1px solid #ddd;
    border-top: 6px solid #461D7C;
    border-radius: 12px;
    padding: 18px;
    min-height: 140px;
    box-shadow: 0 3px 10px rgba(0,0,0,.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  ">
    <div>
      <h2 style="
        font-size: 17px;
        margin: 0 0 8px 0;
        line-height: 1.3;
      ">${course}</h2>

      <p style="
        margin: 0;
        color: #666;
        font-size: 14px;
      ">current semester grade</p>
    </div>

    <div style="
      font-size: 26px;
      font-weight: 800;
      color: #222;
    ">${grade}</div>
  </div>
`;

      cardArea.appendChild(card);
    });

    document.body.prepend(dashboard);
  }

    /*Call Functions*/
    buildDashboard();
    makeButton();
})();
let fetchedData = [];
let chartInstance = null;

// Handle Login
async function handleLogin(event) {
  event.preventDefault();

  const credentials = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      // Successful login, hide login form and show data content
      document.getElementById("login-form").style.display = "none";
      document.getElementById("data-content").style.display = "block";
      console.log("Login successful!");

      // Automatically update data after login
      await updateData();
    } else {
      // Show error message if login fails
      document.getElementById("login-error").style.display = "block";
    }
  } catch (error) {
    console.error("Error during login:", error);
    document.getElementById("login-error").style.display = "block";
  }
}

// Fetch data from the backend after login
async function updateData() {
  const credentials = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("http://localhost:4000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    fetchedData = await response.json();
    console.log("Data updated:", fetchedData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render chart
function renderChart(datasets) {
  const ctx = document.getElementById("chart").getContext("2d");

  // Destroy previous chart instance if it exists
  if (chartInstance) {
    chartInstance.destroy();
  }

  // Chart creation for line graph
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: fetchedData.map((d) => d.statline_id),
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Game ID",
          },
        },
        y: {
          title: {
            display: true,
            text: "Stat Values",
          },
        },
      },
    },
  });
}

// Points Graph
function points() {
  renderChart([
    {
      label: "Points",
      data: fetchedData.map((d) => d.points),
      borderColor: "red",
      fill: false,
    },
  ]);
}

// Assists Graph
function assists() {
  renderChart([
    {
      label: "Assists",
      data: fetchedData.map((d) => d.assists),
      borderColor: "blue",
      fill: false,
    },
  ]);
}

// Rebounds Graph
function rebounds() {
  renderChart([
    {
      label: "Rebounds",
      data: fetchedData.map((d) => d.rebounds),
      borderColor: "orange",
      fill: false,
    },
  ]);
}

// Blocks Graph
function blocks() {
  renderChart([
    {
      label: "Blocks",
      data: fetchedData.map((d) => d.blocks),
      borderColor: "pink",
      fill: false,
    },
  ]);
}

// Steals Graph
function steals() {
  renderChart([
    {
      label: "Steals",
      data: fetchedData.map((d) => d.steals),
      borderColor: "green",
      fill: false,
    },
  ]);
}

// All Stats Graph (Multi-Line Chart)
function allStats() {
  renderChart([
    {
      label: "Points",
      data: fetchedData.map((d) => d.points),
      borderColor: "red",
      fill: false,
    },
    {
      label: "Assists",
      data: fetchedData.map((d) => d.assists),
      borderColor: "blue",
      fill: false,
    },
    {
      label: "Rebounds",
      data: fetchedData.map((d) => d.rebounds),
      borderColor: "orange",
      fill: false,
    },
    {
      label: "Blocks",
      data: fetchedData.map((d) => d.blocks),
      borderColor: "pink",
      fill: false,
    },
    {
      label: "Steals",
      data: fetchedData.map((d) => d.steals),
      borderColor: "green",
      fill: false,
    },
  ]);
}

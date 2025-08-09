// Dashboard JavaScript for School Admin Analytics

document.addEventListener("DOMContentLoaded", function () {
  // Initialize dashboard
  initializeCharts();
  setupEventListeners();
  animateStats();
  updateDateTime();
});

// Setup Event Listeners
function setupEventListeners() {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
    });
  }

  // Navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove active class from all links
      navLinks.forEach((l) => l.classList.remove("active"));
      // Add active class to clicked link
      this.classList.add("active");
    });
  });

  // Time filter change
  const timeFilter = document.querySelector(".time-filter");
  if (timeFilter) {
    timeFilter.addEventListener("change", function () {
      updateEnrollmentChart(this.value);
    });
  }
}

// Initialize all charts
function initializeCharts() {
  createEnrollmentChart();
  createGradeChart();
  createDepartmentChart();
  createFinanceChart();
}

// Student Enrollment Trend Chart
function createEnrollmentChart() {
  const ctx = document.getElementById("enrollmentChart");
  if (!ctx) return;

  const enrollmentChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "New Enrollments",
          data: [45, 52, 38, 65, 48, 72],
          borderColor: "#667eea",
          backgroundColor: "rgba(102, 126, 234, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#667eea",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#f1f5f9",
          },
          ticks: {
            color: "#64748b",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#64748b",
          },
        },
      },
      elements: {
        point: {
          hoverRadius: 8,
        },
      },
    },
  });
}

// Grade Distribution Pie Chart
function createGradeChart() {
  const ctx = document.getElementById("gradeChart");
  if (!ctx) return;

  const gradeChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["A Grade", "B Grade", "C Grade", "D Grade", "F Grade"],
      datasets: [
        {
          data: [35, 28, 22, 10, 5],
          backgroundColor: [
            "#10b981",
            "#3b82f6",
            "#f59e0b",
            "#f97316",
            "#ef4444",
          ],
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            usePointStyle: true,
            color: "#64748b",
          },
        },
      },
      cutout: "60%",
    },
  });
}

// Department Performance Bar Chart
function createDepartmentChart() {
  const ctx = document.getElementById("departmentChart");
  if (!ctx) return;

  const departmentChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mathematics", "Science", "English", "History", "Arts", "PE"],
      datasets: [
        {
          label: "Average GPA",
          data: [3.8, 3.6, 3.9, 3.4, 3.7, 3.5],
          backgroundColor: [
            "#667eea",
            "#f093fb",
            "#4facfe",
            "#43e97b",
            "#f59e0b",
            "#8b5cf6",
          ],
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 4.0,
          grid: {
            color: "#f1f5f9",
          },
          ticks: {
            color: "#64748b",
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#64748b",
          },
        },
      },
    },
  });
}

// Financial Overview Chart
function createFinanceChart() {
  const ctx = document.getElementById("financeChart");
  if (!ctx) return;

  const financeChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Revenue",
          data: [120000, 135000, 128000, 145000, 138000, 152000],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
        {
          label: "Expenses",
          data: [85000, 92000, 88000, 95000, 90000, 98000],
          borderColor: "#ef4444",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          align: "end",
          labels: {
            usePointStyle: true,
            color: "#64748b",
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#f1f5f9",
          },
          ticks: {
            color: "#64748b",
            callback: function (value) {
              return "$" + value / 1000 + "K";
            },
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#64748b",
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
    },
  });
}

// Update enrollment chart based on time filter
function updateEnrollmentChart(period) {
  // This would typically fetch new data from an API
  // For demo purposes, we'll use static data
  let newData;
  let newLabels;

  switch (period) {
    case "6m":
      newLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      newData = [45, 52, 38, 65, 48, 72];
      break;
    case "1y":
      newLabels = ["Q1", "Q2", "Q3", "Q4"];
      newData = [135, 165, 142, 185];
      break;
    case "3y":
      newLabels = ["2022", "2023", "2024"];
      newData = [587, 642, 721];
      break;
    default:
      newLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
      newData = [45, 52, 38, 65, 48, 72];
  }

  // Update chart (you would need to store chart instance globally)
  console.log("Updating chart with period:", period);
}

// Animate statistics on page load
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-info h3");

  statNumbers.forEach((stat) => {
    const target = parseFloat(stat.textContent.replace(/[^\d.]/g, ""));
    const isPercentage = stat.textContent.includes("%");
    const isDollar = stat.textContent.includes("$");
    const isComma = stat.textContent.includes(",");

    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      let displayValue = Math.floor(current);
      if (isPercentage) {
        displayValue = ((current / 100) * target).toFixed(1) + "%";
      } else if (isDollar) {
        displayValue = "$" + Math.floor(current).toLocaleString();
      } else if (isComma) {
        displayValue = Math.floor(current).toLocaleString();
      }

      stat.textContent = displayValue;
    }, 20);
  });
}

// Update date and time
function updateDateTime() {
  const now = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  // You can add a date/time element to the header if needed
  console.log("Current time:", now.toLocaleDateString("en-US", options));
}

// Simulate real-time data updates
function simulateRealTimeUpdates() {
  setInterval(() => {
    // Update attendance rate
    const attendanceElement = document.getElementById("attendanceRate");
    if (attendanceElement) {
      const currentRate = parseFloat(attendanceElement.textContent);
      const variation = (Math.random() - 0.5) * 0.4; // Random variation of ±0.2%
      const newRate = Math.max(90, Math.min(99, currentRate + variation));
      attendanceElement.textContent = newRate.toFixed(1) + "%";
    }

    // Update notification badge
    const badge = document.querySelector(".badge");
    if (badge) {
      const currentCount = parseInt(badge.textContent);
      const shouldUpdate = Math.random() > 0.8; // 20% chance to update
      if (shouldUpdate) {
        badge.textContent = Math.max(
          0,
          currentCount + (Math.random() > 0.5 ? 1 : -1)
        );
      }
    }
  }, 10000); // Update every 10 seconds
}

// Initialize real-time updates
setTimeout(simulateRealTimeUpdates, 5000);

// Chart color schemes for different themes
const chartColorSchemes = {
  default: {
    primary: "#667eea",
    secondary: "#f093fb",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
  },
  dark: {
    primary: "#818cf8",
    secondary: "#f472b6",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    info: "#60a5fa",
  },
};

// Export functions for potential use in other scripts
window.DashboardApp = {
  updateEnrollmentChart,
  animateStats,
  simulateRealTimeUpdates,
};

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading states for charts
function showChartLoading(chartId) {
  const container = document.querySelector(`#${chartId}`).parentElement;
  container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 300px; color: #64748b;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-right: 1rem;"></i>
            Loading chart data...
        </div>
    `;
}

// Add error handling for charts
function handleChartError(chartId, error) {
  console.error(`Error loading chart ${chartId}:`, error);
  const container = document.querySelector(`#${chartId}`).parentElement;
  container.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 300px; color: #ef4444;">
            <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-right: 1rem;"></i>
            Error loading chart data
        </div>
    `;
}

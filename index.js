const buttonDaily = document.getElementById("buttonDaily");
const buttonWeekly = document.getElementById("buttonWeekly");
const buttonMonthly = document.getElementById("buttonMonthly");
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");

buttonDaily.addEventListener("click", () => {
  daily.style.display = "grid";
  weekly.style.display = "none";
  monthly.style.display = "none";

  buttonDaily.style.color = "#fff";
  buttonWeekly.style.color = "hsl(236, 100%, 87%)";
  buttonMonthly.style.color = "hsl(236, 100%, 87%)";
});

buttonWeekly.addEventListener("click", () => {
  daily.style.display = "none";
  weekly.style.display = "grid";
  monthly.style.display = "none";

  buttonDaily.style.color = "hsl(236, 100%, 87%)";
  buttonWeekly.style.color = "#fff";
  buttonMonthly.style.color = "hsl(236, 100%, 87%)";
});
buttonMonthly.addEventListener("click", () => {
  daily.style.display = "none";
  weekly.style.display = "none";
  monthly.style.display = "grid";

  buttonDaily.style.color = "hsl(236, 100%, 87%)";
  buttonWeekly.style.color = "hsl(236, 100%, 87%)";
  buttonMonthly.style.color = "#fff";
});

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    daily.innerHTML = "";
    weekly.innerHTML = "";
    monthly.innerHTML = "";

    data.forEach((item) => {
      const { title, timeframes } = item;
      const {
        daily: dailyData,
        weekly: weeklyData,
        monthly: monthlyData,
      } = timeframes;

      const createCategoryHTML = (categoryTitle, timeframe) => {
        const formattedTitle = categoryTitle
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");

        return `
        <div class="category">
         <div class="category-${formattedTitle}" alt="${formattedTitle}">
            <img src="./images/icon-${formattedTitle}.svg" >
         </div>
        
        
          <div class="category-info">
           <div class="category-title">
            <p>${categoryTitle}</p>
            <img src="./images/icon-ellipsis.svg" alt="ellipsis icon" />          
           </div>
           <div class="category-time">
            <p class="category-time-current">${timeframe.current}hrs</p>
            <p class="category-time-previous">Last Week - ${timeframe.previous}hrs</p>
           </div>
          </div>
        </div>
      `;
      };

      daily.innerHTML += createCategoryHTML(title, dailyData);
      weekly.innerHTML += createCategoryHTML(title, weeklyData);
      monthly.innerHTML += createCategoryHTML(title, monthlyData);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

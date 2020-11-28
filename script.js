function createTrip(trip) {
    const tripEl = document.createElement("li");
    tripEl.setAttribute("id", trip.id);
    const tripElMarkup = `
        <label for="${trip.country}-${trip.startDate}">
        </label>
        <span>${trip.country}, ${trip.startDate.toDateString()}-${trip.endDate.toDateString()},${trip.days}Days</span>
      </div>
      <button class="remove-trip">
        ❌
      </button>
    `;
    tripEl.innerHTML = tripElMarkup;
    tripList.appendChild(tripEl);
  }

function removeTrip(tripId) {
    trips = trips.filter((trip) => trip.id !== parseInt(tripId));
    localStorage.setItem("trips", JSON.stringify(trips));
    document.getElementById(tripId).remove();
}

const tripForm = document.querySelector(".trip-form");
    let trips = [];

const calculateDays = (a, b) => {
  const timeDiff = a.getTime()-b.getTime() ;
  const daysDiff = timeDiff / (1000 * 3600 * 24); 
  return daysDiff;
}

const displayTotalDays = (trips) => {
  const baseDate = new Date(document.getElementById("baseDate").value);
  newTrips = [];
  //check for effective trips
  for (trip of trips) {
    if (calculateDays(baseDate, trip.startDate) >= 180 && 
    calculateDays(baseDate, trip.endDate)  >= 180) {
    } else {
      newTrips.push(trip);
    }
  }
  sum = 0;
  //add up effective trip days 
  for (trip of newTrips) {
    if(calculateDays(baseDate, trip.startDate) >= 180 ) {
      const daysEffective = 180 - (calculateDays(baseDate, trip.endDate));
      sum += daysEffective
    } else {
      sum += trip.days
    }
  }
  //first trip
  // const firstTrip = newTrips.sort((a, b) => a.startDate - b.startDate)[0];
  //available days 
  // const availableDays = baseDate - firstTrip.startDate - sum;
  document.getElementById("usedDays").innerHTML = sum;
}
 
tripForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const inputCountry = document.getElementById("country").value;
  const inputStartDate = new Date(document.getElementById("startDate").value);
  const inputEndDate = new Date(document.getElementById("endDate").value);

  const valueCheck = () => {
      if (inputStartDate !="" && inputEndDate !="" && inputCountry !="") {
          return true;
      } else {
          alert ('please enter all values')
          return false;
      }
  }
  
  const timeCheck = () => {
      if (inputStartDate > inputEndDate ) {
          alert('your start Date is after your end date!');
          return false;
      } else {
          return true;
      }
  }

  if (valueCheck() && timeCheck()){
    const trip = {
      id: new Date().getTime(),
      country: inputCountry, 
      startDate: inputStartDate,
      endDate: inputEndDate,
      days: calculateDays(inputEndDate, inputStartDate)

    };
    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));
    createTrip(trip);
    displayTotalDays(trips);
    tripForm.reset();
  }
}); 


const tripList = document.querySelector(".trip-list");
 
  tripList.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("remove-trip") ||
      e.target.parentElement.classList.contains("remove-trip")
    ) {
      const tripId = e.target.closest("li").id;
      removeTrip(tripId);
      displayTotalDays(trips);
    }
});
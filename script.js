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
  //get basedate. default today if not selected.
  let baseDate;
  if (document.getElementById("baseDate").value) {
    baseDate = new Date(document.getElementById("baseDate").value)
  } else {
    baseDate = new Date();
  };
  // get dayOne by subtracting 180 days from basedate
  let dayOne = baseDate;
  dayOne.setDate(baseDate.getDate() - 180);
  console.log(dayOne);

  newTrips = [];
  //check for effective days and calculate sum
  // for (trip of trips) {
  //   if (calculateDays(baseDate, trip.startDate) <= 180 && 
  //   trip.days <= 180) {
  //     newTrips.push(trip);
  //   } else if ( )
      
  //   }
  // }
  sum = 0;
  //add up effective trip days 
  // for (trip of newTrips) {
  //   if(calculateDays(baseDate, trip.startDate) >= 180 ) {
  //     const daysEffective = 180 - (calculateDays(baseDate, trip.endDate));
  //     sum += daysEffective
  //   } else {
  //     sum += trip.days
  //   }
  // }
  document.getElementById("usedDays").innerHTML = sum;
}


//if from the list, there is a trip with an end date before dayone , ignore
// if from the list there is a trip with a start date before the dayone but end date after dayone, 
//     subtract the days between end date and day one and add to sum
// remove repeated days

//Hit Submit to add a new trip. 
tripForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const inputCountry = document.getElementById("country").value;
  const inputStartDate = new Date(document.getElementById("startDate").value);
  const inputEndDate = new Date(document.getElementById("endDate").value);

  const valueCheck = () => {
      if (isNaN(inputStartDate) == false && isNaN(inputEndDate) == false && inputCountry !="") {
          return true;
      } else {
          alert ('please enter all values')
          return false;
      }
  }
  
  const timeCheck = () => {
      if (inputStartDate > inputEndDate ) {
          alert('Your Start Date is after your End Date!');
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

//Remove Trip
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
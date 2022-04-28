function createTrip(trip) {
    const tripEl = document.createElement("li");
    tripEl.setAttribute("id", trip.id);
    const tripElMarkup = `
        <label for="${trip.country}-${trip.startDate}">
        </label>
        <span>${trip.country}, ${trip.startDate.toDateString()}-${trip.endDate.toDateString()}, <strong>${trip.days}</strong> days</span>
      </div>
      <a class="remove-trip">&times;</a>
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

// duplicate days
// const calculateDuplicate = (trips) => {
//   trips.forEach(trip => if (trips[trips.length-1].startDate) )
//   if ( trips[trips.length-1].startDate < )
// }

const displayTotalDays = (trips) => {
  //calculate the last day of the entire 180 day period
  lastDate = trips[trips.length-1].endDate;
  //calculate the total number of days by summing each trip days.
  sum = 0;
  trips.forEach(trip => sum += trip.days );
  document.getElementById("usedDays").innerHTML = sum;
}

//on form submission
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
          alert('Your End Date is before your start date!');
          return false;
      } else {
          return true;
          
      }
  }

  // const chronologyCheck = () => {
  //   if (inputEndDate < trips[trips.length-1].endDate ) {
  //     alert("please fill your trip in chronological order")
  //   } else {
  //     return true;
  //   }
  // }
  if (valueCheck() && timeCheck()){
    const trip = {
      id: new Date().getTime(),
      country: inputCountry, 
      startDate: inputStartDate,
      endDate: inputEndDate,
      days: calculateDays(inputEndDate, inputStartDate)

    };
    trips.push(trip);
    //check for chronological order 
    //check for duplicate days
    if (trips.length > 1 && (trip.startDate < trips[trips.length-2].startDate)) {
      alert("please enter the trips in a chrological order!");
      trips.pop();
    } else if (trips.length > 1 && (trip.startDate <= trips[trips.length-2].endDate)) {
      alert("you have duplicate days!");
      trips.pop();
    } else {
      console.log(trips, trips[trips.length-1].endDate);
      localStorage.setItem("trips", JSON.stringify(trips));
      createTrip(trip);
      displayTotalDays(trips);
      tripForm.reset();
    }


    // if (trips.length > 1 && (trip.startDate < trips[trips.length-2].endDate)){
    //   alert("you have duplicate days!");
    //   trips.pop();
    // } else if (trips.length > 1 && (trip.startDate < trips[trips.length-2].startDate)) {
    //   alert("please enter the trips in a chrological order!");
    //   trips.pop();
    // } else {
    //   console.log(trips, trips[trips.length-1].endDate);
    //   localStorage.setItem("trips", JSON.stringify(trips));
    //   createTrip(trip);
    //   displayTotalDays(trips);
    //   tripForm.reset();
    // }

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
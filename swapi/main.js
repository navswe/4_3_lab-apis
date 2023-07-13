const getResidentsBtn = document.querySelector("#get-residents");
const residentsList = document.querySelector("#residentsList");

// Error function
const errCallback = (err) => console.log(err.response.data);

// Function to retrieve data for Alderaan planet from SWAPI
const getResidentsList = (event) => {
  axios
    .get("https://swapi.dev/api/planets/2/")
    .then(displayResidentsCallback)
    .catch(errCallback);
};

// Function to display residents of Alderaan
const displayResidentsCallback = (response) => {
  const residentUrls = response.data.residents;
  residentsList.innerHTML = ""; // Clear the previous resident list

  const residentRequests = residentUrls.map((residentUrl) =>
    axios.get(residentUrl)
  );
  axios
    .all(residentRequests)
    .then((responses) => {
      responses.forEach((residentResponse) => {
        const residentName = residentResponse.data.name;
        const residentListItem = document.createElement("li");
        residentListItem.textContent = residentName;
        residentsList.appendChild(residentListItem);
      });
    })
    .catch(errCallback);
};

getResidentsBtn.addEventListener("click", getResidentsList);

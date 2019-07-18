// const dateformat = require("dateformat"); // not used.
let dateStr;
let dDate = new Date();
let sDate = new Date();
let disseminationParsed;
let statisticalParsed;
let apiData;

document.getElementById("getDissemination");
//.addEventListener("click", getDissemination);
//console.log("poop");

// document.getElementById("getDissemination").innerHTML =
//   "<ol><li>poop</li></ol>";

function getDissemination() {

  fetch("https://kalendari.hagstova.fo/api/Dissemination")
    .then(res => res.json())
    .then(disseminationData => {
      let outputDissemination = '<ul id="myUL">';
      // change to stringify and parse
      let dissArray = ([] = disseminationData);
      // disseminationData.forEach(function(dissemination) {

      for (let i = 0; i < dissArray.length; i++) {
        if (i < 5) {
          // console.log("This is dissArray!: ", typeof dissArray, dissArray[i]);

          let dissJSONstring = JSON.stringify(dissArray[i]);
          // console.log(
          //   "This is dissJSONstring: ",
          //   typeof dissJSONstring,
          //   dissJSONstring
          // );

          let dissJSONparsed = JSON.parse(dissJSONstring);
          disseminationParsed = dissJSONparsed; // to use later in dropdownlist
          console.log(
            "This is dissJSONparsed: ",
            typeof dissJSONparsed,
            dissJSONparsed
          );
          // console.log(
          //   "This is date BEFORE: ",
          //   typeof dissJSONparsed.date,
          //   dissJSONparsed.date
          // );

          // This code will dependent on the language selection. Either Faroeese or english.
          try {
            dissJSONparsed.date = new Date(
              dissJSONparsed.date
            ).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }); // maybe new variable name?? .split(" ").join("-")

            // Day variable
            day_JSON = new Date(dissJSONparsed.date).toLocaleDateString(
              "en-GB",
              {
                day: "numeric"
                //month: "short",
                //year: "numeric"
              }
            );
            // Month variable
            month_JSON = new Date(dissJSONparsed.date).toLocaleDateString(
              "en-GB",
              {
                //day: "numeric"
                month: "short"
                //year: "numeric"
              }
            );
            // year variable
            year_JSON = new Date(dissJSONparsed.date).toLocaleDateString(
              "en-GB",
              {
                //day: "numeric"
                //month: "short"
                year: "numeric"
              }
            );

            console.log(
              "This should be date! AFTER: ",
              typeof dissJSONparsed.date,
              dissJSONparsed.date
            );
          } catch (err) {
            console.log("This mean that date conversion failed. ", err);
          }

          outputDissemination += `

          <li><a>${dissJSONparsed.statisticalPublicationId}</a>${dissJSONparsed.name}, ${day_JSON} ${month_JSON} ${year_JSON}</li>`;
        }
      }

      outputDissemination += `</ul>`

      document.getElementById(
        "outputDissemination"
      ).innerHTML = outputDissemination;
      // console.log("Last disseminationData", disseminationData);
    });
}

document.getElementById("getStatisticalPublication");
// .addEventListener("click", getStatisticalPublication);

function getStatisticalPublication() {
  console.log("Hey getStatisticalPublication() works!");
  fetch("https://kalendari.hagstova.fo/api/StatisticalPublication")
    .then(res => res.json())
    .then(statisticalPublicationData => {
      let outputStatisticalP =
        '<select id="mySelect" onChange="onChangeFunction()" onkeyup="filterFunction()" type="search" class="select-table-filter" data-table="order-table">';
      // change to stringify and parse
      let statArray = ([] = statisticalPublicationData);
      // statisticalPublicationData.forEach(function(dissemination) {

      for (let i = 0; i < statArray.length; i++) {
        statJSONstring = JSON.stringify(statArray[i]);

        statJSONparsed = JSON.parse(statJSONstring);
        statisticalParsed = statJSONparsed;

        outputStatisticalP += `

        <option value="${statJSONparsed.id}">${statJSONparsed.name}</option>

     `;
      }
      outputStatisticalP += "</select>";

      console.log("This is statJSONparsed", statJSONparsed);

      document.getElementById(
        "outputStatisticalP"
      ).innerHTML = outputStatisticalP;
    });

  getDissemination();
}

//getDissemination();
getStatisticalPublication();
getDissemination();



function onChangeFunction() {

  var e = document.getElementById("mySelect");
  var strUser = e.options[e.selectedIndex].value;

  var x = document.getElementById("mySelect").value;

  console.log("You selected: " + x);
  // document.getElementById("demo").innerHTML = "You selected: " + x;



  console.log("prumpis");


  var input, filter, ul, li, a, i, txtValue;
  
  input = document.getElementById("mySelect").value;

  filter = x.toUpperCase();
  
  ul = document.getElementById("myUL");
  
  li = ul.getElementsByTagName("li");


  
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      
    

      txtValue = a.textContent || a.innerText;

      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }




}



function filterFunction() {}
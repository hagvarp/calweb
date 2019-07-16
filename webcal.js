try {
  var moment = require("moment");
  console.log("Moment works!: ", moment());
} catch (err) {
  console.log("This is the MOMENT error!", err);
}

// const dateformat = require("dateformat"); // not used.
let dateStr;
let dDate = new Date();
let sDate = new Date();
let disseminationParsed;
let statisticalParsed;

document.getElementById("getDissemination");
//.addEventListener("click", getDissemination);
//console.log("poop");

// document.getElementById("getDissemination").innerHTML =
//   "<ol><li>poop</li></ol>";

function getDissemination() {
  console.log("Hey getDissemination() works!");
  fetch("https://kalendari.hagstova.fo/api/Dissemination")
    .then(res => res.json())
    .then(disseminationData => {
      let outputDissemination = '<h2 class="mb-4">Dissemination</h2>';
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

            console.log(
              "This should be date! AFTER: ",
              typeof dissJSONparsed.date,
              dissJSONparsed.date
            );
          } catch (err) {
            console.log("This mean that date conversion failed. ", err);
          }

          outputDissemination += `

          <div class="card">
        <table class="table-striped">
         <thead>
     <tr>
     <th>Name:</th>
     <th>Date:</th>
     <!-- <th>Time Period Offset:</th> -->
     <th>Time Period:</th>
     <!-- <th>Is Postponed:</th> -->
     <!-- <th>Postponed To Date:</th> -->
     <!-- <th>Responsible Person:</th> -->
     <!-- <th>pxTables:</th> -->
     <!-- <th>Statistical Publications Id:</th> -->
     </tr>
     </thead>
     <tbody></tbody>
     <tr>

           <td>${dissJSONparsed.name}</td>
           <td>${dissJSONparsed.date}</td>
           <!--  <td>${dissJSONparsed.timePeriodOffset}</td> -->
           <td>${dissJSONparsed.timePeriod}</td>
           <!--  <td>${dissJSONparsed.isPostponed}</td> -->
           <!--  <td>${dissJSONparsed.postponedToDate}</td> -->
           <!--  <td>${dissJSONparsed.responsiblePerson}</td> -->
           <!--  <td>${dissJSONparsed.pxTables}</td> -->
           <!--  <td>${dissJSONparsed.statisticalPublicationId}</td> -->
     </tr>
     </tbody>
     </table>
         </div> `;
        }
      }

      document.getElementById(
        "outputDissemination"
      ).innerHTML = outputDissemination;
      // console.log("Last disseminationData", disseminationData);
    });
}

document.getElementById("getStatisticalPublication");
// .addEventListener("click", getStatisticalPublication);
function getStatisticalPublication() {
  fetch("https://kalendari.hagstova.fo/api/StatisticalPublication")
    .then(res => res.json()) //console.log(statisticalPublicationData));
    .then(statisticalPublicationData => {
      let outputStatisticalP = '<h2 class="mb-4">Statistical Publication</h2>';
      statisticalPublicationData.forEach(function(statisticalPublication) {
        outputStatisticalP += `
          <div>
         <table class="table table-striped">
          <thead>
      <tr>
      <th>Id:</th>
      <th>Name:</th>
      </tr>
      </thead>
      <tbody></tbody>
      <tr>
        <td>${statisticalPublication.id}</td>
        <td>${statisticalPublication.name}</td>

      </tr>
      </tbody>
      </table>
          </div>`;
      });
      document.getElementById(
        "outputStatisticalP"
      ).innerHTML = outputStatisticalP;
    });
}
getDissemination();

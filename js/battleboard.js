fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://gameinfo.albiononline.com/api/gameinfo/battles?limit=50&sort=recent"
  )}`
)
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  })
  .then((data) => {
    let obj = JSON.parse(data.contents);
    console.log(obj);

    $(document).ready(function () {
      let battleTable = $("#battleboard").DataTable();

      for (var i in obj) {
        battleTable.row
          .add([
            // End time
            `${moment(obj[i].endTime).fromNow()}`,

            // Battle id
            /*`${obj[i].id}`,*/

            // Player envolved
            `${Object.keys(obj[i].players).length}`,

            // Battle kills
            `${obj[i].totalKills}`,

            // Battle fame
            `${obj[i].totalFame.toLocaleString()}`,

            // Guild with most kills
            `${getTopKills(obj[i].guilds)}`,

            // Guild with most deaths
            `${getTopDeaths(obj[i].guilds)}`,
           
            // Killboard Link
            'Link to the killboard',
          ])
          .draw(false);
      }

      function getTopKills(guildList) {
        let topKillsArray = [];

        for (let i in guildList) {
          topKillsArray.push([guildList[i].name, guildList[i].kills]);
        }

        topKillsArray.sort((a, b) => (a[1] > b[1] ? -1 : 1));

        return (
          "" + topKillsArray[0][0] + " with " + topKillsArray[0][1] + " kills"
        );
      }

      function getTopDeaths(guildList) {
        let topDeathsArray = [];

        for (let i in guildList) {
          topDeathsArray.push([guildList[i].name, guildList[i].deaths]);
        }
        
        topDeathsArray.sort((a, b) => (a[1] > b[1] ? -1 : 1));

        return (
          "" + topDeathsArray[0][0] + " with " + topDeathsArray[0][1] + " deaths"
        );
      }

    });
  });

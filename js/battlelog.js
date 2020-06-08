// Fetch para a tabela de alianças e players

fetch(
  `https://api.allorigins.win/get?url=${encodeURIComponent(
    "https://gameinfo.albiononline.com/api/gameinfo/battles/90983308/"
  )}`
)
  .then((response) => {
    if (response.ok) return response.json();
    throw new Error("Network response was not ok.");
  })
  .then((data) => {
    let obj = JSON.parse(data.contents);

    /* Get an array of guilds that got into battle
      [0] = Alliance ID and [1] = Alliance data in that battle
    */

    let topAlliancesByKills = Object.entries(obj.alliances)
      .slice(0)
      .sort((a, b) => {
        return b[1].kills - a[1].kills;
      });

    let topAlliancesByDeaths = Object.entries(obj.alliances)
      .slice(0)
      .sort((a, b) => {
        return b[1].deaths - a[1].deaths;
      });

    // Get the winner alliance name by most killed
    let winnerAllianceId = topAlliancesByKills[0][0];

    // Get the winner alliance name by most killed
    // First, we need to check if the same alliance had most kills and deaths. If so, select the second most-death alliance
    if ((topAlliancesByKills[0][0] = topAlliancesByDeaths[0][0])) {
      var loserAllianceId = topAlliancesByDeaths[1][0];
    } else {
      var loserAllianceId = topAlliancesByDeaths[0][0];
    } // I'm storing that in var cause 'let' dont let the variable be a global one.

    // Now we know the winner and loser alliances, lets filter the guilds with the same AllianceId
    // Get the guilds of the winner alliance
    let winnerGuilds = Object.values(obj.guilds).filter(
      (guild) => guild.allianceId === winnerAllianceId
    );

    // Get the guilds of the loser alliance
    let loserGuilds = Object.values(obj.guilds).filter(
      (guild) => guild.allianceId === loserAllianceId
    );

    // Get the otherGuilds of the loser alliance
    let otherGuilds = Object.values(obj.guilds).filter(
      (guild) =>
        guild.allianceId != loserAllianceId &&
        guild.allianceId != winnerAllianceId
    );

      // Add guilds to the tables
    $(document).ready(function () {

      // Select tables
      let winnerTable = $("#winnerTable").DataTable();
      let loserTable = $("#loserTable").DataTable();
      let otherTable = $("#otherTable").DataTable();
      //const winnerPlayersTable = $("#winnerPlayers").DataTable();
      //const loserPlayersTable = $("#losersPlayers").DataTable();

      // Add winners rows to the winner table
      for (var i in winnerGuilds) {
        winnerTable.row
          .add([
            // Alliance name
            `${winnerGuilds[i].alliance}`,

            // Guild name
            `${winnerGuilds[i].name}`,

            // Guild kills
            `${winnerGuilds[i].kills}`,

            // Guild Deaths
            `${winnerGuilds[i].deaths}`,

            // Guild Killfame
            `${winnerGuilds[i].killFame}`
          ])
          .draw(false);
      }

      // Add losers rows to the losers table
      for (var i in loserGuilds) {
        loserTable.row
          .add([
            // Alliance name
            `${loserGuilds[i].alliance}`,

            // Guild name
            `${loserGuilds[i].name}`,

            // Guild kills
            `${loserGuilds[i].kills}`,

            // Guild Deaths
            `${loserGuilds[i].deaths}`,

            // Guild Killfame
            `${loserGuilds[i].killFame}`
          ])
          .draw(false);
      }

      // Add other guilds rows to the other guilds table
      for (var i in otherGuilds) {
        otherTable.row
          .add([
            // Alliance name
            `${otherGuilds[i].alliance}`,

            // Guild name
            `${otherGuilds[i].name}`,

            // Guild kills
            `${otherGuilds[i].kills}`,

            // Guild Deaths
            `${otherGuilds[i].deaths}`,

            // Guild Killfame
            `${otherGuilds[i].killFame}`
          ])
          .draw(false);
      }
    });
  });

const key = config.apiKey
const host = 'sportscore1.p.rapidapi.com'
const teamTable = document.querySelector('.tbody-team')
const leagueTable = document.querySelector('.tbody-liga')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': key,
		'X-RapidAPI-Host': host
	}
};

let players = []
let teams = []


function getTeam() {
  return fetch('https://sportscore1.p.rapidapi.com/teams/11/players', options)
	.then(response => response.json())
	.then(object => {
		const data = object['data']
		players = players.concat(data).sort((a, b) => a.shirt_number > b.shirt_number ? 1 : -1)
 })
}


function getStandings() {
	  return fetch('https://sportscore1.p.rapidapi.com/seasons/9080/standings-tables', options)
		.then(response => response.json())
		.then(object => {
			const standings = object['data'][0]['standings_rows']
			teams = teams.concat(standings).sort((a, b) => a.position > b.position ? 1 : -1)
	 })
}


const createPlayerRow = (player) =>  `
	<tr>
		<th scope="row">${player.shirt_number}</th>
		<td><img src="${player.photo}" height="50"></td>
		<td>${player.name}</td>
		<td>${player.position_name}</td>
		<td>${player.age}</td>
		<td>${player.flag.toUpperCase()}</td>
`


const createTeamRow = (team) => `
	<tr>
		<th scope="row" style="text-align: center;">${team.position}</th>
		<td><img src="${team.team.logo}" height="24">&nbsp;${team.team.name}</td>
		<td style="text-align: center;">${team.fields.matches_total}</td>
		<td style="text-align: center;">${team.fields.wins_total}</td>
		<td style="text-align: center;">${team.fields.draws_total}</td>
		<td style="text-align: center;">${team.fields.losses_total}</td>
		<td style="text-align: center;">${team.fields.goals_total.substring(0, 2)}</td>
		<td style="text-align: center;">${team.fields.goals_total.substring(3, 5)}</td>
		<td style="text-align: center;">${team.fields.goals_total.substring(0, 2) - team.fields.goals_total.substring(3, 5)}</td>
		<td style="text-align: center;">${team.fields.points_total}</td>
`


const fillTable = (array, table, func) => {
	array.forEach(element => table.innerHTML += func(element))
}


async function loadTeamData() {
	await getTeam()
	fillTable(players, teamTable, createPlayerRow)
}

async function loadLeagueData() {
	await getStandings()
	fillTable(teams, leagueTable, createTeamRow)
}
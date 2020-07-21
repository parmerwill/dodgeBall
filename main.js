'use strict'

let arrOfPeople = [{
        id: 2,
        name: "Charles Young",
        age: 55,
        skillSet: "welding",
        placeBorn: "Omaha, Nebraska"
    },
    {
        id: 3,
        name: "Judy Twilight",
        age: 35,
        skillSet: "fishing",
        placeBorn: "Louisville, Kentucky"
    },
    {
        id: 4,
        name: "Cynthia Doolittle",
        age: 20,
        skillSet: "tic tac toe",
        placeBorn: "Pawnee, Texas"
    },
    {
        id: 5,
        name: "John Willouby",
        age: 28,
        skillSet: "pipe fitting",
        placeBorn: "New York, New York"
    },
    {
        id: 6,
        name: "Stan Honest",
        age: 20,
        skillSet: "boom-a-rang throwing",
        placeBorn: "Perth, Australia"
    },
    {
        id: 7,
        name: "Mia Watu",
        age: 17,
        skillSet: "acrobatics",
        placeBorn: "Los Angeles, California"
    },
    {
        id: 8,
        name: "Walter Cole",
        age: 32,
        skillSet: "jump rope",
        placeBorn: "New Orleans, Louisiana"
    },
]

class League {
    constructor(name) {
        this.name = name;
        this.members = [];
        this.teams = [];
        this.players = [];
    };
    addMember(e) {
        this.members.push(e);
    };
    addTeam(name) {
        let team = new Team(name);
        this.teams.push(team);
    }
    makePlayer(id) {
        let index = this.members.findIndex((e) => e.id == id);
        let player = this.members[index];
        this.players.push(player);
        return player;
    };
    makeTeamPlayer(id, teamName) {
        let playerindex = this.members.findIndex((e) => e.id == id);
        let player = this.members[playerindex];
        let teamIndex = this.teams.findIndex((e) => e.name == teamName)
        let team = league.teams[teamIndex];
        team.players.push(player);
        return player;
    };
}

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    };
};

class Member {
    constructor(id, name, age, skillSet, placeBorn) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.skillSet = skillSet;
        this.placeBorn = placeBorn;
    };
};

let league = new League('BusDrivers');
league.addTeam('red');
league.addTeam('blue');

let createLeagueMembers = () => {
    let listElement = document.getElementById('members');
    arrOfPeople.forEach(person => {
        let member = new Member(person.id, person.name, person.age, person.skillSet, person.placeBorn)
        league.addMember(member);
        let li = document.createElement("li");
        li.id = person.id;
        let button = document.createElement("button");
        button.innerHTML = "Make Player";
        button.addEventListener('click', function() { makePlayer(person.id) });
        li.appendChild(button);
        li.appendChild(document.createTextNode(" " + person.name + " - " + person.skillSet));
        listElement.append(li);
    });
};

let removeFromList = (id, list) => {
    let listElement = document.getElementById(list);
    for (let i = 0; i < listElement.children.length; i++) {
        let idNum = listElement.children[i].id;
        if (idNum == id) {
            listElement.removeChild(listElement.children[i]);
            break;
        };
    };
};

let makePlayer = (id) => {
    let player = league.makePlayer(id);
    let listElement = document.getElementById('players');
    let li = document.createElement("li");
    li.id = id;
    let btnRed = document.createElement("button");
    let btnBlue = document.createElement("button");
    btnRed.innerHTML = "Red Team";
    btnBlue.innerHTML = "Blue Team";
    btnRed.addEventListener('click', function() { makeTeamPlayer(id, 'red') });
    btnBlue.addEventListener('click', function() { makeTeamPlayer(id, 'blue') });
    li.appendChild(btnRed);
    li.appendChild(btnBlue);
    li.appendChild(document.createTextNode(` ${player.name} - ${player.skillSet}`));
    listElement.appendChild(li);
    removeFromList(id, 'members');
};


let makeTeamPlayer = (id, teamName) => {
    let player = league.makeTeamPlayer(id, teamName);
    let listElement = document.getElementById(teamName);
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(` ${player.name} - ${player.skillSet}`));
    listElement.appendChild(li);
    removeFromList(id, 'players');
};
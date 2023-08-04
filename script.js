const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.listen(3000, () => {
	console.log("Corriendo servidor en puerto 3000");
});

let tickets = [
	{ id: "1", mensaje: "", estado: "cerrado" },
	{ id: "2", mensaje: "", estado: "abierto" },
	{ id: "3", mensaje: "", estado: "cerrado" },
	{ id: "4", mensaje: "", estado: "abierto" },
	{ id: "5", mensaje: "", estado: "cerrado" },
	{ id: "6", mensaje: "", estado: "abierto" },
	{ id: "7", mensaje: "", estado: "cerrado" },
	{ id: "8", mensaje: "", estado: "abierto" },
	{ id: "9", mensaje: "", estado: "cerrado" },
	{ id: "10", mensaje: "", estado: "abierto" },
];
app.get("/tickets", async (req, res) => {
	console.log(tickets);
	res.send(tickets);
});

app.get("/tickets/:id", (req, res) => {
	const id = req.params.id;
	res.send(tickets.find((t) => t.id == id));
});

app.get("/cerrados", (req, res) => {
    const cerrados = [];
    tickets.forEach(ticket => {
        if(ticket.estado == "cerrado") {
            cerrados.push(ticket);
        }
    })
    console.log(cerrados);
    res.send(cerrados);
})

app.post("/tickets", async (req, res) => {
	const nuevoTicket = req.body;
    console.log(req.body);
	tickets.push(nuevoTicket);
	res.send(tickets);
});

app.put("/tickets/:id", (req, res) => {
    const id = req.params.id;
    let ticket = tickets.findIndex((t) => t.id == id);
    console.log(ticket)
    const putTicket = req.body;
    putTicket.id = id;
    if(ticket === -1) {
        tickets.push(putTicket);
    } else {
        putTicket.id = id;
        tickets[ticket] = putTicket;
        
    }
    console.log(tickets);
    res.send(tickets);
})


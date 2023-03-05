db.entrenadores.aggregate(
    [{
            $match: {
                "$or": [
                    { nombre: "Luciano Spalletti" },
                    { nombre: "Jurgen Klopp" },
                    { nombre: "Erik ten Hag" },
                    { nombre: "Dalcio Giovagnoli " },
                ]
            }
        },
        {
            $lookup: {
                from: 'equipos',
                localField: 'equipo',
                foreignField: 'nombre',
                as: 'equipo'
            }
        },
        {
            $unwind: '$equipo'
        },
        {
            $lookup: {
                from: 'deportistas',
                localField: 'equipo.nombre',
                foreignField: 'equipo',
                as: 'jugadores'
            }
        },
        {
            $project: {
                entrenador: '$nombre',
                equipo: '$equipo.nombre',
                jugadores: [{ jugador: '$jugadores.nombre' }]
            }
        }
    ])
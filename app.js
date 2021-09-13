require('colors');


//const { mostrarMenu, pausa } = require('./helpers/mensajes');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist } = require('./helpers/inquirer');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const Tareas = require('./models/tareas');
//const Tarea = require('./models/tarea');

const main = async () => {
    const tareas = new Tareas();
    const tareaDB = leerDB();
    let opt = '';

    if (tareaDB) {
        tareas.cargarTareasFromArray(tareaDB);
    }

    do {
       opt = await inquirerMenu();
       
       switch(opt) {
           case '1':
                const desc = await leerInput('Descripcion: ');

                tareas.crearTarea({ desc });
           break;
           case '2':
               tareas.listadoTareas();
           break;
           case '3':
                tareas.listarPendientesCompletadas(true);
           break;
           case '4':
                tareas.listarPendientesCompletadas(false);
           break;
           case '5':
            const ids = await mostrarListadoChecklist(tareas.listadoArr);
            console.log(ids);
            tareas.toggleCompletadas(ids);

           break;
           case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                console.log({id});
                if(id !== '0') {
                    const ok = await confirmar('¿Estas seguro?');
                    console.log({ok});
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log(`Tarea ${id} BORRADA!!!! O.o`)
                    }
                }
           break;
       }


       guardarDB(JSON.stringify(tareas.listadoArr));

       if (opt !== '0') {
        await pausa();
       }
    } while(opt !== '0');   
}


main();
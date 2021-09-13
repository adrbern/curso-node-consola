const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach((key) => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        let i = 0;

        tareas.forEach((tarea) => {
            this.crearTarea(tarea);
        });
    }

    crearTarea({ id, desc = '', completadoEn }) {
        const tarea = new Tarea(id, desc, completadoEn === "null" ? null : completadoEn);

        this._listado[tarea.id] = tarea;
    }

    listadoTareas(tareas = this.listadoArr) {
        tareas.forEach((tarea, index) => {
            const key = `${index+1}.`.green;
            const { desc, completadoEn } = tarea;
            //const state = completadoEn ? `Completada`.green : `Pendiente`.red;
            const state = completadoEn;

            this.pintarTarea({ key, desc, state });
        });
    }

    listarPendientesCompletadas(completadas = true) {
        const tareas = this.listadoArr.filter(({ completadoEn }) => {
            return Boolean(completadoEn) === completadas;
        });

        this.listadoCompleto(tareas);
    }

    pintarTarea({ key, desc, state }) {
        console.log(`${key} ${desc} :: ${state}`);
    }

    toggleCompletadas(ids = []) {
        ids.forEach((id) => {
            const tarea = this._listado[id];

            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach((tarea) => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;
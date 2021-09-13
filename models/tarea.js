const { v4: uuidv4 } = require('uuid');

class Tarea {

    id = '';
    desc = '';
    completadoEn = null; // 'Fecha ...';

    constructor(id, desc= '', completadoEn = null) {
        this.id = id || uuidv4();
        this.desc = desc;
        this.completadoEn = completadoEn;
    }
}

module.exports = Tarea;
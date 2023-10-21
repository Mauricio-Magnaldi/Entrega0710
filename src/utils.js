//Creación de dirname, uso de ruta absoluta
//Importa dirname del módulo nativo path
import { dirname } from 'path';
//Importa fileURLToPath del módulo nativo url
import { fileURLToPath } from 'url';

//Crea la constante y la exporta
export const __dirname = dirname(fileURLToPath(import.meta.url));

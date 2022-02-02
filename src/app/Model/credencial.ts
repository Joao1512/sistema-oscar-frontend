import { Perfil } from "./perfil";

export class Credencial {
    id: number;
    email: string;
    senha: string;
    roles: Array<any> = [];
    listaPerfil: Perfil[] = [];
    nome: string;
}
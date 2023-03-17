import type { Role } from "./Role";

export class User {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    role!: Role;
}
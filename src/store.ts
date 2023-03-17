import { writable } from 'svelte/store';
import { User } from './models/User';

const userStore = writable(new User());

export default userStore;
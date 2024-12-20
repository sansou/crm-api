
import { Item } from 'dynamoose/dist/Item';
import { StatusProject } from 'src/utils/enums';

export interface Project extends Item {
    pk: string,
    sk: string,
    name: string,
    status: StatusProject,
    domains: string[],
    accounts?: string[], //não esquecer de zerar na hora de normalizar
    description?: string,
    createdAt?: Date,
    updatadAt?: Date,
}

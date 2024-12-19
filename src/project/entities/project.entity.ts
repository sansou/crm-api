
import { Item } from 'dynamoose/dist/Item';
import { StatusLead } from 'src/utils/enums';

export interface Project extends Item {
    pk: string,
    sk: string,
    name: string,
    status: StatusLead,
    domains: string[],
    accounts?: string[], //não esquecer de zerar na hora de normalizar
    description?: string,
    createdAt?: Date,
    updatadAt?: Date,
}

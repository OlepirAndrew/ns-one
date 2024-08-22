import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from './roles.model';
import { User } from '../users/users.model';

// Декоратор @ForeignKey() в NestJS (обычно в контексте использования с ORM, например, Sequelize)
// указывает на то, что данное поле является внешним ключом, ссылающимся на первичный ключ другой таблицы.
//
// Этот декоратор связывает две таблицы, устанавливая отношение между ними (например, Many-to-One или One-to-Many).
// Когда вы добавляете @ForeignKey() к свойству модели, вы указываете, что это поле должно содержать значение,
// которое существует в другой таблице, тем самым обеспечивая ссылочную целостность данных в базе данных.


@Table({tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;


    @ForeignKey(() => Role)
    @Column({type: DataType.INTEGER})
    userId: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    roleId: string;
}


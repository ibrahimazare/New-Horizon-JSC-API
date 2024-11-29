const { EntitySchema } = require('typeorm');

const User = new EntitySchema({
    name: 'User',
    tableName: 'users', // optional: specify the table name in the database
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        email: {
            type: 'varchar',
            unique: true,
        },
        password: {
            type: 'varchar',
        },
    },
});

module.exports = { User };



// const {Entity, PrimaryGeneratedColumn, Column} = require('typeorm');

// @Entity()
// class User{
//     @PrimaryGeneratedColumn()
//     id;

//     @Column()
//     email;

//     @Column()
//     password;
// }
// module.exports = {User};
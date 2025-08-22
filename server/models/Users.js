module.exports=(sequelize,DataTypes) =>{
    const Users = sequelize.define("Users",{
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,    
        },
        bornDate:{
            type:DataTypes.DATEONLY,
        },
        firstName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        rol:{
            type:DataTypes.STRING,
        }
        
    })

    return Users
}
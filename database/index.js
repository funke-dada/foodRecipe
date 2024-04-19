const { Sequelize, DataTypes } = require('sequelize');
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('foodRecipeDb', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
   logging : false, // disable logging; default: console.log
  
})
const db_authentication = async ()=>{ // authenticates the database
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
    db_authentication()
    const User = sequelize.define( 
      'User',
      {
        // Model attributes are defined here
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        passwordHint: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
            },
        validLicense: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
    
      {
         // Other model options go here
      freezeTableName:true,
       paranoid:true, //leaves deleted record in the table and adds deletedAt column
      }
    )
   
   
  const recipe =sequelize.define(// initializes recipe
      'Recipe',
      {
        recipeName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        recipeDescription: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        prepTime: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue:0,
        },
        cookTime: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue:0,
                },
        servingSize: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        // Other model options go here
     freezeTableName:true,
      paranoid:true,
     },
    )
    const category = sequelize.define(
      'Category',
      {
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Other model options go here
   freezeTableName:true,
    paranoid:true,
   },
    )
    const step = sequelize.define(
      'Step',
      {
        stepDescription: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        // Other model options go here
     freezeTableName:true,
      paranoid:true,
     },
    )
    const ingredient = sequelize.define(
      'Ingredient',
      {
        ingredientName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        ingredientDescription: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        // Other model options go here
     freezeTableName:true,
      paranoid:true,
     },
    )
      const nutrition = sequelize.define(
        'Nutrition',
        {
          nutrientName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          amountPerServing: {
            type: DataTypes.FLOAT,
            allowNull: false,
                        },
          unit: {
            type: DataTypes.STRING,
            allowNull: false,
          },
        },
      
      {
        // Other model options go here
     freezeTableName:true,
      paranoid:true,
     },
    )
  
    User.hasMany(recipe)
    recipe.belongsTo(User)
  
    User.hasMany(category)
    category.belongsTo(User)

    category.hasMany(recipe)
    recipe.belongsTo(category)
   
    recipe.hasMany(ingredient)
    ingredient.belongsTo(recipe)
   
    recipe.hasMany(step)
    step.belongsTo(recipe)
  
    recipe.hasMany(nutrition)
    nutrition.belongsTo(recipe)
    
    sequelize.sync({alter:true}) // sync() is a method that synchronizes the model with the database



    //create user
  const create_user =async()=>{ 
    const user =await User.create({
      username:'tola',
      password:'P@ssword',
      passwordHint:'password',
      firstName:'Adetola',
      lastName:'Shawn',
      email:'ttshawn@gmail.com',
      phone:'1003445678',
      validLicense:true,
    })
console.log(user.toJSON()) // toJSON() is a method that returns a JavaScript object representation of the model instance
  
  }

//create_user()
//Update user
/*const update_user =async(id)=>{ // id is the id of the user to be updated
  const user =await User.update( // update() is a method that updates a record in the database
  {firstName:'Oluwatoyin', username:'toyin', email:'tyyin@gmail.com'}, 
  {validLicense:false},
  { where: { id: id } }
)
console.log(user)
}*/


//delete user
/*const delete_user =async(id)=>{ // id is the id of the user to be deleted
  const user =await User.destroy({ // destroy() is a method that deletes a record from the database
    where: { id: id }
  }
)
console.log(user)
}*/

//update_user(3)
//delete_user(2)

//Query data
/*const get_all_users = async()=>{
  //const users = await User.findAll() // findAll() is a method that returns all records from the database
  const users = await User.findAll({where:{validLicense:true}})
  console.log(users.map((user)=>user.toJSON())) // toJSON() is a method that returns a JavaScript object representation of the model instance
}*/

//get_all_users()
// if primary key is an integer, you can use findByPk() to get a record by its primary key
/*const get_one_user_by_id = async(id) => {
  const user = await User.findByPk(id) // findByPk() is a method that returns a record from the database by its primary key
 //console.log(user)
  //console.log(user.toJSON())
}*/
  //get_one_user_by_id(3)

  // if primary key is not known
 /* const get_one_user = async (email)=>{
    const user = await User.findOne({where:{email:email}})
    console.log(user)
//console.log(user?.toJSON())
  }*/
  //get_one_user('ttshawn@gmail.com')
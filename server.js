const express=require('express');
const bodyParser=require('body-parser');
const bcrypt= require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// const db =knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'root',
//     database : 'smartbrain'
//   }
// });

const db=knex({
    //connect database
  client: 'pg',

  connection: {
     connectionString:process.env.DATABASE_URL,
     ssl: {
    rejectUnauthorized: false
  }

}
});

db.select('*').from('users').then(data=>{
	console.log(data);
});



const app=express();

app.use(bodyParser.json());
app.use(cors());



app.get('/', (req, res)=> { res.send(db.users) })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
app.listen(process.env.PORT || 5000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
});

// // const database={
// // 	users:[
// // 	{
// // 		id:'123',
// // 		name:'naina',
// // 		email:'naina@gmail.com',
// // 		 password:'naina',
// // 		entries:0,        //how many times
// // 		                  //naina has submitted photos for detection 
// // 		joined:new Date()  //when naina joined our app -date
// // 	},
// // 	{
// // 		id:'124',
// // 		name:'sally', 
// // 		email:'sally@gmail.com',
// // 		password:'sally',
// // 		entries:0,        
// // 		joined:new Date()  
// // 	}
// // 	],
// // 	login:[
// // 	{
// // 		id:'987',
// // 		hash :'',
// // 		email:'naina@gmail.com'

// // 	}
// // 	]
// // }

// app.get('/',(req,res)=>{
// 	res.send(database.users);
// })


// app.post('/signin',(req,res)=>{
// db.select('email','hash').from('login')
// .where('email', '=' , req.body.email)
// .then(data=>{
// 	const isValid=bcrypt.compareSync(req.body.password,data[0].hash);
// 	console.log(isValid);
// 	if(isValid){
// 		return db.select('*').from('users')
// 		.where('email', '=' ,req.body.email)
// 		 .then(user=>{
// 		 	console.log(user);
// 		 	res.json(user[0])
// 		 })
// 		 .catch(err=>res.status(400).json('unable to get user'))
// 		}
// 		else{
// 			res.status(400).json('wrong credentials')
// 		}
		
//  })
// .catch(err=>res.status(400).json('wrong credentials'))
	
// })


// // 	// Load hash from your password DB.
// // bcrypt.compare("asd", '$2a$10$fJ122AaXbzAZTzQ/TDbHQeS8CoNibsya.PWMnYuc14fgoUFACOA2u',function(err, res) {
// //     // res == true
// //     console.log('first guess',res);
// // });
// // bcrypt.compare("veggies", '$2a$10$fJ122AaXbzAZTzQ/TDbHQeS8CoNibsya.PWMnYuc14fgoUFACOA2u',function(err, res) {
// //     // res = false
// //        console.log('second  guess',res);

// // });

// // 	if(req.body.email=== database.users[0].email 
// // 		&& req.body.password=== database.users[0].password)
// // {
// // 		//res.json('success');
// // 		res.json(database.users[0]);
// // }

// // 	else{
// // 			res.status(404).json('error logging in');
// // 	}





// app.post('/register', (req,res)=>{
// 	const{email, name, password}=req.body;

// 	const hash=bcrypt.hashSync(password);
// 	db.transaction(trx=>{
// 		trx.insert({
// 			hash:email,
// 			hash:hash,
// 			email: email
// 		})
// 		.into('login')
// 		.returning('email')
// 		.then(loginEmail=>{
// 			return trx('users')
//                .returning('*')
//                 .insert({
// 	             email:loginEmail[0],
// 	             name:name,
// 	             joined:new Date()
//         })
//            .then (user=>{
// 	       res.json(user[0]);
// 	//res.json(database.users[database.users.length-1]);
//      })
//   })
// 		.then(trx.commit)
// 	.catch(trx.rollback)
// })
	

// .catch(err=>res.status(400).json('unable to register'))
// })




// // bcrypt.hash(password, null, null,  function(err, hash) {
// //     // Store hash in your password DB.
// //     console.log(hash);
// // });

// 	// database.users.push({
// 	// 	id:'125',
// 	// 	name:name,
// 	// 	email:email,
// 	// 	//password:password,
// 	// 	entries:0,        
// 	// 	joined:new Date() 
// 	// })
// 	//res.json(database.users[database.users.length-1]);
// 	//last user ie last item in the array
// //






// app.get('/profile/:id',(req,res)=>{
// 	const {id}=req.params;
// 	//let found=false;
// 	// database.users.forEach(user =>{
// 	// 	if(user.id===id){
// 	// 		found=true;
// 	// 		return res.json(user);
// 	// 	}
		
// 	// })
// 	db.select('*').from('users').where({id})
// 	.then(user=>{
// 		//console.log(user)
// 		if(user.length){
// 				res.json(user[0]);
// 		}
// 		else{
// 			res.status(400).json('not found')
// 		}
	
// 	})
// 	.catch(err=>res.status(400).json('error getting user'))
// 	// if(!found){
// 	// 	res.status(400).json('not found');
// 	// }
// })



// app.put('/image',(req,res)=>{
// 	const {id}=req.body;

// 	// let found=false;
// 	// database.users.forEach(user =>{
// 	// 	if(user.id===id){
// 	// 		found=true;
// 	// 		user.entries++;
// 	// 		return res.json(user.entries);
// 	// 	}
// 	// })

// 	// 	if(!found){
// 	// 	res.status(400).json('not found');
// 	// }	
// 	 db('users').where('id', '=', id)
//   .increment('entries',1)
//   .returning('entries')
//   .then(entries=>{
//   	res.json(entries[0]);
//   })
//   	.catch(err=>res.status(400).json('unable to get entries'))
// })


// app.listen(5000,()=>{
// 	console.log('app is running on port no 5000');
// });



// /*

// / =>   res= this is working
// /signin =>  POST = succcess/fail
// /register => POST = user
// /profile/:userId = GET = user
// /image  =>PUT = user




// // */



const handleSignIn= (req,res,db,bcrypt)=> {
	const { email, password } = req.body;
	if( !email || !password){
		return res.json('Wrong form submission.');
	}
	db('login').select('email','hash')
	.where('email',email)
	.then(user =>{
		const isValid = bcrypt.compareSync(password, user[0].hash);
		console.log(isValid);
		if(isValid){
			return db.select('*')
			.from('users')
			.where('email','=',user[0].email)
			.then(signInUser =>{
				res.json(signInUser[0])
			}).catch(err => res.status(400).json('An error occured.'))
		}else {
			res.json('Wrong credentials.');
		}
	}).catch(err => {
		res.status(400).json('An error occured.')
	})
}

module.exports = {
    handleSignIn
}
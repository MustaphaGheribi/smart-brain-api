
const handleRegister =(req,res,db,bcrypt,saltRounds)=> {
	const {email, name, password} = req.body;
	if( !email || !name || password){
		return res.json('Wrong form submission.');
	}
	const hash = bcrypt.hashSync(password, saltRounds);
	db.transaction(trx =>{
		trx.insert({
			email,
			hash
		})
		.into('login')
		.returning('email')
		.then(loginEmail =>{
		return trx('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name,
					joined: new Date()
				})
				.then(user =>{
					if(user.length)	{				
						res.json(user[0]);
					}else {
						res.json('Unable to register');
					}
				})
		}).then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Unable to register.'))
	
}

module.exports= {
    handleRegister: handleRegister
}
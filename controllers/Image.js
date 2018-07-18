const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'a76d8ef357094228958437b52a77a0d4'
});

const handleApiCAll=(req,res)=> 	{
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data =>{
		res.json(data);
	}).catch(err => res.status(400).json('An error occured.'))
}


const handleImagePUT= (req, res,db)=>{
	const {id} = req.body;
	db('users').where('id', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		if(entries.length){
			res.json(entries[0]);
		} else {
			res.json('Unable to get entries.');
		}
		
	})
	.catch(err => res.status(400).json('An error occured.'));
}
module.exports= {
	handleImagePUT,
	handleApiCAll
}
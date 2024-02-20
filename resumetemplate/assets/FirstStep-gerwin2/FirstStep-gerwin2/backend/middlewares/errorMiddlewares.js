const errorHandler = (err, req, res, next) => {
    if (!res.status) {
        res.status(500).send({error: 'Something failed! Server issues.'})
    }
    console.log(err)
}

export {errorHandler}

export const handleCreate = async (model, data, res) => {
    try {
      const insertResult = await model.create(data);
      res.status(201).send({
        status: true,
        message: 'Successfully Created!',
        _id: insertResult._id
      });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).send({
        status: false,
        message: "Creating Failed!",
        errorMessage: err.message
      });
    }
  };
  
  export const handleDelete = async (model, query, res) => {
    try {
      await model.deleteOne(query);
      res.status(200).send({
        status: true,
        message: 'Successfully Deleted!'
      });
    } catch (err) {
      res.status(500).send({
        status: false,
        message: 'Not Deleted!'
      });
    }
  };
  
  export const handleRetrieve = async (model, res) => {
    try {
      const results = await model.find();
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send({
        status: false,
        message: 'Not Retrieved!'
      });
    }
  };
  
  export const handleRetrieveOne = async (model, profileId, res) => {
    try {
      const results = await model.findById(profileId);
      res.status(200).send(results);
    } catch (err) {
      res.status(500).send({
        status: false,
        message: 'Not Retrieved!'
      });
    }
  };

  export const handleUpdate = async (model, query, update, res) => {
    try {
      await model.updateOne(query, { $set: update });
      res.status(200).send({
        status: true,
        message: 'Successfully Updated!'
      });
    } catch (err) {
      console.error(`Error updating model: ${err}`);
      res.status(500).send({
        status: false,
        message: 'Not Updated!'
      });
    }
  };
  
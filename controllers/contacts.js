const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getdb().collection('contacts').find();
  const lists = await result.toArray();
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(lists);
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getdb().collection('contacts').find({ _id: userId });
    const lists = await result.toArray();

    if (!lists.length) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  } catch (err) {
    console.error('Error fetching single contact:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createContacts = async (req, res) => {
  const user = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate
  };
  const response = await mongodb.getdb().collection('contacts').insertOne(user);
  if (response.acknowledged) {
    res.status(201).json({ message: 'User created successfully' });
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const updateContacts = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = {
    firstname: req.body.firstName,
    lastname: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthdate: req.body.birthdate
  };
  const response = await mongodb.getdb().collection('contacts').replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteContacts = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getdb().collection('contacts').deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = { getAll, getSingle, createContacts, updateContacts, deleteContacts };

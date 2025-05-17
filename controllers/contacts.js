const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  try {
    const userId = new ObjectId(req.params.id); // this will throw if ID is invalid
    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find({ _id: userId });
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


module.exports = { getAll, getSingle };
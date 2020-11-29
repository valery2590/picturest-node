const persimon = require('../../utils/persimon');
const db = persimon('../../../assets/pins.json');

const getAll = (req, res) => {
  const pins = db.all();
  return res.status(200).json(pins);
};

const getOne = (req, res) => {
  const pin = db.get(req.params.id);
  if (pin) {
    return res.status(200).json(pin);
  }
  return res.status(404).end();
};

const create = (req, res) => {
  const newPin = req.body;
  const pinsUpdated = db.create(newPin);
  return res.status(201).json(pinsUpdated);
};

const update = (req, res) => {
  const updatedPin = req.body;
  const pinsUpdated = db.update(req.params.id, updatedPin);
  return res.status(200).json(pinsUpdated);
};

const remove = (req, res) => {
  const pinsWithoutTheDeleted = db.delete(req.params.id);
  return res.status(200).json(pinsWithoutTheDeleted);
};

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
};

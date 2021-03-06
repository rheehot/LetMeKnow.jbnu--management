const { db, CONSTANTS } = require('./info');

const { format } = require('../../utils');

exports.CONSTANTS = CONSTANTS;

exports.findBy_id = async ({ _id }, { select } = {}) => {
  try {
    const user = await db.users
      .findOne({ _id })
      .select(select)
      .lean();
    return user;
  } catch (err) {
    throw format.mongo.error(err);
  }
};

exports.findById = async ({ id }, { select } = {}) => {
  try {
    const user = await db.users
      .findOne({ id })
      .select(select)
      .lean();
    return user;
  } catch (err) {
    throw format.mongo.error(err);
  }
};

exports.create = async ({ id, pw, level }) => {
  const newUser = new db.users({ id, pw, level });
  try {
    await newUser.save();
    return true;
  } catch (err) {
    throw format.mongo.error(err);
  }
};

exports.verify = async ({ id, pw }) => {
  const user = await this.findById({ id });

  if (!user) {
    return { isVerified: false };
  }

  const isVerified = pw === user.pw;
  return { user, isVerified };
};

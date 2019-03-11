import Datastore from 'nedb';
import path from 'path';
import {remote} from 'electron';
import {SCORES_DB_FILENAME, SETTINGS_DB_FILENAME} from '../utils/constants';
import {promiseWrapper} from './promise';

const NUM_HIGH_SCORES = 10;

let initialSettings = {
  volumeOn: true,
  volumeLevel: 0.6,
  musicOn: true,
  musicLevel: 0.2,
};

const dbFactory = filename => {
  let pathToFile =
    process.env.NODE_ENV === 'development'
      ? path.resolve('.', 'data', filename)
      : path.resolve(remote.app.getPath('exe'), 'data', filename);

  return new Datastore({
    filename: pathToFile,
    autoload: true,
  });
};

// Use to wrap around database factory and add
// constraints to desired fields.
//
// INPUT : fieldConstraints
// {
//   fieldName : {
//      constraintName : blah,
//      ...
//   }
// }
const constraintDecorator = createDb => {
  return function(fieldConstraints, filename) {
    let db = createDb(filename);
    Object.entries(fieldConstraints).forEach(([field, constraints]) => {
      db.ensureIndex({fieldName: field, ...constraints}, err => {
        if (err) console.log(err);
      });
    });
    return db;
  };
};

export const gameDb = {
  // scores: dbFactory(SCORES_DB_FILENAME),
  scores: constraintDecorator(dbFactory)(
    {
      name: {
        unique: true,
      },
    },
    SCORES_DB_FILENAME,
  ),
  settings: dbFactory(SETTINGS_DB_FILENAME),
};

const execSettings = (fields, callback1, callback2) => {
  let findOptions = {};
  // Check for field(s)
  Object.keys(field => {
    findOptions[field] = {$exists: true};
  });

  gameDb.settings.find(findOptions, (err, docs) => {
    // Pass all new fields into a single object.
    let newFields = {};
    if (err || docs.length <= 0) {
      // Copy initial values of interested fields.
      Object.keys(fields).forEach(
        field => (newFields[field] = initialSettings[field]),
      );
      let insertOptions = {...initialSettings};
      gameDb.settings.insert(insertOptions);
    } else {
      // console.log(docs[0]);
      callback1(fields, newFields, docs[0]);
    }

    // console.log(newFields);

    // Operate on new fields.
    if (callback2) {
      callback2(newFields);
    }
  });
};

export const checkSettings = (fields, callback) => {
  execSettings(
    fields,
    (fields, newFields, doc) => {
      // Copy existing fields in database.
      Object.keys(fields).forEach(field => (newFields[field] = doc[field]));
    },
    callback,
  );
};

export const updateSettings = (fields, callback) => {
  execSettings(
    fields,
    (fields, newFields, doc) => {
      // Update desired fields with new values.
      let toOptions = {...doc};
      // NOTE newFields is a subset of toOptions
      Object.keys(fields).forEach(field => {
        if (typeof doc[field] === 'boolean') {
          toOptions[field] = !doc[field];
          newFields[field] = !doc[field];
        } else {
          toOptions[field] = fields[field];
          newFields[field] = fields[field];
        }
      });

      // Update old fields to new fields
      gameDb.settings.update(doc, toOptions);
    },
    callback,
  );
};

export const insertScore = (playerName, level, score) => {
  let insertPromise = new Promise((resolve, reject) => {
    gameDb.scores.insert(
      {name: playerName, level: level, score: score, timeStamp: Date.now()},
      (err, newDoc) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log('New score inserted: ', newDoc);
          resolve(newDoc);
        }
      },
    );
  });

  return promiseWrapper(insertPromise);
};

export const withinHighScores = (score, callback) => {
  gameDb.scores.find({}, (err, docs) => {
    docs.sort((a, b) => {
      if (a.score === b.score) {
        // Scores are equal, reverse sort by timeStamp instead.
        // In other words, remove the oldest score instead.
        return b.timeStamp - a.timeStamp;
      }
      return a.score - b.score;
    });

    if (docs.length >= NUM_HIGH_SCORES && score > docs[0].score) {
      gameDb.scores.remove({_id: docs[0]._id});
    }

    callback(docs, score, NUM_HIGH_SCORES);
  });
};

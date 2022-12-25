const Tozny = require('@toznysecure/sdk/node');
const bruce = require('../config/bruce_credentials.json');
const alicia = require('../config/alicia_credentials.json');
const clarence = require('../config/clarence_credentials.json');

const load_client = (client_name) => {
  let data = {};
  switch (client_name.toLowerCase()) {
    case 'bruce':
      data = bruce;
      break;
    case 'alicia':
      data = alicia;
      break;
    case 'clarence':
      data = clarence;
      break;
    default:
      throw 'Invalid client';
  }
  const config = new Tozny.storage.Config(
    data.client_id,
    data.api_key_id,
    data.api_secret,
    data.public_key,
    data.private_key,
    data.public_signing_key,
    data.private_signing_key
  );
  const client = new Tozny.storage.Client(config);
  return client;
};

const share_with_group = async (client, groupId, type) => {
  const sharedRecord = await client.shareRecordWithGroup(groupId, type);
  console.log(`${sharedRecord.record_type} shared with group ${groupId}`);
  return sharedRecord;
};

const write_message = async (client, name, round, data) => {
  const written = await client.writeRecord(
    name,
    {
      data: data,
    },
    {
      round: round,
    }
  );
  console.log(`Wrote record ${written.meta.recordId}`);
  return written;
};

const read_message = async (client, groupId, user, round) => {
  const records = await client.listRecordsSharedWithGroup(groupId);
  console.log(round);
  for (let i = 0; i < records[0].length; i++) {
    if (records[0][i].meta.plain.round === round) {
      return records[0][i].data.data;
    }
  }
  return null;
};

module.exports = {
  load_client,
  share_with_group,
  write_message,
  read_message,
};

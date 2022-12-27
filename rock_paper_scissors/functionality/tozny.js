const Tozny = require('@toznysecure/sdk/node');
const bruce = require('../config/bruce_credentials.json');
const alicia = require('../config/alicia_credentials.json');
const clarence = require('../config/clarence_credentials.json');

//loads client from Tozny api
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

//shares record type with client
const share_with_client = async (client, clientId, type) => {
  const sharedRecord = await client.share(type, clientId);
  console.log(`Shared ${type} with ${clientId}`);
  return sharedRecord;
};

//writes message to tozny store
const write_message = async (client, name, round, data) => {
  console.log(`${name}-${round}`);
  const written = await client.writeRecord(
    `${name}-${round}`,
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

//returns first match found from tozny store
//that matches user-round
const read_message = async (client, user, clientId, round) => {
  const request = new Tozny.types.Search(true, true, 1);
  console.log(`Searching for: ${user}-${round}`);
  request.match({ type: `${user}-${round}` });
  const resultQuery = await client.search(request);
  const found = await resultQuery.next();
  console.log(found[0]);
  return found[0].data.data;
};

module.exports = {
  load_client,
  share_with_client,
  write_message,
  read_message,
};

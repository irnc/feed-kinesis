const AWS = require('aws-sdk');
const plainObject = require('./fixtures/plain-object');
const fixture = require('./fixtures/nested-objects-with-arrays');

const firehose = new AWS.Firehose({
  region: 'eu-west-1',
});

function serializeData(data) {
  return JSON.stringify(data) + '\n';
}

function putRecord(data) {
  const params = {
    DeliveryStreamName: 'feed-kinesis-test-stream',
    Record: {
      // { wrap: { test: 'value' } } results in empty column
      // { wrap: { test: 'value' }, another: 'val' } works for both column
      // [ 42, { test: '1', another: '2' }, { another: '3' } ] results in two records in Analytics samples
      Data: serializeData({
        ticker_symbol: 'AMZN',
        sector: 'TECHNOLOGY',
        change: 2,
        price: 200,
      }),
    },
  };

  return firehose.putRecord(params).promise();
}

setInterval(() => {
  putRecord(fixture)
    .then(console.log)
    .catch(console.error);
}, 2000);

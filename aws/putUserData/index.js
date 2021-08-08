const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  let result = "";
  let status = 0;

  const { id, name, location } = JSON.parse(event.body);

  const params = {
    TableName: "Users",
    Item: {
      id: id,
      name: name,
      location: location,
    },
  };

  try {
    const data = await docClient.put(params).promise();
    result = JSON.stringify(data);
    status = 201;
  } catch (err) {
    result = "Unable to create/fix user data";
    status = 403;
  }

  const response = {
    statusCode: status,
    headers: {
      myHeader: "test",
    },
    body: result,
  };

  return response;
};

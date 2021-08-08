const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  //   const dyDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  let result = "";
  let status = 0;

  const { id } = event.pathParameters;
  const params = {
    TableName: "Users",
    Key: {
      id: id,
    },
  };

  try {
    const data = await docClient.get(params).promise();
    result = JSON.stringify(data.Item);
    status = 200;
  } catch (err) {
    result = "Unable to get user data";
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

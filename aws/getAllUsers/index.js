const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });

exports.handler = async (event, context) => {
  //   const dyDB = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const dc = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

  let result = "";
  let status = 0;

  const params = {
    TableName: "Users",
    Limit: 10,
  };
  const allUsers = [];
  try {
    const data = await dc.scan(params).promise();
    allUsers.push(...data.Items);
    params.ExclusiveStartKey = items.LastEvaluatedKey;
    result = JSON.stringify(allUsers);
    status = 200;
  } catch (err) {
    result = "Unable to get users";
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

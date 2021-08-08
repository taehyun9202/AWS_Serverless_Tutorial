// module.exports = (req, res) => {
//   if (req.method === "GET") {
//     res.json([
//       { name: "Tyler", location: "Alexandria, VA" },
//       { name: "Lena", location: "NYC, NY" },
//     ]);
//   } else {
//     const { name, location } = req.body;
//     res.send({ status: "User created", name, location });
//   }
// };

var AWS = require("aws-sdk");
let awsConfig = {
  region: "us-east-1",
  endpoint:
    "https://51ge6616lf.execute-api.us-east-1.amazonaws.com/prod/number",
};

export default async function handler(req, res) {
  console.log("get all products");
  const params = { table: "products" };
  try {
    const result = await axios.get(apiAddress, { params });
    let body = await JSON.parse(result.data.body);
    let products = body.data.Items;
    res.status(200).json({ success: true, products: products });
  } catch (error) {
    res.status(200).json({ success: false, error: error });
  }
}

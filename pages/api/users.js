module.exports = (req, res) => {
  if (req.method === "GET") {
    res.json([
      { name: "Tyler", location: "Alexandria, VA" },
      { name: "Lena", location: "NYC, NY" },
    ]);
  } else {
  }
};

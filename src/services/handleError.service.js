// user data error
function handled400Error(alert, res) {
  return res.status(400).json({ alert });
}
// unauthorized
function handled401Error(alert, res) {
  return res.status(401).json({ alert });
}
// authorized but not permissions
function handled403Error(alert, res) {
  return res.status(401).json({ alert });
}
// not found
function handled404Error(alert, res) {
  return res.status(404).json({ alert });
}
// server error
function handled500Error(alert, res) {
  return res.status(500).json({ alert });
}

export { handled400Error, handled401Error, handled403Error, handled500Error };
export default handled404Error;

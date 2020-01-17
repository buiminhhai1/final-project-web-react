exports.getContracts = async (req, res, next) => {
  if (!!req.user) {
    return res.json({ contracts: req.user.user.contracts });
  }
  return res.json({ error: 'Cannor find user' });
}; 
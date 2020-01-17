const TransactionModel = require('../model/transactionModel');

exports.checkBalance = async (req, res) => {
  try {
    if (req.user.user) {
      const idUser = req.user.user._id;
      const balance = await checkBalanceUser(idUser);
      if (balance < 0) {
        res.json({ result: false, balance, message: 'Cannot check balance' });
      } else {
        res.json({ result: true, balance, message: 'Check balance success' });
      }
    } else {
      res.json({ result: false, balance, message: 'Cannot check balance' });
    }

  } catch (error) {
    res.json({ result: false, balance, message: 'Cannot check balance' });
  }
}

const checkBalanceUser = async (idUser) => {
  try {
    const list = await TransactionModel.find({ idUser, $or: [{ method: 'TRANSFER' }, { method: 'WITHDRAW' }] });
    let balance = 0;
    list.forEach(e => {
      if (e.amount >= 0) {
        switch (e.method) {
          case 'TRANSFER': balance += e.amount;
            break;
          case 'WITHDRAW': balance -= e.amount;
            break;
        }
      }
    })
    return balance;
  } catch (error) {
    return -1;
  }
}
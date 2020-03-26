const ContractModel = require('../../model/contractModel');

exports.getListContract = async (req, res, next) => {
  try {
    const contracts = await ContractModel.find({});
    return res.json({
      contracts,
      message: 'get list contract successfull!'
    });
  } catch (err) {
    return res.json({
      error: err,
      message: 'some thing went wrong!'
    });
  }
};

exports.statiticsByDay = async (req, res, next) => {
  try {
    let startDay = Date.parse(req.query.startDay);
    let endDay = Date.parse(req.query.endDay);
    // (endDay - startDay) / 86400000;
    let days = [];
    while (endDay >= startDay) {
      days.push(startDay);
      startDay += 86400000;
    }

    let contracts = await ContractModel.find({});
    contracts = contracts.filter(contract => contract.status === 2);
    contracts.forEach(contract => {
      contract.to = Date.parse(contract.to);
    })

    let result = [];
    days.forEach(day => {
      let total = 0;
      contracts.forEach(contract => {
        if (parseInt(contract.to) === day) {
          total += contract.hourRate * contract.totalHourCommit;
        }
      })
      result.push({
        day,
        total
      });
    })

    return res.json({
      statitics: result,
    })
  } catch (err) {
    console.log(err);
    return res.json({
      error: err,
      message: 'Cannot statitics'
    });
  }
}
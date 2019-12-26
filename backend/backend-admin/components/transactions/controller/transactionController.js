const TransactionModel = require('../model/transactionModel');
const ContractModel = require('../../contracts/model/contractModel');
const UserModel = require('../../users/model/userModel');

const transferMoney = async (idContract) => {
  try {
    const existTransaction = await TransactionModel.findOne({
      method: 'TRANSFER',
      'detail.transfer.contractId': idContract
    });
    if (existTransaction) return false;
    else {
      const contract = await ContractModel.findOne({
        _id: idContract,
        status: {
          $gt: 1
        }
      });
      if (contract) {
        const idReceiveMoney =
          (contract.status === 2) ? contract.teacher.userId : contract.student.userId;
        const transaction = new TransactionModel({
          idUser: idReceiveMoney,
          method: 'TRANSFER',
          amount: contract.hourRate * contract.totalHourCommit,
          detail: {
            transfer: {
              contractId: idContract
            },
          }
        });
        transaction.save().then(result => {
          if (result) {
            return true;
          } else {
            return false;
          }
        });
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};

const updateContract = async (_id, status) => {
  try {
    const contract = await ContractModel.findById(_id);
    console.log('update contract');
    if (contract) {
      contract.status = status;
      const idTeach = contract.teacher.userId;
      const idStudent = contract.student.userId;
      const teacher = await UserModel.findById(idTeach);
      const student = await UserModel.findById(idStudent);
      if (teacher && student) {
        console.log('update teacher student');
        const updateTeacher = teacher.contracts.id(_id);
        updateTeacher.status = status;
        const updateStudent = student.contracts.id(_id);
        updateStudent.status = status;
        teacher.save();
        student.save();
        contract.save();
        return true;
      } else {
        console.log('cant update contract status');
        return false;
      }
    } else {
      console.log('cant update contract status');
      return false;
    }
  } catch (err) {
    console.log('cant update contract status');
    return false;
  }
};

exports.completeContract = async (contractId) => {
  try {
    const contract = await ContractModel.findById(contractId);
    if (contract && contract.status === 1) {
      const isUpdate = await updateContract(contractId, 2);
      if (isUpdate) {
        await transferMoney(contractId);
        return true;
      } else false;
    } else return false;
  } catch (error) {
      return false;
  }
};


exports.failedContract = async (contractId) => {
  try {
    const contract = await ContractModel.findById(contractId);
    if (contract && contract.status === 1) {
      const isUpdate = await updateContract(contractId, 3);
      if (isUpdate) {
        await transferMoney(contractId);
        return true;
      } else return false;
    } else return false;
  } catch (error) {
    return false;
  }
};
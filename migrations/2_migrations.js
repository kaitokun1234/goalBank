const goalBank = artifacts.require("GoalBank");

module.exports = function (deployer) {
  deployer.deploy(goalBank);
};

function checkCashRegister(price, cash, cid) {
    const currencyValues = {
      "PENNY": 0.01,
      "NICKEL": 0.05,
      "DIME": 0.1,
      "QUARTER": 0.25,
      "ONE": 1,
      "FIVE": 5,
      "TEN": 10,
      "TWENTY": 20,
      "ONE HUNDRED": 100
    };
  
    let change = cash - price;
    let totalCID = 0;
  
    // Calculate total cash in drawer
    for (let [unit, amount] of cid) {
      totalCID += amount;
    }
    totalCID = totalCID.toFixed(2);
  
    // Helper function to check if change can be given
    const canGiveChange = () => {
      if (change > totalCID) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
      } else if (change.toFixed(2) === totalCID) {
        return { status: "CLOSED", change: cid };
      } else {
        let changeArray = [];
        cid = cid.reverse();
  
        for (let [unit, amount] of cid) {
          const unitValue = currencyValues[unit];
          let unitAmount = 0;
  
          while (change >= unitValue && amount > 0) {
            change -= unitValue;
            amount -= unitValue;
            change = change.toFixed(2);
            amount = amount.toFixed(2);
            unitAmount += unitValue;
          }
  
          if (unitAmount > 0) {
            changeArray.push([unit, unitAmount]);
          }
        }
  
        if (change > 0) {
          return { status: "INSUFFICIENT_FUNDS", change: [] };
        } else {
          return { status: "OPEN", change: changeArray };
        }
      }
    };
  
    return canGiveChange();
  }
  checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
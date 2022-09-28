const Pinkslips = artifacts.require('Pinkslips');
const assert = require('assert');

contract ('Pinkslips',(accounts) => {
    const Buyer = accounts[1];
    const PINKS_ID=0;

    it('should allow a user to buy a car',async () => {
      const instance= await Pinkslips.deployed();
      const originalPinkslip = await instance.pinkslips(PINKS_ID);
      await instance.buyPinkslip(PINKS_ID,{from : Buyer, value: originalPinkslip.price})
      const updatedPinkslip = await instance.pinkslips(PINKS_ID);
      assert.equal(updatedPinkslip.owner,Buyer,'The buyer should now own this car');

    } );

});
// describe("Payments test (with setup and tear-down)", function() {
//     beforeEach(function () {
//       billAmtInput.value = 100;
//       tipAmtInput.value = 20;
//     });
  
//     it('should add a new payment to allPayments on submitPaymentInfo()', function () {
//       submitPaymentInfo();
  
//       expect(Object.keys(allPayments).length).toEqual(1);
//       expect(allPayments['payment1'].billAmt).toEqual('100');
//       expect(allPayments['payment1'].tipAmt).toEqual('20');
//       expect(allPayments['payment1'].tipPercent).toEqual(20);
//     });
  
//     it('should not add a new payment on submitPaymentInfo() with empty input', function () {
//       billAmtInput.value = '';
//       submitPaymentInfo();
  
//       expect(Object.keys(allPayments).length).toEqual(0);
//     });
  
//     it('should payment update #paymentTable on appendPaymentTable()', function () {
//       let curPayment = createCurPayment();
//       allPayments['payment1'] = curPayment;
  
//       appendPaymentTable(curPayment);
  
//       let curTdList = document.querySelectorAll('#paymentTable tbody tr td');
  
//       expect(curTdList.length).toEqual(4);
//       expect(curTdList[0].innerText).toEqual('$100');
//       expect(curTdList[1].innerText).toEqual('$20');
//       expect(curTdList[2].innerText).toEqual('%20');
//       expect(curTdList[3].innerText).toEqual('X');
//     });
  
//     it('should create a new payment on createCurPayment()', function () {
//       let expectedPayment = {
//         billAmt: '100',
//         tipAmt: '20',
//         tipPercent: 20,
//       }
  
//       expect(createCurPayment()).toEqual(expectedPayment);
//     });
  
//     it('should not create payment with empty input on createCurPayment()', function () {
//       billAmtInput.value = '';
//       tipAmtInput.value = '';
//       let curPayment = createCurPayment();
  
//       expect(curPayment).toEqual(undefined);
//     });
  
//     afterEach(function() {
//       billAmtInput.value = '';
//       tipAmtInput.value = '';
//       paymentTbody.innerHTML = '';
//       summaryTds[0].innerHTML = '';
//       summaryTds[1].innerHTML = '';
//       summaryTds[2].innerHTML = '';
//       serverTbody.innerHTML = '';
//       paymentId = 0;
//       allPayments = {};
//     });
//   });

describe("PAYMENTS.JS FUNCTION TESTS", function () {

  describe("submitPaymentInfo Tests", function () {
    beforeAll(function () {
      // initialization logic
      billAmtInput.value = 25;
      tipAmtInput.value = 5;
      submitPaymentInfo();
    });

    it('Passes when a new payment exists in allPayments object from the submitPaymentInfo()', function () {
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(JSON.stringify(allPayments['payment' + paymentId])).toContain('"billAmt":"25","tipAmt":"5","tipPercent":20');
    });

    it('Passes when the new payment is in the payment table with bill amount = 25, tip amount = 5, tip percentage = 20%', function () {
      expect(paymentTbody.innerHTML).toContain('<tr id="payment1"><td>$25</td><td>$5</td><td>20%</td></tr>');
    });

    it('Passes when the new payment is in the summary table with bill amount = $25', function () {
      expect(summaryTds[0].innerHTML).toEqual('$25');
    });

    it('Passes when the new payment is in the summary table with tip amount = $5', function () {
      expect(summaryTds[1].innerHTML).toEqual('$5');
    });

    it('Passes when the new payment is in the summary table with average tip percentage = 20%', function () {
      expect(summaryTds[2].innerHTML).toEqual('20%');
    });

    afterAll(function () {
      // teardown logic
      // initialization logic
      billAmtInput.value = '';
      tipAmtInput.value = '';

      delete allPayments['payment' + paymentId];

      paymentId = 0;
      paymentTbody.innerHTML = ''

      summaryTds[0].innerHTML = ''
      summaryTds[1].innerHTML = ''
      summaryTds[2].innerHTML = ''

    });

  });

  describe("updateSummary Tests", function () {
    beforeAll(function () {
      // initialization logic
      billAmtInput.value = 25;
      tipAmtInput.value = 3;
      submitPaymentInfo();
      billAmtInput.value = 76;
      tipAmtInput.value = 7;
      submitPaymentInfo();

    });

    it('Passes when the number of payments is 2', function () {
      expect(Object.keys(allPayments).length).toEqual(2);
    });

    it('Passes when 2 payments exists in the allPayments object', function () {
      expect(JSON.stringify(allPayments)).toContain('"payment1":{"billAmt":"25","tipAmt":"3","tipPercent":12');
      expect(JSON.stringify(allPayments)).toContain('"payment2":{"billAmt":"76","tipAmt":"7","tipPercent":9');
    });

    it('Passes when 2 payments exists in payment table', function () {
      expect(paymentTbody.innerHTML).toContain('<tr id="payment1"><td>$25</td><td>$3</td><td>12%</td></tr>');
      expect(paymentTbody.innerHTML).toContain('<tr id="payment2"><td>$76</td><td>$7</td><td>9%</td></tr>');
    });

    it('Passes when the new payment is in the summary table with bill amount = $101', function () {
      expect(summaryTds[0].innerHTML).toEqual('$101');
    });

    it('Passes when the new payment is in the summary table with tip amount = $10', function () {
      expect(summaryTds[1].innerHTML).toEqual('$10');
    });

    it('Passes when the new payment is in the summary table with average tip percentage = 11%', function () {
      expect(summaryTds[2].innerHTML).toEqual('11%');
    });

    afterAll(function () {
      // teardown logic
      // initialization logic
      billAmtInput.value = '';
      tipAmtInput.value = '';

      delete allPayments['payment1'];
      delete allPayments['payment2'];

      paymentId = 0;
      paymentTbody.innerHTML = ''

      summaryTds[0].innerHTML = ''
      summaryTds[1].innerHTML = ''
      summaryTds[2].innerHTML = ''

    });

  });

  describe("appendPaymentTable tests", function () {

    beforeEach(function () {
      // initialization logic
      billAmtInput.value = 25;
      tipAmtInput.value = 5;
      paymentId = 1;
      tempPayment = {
        billAmt: billAmtInput.value,
        tipAmt: tipAmtInput.value,
        tipPercent: calculateTipPercent(billAmtInput.value, tipAmtInput.value)
      };
      appendPaymentTable(tempPayment)
    });

    it('The payment table should have one row', function () {
      expect(paymentTbody.innerHTML).toContain('<tr id="payment1"><td>$25</td><td>$5</td><td>20%</td></tr>');
    });

    afterEach(function () {
      // initialization logic
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentId = 0;

      paymentTbody.innerHTML = ''
    });

  });

  describe("createCurPayment tests", function () {

    describe("createCurPayment '' billAmtInput test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = 5;
      });

      it('passes when createCurPayment returns undefined when billAmtInput.value is ""', function () {

        expect(createCurPayment()).toBeUndefined();
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = '';
        //paymentId = 0;

        paymentTbody.innerHTML = ''
      });

    });

    describe("createCurPayment '' tipAmtIInput test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = 25;
        tipAmtInput.value = '';
      });

      it('passes when createCurPayment returns undefined when tipAmtInput.value is ""', function () {

        expect(createCurPayment()).toBeUndefined();
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = '';

        paymentTbody.innerHTML = ''
      });

    });

    describe("createCurPayment billAmtInput > 0 test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = 0;
        tipAmtInput.value = 5;
      });

      it('passes when createCurPayment returns undefined when billAmtInput.value is 0', function () {
        expect(createCurPayment()).toBeUndefined();
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = 5;

        paymentTbody.innerHTML = ''
      });

    });

    describe("createCurPayment billAmtInput > 0 test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = 0;
        tipAmtInput.value = 5;
      });

      it('passes when createCurPayment returns undefined when billAmtInput.value is -1', function () {
        expect(createCurPayment()).toBeUndefined();
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = '';

        paymentTbody.innerHTML = ''
      });

    });

    describe("createCurPayment tipAmtInput < 0 test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = 25;
        tipAmtInput.value = -5;
      });

      it('passes when createCurPayment returns undefined when tipAmtInput.value is -5', function () {
        expect(createCurPayment()).toBeUndefined();
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = '';
        tipAmtInput.value = '';

        paymentTbody.innerHTML = ''
      });

    });

    describe("createCurPayment tipAmtInput is 0 test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = 25;
        tipAmtInput.value = 0;
      });

      it('passes when createCurPayment returns an object with billAmt = 25, tipAmt = 0, tipPercent = 0', function () {
        expect(JSON.stringify(createCurPayment())).toContain('"billAmt":"25","tipAmt":"0","tipPercent":0');
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = -1;
        tipAmtInput.value = 5;

        paymentTbody.innerHTML = ''
      });

    });

    describe("createCurPayment tipAmtInput is 5 test", function () {
      beforeEach(function () {
        // initialization logic
        billAmtInput.value = 25;
        tipAmtInput.value = 5;
      });

      it('passes when createCurPayment returns an object with billAmt = 25, tipAmt = 5, tipPercent = 20%', function () {
        expect(JSON.stringify(createCurPayment())).toContain('"billAmt":"25","tipAmt":"5","tipPercent":20');
      });

      afterEach(function () {
        // initialization logic
        billAmtInput.value = -1;
        tipAmtInput.value = 5;

        paymentTbody.innerHTML = ''
      });

    });

  });

});

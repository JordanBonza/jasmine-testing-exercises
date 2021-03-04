// describe("Utilities test (with setup and tear-down)", function() {
//     beforeEach(function () {
//       billAmtInput.value = 100;
//       tipAmtInput.value = 20;
//       submitPaymentInfo();
//     });
  
//     it('should sum total tip amount of all payments on sumPaymentTotal()', function () {
//       expect(sumPaymentTotal('tipAmt')).toEqual(20);
  
//       billAmtInput.value = 200;
//       tipAmtInput.value = 40;
  
//       submitPaymentInfo();
  
//       expect(sumPaymentTotal('tipAmt')).toEqual(60);
//     });
  
//     it('should sum total bill amount of all payments on sumPaymentTotal()', function () {
//       expect(sumPaymentTotal('billAmt')).toEqual(100);
  
//       billAmtInput.value = 200;
//       tipAmtInput.value = 40;
  
//       submitPaymentInfo();
  
//       expect(sumPaymentTotal('billAmt')).toEqual(300);
//     });
  
//     it('should sum total tip percent on sumPaymentTotal()', function () {
//       expect(sumPaymentTotal('tipPercent')).toEqual(20);
  
//       billAmtInput.value = 100;
//       tipAmtInput.value = 20;
  
//       submitPaymentInfo();
  
//       expect(sumPaymentTotal('tipPercent')).toEqual(40);
//     });
  
//     it('should sum tip percent of a single tip on calculateTipPercent()', function () {
//       expect(calculateTipPercent(100, 23)).toEqual(23);
//       expect(calculateTipPercent(111, 11)).toEqual(10);
//     });
  
//     it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
//       let newTr = document.createElement('tr');
  
//       appendTd(newTr, 'test');
  
//       expect(newTr.children.length).toEqual(1);
//       expect(newTr.firstChild.innerHTML).toEqual('test');
//     });
  
//     it('should generate delete td and append to tr on appendDeleteBtn(tr, type)', function () {
//       let newTr = document.createElement('tr');
  
//       appendDeleteBtn(newTr);
  
//       expect(newTr.children.length).toEqual(1);
//       expect(newTr.firstChild.innerHTML).toEqual('X');
//     });
  
//     afterEach(function() {
//       billAmtInput.value = '';
//       tipAmtInput.value = '';
//       paymentTbody.innerHTML = '';
//       summaryTds[0].innerHTML = '';
//       summaryTds[1].innerHTML = '';
//       summaryTds[2].innerHTML = '';
//       serverTbody.innerHTML = '';
//       allPayments = {};
//       paymentId = 0;
//     });
//   });

describe("HELPERS.JS FUNCTION TESTS", function () {

    describe("calculateTipPercentage function tests", function () {
  
      it('Passes when function returns 20 for a $20 tip on a $100 bill', function () {
        expect(calculateTipPercent(100, 20)).toEqual(20);
      });
  
      it('Passes when function returns 15 for a $3 tip on a $20 bill', function () {
        expect(calculateTipPercent(20, 3)).toEqual(15);
      });
  
      it('Passes when function returns 7 for a $30 tip on a $20 bill', function () {
        expect(calculateTipPercent(200, 14)).toEqual(7);
      });
  
    });
  
  
    describe("sumPaymentTotal function tests", function () {
  
      beforeEach(function () {
        // initialization logic - setup allPayments object
  
        allPayments.payment1 = {
          billAmt: 100,
          tipAmt: 20,
          tipPercent: 20
        }
        allPayments.payment2 = {
          billAmt: 20,
          tipAmt: 3,
          tipPercent: 15
        }
        allPayments.payment3 = {
          billAmt: 200,
          tipAmt: 14,
          tipPercent: 7
        }
      });
  
      it('Passes when sumPyamentTotal function returns 320 for billAmt', function () {
        expect(sumPaymentTotal('billAmt')).toEqual(320);
      });
  
      it('Passes when sumPyamentTotal function returns 37 for tipAmt', function () {
        expect(sumPaymentTotal('tipAmt')).toEqual(37);
      });
  
      it('Passes when sumPyamentTotal function returns 42 for tipPercent', function () {
        expect(sumPaymentTotal('tipPercent')).toEqual(42);
      });
  
      afterEach(function () {
        // teardown logic
        delete allPayments["payment1"];
        delete allPayments["payment2"];
        delete allPayments["payment3"];
      });
  
    });
  
  });
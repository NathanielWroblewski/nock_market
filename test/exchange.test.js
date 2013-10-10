test('buy should add a BUY nockmarket order', function(done){
  exchangeData = exchange.buy(40, 100, exchangeData);
  exchangeData.buys.volumes[40].should.eql(100);
  done();
});

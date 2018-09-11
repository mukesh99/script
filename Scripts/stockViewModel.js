var stockObj = {
  TimeStr: ko.observable(),
  Price: ko.observable(),
  Qty: ko.observable(),
  TotalVolume: ko.observable(),
  BidPrice: ko.observable(),
  BidQty: ko.observable(),
  AskPrice: ko.observable(),
  AskQty: ko.observable(),
  Open: ko.observable(),
  Close: ko.observable(),
  High: ko.observable(),
  Low: ko.observable(),
  Avg: ko.observable(),
  Oi: ko.observable(),
  Token: ko.observable(),
  Ticker: ko.observable(),
  ExchangeName: ko.observable(),
  Change: ko.observable()
};

var viewModel = {
  dataRows : ko.observableArray([]),
  addStock: function (item) {
    var st = JSON.parse(item);
    var match = ko.utils.arrayFirst(viewModel.dataRows(), function (s) {
      return s.Token() === st.Token;
    });
    if (!match) {
      viewModel.dataRows.push(new stockTrade(st));
    } else {
      match.TimeStr(st.TimeStr);
      match.Price((st.Price/100).toFixed(2));
      match.Qty(st.Qty);
      match.TotalVolume(st.TotalVolume);
      match.Change((st.Change/100).toFixed(2));
      match.Oi(st.Oi);
      match.BidPrice(st.BidPrice);
      match.AskPrice(st.AskPrice);
      match.BidQty(st.BidQty);
      match.AskQty(st.AskQty);
    }
      

  }
};

var stockTrade = function (data) {
  return {
    TimeStr: ko.observable(data.TimeStr),
    Price: ko.observable((data.Price/100).toFixed(2)),
    Qty: ko.observable(data.Qty),
    TotalVolume: ko.observable(data.TotalVolume),
    Token: ko.observable(data.Token),
    Ticker: ko.observable(data.Ticker),
    ExchangeName: ko.observable(data.ExchangeName),
    Change: ko.observable((data.Change/100).toFixed(2)),
    Oi: ko.observable(data.Oi),
    BidPrice: ko.observable(data.BidPrice),
    BidQty: ko.observable(data.BidQty),
    AskPrice: ko.observable(data.AskPrice),
    AskQty: ko.observable(data.AskQty),
    Open: ko.observable(data.Open),
    Close: ko.observable(data.Close),
    High: ko.observable(data.High),
    Low: ko.observable(data.Low),
    Avg: ko.observable(data.Avg)

  };
};

var pformat = function(data) {
  return data.toFixed(2);

}

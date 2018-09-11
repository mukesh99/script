var PagedGridModel = function () {
  this.items = ko.observableArray();

  this.addItem = function (item) {
    this.items.push(item);
  };

  this.sortByName = function () {
    this.items.sort(function (a, b) {
      return a.name < b.name ? -1 : 1;
    });
  };

  this.jumpToFirstPage = function () {
    this.gridViewModel.currentPageIndex(0);
  };

  this.gridViewModel = new ko.simpleGrid.viewModel({
    data: this.items,
    pageSize: 4
  });
};

addStock = function(item) {

};
ko.applyBindings(new PagedGridModel());
namespace my.bookshop;
using { managed } from '@sap/cds/common';

entity Books {
  key ID : Integer;
  title  : String;
  stock  : Integer;
}

entity Order: managed {
  key ID: UUID @title : 'Order ID';
  customer: String @title : 'Customer';
  items: Composition of many Item on items.order = $self;
}

entity Item {
  key order: Association to Order @title : 'Order ID';
  key itemNo: Integer @title : 'No.';
  product: String @title : 'Product';
  quantity: Integer @title : 'Quantity';
}
using my.bookshop as my from '../db/data-model';

service CatalogService {
    entity Order as projection on my.Order;
    entity Item as projection on my.Item;
}

annotate CatalogService.Item with @(
    UI: {
        LineItem  : [
            {
                $Type : 'UI.DataField',
                Value : product,
            },
            {
                $Type : 'UI.DataField',
                Value : quantity,
            }
        ],
    }
);
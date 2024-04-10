package sdu.plaza.sduplaza.basket.service;

import sdu.plaza.sduplaza.basket.dto.BasketView;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.List;

public interface BasketService {
    BasketView addToBasket(BasketView basket, ProductView view);

    BasketView removeFromBasket(BasketView basket, ProductView view);

    List<ProductView> getBasketItems(BasketView basket);
}

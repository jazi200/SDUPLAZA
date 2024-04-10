package sdu.plaza.sduplaza.basket.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sdu.plaza.sduplaza.basket.dto.BasketView;
import sdu.plaza.sduplaza.basket.service.BasketService;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BasketServiceImpl implements BasketService {

    public BasketView addToBasket(BasketView basket, ProductView view){
        if(basket.getItems() == null)
            basket.setItems(new ArrayList<>());

        for(ProductView product : basket.getItems()){
            if(product.getName().equals(view.getName()) &&
                    product.getMenu().equals(view.getMenu()) &&
                    product.getType().equals(view.getType()) &&
                    product.getDescription().equals(view.getDescription()) &&
                    product.getPrice().equals(view.getPrice()))
                throw new RuntimeException("Product already exists");
        }

        basket.getItems().add(view);

        return basket;
    }

    @Override
    public BasketView removeFromBasket(BasketView basket, ProductView view){
        if (basket.getItems() == null) {
            basket.setItems(new ArrayList<>());
            throw new RuntimeException("Basket is empty");
        }
        List<ProductView> items = basket.getItems();
        basket.setItems(new ArrayList<>());
        boolean deleted = false;
        for (ProductView item : items) {
            if (item.getName().equals(view.getName()) &&
                    item.getMenu().equals(view.getMenu()) &&
                    item.getType().equals(view.getType()) &&
                    item.getDescription().equals(view.getDescription()) &&
                    item.getPrice().equals(view.getPrice())
            ) {
                deleted = true;
                continue;
            }
            basket.getItems().add(item);
        }

        if(!deleted)
            throw new RuntimeException("Product not exist");

        return basket;
    }

    @Override
    public List<ProductView> getBasketItems(BasketView basket) {
        if(basket.getItems() == null)
            basket.setItems(new ArrayList<>());

        return basket.getItems().stream().toList();
    }




}

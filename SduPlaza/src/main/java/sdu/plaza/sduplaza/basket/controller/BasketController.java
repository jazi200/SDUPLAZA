package sdu.plaza.sduplaza.basket.controller;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.basket.dto.BasketView;
import sdu.plaza.sduplaza.basket.service.BasketService;
import sdu.plaza.sduplaza.products.dto.ProductView;

import java.util.List;

@RestController
@RequestMapping("/basket")
@RequiredArgsConstructor
public class BasketController {

    private final BasketService service;


    @GetMapping("/sum")
    public ResponseEntity<Integer> getSum(@RequestHeader("Authorization") String token){


        return ResponseEntity.ok(0);
    }


    @PostMapping("/add")
    public ResponseEntity<BasketView> addToBasket(HttpSession session, @RequestBody ProductView product){
        System.out.println(session);

        BasketView basket = (BasketView) session.getAttribute("basket");
        if (basket == null) {
            System.out.println("Basket is null, creating a new one.");
            basket = new BasketView();
        }

        basket = service.addToBasket(basket, product);
        session.setAttribute("basket", basket);

        System.out.println("Basket size: " + basket.getItems().size());

        return ResponseEntity.ok(basket);
    }


    @GetMapping("/get")
    public ResponseEntity<List<ProductView>> getBasketItems(HttpSession session){
        BasketView basket = (BasketView) session.getAttribute("basket");

        if(basket == null){
            basket = new BasketView();
        }

        session.setAttribute("basket", basket);

        return ResponseEntity.ok(service.getBasketItems(basket));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Boolean> removeFromBasket(HttpSession session, @RequestBody ProductView product){
        BasketView basket = (BasketView) session.getAttribute("basket");

        if(basket == null){
            basket = new BasketView();
            session.setAttribute("basket", basket);
        }
        session.removeAttribute("basket");

        session.setAttribute("basket", service.removeFromBasket(basket, product));

        return ResponseEntity.ok(true);
    }

}

package sdu.plaza.sduplaza;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import sdu.plaza.sduplaza.products.dto.ProductView;
import sdu.plaza.sduplaza.products.enums.ProductMenu;
import sdu.plaza.sduplaza.products.enums.ProductType;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
public class JsonTransformer {

    public static void main(String[] args) throws IOException {

        AtomicInteger i = new AtomicInteger(1);

        for (ProductType type : ProductType.values()) {
//            if(type != ProductType.BELKA_FOOD) continue;
            ObjectMapper objectMapper = new ObjectMapper();
            List<ProductView> transformedProducts = new ArrayList<>();
            String t = type.toString();
            System.out.println(t);
            InputStream is = JsonTransformer.class.getClassLoader().getResourceAsStream("products/"+t+".json");
            Map<String, List<Map<String, Object>>> products = objectMapper.readValue(is, new TypeReference<>() {
            });
            products.forEach((menuName, items) -> items.forEach(item -> {
                ProductView product = new ProductView();
                product.setId((long) i.getAndIncrement());
                System.out.println(i.get());
                product.setName((String) item.get("name"));
                if(type != ProductType.AC_CATERING && type != ProductType.BELKA_FOOD){
                    product.setDescription((String) item.get("description"));
                }else{
                    product.setDescription(" ");
                }
                product.setPrice(item.get("price").toString());
                product.setType(type);
                product.setMenu(ProductMenu.valueOf(menuName)); // Assuming you have a ProductMenu enum or something similar
                product.setImage((String) item.get("image"));
                transformedProducts.add(product);
            }));
            objectMapper.writeValue(new File(t +".json"), transformedProducts);
        }


    }
}

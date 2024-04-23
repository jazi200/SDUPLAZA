package sdu.plaza.sduplaza.payment.controller;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.payment.dto.PaymentProducts;
import sdu.plaza.sduplaza.payment.dto.PaymentStatus;
import sdu.plaza.sduplaza.payment.entity.AdminEntity;
import sdu.plaza.sduplaza.users.dto.request.UserTokenRequest;
import sdu.plaza.sduplaza.users.entity.UserEntity;
import sdu.plaza.sduplaza.users.repository.UserRepository;
import sdu.plaza.sduplaza.users.util.Decoder;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class PaymentController {

    private final Decoder decoder;

    private final UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<Boolean> addPayment(@RequestHeader("Authorization") String token, @RequestBody PaymentProducts products) {
        String data = decoder.decodeJwtPayload(token);

        Gson gson = new Gson();

        UserTokenRequest tokenRequest = gson.fromJson(data, UserTokenRequest.class);

        UserEntity entity = userRepository.findByUserId(tokenRequest.getSub())
                .orElseThrow(()->new RuntimeException("User not found"));

        PaymentStatus paymentStatus = PaymentStatus.builder()
                .status(1)
                .userId(Long.valueOf(entity.getUserId()))
                .products(products.getProducts())
                .build();

        AdminEntity.addOrder(paymentStatus);

        return ResponseEntity.ok(true);
    }

    @PutMapping("/change")
    public ResponseEntity<Boolean> changeStatus(@RequestParam (value = "id") Integer id, @RequestParam (value = "status") Integer status){
        AdminEntity.changeStatus(id, status);

        return ResponseEntity.ok(true);
    }

    @GetMapping("/get")
    public ResponseEntity<List<PaymentStatus>> getPayments(){
        return ResponseEntity.ok(AdminEntity.getList());
    }
}

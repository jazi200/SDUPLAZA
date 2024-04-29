package sdu.plaza.sduplaza.payment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sdu.plaza.sduplaza.payment.dto.PaymentProducts;
import sdu.plaza.sduplaza.payment.dto.PaymentStatus;
import sdu.plaza.sduplaza.payment.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping("/add")
    public ResponseEntity<Boolean> addPayment(@RequestHeader("Authorization") String token, @RequestBody PaymentProducts products) {
        return ResponseEntity.ok(service.add(token, products));
    }

    @PutMapping("/change")
    public ResponseEntity<Boolean> changeStatus(@RequestParam (value = "id") Integer id, @RequestParam (value = "status") Integer status){
        return ResponseEntity.ok(service.changeStatus(id,status));
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<List<PaymentStatus>> getPayments(){
        return ResponseEntity.ok(service.getList());
    }
}

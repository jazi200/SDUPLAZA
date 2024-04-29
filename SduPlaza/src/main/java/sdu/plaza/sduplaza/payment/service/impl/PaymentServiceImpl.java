package sdu.plaza.sduplaza.payment.service.impl;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sdu.plaza.sduplaza.payment.dto.PaymentProducts;
import sdu.plaza.sduplaza.payment.dto.PaymentStatus;
import sdu.plaza.sduplaza.payment.entity.AdminEntity;
import sdu.plaza.sduplaza.payment.service.PaymentService;
import sdu.plaza.sduplaza.users.dto.request.UserTokenRequest;
import sdu.plaza.sduplaza.users.entity.UserEntity;
import sdu.plaza.sduplaza.users.repository.UserRepository;
import sdu.plaza.sduplaza.users.util.Decoder;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final Decoder decoder;

    private final UserRepository userRepository;

    public boolean add(String token, PaymentProducts products){
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

        return true;
    }

    @Override
    public boolean changeStatus(int id, int status) {
        AdminEntity.changeStatus(id, status);
        return true;
    }

    @Override
    public List<PaymentStatus> getList() {
        return AdminEntity.getList();
    }


}

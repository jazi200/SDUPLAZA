package sdu.plaza.sduplaza.payment.service;

import sdu.plaza.sduplaza.payment.dto.PaymentProducts;
import sdu.plaza.sduplaza.payment.dto.PaymentStatus;

import java.util.List;

public interface PaymentService {

    boolean add(String token, PaymentProducts products);

    boolean changeStatus(int id, int status);

    List<PaymentStatus> getList();

}

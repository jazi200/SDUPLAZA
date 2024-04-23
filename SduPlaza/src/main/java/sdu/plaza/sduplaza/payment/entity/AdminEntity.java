package sdu.plaza.sduplaza.payment.entity;

import sdu.plaza.sduplaza.payment.dto.PaymentStatus;

import java.util.ArrayList;
import java.util.List;

public class AdminEntity {

    private static List<PaymentStatus> list = new ArrayList<>();

    public static List<PaymentStatus> getList() {
        return list;
    }
    public static void addOrder(PaymentStatus order){
        list.add(order);
    }

    public static void changeStatus(int id, int status){
        list.get(id).setStatus(status);
    }
}

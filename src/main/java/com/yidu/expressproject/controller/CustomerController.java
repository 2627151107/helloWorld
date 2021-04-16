package com.yidu.expressproject.controller;

import com.yidu.expressproject.entity.Customer;
import com.yidu.expressproject.serviceplf.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * (Customer)表控制层
 *
 * @author makejava
 * @since 2021-04-12 14:26:45
 */
@Controller
public class CustomerController {
    /**
     * 服务对象
     */
    @Autowired
    private CustomerService customerService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @RequestMapping("customer_selectOne")
    public Customer selectOne(Integer id) {
        return this.customerService.queryById(id);
    }

    @ResponseBody
    @RequestMapping("customer_register")
    public String customer_register(String customerPhone,String customerPassword,String dpassword) {
        Customer customer=new Customer();
        if(customerPhone.contains(".")){
            //判断账号为邮箱
            String customerEmail=customerPhone;
            customer.setCustomerEmail(customerEmail);
            customer.setCustomerPassword(customerPassword);
        }else{
            //判断账号为手机号
            customer.setCustomerPhone(customerPhone);
            customer.setCustomerPassword(customerPassword);
        }
        //验证验证码dpassword
        System.out.println("开始核对验证码");
        //验证验证码
        int i = customerService.insert(customer);
        if(i>0){
            return "ok";
        }
        return "no";
    }

    @ResponseBody
    @RequestMapping("customer_login")
    public String customer_login(String customerPhoneorEmail,String customerPassword) {
        Customer customer=new Customer();
        List<Customer> customerList = customerService.queryAll(null);
        if(customerPhoneorEmail.contains(".")){
            customer.setCustomerEmail(customerPhoneorEmail);
            customer.setCustomerPassword(customerPassword);
            for (Customer customer1 : customerList) {
                 if(customer.getCustomerEmail().equals(customer1.getCustomerEmail())&&customer.getCustomerPassword().equals(customer1.getCustomerPassword())){
                    return "ok";
                }
            }
        }else{
            customer.setCustomerPhone(customerPhoneorEmail);
            customer.setCustomerPassword(customerPassword);
            for (Customer customer1 : customerList) {
                if(customer.getCustomerPhone().equals(customer1.getCustomerPhone())&&customer.getCustomerPassword().equals(customer1.getCustomerPassword())){
                    return "ok";
                }
            }
        }
        return "no";
    }


}

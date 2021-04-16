package com.yidu.expressproject.controller;

import com.yidu.expressproject.entity.Address;
import com.yidu.expressproject.serviceplf.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * (Address)表控制层
 *
 * @author makejava
 * @since 2021-04-15 10:31:37
 */
@Controller
public class AddressController {
    /**
     * 服务对象
     */
    @Autowired
    private AddressService addressService;

    /**
     * 通过主键查询单条数据
     *
     * @param id 主键
     * @return 单条数据
     */
    @RequestMapping("address_selectOne")
    public Address selectOne(Integer id) {
        return this.addressService.queryById(id);
    }

    @ResponseBody
    @RequestMapping("address_add")
    public String address_add(Address address) {
        int i = this.addressService.insert(address);
        if(i>0){
            return "ok";
        }
        return "no";
    }

    @ResponseBody
    @RequestMapping("address_selectAll")
    public List<Address> address_selectAll(int customerId) {
        List<Address> addressList = this.addressService.queryAll(null);
        //模拟客户地址
        //Address address=new Address(1,1,0,"15197668292","彭履飞","410000","湖南省","长沙市","雨花区","香樟路110号",1);
        //addressList.add(address);
        return addressList;
    }

}
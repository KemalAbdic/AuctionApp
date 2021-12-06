package com.atlantbh.auctionapp.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductControllerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    public void getProduct() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/?id=1")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getRandomProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/random")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getNewProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/new")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getLastProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/last")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    public void getAllProducts() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders
                .get("/product/all")
                .accept(MediaType.APPLICATION_JSON);
        mvc.perform(request)
                .andExpect(status().isOk())
                .andReturn();
    }

}
